"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RessourceID {
    constructor(id) {
        this.id = id;
    }
    static create(id) {
        const validID = RegExp('^[a-zA-Z0-9]+$');
        if (!validID.test(id.toString())) {
            throw new Error('Invalid id');
        }
        else {
            return new RessourceID(id);
        }
    }
}
exports.default = RessourceID;
