import {StyleSheet, Platform} from 'react-native';
// const { width } = Dimensions.get('window');
import {scale} from '../utils/scale';
import {colors} from '../constants/styles';
import {ifIphoneX} from 'react-native-iphone-x-helper';
// import { colors ,fonts } from '../constants/styles';

export default StyleSheet.create({
  tabContainer: {
    ...ifIphoneX(
      {
        height: scale(85),
      },
      {
        height: scale(65),
      },
    ),
    // height: scale(60),
    // backgroundColor:colors.primaryColor,
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    position: 'absolute',
    borderTopWidth: 0,

    ...Platform.select({
      android: {
        elevation: 16,
      },
      ios: {
        borderBottomWidth: 2,
        // shadowColor: '#000',

        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 10,
        // shadowRadius: 10,

        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        // elevation: 16,
      },
    }),
  },
});
