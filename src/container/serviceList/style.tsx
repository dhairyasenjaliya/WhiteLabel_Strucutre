import { Dimensions, Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
// import {ifIphoneX} from 'react-native-iphone-x-helper';
import { scale, screenHeight } from '../../utils/scale';
const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  searchContainer: {
    marginVertical: scale(20),
  },
  flexRow: {
    flexDirection: 'row',
  },
  salonName: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  locationText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.grayBorder,
    marginTop: scale(2),
  },
  salonDetainContainer: {
    marginHorizontal: scale(20),
    // marginBottom: scale(5),
  },
  cartButton: {
    marginHorizontal: scale(5),
    width: '90%',
    borderRadius: scale(12),
  },
  timeContainer: {
    width: '15%',
    paddingVertical: scale(10),
  },
  timeSubContainer: {
    width: '52%',
    marginHorizontal: scale(5),
  },
  weekNameText: {
    fontSize: scale(14),
    textAlign: 'center',
  },
  weekDateText: {
    marginTop: scale(10),
    textAlign: 'center',
  },
  timeNameContainer: {
    flexDirection: 'row',
    marginVertical: scale(10),
    flexWrap: 'wrap',
  },
  timeSelectContainer: {
    // paddingHorizontal: scale(10),
    // paddingVertical: scale(10),
    flexDirection: 'row',
    marginHorizontal: scale(5),
    borderRadius: scale(6),
    marginVertical: scale(5),
    height: scale(32),
    width: scale(73),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainTimePicker: {
    // marginLeft: scale(20),
  },
  preferedTimeText: {
    fontSize: scale(16),
    marginBottom: scale(16),
    fontFamily: fonts.avenirNextMedium,
    marginLeft: scale(20),
  },
  selectedDataText: {
    fontSize: scale(18),
    marginTop: scale(15),
    marginBottom: scale(10),
    fontWeight: 'bold',
  },
  imagesGreeting: {
    // resizeMode: 'contain',
    // alignSelf: 'center',
    marginTop: scale(4),
  },
  genderButton: {
    borderRadius: scale(6),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  femaleButton: {
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
    marginLeft: scale(20),
    borderRadius: scale(6),
  },
  typeText: {
    fontSize: scale(14),
    fontFamily: fonts.robotoBold,
    lineHeight: scale(16),
    marginLeft: scale(15),
    color: colors.grayBorder,
    letterSpacing: scale(5),
    padding: scale(10),
  },
  bottomContent: {
    marginBottom: scale(250),
  },
  buttonContain: {
    // paddingTop: scale(40),
    // top: scale(screenHeight > 700 ? 640 : 540),
    top: scale(
      Platform.OS === 'ios'
        ? screenHeight > 800
          ? 660
          : 540
        : screenHeight > 800
        ? 640
        : 500,
    ),
    position: 'absolute',
    // bottom: scale(1),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  cartContain: {
    marginBottom: scale(20),
    marginTop: scale(10),
  },
  topStlist: {
    marginTop: scale(24),
    color: '#fff',
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(17),
    fontFamily: fonts.helveticaNeueMedium,
  },
  serviceName: {
    marginTop: scale(6),
    fontSize: scale(18),
    marginLeft: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  servicePrice: {
    // marginTop: scale(6),
    fontSize: scale(16),
    marginLeft: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  upperLine: {
    borderTopWidth: scale(1),
    borderColor: colors.greyHomeBorder,
    // marginBottom: scale(23),
    marginTop: scale(12),
    // marginHorizontal: scale(20),
  },
  availableText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginVertical: scale(10),
    marginTop: scale(23),
    marginHorizontal: scale(20),
  },
  detailBar2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: scale(20),
    // marginLeft: scale(20),
  },
  circle: {
    height: scale(25),
    width: scale(25),
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.orangeBorder,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(20),
  },
  checkedCircle: {
    height: scale(25),
    width: scale(25),
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(20),
    padding: scale(0.5),
    backgroundColor: colors.lightOrange,
    borderColor: colors.textGrey,
    borderWidth: scale(1),
  },
  optionAvailbleContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: scale(0.5),
    borderColor: colors.grayBorder,
    // marginRight:scal
  },
  clockSubText: {
    color: colors.textGrey,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
  },
  clockText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  detailBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minuteText: {
    // marginTop: scale(5),
    color: colors.textGrey,
    fontSize: scale(12),
    // lineHeight: scale(21),
    // marginLeft: scale(5),
    fontFamily: fonts.helveticaNeueMedium,
    // marginHorizontal: scale(20),
  },
  topStylistContainerStyle: {
    paddingLeft: scale(17),
    // marginVertical: scale(20),
  },
  dateNumberSelectedStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(16),
    color: colors.orangeText,
  },
  durationMinute: {
    fontFamily: fonts.helveticaNeueLight,
    fontSize: scale(12),
    color: colors.textGrey,
    marginTop: scale(10),
  },
  dateNameSelectedStyle: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(13),
    color: colors.blackBack,
  },
  headerText: {
    fontFamily: fonts.helveticaNeueCondensedBold,
    fontSize: scale(16),
    color: colors.grayBorder,
  },
  dateNumberStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(12),
  },
  dateNameStyle: {
    fontFamily: fonts.robotoBold,
    fontSize: scale(12),
    color: colors.grayBorder,
  },
  checkOutListStylist: {
    marginHorizontal: scale(20),
    // marginVertical: scale(20),
    // flex: 1,
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginVert: {
    marginVertical: scale(10),
  },
  buttonBottom: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: scale(Platform.OS === 'android' ? -255 : -270),
    // Perfect Shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: scale(Platform.OS === 'android' ? 10 : 2),
  },
  flatlistMargin: {
    marginHorizontal: scale(20),
  },
  crowdtext: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textRed,
    textAlign: 'center',
  },
  bottomDetail: {
    // alignItems: 'center',
    marginTop: scale(20),
    marginHorizontal: scale(20),
  },
  customPosition: {
    width: scale(198),
    height: scale(56),
    marginHorizontal: scale(30),
    marginVertical: scale(20),
    marginBottom: scale(Platform.OS === 'ios' ? 35 : 20),
  },
  buttonBottom4: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: scale(-230),
    // Perfect Shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    // marginBottom: scale(10),
    padding: scale(25),
    left: scale(Platform.OS === 'ios' ? -3 : -4),
    // width: '120%',
  },
  cartButton4: {
    marginLeft: scale(16),
    width: '100%',
    borderRadius: scale(12),
    marginBottom: scale(8),
  },
  calenderContain: {
    marginHorizontal: scale(20),
    height: scale(192),
  },
  timeAvailableText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    textAlign: 'center',
    justifyContent: 'center',
  },
  loaderAlign: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1,
  },
  mainImage: {
    // marginTop: scale(20),
    resizeMode: 'contain',
    height: scale(160),
    width: scale(316),
    alignSelf: 'center',
  },
});
