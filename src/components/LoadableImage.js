import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';

import {COLORS, width} from '../constants';
import FastImage from 'react-native-fast-image';

export default class LoadableImage extends Component {
  state = {
    loading: true,
  };

  render() {
    const {url, style, imageStyle, smallIndicator} = this.props;

    return (
      <View style={[styles.container, style]}>
        <FastImage
          style={imageStyle}
          source={{
            uri:
              url ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJJIUNhRTlOSZo3CMYAyQMyaCRh2UxzJQxg&usqp=CAU',
            priority: FastImage.priority.high,
          }}
          resizeMode={
            this.props.resizeMode
              ? this.props.resizeMode
              : FastImage.resizeMode.contain || this.props.resizeMode
          }
          onLoadEnd={this._onLoadEnd}
        />
        <ActivityIndicator
          color={COLORS.primary}
          style={[
            styles.activityIndicator,
            {height: width * 0.45, width: width, position: 'absolute'},
          ]}
          animating={this.state.loading}
          size={'small'}
        />
      </View>
    );
  }

  _onLoadEnd = () => {
    this.setState({
      loading: false,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // flex: 1,
    // backgroundColor: `${COLORS.normal.halfpwhite}`,
  },
  activityIndicator: {
    // position: 'absolute',
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    // alignSelf: 'center',
    // zIndex: 1000000,
  },
  image: {
    // height:
  },
});
