import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {colors, fonts, SCREENHEIGHT} from '../../constants/styles';
import {color} from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    ...Platform.select({
      android: {marginTop: scale(20)},
      ios: {
        paddingTop: scale(29),
      },
    }),
  },
  scrollContainer: {
    marginLeft: scale(16),
    // marginTop: scale(10),
  },
  rotateTextContain: {
    left: scale(-135),
    width: scale(300),
    height: scale(30),
    transform: [{rotate: '270deg'}],
    flexDirection: 'row',
  },
  rotateText: {
    fontSize: scale(14),
    letterSpacing: scale(1),
    marginHorizontal: scale(-25),
    marginVertical: scale(2),
    fontFamily: fonts.robotoRegular,
  },
  rotateIcon: {
    fontSize: scale(14),
    letterSpacing: scale(1),
    marginHorizontal: scale(-150),
    marginVertical: scale(5),
    fontFamily: fonts.robotoRegular,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconSpacing: {
    marginHorizontal: scale(30),
  },
  serviceContainer: {
    flexDirection: 'row',
    // backgroundColor:'#B6703C',
    marginHorizontal: scale(5),
    marginVertical: scale(5),
    height: scale(30),
    justifyContent: 'center',
    borderRadius: scale(5),
  },
  serviceContainerComponent: {
    // flexDirection: 'row',
    // backgroundColor: '#B6703C',
    marginRight: scale(10),
    // marginVertical: scale(5),
    // height: scale(30),
    // justifyContent: 'center',
    // borderRadius: scale(5),
  },
  serviceTitle: {
    color: colors.textGrey,
    // marginHorizontal: scale(10),
    marginVertical: scale(5),
    textAlign: 'center',
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
  },
  photoContainer: {
    marginHorizontal: scale(5),
    marginVertical: scale(5),
  },
  stylistNameContainer: {
    marginTop: scale(5),
  },
  stylistName: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    marginHorizontal: scale(11),
    color: colors.stylistName,
  },
  stylistName2: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginHorizontal: scale(16),
    // color: colors.stylistName,
  },
  stylistDetail: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textGrey,
    marginVertical: scale(10),
    width: '95%',
  },
  stylistSubName: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
  },
  stylistShowCase: {
    marginVertical: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  stylistCase1: {
    flexDirection: 'row',
  },
  stylistCase2: {
    marginHorizontal: scale(30),
  },
  logoContainer: {
    width: scale(65),
    height: scale(55),
    marginTop: scale(10),
    borderRadius: scale(10),
  },
  stylistDetailWidthCommon: {
    width: '25%',
  },
  stylistDetailWidth: {
    // width: '40%',
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: scale(4),
  },
  ratingText: {
    fontSize: scale(12),
    fontFamily: fonts.robotoRegular,
    color: colors.grayBorder,
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: scale(14),
    fontFamily: fonts.robotoRegular,
    textAlign: 'center',
  },
  serviceContainerMain: {
    marginTop: scale(15),
  },
  titleMainCanategory: {
    fontSize: scale(16),
    marginBottom: scale(6),
    fontFamily: fonts.avenirNextMedium,
  },
  complementMainContainer: {
    marginTop: scale(15),
  },
  photoMainContainer: {
    marginTop: scale(20),
    marginBottom: scale(120),
  },
  viewAllText: {
    fontSize: scale(12),
    marginBottom: scale(6),
    color: colors.orangeText,
  },
  customButtonPosition: {
    position: 'absolute',
    bottom: scale(60),
    right: scale(-30),
    width: '60%',
  },
  customButton: {
    borderRadius: 0,
    borderTopLeftRadius: scale(35),
    borderBottomLeftRadius: scale(35),
    marginHorizontal: scale(20),
    height: scale(56),
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextRegular,
  },
  selectService: {
    fontSize: scale(16),
    fontFamily: fonts.robotoRegular,
    marginBottom: scale(10),
    paddingTop: scale(20),
    // paddingHorizontal: scale(30),
  },
  servicePrice: {
    fontSize: scale(12),
    fontFamily: fonts.avenirNextMedium,
  },
  serviceDirector: {
    fontSize: scale(12),
    fontFamily: fonts.avenirNextRegular,
    color: colors.grayBorder,
  },
  addbuttonService: {
    height: scale(35),
    borderRadius: scale(6),
    justifyContent: 'center',
    alignContent: 'center',
  },
  renderServices: {
    marginVertical: scale(10),
    paddingHorizontal: scale(30),
  },
  menuHorizontalLine: {
    borderBottomColor: colors.greyHomeBorder,
  },
  menuHorizontalLine2: {
    borderBottomColor: colors.greyHomeBorder,
    borderWidth: scale(0.5),
    marginRight: scale(16),
    marginBottom: scale(16),
  },
  cartButton: {
    // marginHorizontal: scale(15),

    // bottom: scale(25),
    // width: '90%',
    marginHorizontal: scale(5),
    width: '90%',
    borderRadius: scale(12),
  },

  cartButton2: {
    marginHorizontal: scale(15),
    width: '90%',
    borderRadius: scale(15),
  },

  dateNumberSelectedStyle: {
    fontFamily: fonts.robotoRegular,
    fontSize: scale(16),
    color: colors.orangeText,
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
    // flex: 1,
    // marginHorizontal: scale(20),
  },
  mainTimePicker2: {
    // flex: 1,
    // marginHorizontal: scale(20),
    // marginVertical: scale(10)
  },
  calenderContainer: {
    marginTop: scale(10),
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: colors.greyHomeBorder,

    // marginBottom: scale(23),

    // marginTop: scale(12),
  },
  preferedTimeText: {
    marginLeft: scale(16),
    fontSize: scale(14),
    marginVertical: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    // marginTop: scale(16),
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
  clockSubText: {
    color: colors.textGrey,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
  },
  clockText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  topStlist: {
    // marginTop: scale(30),
    color: '#fff',
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  minuteText: {
    marginTop: scale(5),
    color: colors.textGrey,
    fontSize: scale(12),
    lineHeight: scale(21),
    marginLeft: scale(5),
    fontFamily: fonts.helveticaNeueMedium,
  },
  detailBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: scale(10),
  },
  salonNameText: {
    color: colors.orangeText,
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueMedium,
  },
  saftyTxt: {
    color: colors.teal,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    marginVertical: scale(10),
  },
  stylistImages: {
    height: scale(105),
    width: scale(105),
    borderRadius: scale(6),
  },
  availableText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginVertical: scale(10),
    marginTop: scale(20),
    marginLeft: scale(16),
  },
  upperLine: {
    borderTopWidth: scale(0.5),
    borderColor: colors.grayBorder,
    marginVertical: scale(5),
  },
  detailBar2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: colors.orangeText,
    borderColor: colors.textGrey,
    borderWidth: scale(3),
  },
  optionAvailbleContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: scale(0.5),
    borderColor: colors.grayBorder,
    marginTop: scale(60),
    marginBottom: scale(10),
  },
  footer: {
    height: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: scale(10),
    marginHorizontal: scale(20),
    // paddingVertical: 20,
  },
  footerButton: {
    flexDirection: 'row',
    marginLeft: 15,
    backgroundColor: colors.appreciateBlue,
    height: scale(56),
    width: scale(163),
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: scale(16),
    color: '#FFF',
    textAlign: 'center',
    justifyContent: 'center',
  },
  marginVertical: {
    marginVertical: scale(24),
  },
  marginBottom: {
    marginBottom: scale(500),
  },
  buttonContain: {
    paddingTop: scale(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  titleMainCategory: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  flexFooter2: {
    // marginHorizontal: scale(5),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  ratingTextFooter: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    color: colors.white,
    marginLeft: scale(5),
    // justifyContent: 'center',
  },
  mainStylistImage: {
    height: scale(88),
    width: scale(88),
    borderRadius: scale(50),
  },
  safeImage: {
    height: scale(32),
    width: scale(108),
    resizeMode: 'contain',
    // position: 'absolute',
    // top: scale(50),
    // right: scale(17),
  },
  customHeader: {
    alignItems: 'center',
    marginTop: scale(29),
    marginHorizontal: scale(16),
  },
  crowdtext: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textRed,
    textAlign: 'center',
  },
  closeIcon: {
    height: scale(16),
    width: scale(16),
    position: 'absolute',
    top: scale(18),
    right: scale(5),
  },
  cartButton3: {
    marginHorizontal: scale(5),
    width: '90%',
    borderRadius: scale(12),
  },
  customPosition: {
    width: scale(198),
    height: scale(56),
    marginHorizontal: scale(30),
    marginVertical: scale(20),
    marginBottom: scale(Platform.OS === 'ios' ? 35 : 20),
  },
  buttonBottom: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: scale(Platform.OS === 'android' ? -170 : -170),
    // Perfect Shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    // marginBottom: scale(Platform.OS === 'android' ? 10 : 2),
    width: '100%',
  },
  calenderContain: {
    // marginHorizontal: scale(20),
    // height: scale(192),
  },
  indicator: {
    justifyContent: 'center', //Centered vertically
    alignItems: 'center', // Centered horizontally
    flex: 1,
  },
  contentCenter: {
    marginBottom: scale(5),
    marginTop: scale(5),
    height: scale(192),
    marginLeft: scale(16),
  },

  mainImage: {
    // marginTop: scale(20),
    resizeMode: 'contain',
    height: scale(160),
    width: scale(316),
    alignSelf: 'center',
  },
});
