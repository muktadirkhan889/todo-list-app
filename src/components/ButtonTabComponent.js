import React from 'react';

class ButtonTabComponent extends React.Component {
    buttonObj = {
        all: "btn btn-primary",
        done: "btn btn-success",
        pending: "btn btn-warning"
    }
    render() {
        return (
            <button type="button" class={this.buttonObj[this.props.buttonType]} style={{ marginRight: "15px" }}>
                {this.props.name} <span class="badge badge-light">{this.props.number}</span>
            </button>
        );
    }
}

export default ButtonTabComponent;