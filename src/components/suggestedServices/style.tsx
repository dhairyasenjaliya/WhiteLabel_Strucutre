import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts, colors} from '../../constants/styles';

export default StyleSheet.create({
  renderCategoryItemContainer: {
    // marginLeft: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    // width: '90%',
    // borderRadius: scale(8),
    // marginVertical: scale(5),
    // padding: scale(10),
    // borderWidth: 0.3,
    borderColor: '#DFDFDF',
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
    color: colors.orangeText,
    fontSize: scale(14),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueMedium,
  },
  price: {
    marginVertical: scale(5),
    fontSize: scale(16),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueRegular,
  },
  offer: {
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.orangeText,
  },
  addText: {
    paddingVertical: scale(5),
    textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.robotoRegular,
  },
  subName: {
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.helveticaNeueRegular,
    color: colors.grayBorder,
  },
  imageContainer: {
    height: scale(80),
    width: scale(80),
    // tintColor: colors.orangeText,
    alignSelf: 'center',
    marginHorizontal: scale(5),
    marginVertical: scale(10),
  },
  offerIcon: {
    height: scale(16),
    width: scale(16),
    resizeMode: 'contain',
    marginRight: scale(5),
  },
  horizontalLine: {
    marginHorizontal: scale(16),
    borderColor: colors.greyHomeBorder,
  },
});
