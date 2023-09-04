import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

class Header extends Component {

  static PLUS_MODE_ADD_SEQ = 0
  static PLUS_MODE_ADD_TIMER = 1

  constructor(props) {
    super(props);
    console.log("Created Header component")
    console.log(props)

    this.plusMode = undefined
    this.handleOnPressRef = this.handleOnPress.bind(this)
  }

  handleOnPress() {
    console.log("Pressed key")
    if (this.plusMode == undefined) {
      console.log("Warning: No valid mode set")
    } else if (this.plusMode == Header.PLUS_MODE_ADD_SEQ) {
      this.props.control("addSequence", true)
    } else if (this.plusMode == Header.PLUS_MODE_ADD_TIMER) {
      this.props.control("addTimer", true)
    } else {
      console.log("Warning: Invalid mode set")
    }
  }

  setPlusMode(mode) {
    console.log("Header setting mode to " + mode)
    this.plusMode = mode
  }

  render() {
    console.log("Rendering Header component")
    return (
      <View style={styles.header}>
        <Text style={styles.text}>EasyTimers </Text>
        <TouchableOpacity style={{height: '100%'}} onPress={this.handleOnPressRef}>
          <Image style={{height: '100%', aspectRatio: 1}} source={require('../assets/add_plus_sign.jpg')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-between",
    backgroundColor: "purple",
    paddingTop: 35,
    paddingBottom: 10,
    paddingRight: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 15,
  },
});