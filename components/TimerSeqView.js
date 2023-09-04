import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text'
import { timerSeqListStyle } from '../css/main';

class TimerSeqView extends Component {

  static activeSwipeRef = undefined

  constructor(props) {
    super(props);

    this.swipeRef = React.createRef()

    this.notifySwipeActivityRef = this.notifySwipeActivity.bind(this)
    this.editViewRef = this.editView.bind(this)
    this.deleteViewRef = this.deleteView.bind(this)
    this.editRef = this.edit.bind(this)
    this.deleteRef = this.delete.bind(this)
    this.selectRef = this.select.bind(this)
  }

  edit() {
    console.log("Invoking EditSeq for " + this.props.timerSeq.name)
    TimerSeqView.activeSwipeRef = undefined
    this.props.notifyEdit(this.props.timerSeq)
  }

  delete() {
    console.log("Invoking DeleteSeq for " + this.props.timerSeq.name)
    TimerSeqView.activeSwipeRef = undefined
    this.props.notifyDel(this.props.timerSeq)
  }

  select() {
    this.props.notifySelect(this.props.timerSeq)
  }

  editView() {
    return (
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => this.editRef()}>
          <Image style={{height: '80%', aspectRatio: 1, marginRight: 20}} source={require('../assets/edit_icon.png')}/>
        </TouchableOpacity>
      </View>
    )
  }

  deleteView() {
    return (
      <View style={{alignSelf: 'center'}}>
        <TouchableOpacity onPress={() => this.deleteRef()}>
          <Image style={{height: '100%', aspectRatio: 1, marginLeft: 20}} source={require('../assets/trash_icon.jpg')}/>
        </TouchableOpacity>
      </View>
    )
  }

  notifySwipeActivity(state) {
    //console.log("timerSeq - notifySwipeActivity: " + state + " prevRef " + TimerSeqView.activeSwipeRef + " curRef " + this.swipeRef)
    if (state) {
      if ((TimerSeqView.activeSwipeRef != undefined) && (TimerSeqView.activeSwipeRef.current != this.swipeRef.current)) {
        TimerSeqView.activeSwipeRef.current.close()
      }
      TimerSeqView.activeSwipeRef = this.swipeRef
    }
  }

  render() {
    return (
      <View style={ timerSeqListStyle.timerSeqItem }>
        <GestureHandlerRootView style={{borderStyle: 'solid', margin: 0, padding: 0, borderWidth: 1}}>
          <Swipeable ref={this.swipeRef}
            onSwipeableOpen={() => this.notifySwipeActivityRef(true)} onSwipeableClose={() => this.notifySwipeActivityRef(false)}
            renderLeftActions={this.editViewRef} renderRightActions={this.deleteViewRef}
          >
            <TouchableOpacity onPress={this.selectRef}>
              <AutoSizeText style={{ color: 'black' }} mode={ResizeTextMode.group}>
                {this.props.timerSeq.name}
              </AutoSizeText>
            </TouchableOpacity>
          </Swipeable>
        </GestureHandlerRootView>
      </View>
    )
  }

}

export default TimerSeqView;
