"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
const classNames = require("classnames");
const React = require("react");
const ReactDOM = require("react-dom");
const constants_1 = require("./constants");
class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editText: this.props.todo.title };
    }
    handleSubmit(event) {
        var val = this.state.editText.trim();
        if (val) {
            this.props.onSave(val);
            this.setState({ editText: val });
        }
        else {
            this.props.onDestroy();
        }
    }
    handleEdit() {
        this.props.onEdit();
        this.setState({ editText: this.props.todo.title });
    }
    handleKeyDown(event) {
        if (event.keyCode === constants_1.ESCAPE_KEY) {
            this.setState({ editText: this.props.todo.title });
            this.props.onCancel(event);
        }
        else if (event.keyCode === constants_1.ENTER_KEY) {
            this.handleSubmit(event);
        }
    }
    handleChange(event) {
        var input = event.target;
        this.setState({ editText: input.value });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editText !== this.state.editText);
    }
    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) {
            var node = ReactDOM.findDOMNode(this.refs["editField"]);
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }
    render() {
        return (React.createElement("li", { className: classNames({
                completed: this.props.todo.completed,
                editing: this.props.editing
            }) },
            React.createElement("div", { className: "view" },
                React.createElement("input", { className: "toggle", type: "checkbox", checked: this.props.todo.completed, onChange: this.props.onToggle }),
                React.createElement("label", { onDoubleClick: e => this.handleEdit() }, this.props.todo.title),
                React.createElement("button", { className: "destroy", onClick: this.props.onDestroy })),
            React.createElement("input", { ref: "editField", className: "edit", value: this.state.editText, onBlur: e => this.handleSubmit(e), onChange: e => this.handleChange(e), onKeyDown: e => this.handleKeyDown(e) })));
    }
}
exports.TodoItem = TodoItem;
