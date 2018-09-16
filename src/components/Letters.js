import React, { Component } from 'react';
import Letter from './Letter';

class Letters extends Component {
    generateLetterTags(letterStatus){
          return Object.keys(letterStatus).map(l=>{ //for each key do this
            return (<Letter 
                key={l} 
                letter={l} 
                className={letterStatus[l] ? "selected" : null}
                selectLetter={this.props.selectLetter}/>);
        });
    }    
    render() {
        return (
            <div>
            <div>Available Letters</div>
            {this.generateLetterTags(this.props.letterStatus)}
            </div>
        );
    }
}

export default Letters;