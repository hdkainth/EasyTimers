import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

class Header extends Component {
  constructor(props) {
    super(props);
    console.log("Created Header component")
    console.log(props)

    this.control = props.control

    this.handleOnPressRef = this.handleOnPress.bind(this)
  }

  handleOnPress() {
    console.log("Pressed key")
    this.control("addTimer", true)
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