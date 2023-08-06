import React, {Component} from 'react'
import {View, Button, Modal, TextInput} from 'react-native'
import TimerListView from './TimerListView';

class TimerSeqPlayView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playActive: false,
      seqPaused: false
    }

    this.terminateRef = this.terminate.bind(this)
    this.playSeqRef = this.playSeq.bind(this)
    this.pauseSeqRef = this.pauseSeq.bind(this)
    this.resumeSeqRef = this.resumeSeq.bind(this)
    this.notifyPlayDoneRef = this.notifyPlayDone.bind(this)
  }

  terminate() {
    console.log("Pressed back key")
    this.props.control('selectSequence', false)
  }

  playSeq() {
    console.log("Pressed play key")
    this.setState({playActive: true})
    this.props.timerSeq.timerList.playList(this.notifyPlayDoneRef)
  }

  pauseSeq() {
    console.log("Pressed pause key")
    this.props.timerSeq.timerList.pauseList()
    this.setState({seqPaused: true})
  }

  resumeSeq() {
    console.log("Pressed resume key")
    this.props.timerSeq.timerList.resumeList()
    this.setState({seqPaused: false})
  }

  notifyPlayDone() {
    this.setState({playActive: false})
  }

  render() {
    return (
      <View>
        <View style={{height: '80%', width: '100%'}}>
          <TimerListView ref={this.timerListViewRef}
            name={this.props.timerSeq.name}
            timerList={this.props.timerSeq.timerList}
          />
        </View>

        <View style={{padding: 10}}>
          <Button title="Back" onPress={this.terminateRef}/>
        </View>
        { (this.state.playActive == false) &&
        <View style={{padding: 5}}>
          <Button title="Play" onPress={this.playSeqRef}/>
        </View>
        }
        { (this.state.playActive == true && this.state.seqPaused == false) &&
        <View style={{padding: 5}}>
          <Button title="Pause" onPress={this.pauseSeqRef}/>
        </View>
        }
        { (this.state.playActive == true && this.state.seqPaused == true) &&
        <View style={{padding: 5}}>
          <Button title="Resume" onPress={this.resumeSeqRef}/>
        </View>
        }
      </View>
    )
  }
}

export default TimerSeqPlayView
