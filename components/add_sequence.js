import React, {Component} from 'react'
import {View} from 'react-native'

class AddSequence extends Component {
  constructor(props) {
    super(props);

    console.log("creating add timer")

    props.control("addSequence", false)
    props.addSequence("Sequence Number new ")

  }

  render () {
    return (
      <View style={{ backgroundColor: 'white', height: '100%'}}>
      </View>
    )
  }
}

export default AddSequence

