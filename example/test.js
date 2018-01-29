const AppExecuter = require('./executer');
const Tester = require('../');

const sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
};

Tester.setup(async() => {
    await sleep(1); //simulate a postponed setup function call
    return {executer:new AppExecuter(), folder: "./scenario"};
}).then(({executer, folder}) => {
    Tester.run(folder, executer);
});