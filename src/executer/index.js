module.exports = class {
    async init() { throw new Error(`"init" method is expected to be implemented in subclass`); }
    async fini() { throw new Error(`"fini" method is expected to be implemented in subclass`); }

    /**
     * @param  request, context
     * @return {error, response} 
     */
    async send(request, context) { throw new Error(`"send" method is expected to be implemented in subclass`); }
}