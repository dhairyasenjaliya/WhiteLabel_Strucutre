import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  touchpadText: {
    fontSize: scale(28),
    color: colors.white,
    fontFamily: fonts.robotoRegular,
  },
  container: {
    marginBottom: scale(10),
    backgroundColor: colors.primaryColor,
    paddingTop: scale(15),
  },
  bottomLine: {
    borderBottomWidth: scale(1),
    borderBottomColor: colors.greyHomeBorder,
    marginHorizontal: scale(15),
  },
  subContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(10),
  },
  widthFirst: {
    width: '70%',
  },
  innerView: {
    flexDirection: 'row',
    // marginTop: 10,
    // marginLeft: 5,
  },
  styleImageView: {
    width: scale(47),
    height: scale(47),
    resizeMode: 'contain',
    justifyContent: 'center',
    borderRadius: scale(40),
  },
  subView: {
    flexDirection: 'column',
    marginLeft: scale(20),
    width: '80%',
  },
  mainData: {
    fontSize: scale(14),
    color: colors.white,
    fontFamily: fonts.avenirNextDemiBold,
  },
  subData: {
    fontSize: scale(12),
    color: colors.white,
    marginTop: scale(5),
    fontFamily: fonts.avenirNextRegular,
  },
  priceData: {
    fontSize: scale(14),
    color: colors.white,
    marginTop: 5,
    fontFamily: fonts.avenirNextRegular,
  },
  timeData: {
    fontSize: scale(12),
    marginTop: scale(5),
    marginBottom: scale(5),
    color: colors.grayColor,
    fontFamily: fonts.avenirNextRegular,
  },
  secondView: {
    width: '30%',
    alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  rightMainTextElement: {
    color: colors.white,
    textAlign: 'center',
    marginRight: scale(10),
    fontFamily: fonts.avenirNextRegular,
    fontSize: 14,
  },
  rightImage: {
    width: scale(35),
    height: scale(35),
    marginRight: scale(10),
    resizeMode: 'contain',
    borderRadius: scale(20),
  },
  rightText: {
    fontSize: scale(10),
    color: '#9B9B9B',
    marginRight: scale(10),
    fontFamily: fonts.avenirNextRegular,
  },
  rightSubTextElement: {
    color: colors.lightOrange,
    textAlign: 'center',
    // marginLeft: scale(20),
    // marginBottom: scale(10),
    // marginRight: scale(10),
    fontFamily: fonts.helveticaNeueRegular,
    fontSize: scale(12),
  },
  dataContainer: {
    marginTop: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateContainer: {
    color: '#9B9B9B',
    fontSize: scale(12),
    fontFamily: fonts.avenirNextRegular,
  },
  rateSubContain: {
    flexDirection: 'row',
    borderRadius: 3,
    backgroundColor: 'rgba(241,114,19,0.17)',
    marginLeft: 8,
    alignItems: 'center',
    paddingRight: 9,
  },
  rateText: {fontSize: scale(10)},
  stateButton: {
    padding: scale(10),
    backgroundColor: colors.brandlight,
    alignSelf: 'center',
    borderRadius: scale(6),
  },
  duretionText: {
    color: colors.stylistName,
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueMedium,
    marginTop: scale(1),
  },
});
