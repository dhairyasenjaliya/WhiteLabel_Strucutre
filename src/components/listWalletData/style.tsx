import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts, colors} from '../../constants/styles';

export default StyleSheet.create({
  renderCategoryItemContainer: {
    // marginLeft: scale(20),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    borderRadius: scale(8),
    marginVertical: scale(5),
    padding: scale(10),
    // borderWidth: 0.3,
    borderColor: '#DFDFDF',
    height: scale(80),
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    // elevation: 0.4,
  },
  categoryIcon: {
    height: scale(64),
    width: scale(64),
    resizeMode: 'contain',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.avenirNextRegular,
  },
  rewardAmount: {
    color: colors.orangeText,
    fontSize: scale(14),
    lineHeight: scale(21),
    fontFamily: fonts.robotoRegular,
  },
  rewardTitle: {
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueMedium,
  },
  orderId: {
    color: colors.grayBorder,
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.robotoRegular,
  },
  priceData: {
    fontSize: scale(18),
    // lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueMedium,
  },
  pointsData: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueRegular,
    color: '#9B9B9B',
    marginLeft: scale(20),
  },
  symbol: {
    color: '#4A4A4A',
    fontSize: scale(20),
    fontFamily: fonts.helveticaNeueRegular,
    alignSelf: 'flex-end',
    // color: colors.grayBorder,
    // marginLeft: scale(20),
  },
  rewardButton: {
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(35),
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    padding: 0,
    height: scale(32),
  },
});
