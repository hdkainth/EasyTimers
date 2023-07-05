import React, {Component} from 'react'
import {View} from 'react-native'

class AddTimer extends Component {
  constructor(props) {
    super(props);

    console.log("creating add timer")

    props.control("addTimer", false)
    props.addTimer("Sequence Number new ")

  }

  render () {
    return (
      <View style={{ backgroundColor: 'white', height: '100%'}}>
      </View>
    )
  }
}

export default AddTimer

