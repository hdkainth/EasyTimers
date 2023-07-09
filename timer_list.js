import {View, FlatList, Text} from "react-native";
import Timer from "./timer";
import React from "react";

class TimerList {
  constructor() {
    this.timerList = []
  }

  addTimer(timer) {
    this.timerList.push(timer)
  }

  renderItem = ({ item }) => {return (
    <View>
      <Text style={{fontSize: 25, color: 'green'}}>{item.timer.getTimerString()}</Text>
    </View>)}

  printTimerList() {
    return (
      <View style={{ backgroundColor: 'white', height: '100%'}}>
        <FlatList data={this.timerList} renderItem={this.renderItem} keyExtractor={item => item.key} />
      </View>
    )
  }
}

export default TimerList