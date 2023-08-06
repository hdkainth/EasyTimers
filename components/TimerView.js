import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text'

class TimerView extends Component {

  static activeSwipeRef = undefined

  constructor(props) {
    super(props);

    this.state = {
      timerUpdated: false
    }

    this.swipeRef = React.createRef()

    this.notifySwipeActivityRef = this.notifySwipeActivity.bind(this)
    this.editTimerViewRef = this.editTimerView.bind(this)
    this.deleteTimerViewRef = this.deleteTimerView.bind(this)
    this.editTimerRef = this.editTimer.bind(this)
    this.deleteTimerRef = this.deleteTimer.bind(this)
  }

  componentDidMount() {
    this.props.timer.timerViewRef = this
  }

  componentWillUnmount() {
    this.props.timer.cancelTimer()
    this.props.timer.timerViewRef = undefined
  }

  notifyValueUpdate() {
    this.setState({timerUpdated: true})
  }

  changeValues(values) {
    this.timerToEdit.name = values.name

    this.hh = values.hour.split(" ").join("")
    this.mm = values.min.split(" ").join("")
    this.ss = values.sec.split(" ").join("")

    this.setState({timerUpdated: true})
  }

  notifySwipeActivity(state) {
    console.log("Timer - notifySwipeActivity: " + state + " prevRef " + TimerView.activeSwipeRef + " curRef " + this.swipeRef)
    if (state) {
      if ((TimerView.activeSwipeRef != undefined) && (TimerView.activeSwipeRef.current != this.swipeRef.current)) {
        TimerView.activeSwipeRef.current.close()
      }
      TimerView.activeSwipeRef = this.swipeRef
    }
  }

  editTimer() {
    console.log("Invoking EditTimer for " + this.props.timer.name)
    this.swipeRef.current.close()
    this.props.notifyEdit(this.props.timer)
  }

  deleteTimer() {
    console.log("Invoking DeleteTimer for " + this.props.timer.name)
    TimerView.activeSwipeRef = undefined
    this.props.notifyDel(this.props.timer)
  }

  editTimerView() {
    if (this.props.notifyEdit != undefined) {
      return (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => this.editTimerRef()}>
            <Image style={{height: '60%', aspectRatio: 1, margin: 10}} source={require('../assets/edit_icon.png')}/>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <View />
    }
  }

  deleteTimerView() {
    if (this.props.notifyDel != undefined) {
      return (
        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => this.deleteTimerRef()}>
            <Image style={{height: '90%', aspectRatio: 1, margin: 0}} source={require('../assets/trash_icon.jpg')}/>
          </TouchableOpacity>
        </View>
      )
    } else {
      return <View />
    }
  }

  render() {
    this.state.timerUpdated = false
    return (
      <View style={{height: 100, width: '100%', borderColor: 'black', borderWidth: 2, margin:10}}>
        <GestureHandlerRootView style={{borderStyle: 'solid', margin: 0, padding: 0, borderWidth: 1}}>
          <Swipeable ref={this.swipeRef}
            onSwipeableOpen={() => this.notifySwipeActivityRef(true)} onSwipeableClose={() => this.notifySwipeActivityRef(false)}
            renderLeftActions={this.editTimerViewRef} renderRightActions={this.deleteTimerViewRef}
          >
            <TouchableOpacity>
              <View style={{ height: 40, width: '100%'}}>
                <AutoSizeText style={{ color: 'black', alignSelf: 'flex-start' }} mode={ResizeTextMode.group}>
                  {this.props.timer.name}
                </AutoSizeText>
              </View>
              <View style={{ height: 50, width: '100%'}}>
                <AutoSizeText style={{ color: 'green', alignSelf: 'flex-start'}} mode={ResizeTextMode.group}>
                {this.props.timer.getTimeString()}
                </AutoSizeText>
              </View>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      </View>)
  }

}

export default TimerView;
