import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
import { scale } from '../../utils/scale';

export default StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // marginVertical: scale(10),
  },
  textHorizontalContainer: {
    flex: 1,
    borderTopRightRadius: scale(5),
    borderBottomRightRadius: scale(5),
  },
  rotateTextContain: {
    padding: scale(10),
  },
  rotateText: {
    fontSize: scale(16),
    letterSpacing: scale(5.71),
    textAlign: 'justify',
    marginLeft: scale(10),
    marginVertical: scale(2),
    fontFamily: fonts.helveticaNeueCondensedBold,
  },
  localCategoryText: {
    fontSize: scale(18),
    fontFamily: fonts.robotoRegular,
  },
  flexDir: {
    flex: 1,
    // height: scale(300),
  },
  secondContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(30),
    // marginVertical: scale(20),
    // backgroundColor: 'red',
  },
  secondSubContain: {
    // width: '70%',
    marginVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heightSpace: {
    marginVertical: scale(2),
    width: '105%',
  },
  addButton: {
    borderRadius: scale(6),
    width: '30%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: scale(12),
    fontFamily: fonts.robotoRegular,
  },
  nameOfService: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextMedium,
    marginBottom: scale(5),
  },
  priceService: {
    fontSize: scale(14),
    fontFamily: fonts.robotoRegular,
    width: '40%',
  },
  customizeText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    textAlign: 'right',
    color: colors.textRed,
  },
  flex: {
    flexDirection: 'row',
  },
  duration_min: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueThin,
    color: colors.textGrey,
    // marginLeft: scale(10),
  },
  staticHeight: {
    // height: scale(100),
  },
});
