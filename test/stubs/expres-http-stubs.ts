export class HttpRequestStub {
    public body = {};
    public params = {};
}

export class HttpResponseStub {
    private code = 200;

    public status(newStatus) {
        this.code = newStatus;
    }

    public send(obj) {

    }

    public getStatus() {
        return this.code;
    }
}
