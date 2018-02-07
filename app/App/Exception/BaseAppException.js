class BaseAppException {
    constructor(message) {
        this.message = message;
        this.name = 'BaseAppException';
    }

    toString() {
        return this.name + ': ' + this.message;
    }
}

module.exports = BaseAppException;