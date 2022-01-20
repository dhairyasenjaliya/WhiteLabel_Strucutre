import React from 'react';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import images from '../../assets/images';
import styles from './style';


const NearbySalon = (props: any) => {
  const {appTheme, data = ''} = props;
  const {
    type = '',
    image = '',
    location = '',
    rating = '',
    status = '',
    time = '',
    deals = '',
    name = '',
    timing = '',
    address = '',
  } = data;
  // console.log('Salondata', data);
  let theme = appTheme.theme;
  return (
    // transparent ? 'transparent' : '#2E2E2E'
    <View style={[styles.container]}>
      <Image style={styles.img} source={image ? image : images.salon_image} />
      <View style={styles.detailsContainer}>
        <View style={styles.salonNameContainer}>
          <Text style={[styles.salonName, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {name ? name : `Geetanjali Salon`}
          </Text>
          <View style={styles.ratingContainer}>
            <Image style={styles.ratingIcon} source={images.favorite_icon} />
            <Text
              style={[styles.ratingTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {rating ? rating : `3.5`}
            </Text>
          </View>
        </View>
        <Text style={[styles.distance, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {location ? location : `500m - Chattarpur, New Delhi`}
        </Text>
        <Text style={[styles.availability]}>OPEN NOW</Text>
        <Text style={[styles.timing, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {time ? time : ` (${timing.open} am - ${timing.close} pm)`}
        </Text>
        <View style={styles.offerContainer}>
          <Image source={images.offer_icon} style={styles.offerIcon} />
          <Text style={[styles.offerTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {deals.length ? deals : `20% off on all services + 2 more`}
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
})(NearbySalon);
