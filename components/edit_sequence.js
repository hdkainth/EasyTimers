import React, {Component} from 'react'
import {View, Button, Modal, TextInput} from 'react-native'
import { Formik } from 'formik';
import TimerList from "../timer_list";


class EditSequence extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sequencePopup: false,
      timerPopup: false,
      refresh : false
    }

    this.control = props.control
    this.handleOnPressBackRef = this.handleOnPressBack.bind(this)
    this.handleSequencePopupRef = this.handleSequencePopup.bind(this)
    this.handleSequencePopupCancelRef = this.handleSequencePopupCancel.bind(this)
    this.editSequenceNameRef = this.editSequenceName.bind(this)
    this.refreshSequenceRef = this.refreshSequence.bind(this)
    this.editTimerValuesRef = this.editTimerValues.bind(this)
    this.handleTimerPopupRef = this.handleTimerPopup.bind(this)
    this.handleTimerPopupCancelRef = this.handleTimerPopupCancel.bind(this)


    this.props.item.item.timer.setRefreshHandler(this.refreshSequenceRef)
    this.props.item.item.timer.setEditTimerHandler(this.handleTimerPopupRef)

    this.editBoxBorderColor = {
      hour: 'black',
      min: 'black',
      sec: 'black'
    }
  }

  editSequenceName(newName) {
    console.log("New Name: " + newName)
    this.props.item.item.name = newName
    this.setState({sequencePopup: false})
  }

  editTimerValues(values) {
    this.editBoxBorderColor.hour = 'black';
    this.editBoxBorderColor.min = 'black';
    this.editBoxBorderColor.sec = 'black';
    if (Number.isInteger(parseInt(values.hour)) && Number.isInteger(parseInt(values.min)) && Number.isInteger(parseInt(values.sec))) {
      if ((parseInt(values.min.split(" ").join("")) < 60) && (parseInt(values.min.split(" ").join("")) >= 0) && (parseInt(values.sec) < 60) && (parseInt(values.sec.split(" ").join("")) >= 0)) {
        console.log(values)
        this.props.item.item.timer.changeTimerValuesRef(values)
        this.setState({
          timerPopup: false,
          refresh : true
        })
      } else {
        if ((parseInt(values.min.split(" ").join("")) > 60) || (parseInt(values.min.split(" ").join("")) < 0)) {
          this.editBoxBorderColor.min = 'red';
        }
        if ((parseInt(values.sec.split(" ").join("")) > 60) || (parseInt(values.sec.split(" ").join("")) < 0)) {
          this.editBoxBorderColor.sec = 'red';
        }
        this.setState({
          refresh : true
        })
      }
    } else {
      if (!Number.isInteger(parseInt(values.hour))) {
        this.editBoxBorderColor.hour = 'red';
      }
      if (!Number.isInteger(parseInt(values.min))) {
        this.editBoxBorderColor.min = 'red';
      }
      if (!Number.isInteger(parseInt(values.sec))) {
        this.editBoxBorderColor.sec = 'red';
      }
      this.setState({
        refresh : true
      })
    }





  }

  handleTimerPopupCancel() {
    this.setState({timerPopup: false})
  }

  handleTimerPopup() {
    this.editBoxBorderColor.hour = 'black';
    this.editBoxBorderColor.min = 'black';
    this.editBoxBorderColor.sec = 'black';
    this.setState({timerPopup: true})
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

  refreshSequence() {
    this.setState({
      refresh: true
    })

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
                    <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5, margin: 10}}
                               placeholder='New Sequence Name' onChangeText={props.handleChange('name')} value={props.values.name}/>
                    <Button title="Submit" onPress={props.handleSubmit}/>
                  </View>

                )}
              </Formik>
              <Button title="Cancel" onPress={this.handleSequencePopupCancelRef}/>
            </View>
          </View>
        </Modal>

        <Modal visible={this.state.timerPopup} transparent={true}>
          <View style={{backgroundColor: '#000000aa', flex: 1}}>
            <View style={{backgroundColor: '#ffffff', margin: 50, padding: 40}}>
              <Formik initialValues={{name: '' , hour: '', min: '', sec: ''}} onSubmit={(values) => {this.editTimerValuesRef(values)}}>
                {(props) => (
                  <View style={{marginBottom: 10}}>
                    <TextInput style={{borderWidth: 1, borderColor: 'black', borderRadius: 5, padding: 5, margin: 10}}
                               placeholder='New Timer Name' onChangeText={props.handleChange('name')} value={props.values.name}/>
                    <TextInput style={{borderWidth: 1, borderColor: this.editBoxBorderColor.hour, borderRadius: 5, padding: 5, margin: 10}}
                               placeholder='New Hours Value' onChangeText={props.handleChange('hour')} value={props.values.hour} keyboardType='numeric'/>
                    <TextInput style={{borderWidth: 1, borderColor: this.editBoxBorderColor.min, borderRadius: 5, padding: 5, margin: 10}}
                               placeholder='New Minutes Value' onChangeText={props.handleChange('min')} value={props.values.min} keyboardType='numeric'/>
                    <TextInput style={{borderWidth: 1, borderColor: this.editBoxBorderColor.sec, borderRadius: 5, padding: 5, margin: 10}}
                               placeholder='New Seconds Value' onChangeText={props.handleChange('sec')} value={props.values.sec} keyboardType='numeric'/>
                    <Button title="Submit" onPress={props.handleSubmit}/>
                  </View>
                )}
              </Formik>
              <Button title="Cancel" onPress={this.handleTimerPopupCancelRef}/>
            </View>
          </View>
        </Modal>


        {this.props.item.item.timer.render()}
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
