import React, {Component} from 'react'
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import {View, FlatList, Text, Image, TouchableOpacity} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Header from './Header';
import AddSequence from './add_sequence';
import Timer from "../timer";
import TimerList from "../timer_list";
import EditSequence from "./edit_sequence";
import { mainStyle, timerSeqListStyle } from '../css/main';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addSequence: false,
      sequenceDeleted: false,
      editSequence: false
    }

    this.editSequenceItem = undefined
    this.updateControlRef = this.updateControl.bind(this)
    this.addSequenceRef = this.addSequence.bind(this)
    this.handleSeqPressRef = this.handleSeqPress.bind(this)
    this.handleSeqLeftSwipeRef = this.handleSeqLeftSwipe.bind(this)
    this.handleSeqRightSwipeRef = this.handleSeqRightSwipe.bind(this)
    this.editSequenceRef = this.editSequence.bind(this)
    this.deleteSequenceRef = this.deleteSequence.bind(this)

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

  editSequence(item) {
    console.log("Edit Sequence Button Pressed! for index " + item.index + " key " + item.item.key)
    this.editSequenceItem = item
    this.setState({
        editSequence: true
      }
    )
  }

  deleteSequence(item) {
    console.log("Delete Sequence Button Pressed! for index " + item.index + " key " + item.item.key)
    this.sequenceList.splice(item.index, 1)
    this.setState({
        sequenceDeleted: true
      }
    )
  }

  addSequence(seqName) {
    let newSequence = { name: seqName, timer: new TimerList(), key: this.sequenceList.length + 1}
    console.log(newSequence)
    this.sequenceList.push(newSequence)
  }

  handleSeqLeftSwipe(item) {
    // console.log("Swipe left! for seq index " + item.index + " key " + item.item.key)
    return (
      <View>
        <TouchableOpacity onPress={() => this.editSequenceRef(item)}>
          <Image style={{height: 20, aspectRatio: 1, marginRight: 5}} source={require('../assets/edit_icon.png')}/>
        </TouchableOpacity>
      </View>
    )
  }
  handleSeqRightSwipe(item) {
    // console.log("Swipe right! for seq index " + item.index + " key " + item.item.key)
    return (
      <View>
        <TouchableOpacity onPress={() => this.deleteSequenceRef(item)}>
          <Image style={{height: 30, aspectRatio: 1}} source={require('../assets/trash_icon.jpg')}/>
        </TouchableOpacity>
      </View>
    )
  }
  handleSeqPress(item) {
    console.log("Pressed! for seq index " + item.index + " key " + item.item.key)
  }

  render () {

    function renderTimerSeq(item, pressHandler, swipeLeftHandler, swipeRightHandler) {
      let timerSeq = item.item
      return (
        <View style={ timerSeqListStyle.timerSeqItem }>
          <GestureHandlerRootView>
            <Swipeable renderLeftActions={() => swipeLeftHandler(item)} renderRightActions={() => swipeRightHandler(item)}>
              <TouchableOpacity onPress={() => pressHandler(item)}>
                <AutoSizeText style={{ color: 'black' }} mode={ResizeTextMode.group}>
                  {timerSeq.name}
                </AutoSizeText>
              </TouchableOpacity>
            </Swipeable>
          </GestureHandlerRootView>
        </View>
      )
    }

    function renderTimerSeqList(timerSeqList, pressHandler, swipeLeftHandler, swipeRightHandler) {
      return (
        <View style={ timerSeqListStyle.container }>
          <FlatList data={timerSeqList} renderItem={(item) => renderTimerSeq(item, pressHandler, swipeLeftHandler, swipeRightHandler)} keyExtractor={item => item.key}/>
        </View>
      )
    }

    let mainRender = <View></View>
    if (this.state.addSequence == true) {
      mainRender =
        <View>
          <AddSequence addSequence={this.addSequenceRef} control={this.updateControlRef}/>
        </View>
    } else if (this.state.editSequence == true) {
      mainRender =
        <View>
          <EditSequence control={this.updateControlRef} item={this.editSequenceItem}/>
        </View>
    } else {
      mainRender = renderTimerSeqList(this.sequenceList, this.handleSeqPressRef, this.handleSeqLeftSwipeRef, this.handleSeqRightSwipeRef)
      this.state.sequenceDeleted = false
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
