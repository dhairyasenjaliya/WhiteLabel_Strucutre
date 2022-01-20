import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../../constants/styles';
import { scale } from '../../utils/scale';

const CartEdit = (props: any) => {
  const {
    backgroundColor,
    cartReduce,
    cartAdd,
    cartCount,
    fontColor,
    themeType,
  } = props;
  // if (type === 'cart') {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        height: scale(35),
        width: scale(85),
        alignContent: 'center',

        // marginHorizontal: scale(20),
      }}>
      <TouchableOpacity
        onPress={cartReduce}
        style={{
          width: '30%',
          backgroundColor:
            themeType === 'darkTheme'
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0, 0, 0, 0.1)',
          borderTopLeftRadius: scale(10),
          borderBottomLeftRadius: scale(10),
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginVertical: scale(-9),
            color: colors.orangeText,
            fontSize: scale(35),
          }}>
          -
        </Text>
      </TouchableOpacity>

      <View style={{width: '40%', backgroundColor: 'rgba(237, 138, 25, 0.7)'}}>
        {cartCount !== 0 ? (
          <Text
            style={{
              alignSelf: 'center',
              marginVertical: scale(10),
              fontWeight: 'bold',
              color: fontColor,
            }}>
            {cartCount}
          </Text>
        ) : (
          <Icon
            name="check"
            size={scale(15)}
            style={{alignSelf: 'center', marginVertical: scale(10)}}
            color={fontColor}
            // color={theme.PRIMARY_TEXT_COLOR}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={cartAdd}
        style={{
          width: '30%',
          backgroundColor:
            themeType === 'darkTheme'
              ? 'rgba(255,255,255,0.3)'
              : 'rgba(0, 0, 0, 0.1)',
          borderTopRightRadius: scale(10),
          borderBottomRightRadius: scale(10),
        }}>
        <Text
          style={{
            alignSelf: 'center',
            // marginVertical: scale(5),
            color: colors.orangeText,
            fontSize: scale(25),
          }}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CartEdit;
