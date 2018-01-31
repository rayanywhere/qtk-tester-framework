const assert = require('assert');
const Step = require('../step');

class Dataset {
    constructor() {
        this._steps = [];
        this._context = {};
    }

    step(offset = -1) {
        let position = (offset >= 0) ? offset : this._steps.length + offset;
        assert((position >= 0) || (position < this._steps.length), 'step offset out of range');
        return this._steps[position];
    }

    get context() {
        return this._context;
    }
}

module.exports = class Scenario {
    constructor(config, executer) {
        assert(typeof config === 'object', 'bad config, expecting an object');        
        this._executer = executer;
        this._name = Scenario._parseName(config);
        this._steps = Scenario._parseSteps(config, executer);
        this._dataset = new Dataset();
        this._position = 0;
    }

    get name() { return this._name; }
    get timeout() { return this._steps.map(step => step.timeout).reduce((acc, curr) => acc + curr, 0); }

    init() {
        return this._executer.init();
    }

    fini() {
        return this._executer.fini();
    }

    async run() {
        try {
            for (let step of this._steps) {
                const request = step.prepareRequest(this._dataset);
                const {error, response} = await this._executer.send(step.name, request, this._dataset.context, step.timeout);
                step.handleResponse({error, response}, this._dataset);
                this._dataset._steps.push({request, response, error});
            }
        }
        catch(err) {
            throw new Error(`error occur while executing scenario(${this._name}) at step[${this._dataset._steps.length}](${this._steps[this._dataset._steps.length].name}), detail information: ${err.stack}`);
        }
    }

    /*----------private functions------------*/
    static _parseName(config) {
        assert(typeof config.name === 'string', 'bad config, missing "name" field');
        return config.name;
    }

    static _parseSteps(config, executer) {
        assert(config.prerequisites instanceof Array, 'bad config, missing "prerequisites" field');        
        assert(config.steps instanceof Array, 'bad config, missing "steps" field');
        
        let steps = [];
        config.prerequisites.forEach(function (prerequisite) {
            steps = steps.concat(Scenario._parseSteps(prerequisite, executer));
        });
        config.steps.forEach(function (stepConfig) {
            steps.push(new Step(stepConfig, this));
        });
        return steps;
    }
}