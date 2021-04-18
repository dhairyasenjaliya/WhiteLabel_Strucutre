import {StyleSheet, Platform} from 'react-native';
import {scale, screenHeight} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,

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
        shadowOpacity: 10,
        shadowRadius: 10,
      },
    }),

    // backgroundColor: 'white',
  },
  profileDetail: {
    paddingTop: scale(10),
    paddingBottom: scale(14),
    marginTop: scale(13),
    paddingHorizontal: scale(14),
    backgroundColor: colors.backColor,
    flexDirection: 'row',
  },
  imageView: {
    width: '60%',
    marginHorizontal: scale(10),
  },
  saloonImage: {
    width: scale(56),
    height: scale(48),
    borderRadius: scale(12),
  },
  productImage: {
    width: scale(54),
    height: scale(60),
    marginRight: scale(8),
    // borderRadius: scale(5),
  },
  saloonTitle: {
    fontFamily: fonts.avenirNextMedium,
    fontSize: scale(14),
  },
  address: {
    fontSize: scale(12),
    marginTop: scale(5),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textGrey,
  },
  statusView: {
    marginVertical: scale(17),
    marginLeft: scale(39),
  },
  statusSubView: {
    flexDirection: 'row',
  },
  timeAlignment: {
    position: 'absolute',
    right: scale(10),
    top: scale(10),
    // marginLeft: scale(80),
  },
  timeText: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextRegular,
  },
  serviceButton: {
    alignContent: 'center',
    marginLeft: scale(20),
    // marginVertical: scale(10),
    marginTop: scale(24),
    marginBottom: scale(15),
    padding: scale(10),
    borderRadius: scale(6),
    // borderColor: colors.darkOrange,
    // borderWidth: scale(1),
    marginHorizontal: scale(180),
    backgroundColor: 'rgba(238, 117, 15, 0.18)',
    // width: '30%',
  },
  couponContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    marginLeft: scale(20),
    marginTop: scale(10),
  },
  coupontext: {
    fontSize: scale(16),
    marginLeft: scale(10),
    fontFamily: fonts.avenirNextMedium,
  },
  priceContainer: {
    marginTop: scale(20),
    // borderTopWidth: scale(1),
    // borderBottomWidth: scale(1),
    borderColor: colors.greyHomeBorder,
  },
  priceTitleAlignment: {
    flexDirection: 'row',
    marginHorizontal: scale(25),
  },
  priceTitleText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    width: '80%',
    color: colors.textGrey,
  },
  totalTitleText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueLight,
    width: '80%',
    color: colors.textGrey,
  },
  priceValueText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    width: '20%',
    textAlign: 'right',
    color: colors.blackBack,
  },
  noteText: {
    fontSize: scale(14),
    color: colors.darkGray,
    marginLeft: scale(20),
    marginTop: scale(20),
    marginBottom: scale(100),
  },
  addbuttonService: {
    // height: scale(35),
    width: '100%',
    borderRadius: scale(6),
    justifyContent: 'center',
    alignContent: 'center',
  },
  serviceContainer: {
    flexDirection: 'row',
    marginHorizontal: scale(25),
    marginTop: scale(20),
  },
  serviceName: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextRegular,
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
  bookingSuccessText: {
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(16),
  },
  nameOfService: {
    fontSize: scale(15),
    fontFamily: fonts.helveticaNeueMedium,
    marginBottom: scale(5),
  },
  timeService: {
    fontSize: scale(12),
    fontFamily: fonts.avenirNextMedium,
    // marginBottom: scale(5),
    color: colors.textGrey,
    marginTop: scale(4),
  },
  priceService: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextMedium,
  },
  durationService: {
    fontSize: scale(12),
    color: colors.textGrey,
    fontFamily: fonts.avenirNextMedium,
    // textAlign: 'center',
  },
  secondSubContain: {
    // width: '70%',
    marginVertical: scale(5),
    marginHorizontal: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heightSpace: {
    marginVertical: scale(2),
    width: '105%',
  },
  productLogo: {
    height: scale(25),
    width: scale(25),
  },
  dateTimeViewer: {
    // marginHorizontal: scale(20),
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    padding: scale(10),
  },
  menuHorizontalLine: {
    borderBottomColor: colors.grayBorder,
  },
  selectService: {
    fontSize: scale(16),
    fontFamily: fonts.robotoRegular,
    marginBottom: scale(10),
    paddingHorizontal: scale(30),
  },
  timeSelectContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    flexDirection: 'row',
    marginHorizontal: scale(5),
    borderRadius: scale(5),
    marginVertical: scale(5),
  },
  imagesGreeting: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  // cartButton: {
  //   marginHorizontal: scale(15),
  //   position: 'absolute',
  //   bottom: scale(40),
  //   width: '90%',
  //   borderRadius: scale(10),
  // },
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
  mainTimePicker: {
    flex: 1,
  },
  calenderContainer: {
    marginTop: scale(30),
  },
  preferedTimeText: {
    marginLeft: scale(20),
    fontSize: scale(16),
    marginVertical: scale(20),
    fontFamily: fonts.avenirNextMedium,
  },
  selectedDataText: {
    fontSize: scale(18),
    marginTop: scale(15),
    marginBottom: scale(10),
    fontWeight: 'bold',
  },
  checkOutListStylist: {
    marginHorizontal: scale(20),
    marginVertical: scale(20),
  },
  flexDirection: {
    flexDirection: 'row',
  },
  topStlist: {
    marginTop: scale(30),
    color: '#fff',
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(17),
    fontFamily: fonts.helveticaNeueMedium,
  },
  viewAll: {
    marginTop: scale(10),
    color: colors.grayColor,
    fontSize: scale(14),
    lineHeight: scale(21),
    marginLeft: scale(20),
    fontFamily: fonts.helveticaNeueMedium,
  },
  topStylistContainerStyle: {
    paddingLeft: scale(17),
    marginTop: scale(20),
    marginBottom: scale(150),
  },
  removeText: {
    fontSize: scale(12),
    color: colors.textRed,
    fontFamily: fonts.helveticaNeueMedium,
    textAlign: 'right',
    marginTop: scale(5),
  },
  serviceContain: {
    marginTop: scale(10),
  },
  selectedText: {
    // color: colors.grayColor,
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(10),
    fontFamily: fonts.helveticaNeueMedium,
  },
  timeFlex: {
    flexDirection: 'row',
  },
  headerContain: {
    marginBottom: scale(20),
    ...Platform.select({
      android: {
        marginTop: scale(30),
      },
    }),
  },
  horizontalLineShow: {
    borderWidth: scale(1),
    marginHorizontal: scale(16),
    // marginVertical: scale(5),
    marginTop: scale(9),
    // marginBottom: scale(15),
    borderColor: colors.greyHomeBorder,
  },
  addmMore: {
    color: colors.blackBack,
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueMedium,
  },
  cartButton2: {
    width: '90%',
    marginHorizontal: scale(18),
    borderRadius: scale(10),
    marginBottom: scale(Platform.OS === 'ios' ? 5 : 15),
    marginVertical: scale(20),
  },
  bottomFix: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 5,
    // shadowRadius: 1.41,
    // elevation: 1,
    // position: 'absolute',
    // width: '100%',
    // bottom: scale(10),
    // borderTopWidth: scale(1),
    // borderColor: colors.greyHomeBorder,
  },
  buttonContain: {
    // paddingTop: scale(40),
    // top: scale(Platform.OS === 'ios' ? 710 : 680),
  
    position: 'absolute',
    width: '100%',
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.44,
    shadowRadius: 1.32,
    elevation: 200,
  },
  cartButton: {
    marginHorizontal: scale(16),
    width: '90%',
    borderRadius: scale(15),
  },
  cartContain: {
    marginBottom: scale(25),
    marginTop: scale(5),
  },
  centerPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  heyText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginTop: scale(16),
    marginBottom: scale(10),
  },
  noServiceText: {
    fontSize: scale(12),
    marginHorizontal: scale(40),
    color: colors.textGrey,
    fontFamily: fonts.helveticaNeueMedium,
  },
  marginHorizontal: {
    marginHorizontal: scale(20),
    marginVertical: scale(5),
  },
  paymentOption: {
    fontFamily: fonts.helveticaNeueLight,
    fontSize: scale(12),
  },
});
