import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textVal:'ここに入力してください',
      doList:[],
      doneList:[]　//index[0]-> 本文(String), index[1]-> checked(Boolean),
    };
  }
  onClick(){
    this.setState({textVal:''});
  }
  hadnleText(e) {
    this.setState({textVal:e.target.value});
  }
  pressEnter(e) {
    if(e.keyCode===13){
      if(this.state.textVal){
        this.state.doList.unshift([e.target.value,false]);
        this.setState({doList:this.state.doList});
        this.setState({textVal:''});
      }
    }
  }
  onCheck(list,e,index){
    if(list==='do'){
      const doList = this.state.doList;
      doList[index][1] = !doList[index][1];
      this.setState({ doList: doList });
      this.addDone(e,index);
    }else if(list==='done'){
      const doneList = this.state.doneList;
      doneList[index][1] = !doneList[index][1];
      this.setState({ doneList: doneList });
      this.addDo(e,index);
    }
  }
  addDo(e,index){
    const idx=e.target.dataset.idx;
    console.log(`index:${idx},checked:${this.state.doneList[index][1]}`);
    this.state.doList.unshift(this.state.doneList[index]);
    this.state.doneList.splice(index,1);
    this.setState({});
  }
  addDone(e,index){
    const idx=e.target.dataset.idx;
    console.log(`index:${idx},checked:${this.state.doList[index][1]}`);
    this.state.doneList.unshift(this.state.doList[index]);
    this.state.doList.splice(index,1);
    this.setState({});
  }
  onTrash(list,e,index){
    if(list==='do'){
      this.state.doList.splice(index,1);
      this.setState({});
    }else if(list==='done'){
      this.state.doneList.splice(index,1);
      this.setState({});
    }
  }
  input(){
    return(
      <input value={this.state.textVal} onChange={(e)=>this.hadnleText(e)} onClick={(e)=>this.onClick(e)} onKeyDown={(e)=>this.pressEnter(e)} className="form border" />
    );
  }
  doList(){
    if(this.state.doList.length>0){
      return(
        <div>
          <h2>DO.</h2>
          <ul>
            {this.state.doList.map((i,index)=>
              <li key={index}>
                <input type="checkbox" data-idx={index} onChange={(e)=>this.onCheck('do',e,index)} checked={this.state.doList[index][1]}/>
                {i}
                <button  data-idx={index} onClick={(e)=>this.onTrash('do',e,index)}>
                  <i className="far fa-trash-alt">&#xf2ed;</i>
                </button>
              </li>
            )}
          </ul>
        </div>
      );
    }else{
      return false;
    }
  }
  doneList(){
    if(this.state.doneList.length>0){
      return(
        <div>
          <h2>DONE.</h2>
          <ul>
            {this.state.doneList.map((i,index)=>
              <li key={index}>
                <input type="checkbox" data-idx={index} onChange={(e)=>this.onCheck('done',e,index)} checked={this.state.doneList[index][1]}/>
                {i}
                <button onClick={(e)=>this.onTrash('done',e,index)}>
                  <i className="far fa-trash-alt">&#xf2ed;</i>
                </button>
              </li>
            )}
          </ul>
        </div>
      );
    }else{
      return false;
    }
  }
  render() {
    return (
      <div>
        <div className="main-window">
          <h1 className="border">TODO LIST.</h1>
          {this.input()}
          {this.doList()}
          {this.doneList()}
        </div>
      </div>
    );
  }

}

export default App;
