import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
import { scale } from '../../utils/scale';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(15),
    marginTop: scale(16),
  },
  img: {
    height: scale(60),
    width: scale(60),
    resizeMode: 'cover',
    marginHorizontal: scale(10),
    // backgroundColor: 'red',
  },
  name: {
    // textAlign: 'center',
    fontSize: scale(14),
    lineHeight: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  type: {
    // textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueRegular,
  },
  bookingDate: {
    // textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.grayBorder,
  },
});
