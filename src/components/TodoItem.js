import React from 'react'

class TodoItem extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div
                className={this.props.done ? 'alert alert-success alert-dismissible fade show' : 'alert alert-secondary alert-dismissible fade show'}
                onClick={() => this.props.clickTodo(this.props.id)
                }>
                {this.props.value}


                <button
                    type="button"
                    className="close"
                    onClick={(e) => this.props.clickCrossButton(e, this.props.id)}
                    data-dismiss="alert">&times;</button>

            </div >
        )
    }
}

export default TodoItem