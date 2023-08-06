import React, {Component} from 'react'
import {ScrollView, View, FlatList, Text, TouchableOpacity, Image} from "react-native";
import TimerSeqView from './TimerSeqView';
import { timerSeqListStyle } from '../css/main';

class TimerSeqListView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      seqUpdated: false
    }

    this.handleSeqPressRef = this.handleSeqPress.bind(this)
    this.editSequenceRef = this.editSequence.bind(this)
    this.deleteSequenceRef = this.deleteSequence.bind(this)
  }

  addSequence(seqName) {
    console.log("Adding seq " + seqName)
    this.props.timerSeqList.addSequence(seqName)
    this.setState({seqUpdated: true})
  }

  editSequence(timerSeqRef) {
    index = this.props.timerSeqList.getRefIndex(timerSeqRef)
    console.log("Edit Sequence Button Pressed! for index " + index)
    this.props.notifyEditSeq(timerSeqRef)
  }

  deleteSequence(timerSeqRef) {
    this.props.timerSeqList.deleteSequence(timerSeqRef)
    this.setState({seqUpdated: true})
  }

  handleSeqPress(timerSeqRef) {
    index = this.props.timerSeqList.getRefIndex(timerSeqRef)
    console.log("Pressed! for seq index " + index)
    this.props.notifySelect(timerSeqRef)
  }


  renderItem(obj, item) {
    return <TimerSeqView timerSeq={item.item}
              notifyDel={obj.deleteSequenceRef}
              notifyEdit={obj.editSequenceRef}
              notifySelect={obj.handleSeqPressRef}
            />
  }

  render() {
    this.seqUpdated = false
    return (
      <View style={ timerSeqListStyle.container }>
        <FlatList data={this.props.timerSeqList.list} renderItem={(item) => this.renderItem(this, item)} keyExtractor={item => item.key}/>
      </View>
    )
  }
}

export default TimerSeqListView