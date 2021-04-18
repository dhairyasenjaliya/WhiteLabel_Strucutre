import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';

const TopSalon = (props:any) => {
  const { appTheme } = props;
  let theme = appTheme.theme;
  return (
    <TouchableOpacity style={styles.container} >
        <Image style={styles.img} source={images.salon_image} />

        <View style={styles.ratingContainer}>
          <Image style={styles.ratingIcon} source={images.favorite_icon} />
          <Text style={[styles.ratingTitle]}>4.3</Text>
        </View>

        <Text style={[styles.name,{color:theme.PRIMARY_TEXT_COLOR}]}>Tony & Guy</Text>

        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>800 - m - Select Ci…</Text>
        </View>

      </TouchableOpacity>
  );
};

const mapStateToProps = ({ appTheme = '' }) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {

  }
)(TopSalon);
