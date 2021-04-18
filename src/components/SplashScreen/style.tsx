import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {colors, SCREENHEIGHT, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: scale(200),
    width: scale(200),
    marginTop: scale(150),
  },
  splashImage1: {
    height: scale(50),
    resizeMode: 'contain',
    width: scale(150),
  },
  personalStyle: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.grayBorder,
    letterSpacing: scale(5),
    alignItems: 'center',
    alignSelf: 'center',
  },
  versionName: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueRegular,
    color: colors.grayBorder,
    alignItems: 'center',
    alignSelf: 'center',
  },
  powerdText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueRegular,
    color: colors.grayBorder,
    alignItems: 'center',
    alignSelf: 'center',
    // fontWeight: 'bold',
  },
});
