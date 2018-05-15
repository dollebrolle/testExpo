import React from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import Button from './components/Button';
import { ImageManipulator } from 'expo';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.rotateImage = this.rotateImage.bind(this);
    this.switchImage = this.switchImage.bind(this);
    this.scaleImage = this.scaleImage.bind(this);
  }

  componentWillMount(){
    this.rotateAnimatedValue = new Animated.Value(0);
    this.rotateValue = 0.25;
    this.rotateAnimatedValue.addListener(({ value }) => {
      this.rotateValue = value + 0.25;
    })
    this.switchAnimatedValue = new Animated.Value(0);
    this.switchValue = 0.5;
    this.switchAnimatedValue.addListener(({ value }) => {
      this.switchValue = value + 0.5;
    })
    this.scaleAnimatedValue = new Animated.Value(1);
    this.scaleValue = 0.5;
    this.scaleAnimatedValue.addListener(({ value }) => {

      if (this.scaleValue >= 1){
        this.scaleValue = 0.5;
      }else{
        this.scaleValue = value + 0.5;
      }
    })
  }

  rotateImage(){
    Animated.timing(this.rotateAnimatedValue, {
      toValue: this.rotateValue,
      duration:500
    }).start()
  }

  switchImage(){
    Animated.timing(this.switchAnimatedValue, {
      toValue:this.switchValue,
      duration:500
    }).start()
  }

  scaleImage(){
    Animated.timing(this.scaleAnimatedValue, {
      toValue: this.scaleValue
    }).start()
  }

  render() {
    const interpolateRotation = this.rotateAnimatedValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', '360deg'],
    })

    const interpolateSwitch = this.switchAnimatedValue.interpolate({
      inputRange: [0,1],
      outputRange: ['0deg', '360deg'],
    })

    const imageStyle = {
      transform: [{ rotate: interpolateRotation }, {rotateY: interpolateSwitch},
      {scale: this.scaleAnimatedValue}]
    }

    return (
      <View style={styles.container}>
        <Animated.Image
        style={[styles.image, imageStyle]}
        source={require('./assets/dog.jpg')}
        />
        <View style={styles.menu}>
        <Button onPress={this.rotateImage} name={'refresh'}>  </Button>
        <Button onPress={this.switchImage} name={'window-restore'}> </Button>
        <Button onPress={this.scaleImage} name={'arrows-v'}> </Button>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menu: {
    height:100,
    width:100,
    flexDirection: 'column'
  },
  image: {
    marginLeft:10,
    borderRadius: 10,
    width: 200,
    height: 200,
  }
});
