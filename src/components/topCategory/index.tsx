import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import { connect } from 'react-redux';

const TopCategory = (props:any) => {
  const { theme } = props.appTheme;
  return (
    <TouchableOpacity style={[styles.container,{backgroundColor : theme.PRIMARY_BACKGROUND_COLOR_LIGHT}]}>
      <View style={[styles.imageContainer,{backgroundColor : theme.PRIMARY_BACKGROUND_COLOR_LIGHT}]}>
        <Image style={styles.img} source={images.category} />
      </View>
      <Text style={[styles.name,{color:theme.PRIMARY_TEXT_COLOR}]}>Make up studio</Text>
    </TouchableOpacity>
  );
};

const mapStatsToProps = ({ appTheme = '' }) => ({
  appTheme,
});

export default connect(
  mapStatsToProps
)(TopCategory);

