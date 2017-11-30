const Executer = require('../').Executer;
const Tester = require('../');

class AppExecuter extends Executer {
    async init() {

    }

    async fini() {

    }

    async send(name, request, context) {
        if (name == 'login') {
            return {error: undefined, response: "abcdefg"};
        }
        else if (name == 'user.info.get') {
            return {error: undefined, response: {name:"ray", age:18}};
        }
        return {error: new Error('unknown')};
    }
}

Tester.setup('./scenario', new AppExecuter());
(async () => await Tester.run())().catch(err => {
    console.error(err.stack);
    process.exit(-1);
});