import React, { Component } from 'react';
import Letter from './Letter';
let c=0;

class Solution extends Component {
    // no need app handle with the state already
    // constructor(){
    //     super()
    //     this.state= {
    //         word:"HAPPY",
    //         hint:"a very good mood"
    //     }
    // }

    generateLetterTags() {
        return this.props.word.split("").map(l =>{
            return (<Letter 
            key={c++} 
            className="solutionLetter" 
            letter={this.props.letterStatus[l] ? l: "_ "} />)
        })
    }

    render() {   
        return (
            <div>
            <div>Word:{this.generateLetterTags()}</div>
            <div>Hint:{this.props.hint}</div>
            </div>
        );
    }
}


export default Solution;