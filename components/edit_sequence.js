import React, {Component} from 'react'
import {View, Button, Modal, TextInput} from 'react-native'
import { Formik } from 'formik';


class EditSequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequencePopup: false,
      timerPopup: false
    }

    this.control = props.control
    this.handleOnPressBackRef = this.handleOnPressBack.bind(this)
    this.handleSequencePopupRef = this.handleSequencePopup.bind(this)
    this.handleSequencePopupCancelRef = this.handleSequencePopupCancel.bind(this)
    this.editSequenceNameRef = this.editSequenceName.bind(this)
  }

  editSequenceName(newName) {
    console.log("New Name: " + newName)
    this.props.item.item.name = newName
    this.setState({sequencePopup: false})
  }

  handleSequencePopup() {
    console.log("Pressed Edit Sequence Details")
    this.setState({sequencePopup: true})
    console.log(this.state.sequencePopup)
  }

  handleSequencePopupCancel() {
    this.setState({sequencePopup: false})
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
        <Modal visible={this.state.sequencePopup} transparent={true}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View style={{backgroundColor: '#ffffff', margin: 50, padding: 40}}>
              <Formik initialValues={{name: '' }} onSubmit={(values) => {this.editSequenceNameRef(values.name)}}>
                {(props) => (
                  <View style={{marginBottom: 10}}>
                    <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5}}
                               placeholder='New Sequence Name' onChangeText={props.handleChange('name')} value={props.values.name}/>
                    <Button title="Submit" onPress={props.handleSubmit}/>
                  </View>

                )}
              </Formik>
              <Button title="Cancel" onPress={this.handleSequencePopupCancelRef}/>
            </View>
          </View>
        </Modal>
        {this.props.item.item.timer.printTimerList()}
        <View style={{padding: 10}}>
          <Button title="Back" onPress={this.handleOnPressBackRef}/>
        </View>
        <View style={{padding: 5}}>
          <Button title="Edit Sequence Details" onPress={this.handleSequencePopupRef}/>
        </View>
      </View>
    )
  }
}

export default EditSequence
