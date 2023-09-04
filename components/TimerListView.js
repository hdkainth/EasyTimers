import React, {Component} from 'react'
import {ScrollView, View, FlatList, Text, TouchableOpacity, Image} from "react-native";
import TimerView from './TimerView';
import {timerSeqListStyle} from "../css/main";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text'

class TimerListView extends Component {
  constructor(props) {
    super(props)

    if ('notifyEdit' in props) {
      // In edit mode
      this.editTimerRef = this.editTimer.bind(this)
      this.deleteTimerRef = this.deleteTimer.bind(this)
    } else {
      // in select mode
      this.editTimerRef = undefined
      this.deleteTimerRef = undefined
    }

    this.changeTimerValuesRef = this.changeTimerValues.bind(this)
    this.refreshHandler = undefined
    this.editTimerHandler = undefined

    this.timerToEdit = undefined

    this.state = {
      listUpdated: false
    }
  }

  addTimer(timer) {
    this.props.timerList.addTimer(timer)
    this.setState({listUpdated: true})
  }

  deleteTimer(timerRef) {
    this.props.timerList.deleteTimer(timerRef)
    this.setState({listUpdated: true})
  }

  editTimer(timerRef) {
    this.timerToEdit = timerRef
    this.props.notifyEdit()
  }

  changeTimerValues(values) {
    this.timerToEdit.name = values.name

    this.timerToEdit.hh = values.hour.split(" ").join("")
    this.timerToEdit.mm = values.min.split(" ").join("")
    this.timerToEdit.ss = values.sec.split(" ").join("")

    this.setState({listUpdated: true})
  }

  setEditTimerHandler(editTimerHandler) {
    this.editTimerHandler = editTimerHandler
  }

  renderItem(obj, item) {
    return <TimerView timer={item.item} notifyDel={obj.deleteTimerRef} notifyEdit={obj.editTimerRef}/>
  }

  render() {
    this.state.listUpdated = false
    return (
      <View style={{width: '100%', height: '100%'}}>
        <View style={{height: 50, width: '95%', marginLeft: 10}}>
          <AutoSizeText style={{ color: 'black' }} mode={ResizeTextMode.group}>
            {this.props.name}
          </AutoSizeText>
        </View>
        <FlatList data={this.props.timerList.timerList} renderItem={(item) => this.renderItem(this, item)} keyExtractor={item => item.key} />
      </View>
    )
  }
}

export default TimerListView