import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import NearbySalon from '../nearbySalon';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';

const SearchData = (props: any) => {
  const {appTheme, data = ''} = props;
  const {
    type = '',
    title = '',
    image = '',
    location = '',
    rating = '',
    status = '',
    time = '',
    offer = '',
    name = '',
    subName = '',
  } = data.item;
  let theme = appTheme.theme;

  if (type === 'stylist') {
    return (
      <TouchableOpacity
        style={styles.stylistContainer}
        onPress={() => RootNavigation.navigate('stylishDetails', {})}>
        <View
          style={{
            width: '25%',
          }}>
          <Image style={styles.img} source={image} />
        </View>
        <View
          style={{
            width: '60%',
            justifyContent: 'center',
          }}>
          <Text style={[styles.name, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {name}
          </Text>
          <Text style={[styles.name, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {subName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image style={styles.heartIcon} source={images.heart} />
          <Text style={[styles.heartTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {rating}K
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => RootNavigation.navigate('salonDetail', {})}>
        <NearbySalon data={data.item} />
      </TouchableOpacity>
    );
  }
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(SearchData);
