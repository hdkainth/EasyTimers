import {View, FlatList, Text} from "react-native";
import Timer from "./timer";
import React from "react";

class TimerList {
  constructor() {
    this.timerList = [
      { name: "Timer Number ", timer: new Timer(), key: 1},
      { name: "Timer Number ", timer: new Timer(0, 10, 30), key: 2},
      { name: "Timer Number ", timer: new Timer(5, 0, 0), key: 3 }
    ]
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