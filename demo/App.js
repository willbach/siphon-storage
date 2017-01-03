import React from 'react';

const io = require('socket.io-client');
const socket = io.connect();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suc: 0,
      err: 0,
      initial: true
    }
  }

  componentWillMount() {
    var that = this;
    socket.on('requests', (data) => {
      if(that.state.initial) {
        console.log('got an update', data);
        var suc = Number(that.state.suc) + Number(data.suc);
        var err = Number(that.state.err) + Number(data.err);
        that.setState({suc: suc, err: err});
      }
    });
  }

  render() {
    let sucHeight = (this.state.suc/120).toString()+"px";
    let errHeight = (this.state.err/20).toString()+"px";

    return (
      <div style={{height: "430px", width: "250px", flexDirection: 'row', display: 'flex'}}>

        <div style={{height:"430px", width: "150px", position: "relative"}}>
          <div style={{backgroundColor: 'green', color: 'white', fontSize: "20px", width: "60px", marginLeft: "50px", height: sucHeight, position: "absolute", bottom: "38px"}}>{this.state.suc}</div>
          <div style={{width: "150px", position: "absolute", fontSize: "20px", bottom: "0px", color: 'white', backgroundColor: '#b20000', padding: '5px 0px', border: '2px solid black', borderRightWidth: '0px'}}>Successes</div>
        </div>

        <div style={{height:"430px", width: "100px", position: "relative"}}>
          <div style={{backgroundColor: 'red', color: 'white', width: "60px", fontSize: "20px", marginLeft: "20px", height: errHeight, position: "absolute", bottom: "38px"}}>{this.state.err}</div>
          <div style={{width: "100px", position: "absolute", fontSize: "20px", bottom: "0px", color: 'white', backgroundColor: '#b20000', padding: '5px 0px', border: '2px solid black', borderLeftWidth: '0px'}}>Errors</div>
        </div>

      </div>
    )
  }
}

export default App;