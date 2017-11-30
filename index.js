const { lstatSync:stat, readdirSync:readdir } = require('fs');
const { join, resolve } = require('path');

const assert = require('assert');

const Executer = require('./src/executer');
const Scenario = require('./src/scenario');
 
let folder = undefined;
let executer = undefined;

module.exports = class {
    static get Executer() { return Executer; }
    
    static setup(folder, executer) {
        assert(executer instanceof Executer, 'expect executer to be a subclass of Executer');
        this._folder = resolve(folder);
        this._executer = executer; 
    }

    static async run() {
        for (const folder of readdir(this._folder).filter(file => stat(join(this._folder, file)).isDirectory())) {
            for (const scenarioName of readdir(join(this._folder, folder)).filter(name => name.endsWith('.js')).map(name => name.replace(/\.js$/g, ''))) {            
                const scenario = new Scenario(require(join(this._folder, join(folder, scenarioName))), this._executer);
                describe(folder, function() {
                    beforeEach(async function() {
                        this.timeout(5000);
                        await scenario.init();
                    });
                    afterEach(async function() {
                        this.timeout(5000);
                        await scenario.fini();
                    });
                    it(scenario.name, async function() {
                        this.timeout(scenario.timeout);
                        await scenario.run();
                    });
                });
            }
        }
    }
};
