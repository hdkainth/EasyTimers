import React, {Component} from 'react'
import {View, FlatList, Text} from "react-native";
import Header from './Header';
import AddTimer from './add_timer';
import Timer from "../timer";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTimer: false
    }

    this.updateControlRef = this.updateControl.bind(this)
    this.addTimerRef = this.addTimer.bind(this)

    this.timerList = [
      { name: "Sequence Number ", timer: new Timer(), key: 1 },
      { name: "Sequence Number ", timer: new Timer(), key: 2 },
      { name: "Sequence Number ", timer: new Timer(), key: 3 }
    ]
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
    let newTimer = { name: seqName, timer: new Timer(), key: this.timerList.length + 1}
    console.log(newTimer)
    this.timerList.push(newTimer)
  }

  renderItem = ({ item }) => {return (
    <View style={{padding: 10, borderStyle: 'solid', borderWidth: 1, margin: 5, borderColor: 'black'}}>
      <Text style={{fontSize: 15}}>{item.name}{item.key}</Text>
      <Text style={{fontSize: 25, color: 'green'}}>{item.timer.getTimerString()}</Text>
    </View>)}

  render () {

    let mainRender = <View></View>
    if (this.state.addTimer == true) {
      mainRender =
        <View>
          <AddTimer addTimer={this.addTimerRef} control={this.updateControlRef}/>
        </View>
    } else {
      mainRender =
        <View style={{ backgroundColor: 'white', height: '100%'}}>
          <FlatList data={this.timerList} renderItem={this.renderItem} keyExtractor={item => item.key} />
        </View>
   }

    return (
      <View style={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
        <View style={{ height: '10%' }}>
          <Header control={this.updateControlRef}/>
        </View>
        <View style={{ height: '100%' }}>
          { mainRender }
        </View>


      </View>
    )
  }
}

export default Main
