import React from 'react';
import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';

const HomeScreenHeader = (props: any) => {
  const {data, onPress, appTheme, name} = props;
  let theme = appTheme.theme;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
      ]}>
      <TouchableOpacity
        style={[
          styles.touchableContainer,
          {backgroundColor: theme.PRIMARY_BACKGROUND_LIGHT},
        ]}
        onPress={() => onPress}>
        <Image source={images.location_icon} style={styles.lhsIcon} />
        <Text style={[styles.title, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {name}
        </Text>
        <Image source={images.artist2} style={styles.rhsIcon} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {},
)(HomeScreenHeader);
