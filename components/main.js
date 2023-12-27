import React, {Component} from 'react'
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";
import Header from './Header';
import Timer from "../timer";
import TimerList from "../timer_list";
import EditSequence from "./edit_sequence";
import { mainStyle, timerSeqListStyle } from '../css/main';
import TimerSeqView from './TimerSeqView';
import TimerSeqList from '../timer_seq_list';
import TimerSeqListView from './TimerSeqListView';
import TimerSeqPlayView from './TimerSeqPlayView';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // control switch between main screen and edit sequence screen
      editSequence: false,
      // control switch between main screen and play sequence screen to play timer
      playSequence: false,
      // force screen refresh
      refresh: false
    }

    this.headerRef = React.createRef();

    this.sequenceList = new TimerSeqList()
    this.sequenceListViewRef = React.createRef()

    this.editSequenceItem = undefined
    this.playSequenceItem = undefined
    this.updateControlRef = this.updateControl.bind(this)
    this.editSequenceRef = this.editSequence.bind(this)
    this.playSequenceRef = this.playSequence.bind(this)
  }

  componentDidMount() {
    console.log('ComponentDidMount ' + this.headerRef.current)
    this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_SEQ)
  }

  updateControl(key, newValue) {
    console.log("Received update key " + key)
    console.log("Received update value " + newValue)

    if (key == 'addSequence') {
      console.log("Adding new sequence")
      this.addSequence("Sequence Number new")
      key = 'refresh'; newValue = true
    }
    else if (key == 'addTimer') {
      //console.log("Adding new timer" + JSON.stringify(this.editSequenceItem))
      this.addTimer()
      key = 'refresh'; newValue = true
    } else if (key == 'editSequence') {
      if (newValue == true) {
        this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_TIMER)
      } else {
        this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_SEQ)
      }
    }

    console.log("UpdateControl: Setting  " + key + " value: "  + newValue)
    this.setState({
        [key]: newValue
      }
    )
  }

  addSequence(seqName) {
    console.log("Handling adding seq in main " + seqName)
    this.sequenceListViewRef.current.addSequence(seqName)
  }

  addTimer() {
    this.editSequenceItem.timerList.addTimer(new Timer())
  }

  editSequence(timerSeqRef) {
    console.log("Selecting timerSeq to edit " + JSON.stringify(timerSeqRef))
    this.editSequenceItem = timerSeqRef
    this.updateControl('editSequence', true)
  }

  playSequence(timerSeqRef) {
    console.log("Selecting timerSeq to play " + JSON.stringify(timerSeqRef))
    this.playSequenceItem = timerSeqRef
    this.updateControl('playSequence', true)
  }

  render () {
    this.state.refresh = false

    let mainRender = <View></View>
    if (this.state.editSequence == true) {
      mainRender =
        <EditSequence control={this.updateControlRef} timerSeq={this.editSequenceItem}/>
    } else if (this.state.playSequence == true) {
      mainRender =
        <TimerSeqPlayView control={this.updateControlRef} timerSeq={this.playSequenceItem}/>
    } else {
      mainRender =
        <TimerSeqListView ref={this.sequenceListViewRef}
          timerSeqList={this.sequenceList}
          notifyEditSeq={this.editSequenceRef}
          notifySelect={this.playSequenceRef}
        />
    }

    return (
      <View style={ mainStyle.container }>
        <View style={ mainStyle.headerBox }>
          <Header ref={this.headerRef} control={this.updateControlRef}/>
        </View>
        <View style={ mainStyle.mainContentBox }>
          { mainRender }
        </View>
      </View>
    )
  }
}

export default Main
