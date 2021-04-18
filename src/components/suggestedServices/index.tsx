import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../utils/scale';
import {colors} from '../../constants/styles';

const SuggestServices = (props: any) => {
  const {appTheme, data = '', lastData = ''} = props;
  const {
    name = '',
    subName = '',
    price = '',
    offer = '',
    productImage = '',
  } = data.item;
  let theme = appTheme.theme;
  let type = appTheme.theme.type;

  return (
    <View
      style={[
        styles.renderCategoryItemContainer,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
      ]}>
      <View
        style={[
          styles.horizontalLine,
          {
            borderBottomWidth: lastData ? 1 : 0,
            borderColor:
              theme.type === 'darkTheme'
                ? colors.stylistName
                : colors.greyHomeBorder,
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: scale(10),
            borderColor: '#FFF',
          }}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
            }}>
            <View
              style={
                {
                  // backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                  // marginHorizontal: scale(10),
                  // borderRadius: scale(50),
                }
              }>
              <Image source={productImage} style={styles.imageContainer} />
            </View>
          </View>
          <View
            style={{
              width: '50%',
              alignSelf: 'center',
              // marginLeft: scale(20),
              // marginHorizontal: scale(5),
            }}>
            <Text
              style={[styles.rewardTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {name}
            </Text>
            <Text style={[styles.subName]}>{subName}</Text>
            <Text style={[styles.price, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {'\u20B9' + price}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={images.offer_icon} style={styles.offerIcon} />
              <Text style={[styles.offer]}>{offer}</Text>
            </View>
          </View>
          <View style={{width: '20%', alignSelf: 'center'}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: colors.orangeBorder,
                borderRadius: scale(6),
              }}>
              <Text style={[styles.addText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                ADD +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {
    // switchTheme,
  },
)(SuggestServices);
