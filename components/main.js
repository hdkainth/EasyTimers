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
      // temp timer in edit mode
      addTimer: false,
      // control switch between main screen and edit sequence screen
      editSequence: false,
      // control switch between main screen and select sequence screen to play timer
      selectSequence: false
    }

    this.headerRef = React.createRef();

    this.sequenceList = new TimerSeqList()
    this.sequenceListViewRef = React.createRef()

    this.editSequenceItem = undefined
    this.selectSequenceItem = undefined
    this.updateControlRef = this.updateControl.bind(this)
    this.editSequenceRef = this.editSequence.bind(this)
    this.selectSequenceRef = this.selectSequence.bind(this)
  }

  componentDidMount() {
    console.log('ComponentDidMount ' + this.headerRef.current)
    this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_SEQ)
  }

  updateControl(key, newValue) {
    console.log("Received update key " + key)
    console.log("Received update value " + newValue)

    if (key == 'editSequence') {
      if (newValue == true) {
        this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_TIMER)
      } else {
        this.headerRef.current.setPlusMode(Header.PLUS_MODE_ADD_SEQ)
      }
    }

    this.setState({
        [key]: newValue
      }
    )
  }

  addSequence(seqName) {
    console.log("Handling adding seq in main " + seqName)
    this.sequenceListViewRef.current.addSequence(seqName)
  }

  editSequence(timerSeqRef) {
    this.editSequenceItem = timerSeqRef
    this.updateControl('editSequence', true)
  }

  selectSequence(timerSeqRef) {
    //console.log("Selecting timerSeq " + JSON.stringify(timerSeqRef))
    this.selectSequenceItem = timerSeqRef
    this.updateControl('selectSequence', true)
  }

  render () {
    if (this.state.addSequence == true) {
      console.log("Adding new sequence")
      this.addSequence("Sequence Number new")
      this.state.addSequence = false;
    }    
    if (this.state.addTimer == true) {
      console.log("Adding new timer" + JSON.stringify(this.editSequenceItem))
      this.editSequenceItem.timerList.addTimer(new Timer())
      this.state.addTimer = false;
    }

    let mainRender = <View></View>
    if (this.state.editSequence == true) {
      mainRender =
        <EditSequence control={this.updateControlRef} timerSeq={this.editSequenceItem}/>
    } else if (this.state.selectSequence == true) {
      mainRender =
        <TimerSeqPlayView control={this.updateControlRef} timerSeq={this.selectSequenceItem}/>
    } else {
      mainRender =
        <TimerSeqListView ref={this.sequenceListViewRef}
          timerSeqList={this.sequenceList}
          notifyEditSeq={this.editSequenceRef}
          notifySelect={this.selectSequenceRef}
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
