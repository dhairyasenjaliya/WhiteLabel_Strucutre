import {StyleSheet} from 'react-native';
import {
  colors,
  fonts,
  SCREENWIDTH,
  SCREENHEIGHT,
} from '../../../constants/styles';
import {scale} from '../../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  goBack: {
    width: scale(40),
    height: scale(40),
    // padding: scale(10),
    marginVertical: scale(14),
    marginHorizontal: scale(30),
  },
  title: {
    marginHorizontal: scale(30),
    color: colors.white,
    fontSize: scale(32),
    fontFamily: fonts.helveticaNeueMedium,
  },
  numberIput: {
    flex: 1,
    // backgroundColor: 'orange',
    marginHorizontal: scale(43),
    marginVertical: scale(450),
    // height: scale(2),
    // flexDirection: 'row',
    marginTop: SCREENHEIGHT > 700 ? scale(70) : scale(45),
    // marginHorizontal: scale(43),
    // justifyContent: 'space-between',
  },
  textInputView: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(60),
    justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    // shadowColor: 'red',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  textInput: {
    // fontFamily: fonts.robotoRegular,
    fontSize: 17,
    color: colors.white,
  },
  focusInput: {
    backgroundColor: colors.inputLine,
    width: 1,
    height: 25,
  },
  resendView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: scale(43),
    marginVertical: scale(16),
  },
  isResend: {
    color: colors.grayBorder,
  },
  resend: {
    color: colors.resendOrangeColor,
  },
  fonts: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueMedium,
  },
  keyboardHeight: {
    marginTop: scale(60),
  },
});
