"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RessourceName {
    constructor(name) {
        this.name = name;
    }
    static create(name) {
        const validName = RegExp('^[a-zA-Z0-9_]+$');
        if (!validName.test(name)) {
            throw new Error('Invalid name');
        }
        else {
            return new RessourceName(name);
        }
    }
}
exports.default = RessourceName;
