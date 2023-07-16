import React, {Component} from 'react'
import {View, Button} from 'react-native'
import AddSequence from "./add_sequence";



class EditSequence extends Component {
  constructor(props) {
    super(props);

    this.control = props.control
    this.handleOnPressBackRef = this.handleOnPressBack.bind(this)
  }

  handleOnPressBack() {
    console.log("Pressed back key")
    this.control('editSequence', false)
  }

  render() {
    //console.log(this.props.item.item.timer)
    //this.props.item.item.timer.timerList.forEach(thisTimer => console.log(thisTimer.name))
    return (
      <View>
        {this.props.item.item.timer.printTimerList()}
        <View style={{padding: 10}}>
          <Button title="Back" onPress={this.handleOnPressBackRef}/>
        </View>
      </View>
    )
  }
}

export default EditSequence
