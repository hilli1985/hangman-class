import React, { Component } from "react";
import Letters from "./components/Letters";
import Score from "./components/Score";
import Solution from "./components/Solution";
import "./App.css";
// import Background from '../public/insideout.jpg';
let words =  [
  {word:"SATISFY",hint:"Awesome mood",secondHint:"Very good mood"},
  {word:"HAPPINESS",hint:"Yellow mood",secondHint:"Look at the background"},
  {word:"FEAR",hint:"Purple mood",secondHint:"Look at the background"},
  {word:"ANGER",hint:"Red mood",secondHint:"Look at the background"},
  {word:"DISGUSTE",hint:"Green mood",secondHint:"Look at the background"},
  {word:"SADNESS",hint:"Blue mood",secondHint:"Look at the background"}];
  let rand = Math.floor((Math.random() * words.length));
  let toShow = false; //hide
  
  
  
  // create an array of letters
  class App extends Component {
    constructor() {
      super();
      this.state = {
        letterStatus: this.generateLetterStatus(),
        score: { value: 100, className: "high-score" },
        word:  words[rand].word,
        hint: words[rand].hint,
        secondHint : words[rand].secondHint
      };
    }
    
    secondHint = ()=>{
      toShow = false;
      alert(this.state.secondHint);
      this.setState({...this.state});
    }
    
    removeLetter = () => {
      let flag = 1;
      toShow = false;
      let newState =  {...this.state};
      let letterStatus = newState.letterStatus;
      Object.keys(letterStatus).map(l=>{
        if(flag&&(!letterStatus[l])&&(!this.state.word.includes(l))){
          letterStatus[l]=true;
          flag = 0;
          console.log(l,this.state.word.includes(l));
        }
    });
    this.setState({...this.state,
      letterStatus:newState.letterStatus,
    });
  }

     
    resetGame = ()=> {
      toShow = false;
      let r = Math.floor((Math.random() * words.length));
      let word = words[r].word;
      let hint = words[r].hint;
      if(words.length>1){
        words.splice(r,1);
      }
      let newState = {...this.state};
      newState.word = word;
      newState.hint = hint;
      newState.score ={value: 100, className: "high-score"};
      newState.letterStatus = this.generateLetterStatus();
      this.setState({...this.state,word:newState.word,
        score:newState.score,
        letterStatus:newState.letterStatus,
        hint:newState.hint
      });
    }
    
    resetLife = ()=> {
      toShow = false; //hide
      let newState = {...this.state};
      newState.score ={value: 100, className: "high-score"};
      newState.letterStatus = this.generateLetterStatus();
      this.setState({...this.state,
        score:newState.score,
        letterStatus:newState.letterStatus
      });
    }
    
    generateLetterStatus() {
      let letterStatus = {};
      for (let i = 65; i < 91; i++) {
        letterStatus[String.fromCharCode(i)] = false;
      }
      return letterStatus;
    }
    
    selectLetter = letter => {
      let state =  { ...this.state}
      let letterStatus = state.letterStatus;
      //let letterStatus = this.state.letterStatus - > never use it like this
      letterStatus[letter] = true;
      //state.word.indexOf(letter) > -1 ? this.updateScore(5): this.updateScore(-20);
      (this.state.word.includes(letter))?this.updateScore(5):this.updateScore(-20);
      this.setState({ letterStatus: letterStatus }); //the right-hand side is the updated object! 
    };
    
    //return new object - just one update the status
    //For each right letter, increase the score by 5
    //For each wrong letter, decrease the score by 20
    updateScore = update => {
      let newScore = { ...this.state.score };
      newScore.value += update;
      if (newScore.value >= 80) {
        toShow = false; //hide
        newScore.className = "high-score";
        this.setState({ ...this.state, score: newScore });
      } else if (newScore.value < 80 && newScore.value > 60) {
        toShow = false; //hide
        newScore.className = "mid-score";
        this.setState({ ...this.state, score: newScore });
      } else if (newScore.value <= 60) {
        toShow = true; //show
        newScore.className = "low-score";
        this.setState({ ...this.state, score: newScore });
      }
    };
    
    isFinishGame = () => {
      for (let letter of this.state.word) {
        if (!this.state.letterStatus[letter]){
          return false
        }
      }
      return true;
    };
    
    showMeLetter = () =>{
      toShow = false;
      let state =  {...this.state}
      let letterStatus = state.letterStatus;
      for (let l of this.state.word) {
        if (!letterStatus[l]){
          letterStatus[l]=true
          this.setState({ ...this.state, letterStatus: letterStatus });
          return;
        }
      }
    }
    
    
    
    render() {
      if (this.state.score.value <= 0) {
        return (
          <div> 
          <div className="game-over"></div>
          <div className="game-over-text">Game-Over!
          <div>The word is:{this.state.word}</div>
          <Score score={this.state.score.value}className={this.state.score.className}/>
          <button onClick={this.resetGame}>Play Again</button>
          <button onClick={this.resetLife} className="button">ResetLife!</button>
          </div>
          </div>
        );
      }
      else if (this.isFinishGame()){
        return (
          <div>
          <div className="success"></div>
          <div className="success-text">You Won! 
          <div>The word is:{this.state.word}</div> 
          <div className="success-text">Awesome</div>  
          <Score score={this.state.score.value}className={this.state.score.className}/>
          <button onClick={this.resetGame}>Play Again!</button>
          </div>
          </div>
        )
      }
      return (
        <div>
        <div className="body"></div>
        <div className="app">
        <div className="high-score">How do you feel? </div>
        <Solution letterStatus={this.state.letterStatus} 
        word={this.state.word} hint={this.state.hint}/>
        <div>
        {toShow && <button onClick={this.showMeLetter} className="button">ShowMeLetter!</button>}
        {toShow && <button onClick={this.removeLetter} className="button">RemoveLetter!</button>}
        {toShow && <button onClick={this.secondHint} className="button">SecondHint!</button>}
        </div>
        <Letters letterStatus={this.state.letterStatus} selectLetter={this.selectLetter}/>
        <Score score={this.state.score.value}className={this.state.score.className}/>
        </div>
        </div>
      );
    } 
  }
  export default App;
  