import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './style';
import {connect} from 'react-redux';
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../utils/scale';

import * as RootNavigation from '../../navigation/rootNavigation';
import {colors} from '../../constants/styles';

const StylistList = (props: any) => {
  const {data, appTheme, salonId, searchName} = props;
  const {basic = [], uuid = ''} = data;
  const {name_first = '', rank = '', values = [], profile_pic} = basic;
  const {global = []} = values;
  const {recommendation_avg = ''} = global;
  // console.log('data', JSON.stringify(data));

  let checkName = name_first.includes(searchName);

  // console.log('searchName',  checkName);
  let theme = appTheme.theme;

  return (
    <TouchableOpacity
      onPress={() =>
        RootNavigation.navigate('stylishDetails', {
          stylistId: uuid,
          salonId: salonId,
        })
      }
      style={[
        styles.container,
        {
          backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
          borderColor:
            theme.type === 'darkTheme'
              ? colors.stylistName
              : colors.greyHomeBorder,
        },
      ]}>
      <View style={styles.subContainer}>
        <View style={styles.widthFirst}>
          <View style={styles.innerView}>
            {/* <Image source={images.artist2} style={styles.styleImageView} /> */}
            <FastImage
              style={styles.styleImageView}
              source={{
                uri: profile_pic,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              // resizeMode={FastImage.resizeMode.contain}
            />
            <View style={styles.subView}>
              <Text
                style={[styles.mainData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name_first && name_first}
              </Text>
              <Text style={[styles.subData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {rank && rank}
              </Text>
              <View style={styles.dataContainer}>
                <Image style={styles.heartIcon} source={images.heart} />
                <Text style={[styles.voteText]}>
                  {recommendation_avg && recommendation_avg + ' %'}
                </Text>
              </View>
              <View style={styles.genderContainer}>
                <Icon
                  name="mars"
                  size={scale(20)}
                  style={{}}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
                <Text
                  style={[
                    styles.genderText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Male
                </Text>
                <Icon
                  name="venus"
                  size={scale(20)}
                  style={styles.femaleIconAlignment}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
                <Text
                  style={[
                    styles.genderText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Female
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondView}>
          <View
            style={[
              styles.bookNowbutton,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              numberOfLines={1}
              style={[styles.bookNowText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Book now
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
// export default VisitComponent;

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(StylistList);
