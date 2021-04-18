import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts, colors} from '../../constants/styles';

export default StyleSheet.create({
  renderCategoryItemContainer: {
    marginHorizontal: scale(10),
    // alignItems: 'center',
    justifyContent: 'center',
    // width: '60%',
    borderRadius: scale(5),
    marginVertical: scale(5),
    // paddingVertical: scale(20),
    // paddingHorizontal: scale(10),
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 0.6},
    // shadowOpacity: 0.5,
    // shadowRadius: 1,
    // elevation: 0.4,
  },
  categoryIcon: {
    height: scale(64),
    width: scale(64),
    resizeMode: 'contain',
  },
  offerDiscount: {
    color: colors.orangeText,
    fontSize: scale(14),
    lineHeight: scale(17),
    fontFamily: fonts.helveticaNeueMedium,
  },
  offerDetail: {
    color: colors.orangeText,
    fontSize: scale(12),
    lineHeight: scale(17),
    fontFamily: fonts.helveticaNeueMedium,
  },
  commonContainer: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(5),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0.6},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 0.4,
    backgroundColor: '#FFF',
  },
  rowComponent: {
    flexDirection: 'row',
  },
});
