"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const todoModel_1 = require("./todoModel");
const footer_1 = require("./footer");
const todoItem_1 = require("./todoItem");
const constants_1 = require("./constants");
class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nowShowing: constants_1.ALL_TODOS,
            editing: null,
            loaded: false
        };
    }
    async componentDidMount() {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, { nowShowing: constants_1.ALL_TODOS }),
            '/active': setState.bind(this, { nowShowing: constants_1.ACTIVE_TODOS }),
            '/completed': setState.bind(this, { nowShowing: constants_1.COMPLETED_TODOS })
        });
        router.init('/');
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("Start");
        console.log(nextProps);
        console.log(this.props);
        console.log(nextState);
        console.log(this.state);
        console.log("END");
        return true;
    }
    handleNewTodoKeyDown(event) {
        if (event.keyCode !== constants_1.ENTER_KEY) {
            return;
        }
        event.preventDefault();
        var val = ReactDOM.findDOMNode(this.refs["newField"]).value.trim();
        if (val) {
            this.props.model.addTodo(val);
            ReactDOM.findDOMNode(this.refs["newField"]).value = '';
        }
    }
    toggleAll(event) {
        var target = event.target;
        var checked = target.checked;
        this.props.model.toggleAll(checked);
    }
    toggle(todoToToggle) {
        this.props.model.toggle(todoToToggle);
    }
    destroy(todo) {
        this.props.model.destroy(todo);
    }
    edit(todo) {
        this.setState({ editing: todo.id });
    }
    save(todoToSave, text) {
        this.props.model.save(todoToSave, text);
        this.setState({ editing: null });
    }
    cancel() {
        this.setState({ editing: null });
    }
    clearCompleted() {
        this.props.model.clearCompleted();
    }
    render() {
        var footer;
        var main;
        const todos = this.props.model.todos;
        console.log("On Render");
        console.log(this.props.model);
        console.log(this.props.model.todos);
        console.log(todos);
        var shownTodos = todos.filter((todo) => {
            console.log(todo);
            switch (this.state.nowShowing) {
                case constants_1.ACTIVE_TODOS:
                    console.log("default");
                    return !todo.completed;
                case constants_1.COMPLETED_TODOS:
                    return todo.completed;
                default:
                    console.log("default");
                    return true;
            }
        });
        console.log(shownTodos);
        var todoItems = shownTodos.map((todo) => {
            return (React.createElement(todoItem_1.TodoItem, { key: todo.id, todo: todo, onToggle: this.toggle.bind(this, todo), onDestroy: this.destroy.bind(this, todo), onEdit: this.edit.bind(this, todo), editing: this.state.editing === todo.id, onSave: this.save.bind(this, todo), onCancel: e => this.cancel() }));
        });
        var activeTodoCount = todos.reduce(function (accum, todo) {
            return todo.completed ? accum : accum + 1;
        }, 0);
        var completedCount = todos.length - activeTodoCount;
        if (activeTodoCount || completedCount) {
            footer =
                React.createElement(footer_1.TodoFooter, { count: activeTodoCount, completedCount: completedCount, nowShowing: this.state.nowShowing, onClearCompleted: e => this.clearCompleted() });
        }
        if (todos.length) {
            main = (React.createElement("section", { className: "main" },
                React.createElement("input", { id: "toggle-all", className: "toggle-all", type: "checkbox", onChange: e => this.toggleAll(e), checked: activeTodoCount === 0 }),
                React.createElement("label", { htmlFor: "toggle-all" }, "Mark all as complete"),
                React.createElement("ul", { className: "todo-list" }, todoItems)));
        }
        return (React.createElement("div", null,
            React.createElement("header", { className: "header" },
                React.createElement("h1", null, "todos"),
                React.createElement("input", { ref: "newField", className: "new-todo", placeholder: "What needs to be done?", onKeyDown: e => this.handleNewTodoKeyDown(e), autoFocus: true })),
            main,
            footer));
    }
}
var model = new todoModel_1.TodoModel('react-todos');
function render() {
    ReactDOM.render(React.createElement(TodoApp, { model: model }), document.getElementsByClassName('todoapp')[0]);
}
model.subscribe(render);
render();
