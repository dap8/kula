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
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Camera from 'react-native-camera';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setTimeout } from 'core-js/library/web/timers';

const { height } = Dimensions.get('window');

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

const DEFAULT_ZOOM = 12; // TODO: Find a integer value that equals 1.2x zoom on samsung camera app
export default class Recorder extends Component {
  constructor() {
    super();
    this.state = {
      zoom: DEFAULT_ZOOM,
    };
  }

  componentDidMount() {
    // Temporary hack until I can figure out at what point native camera instance has been set
    setTimeout(() => { this.camera.setZoom({ metadata: {} }, DEFAULT_ZOOM); }, 800);
  }

  onBarCodeRead(e) {
    // Handle barcode read here
  }

  /**
  * Takes a picture using the exported function capture, the picture is saved to camera roll and
  * the file path of the picture is logged
  */
  takePicture() {
    const options = {};
    this.camera.capture({ metadata: options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
  /**
  * Updates the zoom state using a zoom value that is acquired using the exported function getZoom
  */
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

