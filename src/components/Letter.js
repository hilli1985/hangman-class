import React, { Component } from 'react';

class Letter extends Component {
    selectLetter = () => {
        this.props.selectLetter(this.props.letter);
    } 
    render() {
        let {letter} = this.props;
        return (
            <span id={letter} className={this.props.className} onClick={this.selectLetter}>{letter}</span>
        );
    }
}
export default Letter;