"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
const utils_1 = require("./utils");
class TodoModel {
    constructor(key) {
        this.key = key;
        this.onChanges = [];
        this.todos = [];
        this.loaded = false;
        this.create(key);
    }
    async create(key) {
        this.todos = await utils_1.Utils.store(key);
        this.loaded = true;
        console.log(this);
        this.onChanges.forEach(function (cb) { cb(); });
    }
    subscribe(onChange) {
        this.onChanges.push(onChange);
    }
    inform() {
        utils_1.Utils.store(this.key, this.todos);
        this.onChanges.forEach(function (cb) { cb(); });
    }
    addTodo(title) {
        console.log(this.todos);
        this.todos = this.todos.concat({
            id: utils_1.Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    }
    toggleAll(checked) {
        this.todos = this.todos.map((todo) => {
            return utils_1.Utils.extend({}, todo, { completed: checked });
        });
        this.inform();
    }
    toggle(todoToToggle) {
        this.todos = this.todos.map((todo) => {
            return todo !== todoToToggle ?
                todo :
                utils_1.Utils.extend({}, todo, { completed: !todo.completed });
        });
        this.inform();
    }
    destroy(todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        });
        this.inform();
    }
    save(todoToSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToSave ? todo : utils_1.Utils.extend({}, todo, { title: text });
        });
        this.inform();
    }
    clearCompleted() {
        this.todos = this.todos.filter(function (todo) {
            return !todo.completed;
        });
        this.inform();
    }
}
exports.TodoModel = TodoModel;
