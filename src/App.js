import React, { Component } from 'react';
import io from 'socket.io-client';
import { Container, Header, Input, Button, Label, Icon } from 'semantic-ui-react';
const socket = io.connect('http://localhost:4000');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { countdown: null }
    this.subscribeToTimer(data => this.setState({ countdown: data.countdown }))
    this.subscribeToTimer = this.subscribeToTimer.bind(this)
    this.setTimer = this.setTimer.bind(this)
  }
  subscribeToTimer(cb) {
    socket.on('timer', data => cb(data))
  }
  setTimer() {
    socket.emit('settimer', { time: this.state.newTime })
  }
  startStop(bool) {
    //takes bool
    socket.emit('event', { status: bool })
  }
  //TODO: add start stop buttons, fix color scheme
  render() {
    return (
      <div className="App" style={{ padding: 0 }}>
        <div style={{ height: "200px", backgroundColor: "rgb(3, 169, 244)" }}></div>
        <div style={{ backgroundColor: "rgb(225, 245, 254)", minHeight: "calc(100vh - 200px)", position: "relative" }}>
          <Container style={{ backgroundColor: "#fff", boxShadow: "2px 2px 2px #aaa", minHeight: "400px", position: "absolute", top: "-100px", left: 0, right: 0, margin: "auto", padding: "2em", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, backgroundColor: "rgb(128, 216, 255)", height: "8px", width: "100%" }} ></div>
            <Header as='h2'>
              Socket countdown timer app !
          </Header>
            <hr />
            <h1 style={{ fontSize: "36px", letterSpacing: ".5em" }}>{this.state.countdown}</h1>
            <Label pointing ><Icon name='wait' />timer</Label>
            <Button onClick={_ => this.startStop(false)}>Stop</Button>
            <Button onClick={_ => this.startStop(true)}>Start</Button>
            <br />
            <br />
            <Input type="number" onChange={e => this.setState({ newTime: e.target.value })} />
            <Button onClick={this.setTimer}>set timer</Button>
            <br />
            <br />
            <p style={{ position: "absolute", bottom: "10px", left: 0, right: 0 }}>This app was created using <a href="https://www.npmjs.com/package/socket.io">socket.io</a> and <a href="https://www.npmjs.com/package/socket.io-client">socket.io-client</a>. It was styled using <a href="https://react.semantic-ui.com/introduction">Semantic-UI</a>.</p>
          </Container>
        </div>
      </div >
    );
  }
}

export default App;


