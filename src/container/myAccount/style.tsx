import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width} = Dimensions.get('window');
import {scale, screenHeight} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: scale(200),
    // marginTop: scale(-10),
    // backgroundColor: colors.primaryColor,
    ...Platform.select({
      android: {
        // marginTop: scale(20),
        // marginBottom: scale(80),
      },
    }),
  },
  container2: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    ...Platform.select({
      android: {
        // marginTop: scale(20),
        // marginBottom: scale(80),
      },
    }),
  },
  centerImage: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  detailComponent: {
    flexDirection: 'row',
    paddingTop: scale(30),
    paddingHorizontal: scale(20),
    // marginTop: scale(10),
    // backgroundColor: 'red',
    borderBottomLeftRadius: scale(18),
    borderBottomRightRadius: scale(18),
    ...Platform.select({
      android: {
        elevation: 16,
      },
      ios: {
        // borderBottomWidth: 2,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.44,
        shadowRadius: 4,
      },
    }),
  },
  secondView: {
    paddingVertical: scale(22),
    paddingBottom: scale(120),
  },
  topIconView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: scale(3),
  },
  iconView: {
    width: scale(63),
    height: scale(64),
    borderWidth: scale(0.6),
    borderRadius: scale(5),
    borderColor: 'rgba(155,155,155,0.35)',
    marginHorizontal: scale(10),
    alignItems: 'center',
    paddingTop: 12,
  },
  topViewText: {
    bottom: 5,
    position: 'absolute',
    fontSize: 12,
    color: colors.white,
  },
  userDetail: {
    width: '80%',
    paddingVertical: scale(4),
  },
  flexComponent: {
    flexDirection: 'row',
  },
  userName: {
    marginTop: scale(10),
    fontSize: scale(26),
    marginVertical: scale(5),
    color: colors.white,
    fontFamily: fonts.avenirNextMedium,
  },
  userNumber: {
    fontSize: scale(14),
    marginTop: scale(5),
    color: colors.white,
    fontFamily: fonts.avenirNextRegular,
  },
  userEmail: {
    fontSize: scale(14),
    marginVertical: scale(8),
    color: colors.white,
    fontFamily: fonts.avenirNextRegular,
  },
  userLocation: {
    fontSize: scale(12),
    // marginTop: scale(5),
    color: colors.grayBorder,
    marginLeft: scale(9),
    fontFamily: fonts.robotoRegular,
  },
  editOption: {
    marginTop: scale(20),
    marginVertical: scale(5),
    marginLeft: scale(10),
  },
  editText: {
    fontSize: scale(14),
    color: colors.lightOrange,
    fontFamily: fonts.robotoRegular,
  },
  settingAndGiftIconPlacement: {
    width: '20%',
    alignContent: 'center',
    // marginHorizontal: scale(40),
  },
  settingAndGiftIconSize: {
    height: scale(24),
    width: scale(24),
    marginTop: scale(15),
    marginLeft: scale(40),
  },
  settingAndGiftIconSize2: {
    height: scale(22),
    width: scale(22),
    // marginTop: scale(15),
    // marginLeft: scale(40),
  },
  subContainer: {
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    backgroundColor: colors.touchpadColor,
    height: '100%',
    marginTop: scale(16),
  },
  mainImage: {
    // marginTop: scale(20),
    resizeMode: 'contain',
    height: scale(197),
    width: scale(316),
    alignSelf: 'center',
    ...ifIphoneX(
      {
        marginTop: scale(50),
      },
      {
        marginTop: scale(Platform.OS === 'android' ? 60 : 10),
      },
    ),
  },
  mainText: {
    fontSize: scale(14),
    color: colors.white,
    marginTop: scale(39),
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: fonts.helveticaNeueLight,
    letterSpacing: 1,
  },
  customButton: {
    marginTop: scale(screenHeight > 700 ? 50 : 30),
    marginHorizontal: scale(85),
  },
  bottomSheet: {
    paddingTop: scale(40),
    alignItems: 'center',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
  },
  customInput: {
    // borderBottomColor: colors.grayColor,
    // borderBottomWidth: 1,
    color: colors.white,
    height: scale(30),
    fontSize: 16,
    paddingTop: 3,
    paddingLeft: 0,
  },
  checkImage: {
    height: 10,
    width: 14,
  },
  inputDivider: {
    height: 1,
    backgroundColor: colors.grayColor,
  },
  editTextBottomSheet: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: fonts.avenirNextRegular,
  },
  inputLabelBottomSheet: {
    color: colors.white,
    fontSize: scale(12),
    marginTop: scale(10),
    fontFamily: fonts.avenirNextRegular,
    // marginHorizontal: 3
  },
  textInputView: {
    flexDirection: 'row',
    height: scale(30),
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: fonts.avenirNextRegular,
  },
  tabBar: {
    flexDirection: 'row',
    height: scale(40),
    // color: colors.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: scale(16),
  },
  contentContainer: {
    paddingVertical: scale(10),
  },
  flatListStyle: {
    marginBottom: scale(70),
  },
  customSwitch: {
    marginTop: scale(20),
    marginLeft: scale(20),
  },
  innerComponent: {
    height: 30,
    width: 30,
  },
  renderOptions: {
    // justifyContent: 'space-between',
    // alignContent: 'center',
    flexDirection: 'row',
    // alignItems: 'center',
  },
  optionName: {
    alignSelf: 'center',
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textGrey,
  },
  optionNameContain: {
    alignSelf: 'center',
    marginLeft: scale(16),
  },
  bottomLine: {
    borderBottomWidth: 1,
    width: '100%',
    marginLeft: scale(50),
    borderBottomColor: colors.greyHomeBorder,
  },
  paddVertical: {
    height: scale(55),
  },
  logoHolder: {
    backgroundColor: colors.brandlight,
    height: scale(40),
    width: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(20),
  },
  recentText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
    marginLeft: scale(16),
  },
  recentContain: {
    marginTop: scale(18),
    marginBottom: scale(17),
  },
  bottomLine2: {
    borderBottomWidth: scale(2),
    width: '50%',
    // marginLeft: scale(50),
    borderBottomColor: colors.lightOrange,
    marginTop: scale(5),
  },
});
