"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
class Utils {
    static uuid() {
        var i, random;
        var uuid = '';
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
                .toString(16);
        }
        return uuid;
    }
    static pluralize(count, word) {
        return count === 1 ? word : word + 's';
    }
    static async store(namespace, data) {
        if (data) {
            console.log(data);
            return fetch(`/todo/${namespace}`, { method: 'POST', body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
        }
        var store = await fetch(`/todo/${namespace}`, { method: 'GET' });
        if (store != undefined) {
            var result = await store.json();
            console.log(result);
            return result;
        }
        return [];
    }
    static extend(...objs) {
        var newObj = {};
        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = obj[key];
                }
            }
        }
        return newObj;
    }
}
exports.Utils = Utils;
