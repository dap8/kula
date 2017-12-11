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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    position: 'absolute',
    zIndex: 1,
  },
  icon: {
    color: '#ffffff',
    fontSize: 36,
  },
  split: {
    borderBottomColor: 'black',
    borderBottomWidth: height,
    width: 2,
    zIndex: 0,
  },
  zoom: {
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    zIndex: 1,
    color: '#ffffff',
    fontSize: 40,
    position: 'absolute',
    paddingLeft: width / 1.5,
    paddingBottom: 20,
  },
});

const DEFAULT_ZOOM = 12; // Does not equal a zoom of 1.2
export default class Recorder extends Component {
  constructor() {
    super();
    this.state = { zoom: DEFAULT_ZOOM };
    //console.log(this.camera);
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
    //options.location = ...
    console.log(this.camera.props.onZoomChanged);

    this.camera.getZoom({ metadata: {} })
      .then(data => console.log(data))
      .catch(err => console.error(err));
    /* this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err)); */
  }

  updateZoom() {
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
          onPress={() => { console.log('pressed'); this.updateZoom(); }}
        >
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            style={styles.preview}
            aspect={Camera.constants.Aspect.fill}>
            <Text style={styles.zoom}>{this.state.zoom}x</Text>
            <TouchableOpacity
              style={styles.capture}
              onPress={this.takePicture.bind(this)}
            >
              <Text>
                <FontAwesome style={styles.icon}>{Icons.camera}</FontAwesome>
              </Text>
            </TouchableOpacity>
            
            <View style={styles.split} >
            </View>
          </Camera>
          </TouchableWithoutFeedback>
      </View>
    );
  }
}

