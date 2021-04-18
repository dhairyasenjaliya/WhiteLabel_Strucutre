import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../utils/scale';
import {colors} from '../../constants/styles';
import {color} from 'react-native-reanimated';

const CartAdd = (props: any) => {
  const {
    backgroundColor,
    cartAdd,
    cartCount,
    themeType,
    textColor,
    onPress,
    check,
  } = props;
  // if (type === 'cart') {
  return (
    <TouchableOpacity
      onPress={onPress ? onPress : () => {}}
      style={{
        backgroundColor:
          cartCount === 0 ? backgroundColor : 'rgba(238, 117, 15, 0.18)',
        paddingHorizontal: cartCount === 0 ? scale(20) : scale(12),
        justifyContent: 'center',
        borderRadius: scale(6),
        borderWidth: 1,
        borderColor: colors.lightOrange,
        height: scale(24),
        width: scale(cartCount === 0 ? 72 : 89),
      }}>
      {cartCount === 0 ? (
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.addtext, {color: textColor}]}>ADD </Text>
          <Text
            style={{
              color: colors.textGrey,
              // fontSize: scale(15),
            }}>
            +
          </Text>
        </View>
      ) : (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={[
              styles.addtext,
              {
                color: check
                  ? colors.blackPrimary
                  : themeType === 'darkTheme'
                  ? '#FFF'
                  : '#000',
              },
            ]}>
            ADDED
          </Text>
          <Icon
            name="check"
            size={scale(15)}
            style={{alignSelf: 'center', marginLeft: scale(5)}}
            color={colors.textGrey}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
export default CartAdd;
