import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import {connect} from 'react-redux';

// {transparent}
const FeaturedComponent = (props: any) => {
  const {appTheme} = props;
  let theme = appTheme.theme;
  return (
    // transparent ? 'transparent' : '#2E2E2E'
    <View
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
      ]}>
      <Image style={styles.img} source={images.salon_image} />
      <View style={styles.detailsContainer}>
        <View style={styles.salonNameContainer}>
          <Text style={[styles.salonName, {color: theme.PRIMARY_TEXT_COLOR}]}>
            Looks Salon
          </Text>
          <View style={styles.ratingContainer}>
            <Image style={styles.ratingIcon} source={images.favorite_icon} />
            <Text
              style={[styles.ratingTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
              4.3
            </Text>
          </View>
        </View>
        <Text style={[styles.distance, {color: theme.PRIMARY_TEXT_COLOR}]}>
          500m - Chattarpur, New Delhi
        </Text>
        <Text style={[styles.availability]}>OPEN NOW</Text>
        {/* <Text style={[styles.timing,{ color:theme.PRIMARY_TEXT_COLOR }]}>(11:00 am - 09:00 pm)</Text> */}
        <View style={styles.offerContainer}>
          <Image source={images.offer_icon} style={styles.offerIcon} />
          <Text style={[styles.offerTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
            20% off on all services + 2 more
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(FeaturedComponent);
