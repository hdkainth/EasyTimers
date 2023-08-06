import React, {Component} from 'react'
import {View, Button, Modal, TextInput} from 'react-native'
import TimerListView from './TimerListView';

class TimerSeqPlayView extends Component {
  constructor(props) {
    super(props);

    this.terminateRef = this.terminate.bind(this)
    this.playSeqRef = this.playSeq.bind(this)
  }

  terminate() {
    console.log("Pressed back key")
    this.props.control('selectSequence', false)
  }

  playSeq() {
    console.log("Pressed play key")
    this.props.timerSeq.timerList.playList()
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
        <View style={{padding: 5}}>
          <Button title="Play" onPress={this.playSeqRef}/>
        </View>
      </View>
    )
  }
}

export default TimerSeqPlayView
