const Executer = require('../../').Executer;

module.exports = class extends Executer {
    async init() {

    }

    async fini() {

    }

    async send(name, request, context) {
        await sleep(1);
        if (name == 'login') {
            return {error: undefined, response: "abcdefg"};
        }
        else if (name == 'user.info.get') {
            return {error: undefined, response: {name:"ray", age:18}};
        }
        return {error: new Error('unknown')};
    }
}

const sleep = (sec) => {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
};