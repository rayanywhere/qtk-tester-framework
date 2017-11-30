const assert = require('assert');

module.exports = {
    name: "成功获取用户信息",
    prerequisites: [],
    steps: [
        {
            name: "login",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    cmd: "login",
                    user: "ray",
                    password: "123456"
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(error === undefined, "error should be undefined");
            }
        }
    ]
}