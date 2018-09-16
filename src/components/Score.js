import React, { Component } from 'react';

class Score extends Component {
    render() {
        return (
            <div className={this.props.className}>{this.props.score}</div>
        );
    }
}

export default Score;
