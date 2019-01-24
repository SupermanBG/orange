import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import blocklottery from './blocklottery';
class App extends Component {
   state = {
     manager:'',
     players:[],
     balance:'',
     value:'',
     message:''
   }


  async componentDidMount(){
    const manager = await blocklottery.methods.manager().call();
    const players = await blocklottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(blocklottery.options.address);
     this.setState({manager,players,balance});
  }

onSubmit = async event =>{
  event.preventDefault();
  const accounts = await web3.eth.getAccounts();
  this.setState({message:'等待交易完成...'});
  await blocklottery.methods.enter().send({from:accounts[0],value:web3.utils.toWei(this.state.value,'ether')});
  this.setState({message:'入场成功...'});
}
onClick = async ()=>{
  const accounts = await web3.eth.getAccounts();
  this.setState({messgae:'请等待...'});
  await blocklottery.methods.pickwiner().send({from:accounts[0]});
  this.setState({messgae:'游戏结束，赢家产生'});
}

  render() {
    console.log(web3.version);
    console.log(this.state.value);
    return (

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>管理者地址：</h1>
          <p>this is manager by {this.state.manager}</p>
      <p>当前参与者的数量：{this.state.players.length}</p>
      <p>当前资金量：{web3.utils.fromWei(this.state.balance,'ether')} ether</p>
          <hr/>
          <form onSubmit={this.onSubmit}>
          <h3>参与游戏？</h3>
          <div>
          <label>你想参与的金额：</label>
          <input
          value={this.state.value}
          onChange={event=>{this.setState({value:event.target.value})}}
          />
          </div>
          <hr/>
            <button>提交</button>
          </form>
        </header>
        <hr/>
        <p>{this.state.message}</p>
        <hr/>
        <h3>判断输赢</h3>
        <button onClick = {this.onClick}>开始游戏</button>
      </div>
    );
  }
}

export default App;
