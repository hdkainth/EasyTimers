import React, {Component} from 'react'
import {ScrollView, View, FlatList, Text, TouchableOpacity, Image} from "react-native";
import TimerView from './components/TimerView';
import {timerSeqListStyle} from "./css/main";

class TimerList extends Component {
  constructor(props) {
    super(props)

    this.timerList = []

    this.editTimerRef = this.editTimer.bind(this)
    this.deleteTimerRef = this.deleteTimer.bind(this)
    // this.handleTimerLeftSwipeRef = this.handleTimerLeftSwipe.bind(this)
    // this.handleTimerRightSwipeRef = this.handleTimerRightSwipe.bind(this)
    this.changeTimerValuesRef = this.changeTimerValues.bind(this)
    this.timerCompleteNotifyRef = this.timerCompleteNotify.bind(this)
    this.refreshHandler = undefined
    this.editTimerHandler = undefined

    this.timerToEdit = undefined
    this.activeTimer = undefined
  }

  addTimer(timer) {
    this.timerList.push(timer)
    timer.key = this.timerList.length
    if (this.refreshHandler != undefined) {
      this.refreshHandler()
    }
  }

  editTimer(item) {
    console.log("Pressed edit timer for index " + item.index + " key " + item.item.key)
    this.timerToEdit = item
    this.editTimerHandler()
  }

  changeTimerValues(values) {
    this.timerToEdit.item.name = values.name

    this.timerToEdit.item.hh = values.hour.split(" ").join("")
    this.timerToEdit.item.mm = values.min.split(" ").join("")
    this.timerToEdit.item.ss = values.sec.split(" ").join("")

  }

  deleteTimer(timerRef) {
    index = this.timerList.indexOf(timerRef)
    console.log("Pressed delete timer for index " + index)
    this.timerList.splice(index, 1)
    if (this.refreshHandler != undefined) {
      this.refreshHandler()
    }
  }

  playList() {
    this.activeTimer = 0
    if (this.activeTimer < this.timerList.length) {
      this.timerList[this.activeTimer].startTimer(this.timerCompleteNotifyRef)
    }
  }

  timerCompleteNotify() {
    this.activeTimer = this.activeTimer + 1
    if (this.activeTimer == this.timerList.length) {
      this.activeTimer = undefined
    } else {
      this.timerList[this.activeTimer].startTimer(this.timerCompleteNotifyRef)
    }
  }

  setRefreshHandler(refreshHandler) {
    this.refreshHandler = refreshHandler
  }

  setEditTimerHandler(editTimerHandler) {
    this.editTimerHandler = editTimerHandler
  }

  renderItem(item) {
    return <TimerView timer={item.item} notifyDel={this.deleteTimerRef}/>
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: 'white'}}>
        <FlatList data={this.timerList}
          renderItem={(item) => this.renderItem(item)}
          keyExtractor={item => item.key}
        />
      </ScrollView>
    )
  }
}

export default TimerList