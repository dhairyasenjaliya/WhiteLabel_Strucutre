import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts, colors} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(15),
    marginTop: scale(16),
  },
  img: {
    height: scale(56),
    width: scale(56),
    resizeMode: 'cover',
  },
  name: {
    textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(16),
    color: '#fff',
    fontFamily: fonts.helveticaNeueLight,
    marginTop: scale(5),
  },
  ratingPosition: {
    color: colors.white,

    fontSize: scale(12),

    fontFamily: fonts.helveticaNeueLight,
    // height: scale(16),
    // width: scale(16),
  },
  ratingContain: {
    position: 'absolute',
    top: 0,
    right: scale(16),
    backgroundColor: colors.serviceBlue,
    borderWidth: scale(1),
    borderColor: colors.White,
    paddingHorizontal: scale(3),
    borderRadius: scale(6),
  },
});
