import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  btnStyle: {
    backgroundColor: colors.lightOrange,
    paddingVertical: scale(15),
    borderRadius: scale(15),
    marginHorizontal: scale(30),
  },
  btnCartStyle: {
    backgroundColor: colors.lightOrange,
    paddingVertical: scale(15),
    borderRadius: scale(15),
    marginHorizontal: scale(30),
    flexDirection: 'row',
  },
  btnText: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: fonts.robotoMedium,
    textAlign: 'center',
  },
  btnLeftContent: {
    width: '40%',
    justifyContent: 'flex-start',
    marginLeft: scale(20),
  },
  btnRightContent: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  btnServiceText: {
    fontSize: scale(12),
    fontFamily: fonts.avenirNextRegular,
    color: colors.white,
  },
  btnPriceText: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextMedium,
    color: colors.white,
  },
  btnCartText: {
    fontSize: scale(16),
    fontFamily: fonts.avenirNextRegular,
    color: colors.white,
  },
  addtext: {
    fontFamily: fonts.helveticaNeueLight,
    fontSize: scale(12),
  },
});
