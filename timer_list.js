import React, {Component} from 'react'
import {View, FlatList, Text, TouchableOpacity, Image} from "react-native";
import Timer from "./timer";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {timerSeqListStyle} from "./css/main";

class TimerList extends Component {
  constructor(props) {
    super(props)

    this.timerList = []

    this.editTimerRef = this.editTimer.bind(this)
    this.deleteTimerRef = this.deleteTimer.bind(this)
    this.handleTimerLeftSwipeRef = this.handleTimerLeftSwipe.bind(this)
    this.handleTimerRightSwipeRef = this.handleTimerRightSwipe.bind(this)
    this.changeTimerValuesRef = this.changeTimerValues.bind(this)
    this.refreshHandler = undefined
    this.editTimerHandler = undefined

    this.timerToEdit = undefined
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

  deleteTimer(item) {
    console.log("Pressed delete timer for index " + item.index + " key " + item.item.key)
    this.timerList.splice(item.index, 1)
    if (this.refreshHandler != undefined) {
      this.refreshHandler()
    }
  }

  setRefreshHandler(refreshHandler) {
    this.refreshHandler = refreshHandler
  }

  setEditTimerHandler(editTimerHandler) {
    this.editTimerHandler = editTimerHandler
  }

  handleTimerLeftSwipe(item) {
    // console.log("Swipe left! for seq index " + item.index + " key " + item.item.key)
    return (
      <View>
        <TouchableOpacity onPress={() => this.editTimerRef(item)}>
          <Image style={{height: 20, aspectRatio: 1, marginRight: 5}} source={require('./assets/edit_icon.png')}/>
        </TouchableOpacity>
      </View>
    )
  }

  handleTimerRightSwipe(item) {
    // console.log("Swipe right! for seq index " + item.index + " key " + item.item.key)
    return (
      <View>
        <TouchableOpacity onPress={() => this.deleteTimerRef(item)}>
          <Image style={{height: 30, aspectRatio: 1}} source={require('./assets/trash_icon.jpg')}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderItem(item, handleLeftSwipe, handleRightSwipe) {
    //console.log(item)
    return (
      <View style={{borderStyle: 'solid', margin: 5, padding: 10, borderWidth: 1}}>
        <GestureHandlerRootView>
          <Swipeable renderLeftActions={() => handleLeftSwipe(item)} renderRightActions={() => handleRightSwipe(item)}>
            <TouchableOpacity>
              <Text style={{fontSize:20, color: 'black'}}>
                {item.item.name}: {item.item.getTimerString()}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      </View>)
  }

  render() {
    return this.printTimerList()
  }

  printTimerList() {
    return (
      <View style={{ backgroundColor: 'white'}}>
        <FlatList data={this.timerList} renderItem={(item) => this.renderItem(item, this.handleTimerLeftSwipeRef, this.handleTimerRightSwipeRef)} keyExtractor={item => item.key} />
      </View>
    )
  }
}

export default TimerList