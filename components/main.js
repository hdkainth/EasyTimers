import React, {Component} from 'react'
import {View, FlatList, Text} from "react-native";
import Header from './Header';
import AddTimer from './add_timer';
import Timer from "../timer";
import TimerList from "../timer_list";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addTimer: false
    }

    this.updateControlRef = this.updateControl.bind(this)
    this.addTimerRef = this.addTimer.bind(this)

    this.sequenceList = [
      { name: "Sequence Number ", timer: new TimerList(), key: 1 },
      { name: "Sequence Number ", timer: new TimerList(), key: 2 },
      { name: "Sequence Number ", timer: new TimerList(), key: 3 }
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
    let newSequence = { name: seqName, timer: new TimerList(), key: this.sequenceList.length + 1}
    console.log(newSequence)
    this.sequenceList.push(newSequence)
  }

  renderItem = ({ item }) => {return (
    <View style={{padding: 10, borderStyle: 'solid', borderWidth: 1, margin: 5, borderColor: 'black'}}>
      <Text style={{fontSize: 15}}>{item.name}{item.key}</Text>
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
          <FlatList data={this.sequenceList} renderItem={this.renderItem} keyExtractor={item => item.key}/>
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
