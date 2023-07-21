import {View, FlatList, Text} from "react-native";
import Timer from "./timer";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import React from "react";

class TimerList {
  constructor() {
    this.timerList = []
  }

  addTimer(timer) {
    this.timerList.push(timer)
  }

  renderItem = ({ item }) => {
    console.log(item)
    return (
    <View>
      <Text style={{fontSize:20, color: 'black', borderStyle: 'solid', margin: 5, padding: 10, borderWidth: 1}}>
        {item.name}: {item.getTimerString()}
      </Text>
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