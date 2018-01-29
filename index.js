const { lstatSync:stat, readdirSync:readdir } = require('fs');
const { join, resolve } = require('path');

const assert = require('assert');

const Executer = require('./src/executer');
const Scenario = require('./src/scenario');
 
let folder = undefined;
let executer = undefined;

module.exports = class {
    static get Executer() { return Executer; }
    
    static setup(callback = undefined) {
        it("setup test env...", async function() {
            this.timeout(30000);
            if (typeof callback === 'function') {
                await callback();
            }
        });
    }

    static run(folder, executer) {
        folder = resolve(folder);
        for (const subFolder of readdir(folder).filter(file => stat(join(folder, file)).isDirectory())) {
            for (const scenarioName of readdir(join(folder, subFolder)).filter(name => name.endsWith('.js')).map(name => name.replace(/\.js$/g, ''))) {            
                const scenario = new Scenario(require(join(folder, join(subFolder, scenarioName))), executer);
                describe(subFolder, function() {
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
