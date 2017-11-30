const assert = require('assert');

module.exports = class {
    constructor(config) {
        assert(typeof config === 'object', 'bad step config, expecting an object');        
        this._name = this._parseName(config);
        this._timeout = this._parseTimeout(config);
        this._prepareRequest = this._parsePrepareRequest(config);
        this._handleResponse = this._parseHandleResponse(config);
    }

    get name() { return this._name; }
    get timeout() { return this._timeout; }
    get prepareRequest() { return this._prepareRequest; }
    get handleResponse() { return this._handleResponse; }

    /*------------private functions-------------*/
    _parseName(config) {
        assert(typeof config.name === 'string', 'bad step config, missing "name" field');
        return config.name;
    }
    _parseTimeout(config) {
        assert(Number.isInteger(config.timeout), 'bad step config, missing "timeout" field');
        return config.timeout;
    }
    _parsePrepareRequest(config) {
        assert(typeof config.prepareRequest === 'function', 'bad step config, missing "prepareRequest" field');
        return config.prepareRequest;
    }
    _parseHandleResponse(config) {
        assert(typeof config.handleResponse === 'function', 'bad step config, missing "handleResponse" field');
        return config.handleResponse;
    }
}