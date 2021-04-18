import React from 'react';
import {TouchableOpacity, Text, View, TouchableHighlight} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {scale} from '../../utils/scale';

const CustomButton = (props: any) => {
  const {onPress, style, btnText, type, price, btnLable} = props;
  if (type === 'cart') {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.btnCartStyle, style]}>
        <View style={styles.btnLeftContent}>
          <Text style={styles.btnServiceText}>{btnText}</Text>
          <Text style={styles.btnPriceText}>{price ? price : '₹ 3000'}</Text>
        </View>

        <View style={styles.btnRightContent}>
          <Text style={styles.btnCartText}>
            {btnLable ? btnLable : 'Go to Cart'}
          </Text>
          <Icon name="arrow-right" size={24} color={'#FFF'} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        onPress={() => onPress()}
        style={[styles.btnStyle, style]}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    );
  }
};
export default CustomButton;
