import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { default as Localimages } from '../../assets/images';
import * as RootNavigation from '../../navigation/rootNavigation';
import styles from './style';

const TopStylist = (props: any) => {
  const {
    appTheme,
    data = '',
    salon_Uuid = '',
    selectStylist = '',
    selectedStylist = '',
    fontColor = '',
  } = props;
  const {item = ''} = data;
  const {
    basic = '',
    uuid = '',
    name = '',

    salon = '',
    objectID = '',
  } = item;
  // console.log('item', JSON.stringify(item));

  let getSalonId = salon.uuid;
  const {
    name_first = '',
    name_last = '',
    rank = '',
    values = '',
    images = '',
    profile_pic = '',
  } = basic;
  const {MAIN = ''} = images;
  const {global = ''} = values;
  let theme = appTheme.theme;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selectedStylist && {backgroundColor: 'rgba(238,117,15,0.5)'},
      ]}
      onPress={
        selectStylist
          ? selectStylist
          : () =>
              RootNavigation.navigate('stylishDetails', {
                stylistId: uuid ? uuid : objectID,
                salonId: salon_Uuid ? salon_Uuid : getSalonId,
              })
      }>
      {/* <Image
        style={[styles.img]}
        source={{uri: MAIN ? MAIN[0].url : profile_pic}}
      /> */}
      <FastImage
        style={styles.img}
        source={{
          uri: profile_pic,
          // headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <Text
        style={[
          styles.name,
          {color: fontColor ? fontColor : theme.PRIMARY_TEXT_COLOR},
        ]}>
        {name_first ? name_first : name}
      </Text>
      <View style={styles.heartContainer}>
        <Image style={styles.heartIcon} source={Localimages.heart} />
        <Text
          style={[
            styles.heartTitle,
            {color: fontColor ? fontColor : theme.PRIMARY_TEXT_COLOR},
          ]}>
          {global ? global.recommendation_avg + '%' : '90%'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {})(TopStylist);
