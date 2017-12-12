/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Camera from 'react-native-camera';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setTimeout } from 'core-js/library/web/timers';

const { width, height } = Dimensions.get('window');

console.log('width is: ', width);
console.log('height is: ', height);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    justifyContent: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  capture: {
    position: 'absolute',
    alignSelf: 'center',
  },
  icon: {
    color: '#ffffff',
    fontSize: 36,
  },
  split: {
    borderBottomColor: 'black',
    borderBottomWidth: height * 3,
    width: 2,
    position: 'absolute',
    alignSelf: 'center',
  },
  zoom: {
    color: '#ffffff',
    fontSize: 40,
    alignSelf: 'center',
    marginLeft: 250,
  },
});

const DEFAULT_ZOOM = 12; // Does not equal a zoom of 1.2
let PINCH_INTERVAL;
export default class Recorder extends Component {
  constructor() {
    super();
    this.state = {
      zoom: DEFAULT_ZOOM,
      pinching: false,
    };
    // this.pinchListener();
  }

  componentDidMount() {
    // Temporary hack until I can figure out at what point native camera instance has been set
    setTimeout(() => { this.camera.setZoom({ metadata: {} }, DEFAULT_ZOOM); }, 800);
  }

  onBarCodeRead(e) {
    console.log('Barcode Found!', 'Type: ' + e.type + '\nData: ' + e.data);
  }

  takePicture() {
    const options = {};
    this.camera.capture({ metadata: options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
/*
  startPinch() {
    console.log('started pinch');
    this.updateZoom();
    PINCH_INTERVAL = setInterval(this.updateZoom.bind(this), 1);
  }

  endPinch() {
    console.log('ended pinch');
    clearInterval(PINCH_INTERVAL);
  }
*/
  updateZoom() {
    console.log('update zoom');
    this.camera.getZoom({ metadata: {} })
      .then((zoom) => {
        if (zoom >= 0) {
          this.setState({ zoom: zoom });
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => this.updateZoom()}
        >
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}
          >
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.capture}
                onPress={this.takePicture.bind(this)}
              >
                <Text>
                  <FontAwesome style={styles.icon}>{Icons.camera}</FontAwesome>
                </Text>
              </TouchableOpacity>
              <View style={styles.split} />
              <Text style={styles.zoom}>{this.state.zoom}x</Text>
            </View>
          </Camera>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

