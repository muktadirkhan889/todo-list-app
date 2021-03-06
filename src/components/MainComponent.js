import React from 'react'
import shortid from 'shortid'
import TodoItem from './TodoItem';
import ButtonTabComponent from './ButtonTabComponent'

class AddComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            todoText: '',
            todoList: [],
            filterTodo: 'all'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleCrossClick = this.handleCrossClick.bind(this);
        this.handleTodoItemClick = this.handleTodoItemClick.bind(this);
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
        this.handleAllButtonClick = this.handleAllButtonClick.bind(this);
        this.handleDoneButtonClick = this.handleDoneButtonClick.bind(this);
        this.handlePendingButtonClick = this.handlePendingButtonClick.bind(this);

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
            if (prevState.todoText.trim() !== '') {
                return {
                    todoText: '',
                    todoList: [{
                        text: prevState.todoText.trim(),
                        id: shortid.generate(),
                        done: false
                    }, ...prevState.todoList]
                }
            }
        })
    }

    handleEnterKeyPress(e) {
        if (e.key === 'Enter') {
            this.handleClick();
        }
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

    handleAllButtonClick() {
        this.setState({ filterTodo: "all" })
    }
    handlePendingButtonClick() {
        this.setState({ filterTodo: "pending" })
    }
    handleDoneButtonClick() {
        this.setState({ filterTodo: "done" })
    }

    componentDidMount() {
        const json = localStorage.getItem('todos');
        const todos = JSON.parse(json)
        this.setState(todos);
    }

    componentDidUpdate(prevProps, prevStates) {
        const json = JSON.stringify(this.state);
        localStorage.setItem('todos', json);
    }

    render() {
        const filteredTodos = this.state.todoList.filter(todo => {
            if (this.state.filterTodo === "all") {
                return true;
            } else if (this.state.filterTodo === "done" && todo.done === true) {
                return true;
            } else if (this.state.filterTodo === "pending" && todo.done === false) {
                return true;
            } return false;
        })
        const todos = filteredTodos.map((todo) => {
            return (
                <TodoItem key={todo.id} id={todo.id} value={todo.text} done={todo.done} clickCrossButton={this.handleCrossClick} clickTodo={this.handleTodoItemClick}>{todo.text}</TodoItem>
            )
        })

        return (
            <div>

                {/* Add Todos */}
                <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-sm-9">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Add a Todo"
                                maxLength="30"
                                onChange={this.handleChange}
                                onKeyPress={this.handleEnterKeyPress}
                                value={this.state.todoText}
                            />
                        </div>
                    </div>

                    {/* Todo Add Button */}
                    <div className="col-sm-3">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={this.handleClick}
                        >Add
                        </button>
                    </div>
                </div>

                {/* Buttons for All, Done, Pending */}
                <div style={{ marginBottom: "20px" }}>
                    {
                        this.state.todoList.length > 0
                        &&
                        <ButtonTabComponent
                            name="All"
                            number={this.state.todoList.length}
                            buttonType="all"
                            click={this.handleAllButtonClick}
                        />
                    }

                    {
                        this.state.todoList.filter(todo => todo.done).length > 0
                        &&
                        <ButtonTabComponent
                            name="Done"
                            number={this.state.todoList.filter(todo => todo.done).length}
                            buttonType="done"
                            click={this.handleDoneButtonClick}
                        />
                    }

                    {
                        this.state.todoList.filter(todo => !todo.done).length > 0
                        &&
                        <ButtonTabComponent
                            name="Pending"
                            number={this.state.todoList.filter(todo => !todo.done).length}
                            buttonType="pending"
                            click={this.handlePendingButtonClick}
                        />
                    }
                </div>


                {/* Todo Items */}
                <div>
                    {todos}
                </div>

            </div>
        )
    }
}

export default AddComponent