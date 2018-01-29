const AppExecuter = require('./executer');
const Tester = require('../');

const sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

Tester.setup(async () => {await sleep(3)});

Tester.run('./scenario', new AppExecuter());