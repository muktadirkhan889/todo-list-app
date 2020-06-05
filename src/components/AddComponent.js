import React from 'react'
import shortid from 'shortid'
import TodoItem from './TodoItem';

class AddComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            todoText: '',
            todoList: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCrossClick = this.handleCrossClick.bind(this);
        this.handleTodoItemClick = this.handleTodoItemClick.bind(this);
    }
    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            return {
                todoText: e.target.value,
                todoList: prevState.todoList
            }
        })
    }
    handleClick() {
        this.setState((prevState) => {
            return {
                todoText: prevState.todoText,
                todoList: [{
                    text: prevState.todoText,
                    id: shortid.generate(),
                    done: false
                }, ...prevState.todoList]
            }
        })
    }
    handleCrossClick(e, id) {
        e.stopPropagation(); //child onClick calls parent onClick solution
        const newState = this.state.todoList.filter(todoL => todoL.id !== id);
        this.setState({ todoList: newState });
    }
    handleTodoItemClick(id) {
        const updatedState = this.state.todoList.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo)
        this.setState({ todoList: updatedState });
    }


    render() {
        const todos = this.state.todoList.map((todo) => {
            return (
                <TodoItem key={todo.id} id={todo.id} value={todo.text} done={todo.done} clickCrossButton={this.handleCrossClick} clickTodo={this.handleTodoItemClick}>{todo.text}</TodoItem>
            )
        })
        return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a Todo"
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={this.handleClick}
                        >Add
                        </button>
                    </div>
                </div>
                <div>
                    {todos}
                </div>
            </div>
        )
    }
}

export default AddComponent