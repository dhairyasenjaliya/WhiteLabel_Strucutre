import {StyleSheet, Platform} from 'react-native';
import {colors, fonts, SCREENWIDTH} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    // marginHorizontal: scale(30),
    // marginVertical: scale(20),
    // marginTop: scale(20),
    alignItems: 'center',
  },
  fonts: {
    fontFamily: fonts.helveticaNeueMedium,
  },
  dotView: {
    alignItems: 'center',
    height: scale(18),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(24),
    marginHorizontal: scale(30),
    marginVertical: scale(20),
    marginTop: scale(50),
  },
  dot: {
    width: scale(10),
    height: scale(10),
    borderWidth: scale(0.3),
    borderRadius: scale(10),
    marginRight: scale(10),
  },
  skip: {
    fontSize: scale(13),
    color: colors.darkGray,
    fontFamily: fonts.robotoRegular,
  },
  centerImage: {
    width: SCREENWIDTH - 60,
    height: scale(200),
    marginTop: scale(30),
    alignContent: 'center',
  },
  centerImage2: {
    width: SCREENWIDTH - 60,
    height: scale(200),
    marginTop: scale(50),
    alignContent: 'center',
  },
  headerText: {
    textAlign: 'justify',
    fontSize: scale(18),
    lineHeight: scale(22),
    color: colors.white,
    fontFamily: fonts.helveticaNeueLight,
  },
  subText: {
    textAlign: 'justify',
    marginTop: scale(17),
    color: colors.grayColor,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
  },
  next: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(60),
    backgroundColor: colors.lightOrange,
    position: 'absolute',
    bottom: scale(30),
    right: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  // getStartedBtn: {
  //   width: SCREENWIDTH - 60,
  //   // width: SCREENWIDTH - scale(60),
  //   backgroundColor: colors.lightOrange,
  //   paddingVertical: scale(15),
  //   borderRadius: scale(15),
  //   marginHorizontal: scale(30),
  //   bottom: scale(30),
  //   position: 'absolute',
  // },
  customButton: {
    width: SCREENWIDTH - 60,
    bottom: scale(30),
  },
  textPosition: {
    position: 'absolute',
    top: scale(320),
    marginHorizontal: scale(20),
  },
  // getStartText: {
  //   color: colors.white,
  //   fontSize: 16,
  //   textAlign: 'center',
  //   fontFamily: fonts.robotoRegular,
  // },
});
