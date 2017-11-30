const assert = require('assert');

module.exports = {
    name: "成功获取用户信息",
    prerequisites: [
        require('../login/success')
    ],
    steps: [
        {
            name: "user.info.get",
            timeout: 3000,
            prepareRequest: function(dataset) {
                return {
                    cmd: "get_user_info",
                    auth: dataset.step(-1).response
                };
            },
            handleResponse: function({error, response}, dataset) {
                assert(error === undefined, "error should be undefined");
                assert(response.name === 'ray', "name should be 'ray'");
            }
        }
    ]
}