import {View, FlatList, Text, TouchableOpacity, Image} from "react-native";
import Timer from "./timer";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import React from "react";
import {timerSeqListStyle} from "./css/main";

class TimerList {
  constructor() {
    this.timerList = []

    this.editTimerRef = this.editTimer.bind(this)
    this.deleteTimerRef = this.deleteTimer.bind(this)
    this.handleTimerLeftSwipeRef = this.handleTimerLeftSwipe.bind(this)
    this.handleTimerRightSwipeRef = this.handleTimerRightSwipe.bind(this)
  }

  addTimer(timer) {
    this.timerList.push(timer)
  }

  editTimer(item) {

  }

  deleteTimer(item) {

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

  renderItem = ({ item }) => {
    console.log(item)
    return (
      <View style={{borderStyle: 'solid', margin: 5, padding: 10, borderWidth: 1}}>
        <GestureHandlerRootView>
          <Swipeable renderLeftActions={() => this.handleTimerLeftSwipeRef(item)} renderRightActions={() => this.handleTimerRightSwipeRef(item)}>
            <TouchableOpacity>
              <Text style={{fontSize:20, color: 'black'}}>
                {item.name}: {item.getTimerString()}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      </View>)
  }

  printTimerList() {
    return (
      <View style={{ backgroundColor: 'white'}}>
        <FlatList data={this.timerList} renderItem={this.renderItem} keyExtractor={item => item.key} />
      </View>
    )
  }
}

export default TimerList