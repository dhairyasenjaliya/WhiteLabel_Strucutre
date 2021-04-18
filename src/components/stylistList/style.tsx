import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  container: {
    marginBottom: scale(10),
    backgroundColor: colors.primaryColor,
    paddingTop: scale(15),
    borderBottomWidth: scale(0.5),
    marginHorizontal: scale(15),
    borderColor: colors.greyHomeBorder,
  },
  subContainer: {
    flexDirection: 'row',
    // marginHorizontal: scale(10),
  },
  widthFirst: {
    width: '70%',
  },
  innerView: {
    flexDirection: 'row',
  },
  styleImageView: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    borderRadius: scale(60),
  },
  subView: {
    flexDirection: 'column',
    marginLeft: 13,
  },
  mainData: {
    fontSize: scale(16),
    color: colors.white,
    fontFamily: fonts.avenirNextDemiBold,
  },
  subData: {
    fontSize: scale(12),
    color: colors.white,
    marginTop: scale(5),
    fontFamily: fonts.avenirNextRegular,
  },
  secondView: {
    // width: '30%',
    flex: 1,
    marginVertical: scale(15),
    alignItems: 'center',
    // justifyContent: 'center',
  },
  dataContainer: {
    marginTop: scale(1),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    height: scale(12),
    width: scale(12),
    resizeMode: 'contain',
  },
  genderText: {
    fontSize: scale(12),
    fontFamily: fonts.avenirNextRegular,
    marginLeft: scale(5),
  },
  genderContainer: {
    flexDirection: 'row',
    marginVertical: scale(5),
    marginBottom: scale(10),
  },
  femaleIconAlignment: {
    marginHorizontal: scale(5),
    marginLeft: scale(10),
  },
  voteText: {
    color: colors.grayColor,
    marginLeft: scale(10),
  },
  bookNowbutton: {
    // paddingVertical: scale(15),
    // paddingHorizontal: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(1),
    borderColor: colors.orangeBorder,
    height: scale(32),
    width: scale(80),
    justifyContent: 'center',
  },
  bookNowText: {
    // color: colors.orangeText,
    textAlign: 'center',
    fontSize: scale(14),
    fontFamily: fonts.robotoRegular,
  },
});
