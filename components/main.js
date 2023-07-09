import React, {Component} from 'react'
import {View, FlatList} from "react-native";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import Header from './Header';
import AddTimer from './add_timer';
import Timer from "../timer";
import TimerList from "../timer_list";
import { mainStyle, timerSeqListStyle } from '../css/main';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTimer: false
    }

    this.updateControlRef = this.updateControl.bind(this)
    this.addTimerRef = this.addTimer.bind(this)

    this.sequenceList = [
      { name: "Short strenching ", timer: new TimerList(), key: 1 },
      { name: "Yoga ", timer: new TimerList(), key: 2 },
      { name: "Gym workout ", timer: new TimerList(), key: 3 }
    ]

    this.sequenceList[0].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Arm stretch"))
    this.sequenceList[0].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 5, name = "Relax"))
    this.sequenceList[0].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Leg stretch"))

    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Child pose"))
    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Cobra pose"))
    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 60, name = "Child pose"))
    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Downward facing dog"))
    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Standing forward bend"))
    this.sequenceList[1].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 45, name = "Bridge pose"))

    this.sequenceList[2].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 30, name = "Push - Barbell bench press"))
    this.sequenceList[2].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 15, name = "Pull - Barbell deadlift"))
    this.sequenceList[2].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 20, name = "Legs. Barbell squats"))
    this.sequenceList[2].timer.addTimer(new Timer(hours = 0, minutes = 0, secs = 10, name = "Push ups"))
  }

  updateControl(key, newValue) {
    console.log("Received update key " + key)
    console.log("Received update value " + newValue)
    this.setState({
        [key]: newValue
      }
    )
  }

  addTimer(seqName) {
    let newSequence = { name: seqName, timer: new TimerList(), key: this.sequenceList.length + 1}
    console.log(newSequence)
    this.sequenceList.push(newSequence)
  }

  render () {

    function renderTimerSeq(timerSeq) {
      item = timerSeq.item
      return (
        <View style={ timerSeqListStyle.timerSeqItem }>
          <AutoSizeText style={{ color: 'black' }} mode={ResizeTextMode.group}>
            {item.name}
          </AutoSizeText>
        </View>
      )
    }

    function renderTimerSeqList(timerSeqList) {
      return(
        <View style={ timerSeqListStyle.container }>
          <FlatList data={timerSeqList} renderItem={(item) => renderTimerSeq(item)} keyExtractor={item => item.key}/>
        </View>
      )
    }

    let mainRender = <View></View>
    if (this.state.addTimer == true) {
      mainRender =
        <View>
          <AddTimer addTimer={this.addTimerRef} control={this.updateControlRef}/>
        </View>
    } else {
      mainRender = renderTimerSeqList(this.sequenceList)
   }

    return (
      <View style={ mainStyle.container }>
        <View style={ mainStyle.headerBox }>
          <Header control={this.updateControlRef}/>
        </View>
        <View style={ mainStyle.mainContentBox }>
          { mainRender }
        </View>
      </View>
    )
  }
}

export default Main
