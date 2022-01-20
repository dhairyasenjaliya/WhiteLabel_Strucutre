import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
import { scale } from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    paddingBottom: scale(100),
  },
  mainView: {
    // marginHorizontal: scale(16),
  },
  headerContain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(25),
    marginHorizontal: scale(16),
  },
  headItem: {
    marginHorizontal: scale(19),
    marginVertical: scale(20),
  },
  salonNameHeader: {
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(18),
    width: '70%',
    color: colors.White,
    // marginHorizontal: scale(10),
  },
  salonImages: {
    width: scale(56),
    height: scale(48),
    borderRadius: scale(8),
    marginHorizontal: scale(10),
  },
  linearGradient: {
    // padding: 10,
    paddingVertical: scale(20),
  },
  titleHeader: {
    fontSize: scale(16),
    color: colors.White,
    fontFamily: fonts.proximaNovaABold,
  },
  titleDetail: {
    fontSize: scale(14),
    fontFamily: fonts.proximaNovaALight,
    marginTop: scale(10),
    color: colors.White,
  },
  headerPriceContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(16),
  },
  appointmentButton: {
    backgroundColor: 'rgba(0,0,0,0.60)',
    padding: scale(10),
    borderRadius: scale(9),
  },
  priceText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
    color: colors.White,
  },
  appointButtontext: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
  },
  detailText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    textAlign: 'right',
    marginHorizontal: scale(16),
    marginTop: scale(10),
  },
  flexView: {
    flexDirection: 'row',
  },
  statusContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(25),
    marginVertical: scale(20),
  },
  statusButton: {
    paddingVertical: scale(10),
    paddingRight: scale(20),
    paddingLeft: scale(10),
    borderRadius: scale(8),
    // backgroundColor: 'red',
  },
  statusText: {
    fontSize: scale(12),
    fontFamily: fonts.proximaNovaALight,
  },
  statusAvailable: {
    fontSize: scale(14),
    fontFamily: fonts.proximaNovaABold,
  },
  serviceIncludeContain: {
    marginHorizontal: scale(16),
    marginVertical: scale(10),
    marginBottom: scale(20),
    // position: 'absolute',
  },
  mainTitleText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginBottom: scale(10),
  },
  servicesRender: {
    marginVertical: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: scale(25),
    // marginVertical: scale(20),
  },
  sessionRender: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  marginHori: {
    marginHorizontal: scale(16),
  },
  sessionText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueThin,
    color: colors.textGrey,
    textAlign: 'center',
  },
  sessionValue: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    color: colors.textGrey,
    textAlign: 'center',
  },
  menuHorizontalLine: {
    borderBottomColor: colors.grayBorder,
    borderBottomWidth: 1,
  },
  completedButton: {
    padding: scale(15),
    borderRadius: scale(6),
    backgroundColor: 'rgba(72, 166, 81, 0.2)',
  },
  completedText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
  },
  appointService: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
  },
  cancleText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueCondensedBold,
    color: colors.textRed,
    lineHeight: scale(21),
  },
  mainTimePicker: {
    // marginLeft: scale(20),
  },
  preferedTimeText: {
    fontSize: scale(14),
    marginTop: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginLeft: scale(16),
    color: colors.textGrey,
  },
  selectedDataText: {
    fontSize: scale(18),
    marginTop: scale(15),
    marginBottom: scale(10),
    fontWeight: 'bold',
  },
  topStlist: {
    marginTop: scale(24),
    color: '#fff',
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(17),
    fontFamily: fonts.helveticaNeueMedium,
  },
  upperLine: {
    borderTopWidth: scale(0.5),
    borderColor: colors.grayBorder,
    marginVertical: scale(10),

    // flex: 1,
    // marginHorizontal: scale(16),
  },
  upperLine2: {
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
    borderColor: colors.greyHomeBorder,
    // marginBottom: scale(23),
    marginTop: scale(12),
    justifyContent: 'center',
    // alignItems: 'center',
    // marginHorizontal: scale(20),
  },
  availableText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    // marginVertical: scale(20),
    // marginTop: scale(20),
    marginHorizontal: scale(16),
  },
  detailBar2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: scale(16),
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
    backgroundColor: colors.orangeText,
    borderColor: colors.textGrey,
    borderWidth: scale(3),
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
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
  },
  detailBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minuteText: {
    marginTop: scale(5),
    color: colors.textGrey,
    fontSize: scale(12),
    lineHeight: scale(21),
    // marginLeft: scale(5),
    fontFamily: fonts.helveticaNeueMedium,
    marginHorizontal: scale(16),
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
    // marginHorizontal: scale(16),
    // marginVertical: scale(20),
  },
  flexDirection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginVert: {
    // marginVertical: scale(18),
  },
  marginVert2: {
    borderBottomWidth: scale(1),
    borderColor: colors.greyHomeBorder,
  },

  buttonBottom: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: scale(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    // marginBottom: scale(Platform.OS === 'android' ? 10 : 2),
    // borderTopWidth: scale(0.5),
    // borderColor: colors.grayBorder,
  },
  flatlistMargin: {
    marginHorizontal: scale(16),
  },
  crowdtext: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textRed,
    textAlign: 'center',
  },
  cartButton: {
    marginHorizontal: scale(15),
    width: '90%',
    borderRadius: scale(15),
    paddingHorizontal: scale(15),
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
    // paddingHorizontal: scale(20),
    // paddingVertical: scale(10),
    // flexDirection: 'row',
    // marginHorizontal: scale(5),
    // borderRadius: scale(5),
    // marginVertical: scale(5),
    flexDirection: 'row',
    marginHorizontal: scale(5),
    borderRadius: scale(6),
    marginVertical: scale(5),
    height: scale(32),
    width: scale(73),
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
  sessionText2: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueThin,
    color: colors.textGrey,
  },
  floatingCartButton: {
    position: 'absolute',
    bottom: scale(1),
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  serviceButton: {
    alignContent: 'center',
    marginLeft: scale(20),
    marginVertical: scale(20),
    padding: scale(10),
    borderRadius: scale(6),
    // borderColor: colors.darkOrange,
    // borderWidth: scale(1),
    marginHorizontal: scale(180),
    backgroundColor: 'rgba(238, 117, 15, 0.18)',
    // width: '30%',
  },
  contentFlatlist: {
    // marginBottom: scale(20),
  },
  orderContain: {
    position: 'absolute',
    zIndex: 1000,
    bottom: scale(0),
    width: '100%',
    // shadowOffset: {
    //   width: 1,
    //   height: 8,
    // },
    // shadowOpacity: 0.44,
    // shadowRadius: 10.32,
    // elevation: 20,
    ...Platform.select({
      android: {
        elevation: 20,
      },
      ios: {
        borderBottomWidth: 2,
        // shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 5,
        shadowRadius: 5,
      },
    }),
  },
  scrollBottom: {
    paddingBottom: scale(40),
  },
  calenderContain: {
    marginHorizontal: scale(20),
    height: scale(192),
  },
  customPosition: {
    width: scale(198),
    height: scale(56),
    marginHorizontal: scale(30),
    marginVertical: scale(20),
    marginBottom: scale(Platform.OS === 'ios' ? 35 : 20),
  },
  buttonContain2: {
    // paddingTop: scale(40),
    // top: scale(Platform.OS === 'ios' ? 660 : 640),
    width: '100%',
    position: 'absolute',
    bottom: scale(-240),
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
    width: scale(198),
    height: scale(56),
  },
  indicator: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  imagesGreeting: {
    // resizeMode: 'contain',
    // alignSelf: 'center',
    marginTop: scale(4),
  },
});
