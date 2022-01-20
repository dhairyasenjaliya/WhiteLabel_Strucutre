import {StyleSheet, Platform} from 'react-native';
import {scale, fontScale} from '../../utils/scale';
import {colors, fonts, SCREENHEIGHT} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
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
    marginHorizontal: scale(10),
    marginVertical: scale(15),
    // marginVertical: scale(10),
  },
  map: {
    width: scale(56),
    height: scale(48),
    borderRadius: scale(15),
    marginVertical: scale(20),
  },
  logo: {
    width: scale(54),
    height: scale(53),
    borderRadius: scale(5),
    marginVertical: scale(20),
  },
  whiteColor: {
    color: colors.textGrey,
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: fontScale(16),
    marginTop: scale(5),
    // width: '80%',
    // marginRight: scale(20),
  },
  address: {
    color: colors.grayColor,
    fontSize: fontScale(12),
    marginTop: scale(5),
    fontFamily: fonts.helveticaNeueLight,
    width: '80%',
  },
  summaryBtn: {
    marginTop: scale(10),
  },
  summaryText: {
    color: colors.lightOrange,
    fontFamily: fonts.avenirNextMedium,
  },
  callView: {
    width: scale(84),
    borderColor: colors.lightOrange,
    borderRadius: scale(6),
    right: scale(17),
    position: 'absolute',
    top: scale(10),
    alignItems: 'center',
    height: scale(34),
    borderWidth: scale(1),
    flexDirection: 'row',
    backgroundColor: colors.blackBack,
  },
  callImage: {
    width: scale(20),
    height: scale(20),
    marginHorizontal: scale(12),
  },
  call: {
    color: colors.lightOrange,
    fontSize: scale(13),
    fontFamily: fonts.helveticaNeueMedium,
  },
  statusView: {
    // marginVertical: scale(17),
    // paddingVertical: scale(20),
    marginLeft: scale(39),
  },
  statusSubView: {
    flexDirection: 'row',
  },
  directionView: {
    height: scale(16),
    backgroundColor: colors.lightOrange,
    width: scale(1),
    marginLeft: scale(11),
  },
  checkView: {
    width: scale(22),
    height: scale(22),
    justifyContent: 'center',
    borderRadius: scale(22),
    backgroundColor: colors.lightOrange,
    borderColor: '#FF6D00',
    borderWidth: scale(1),
  },
  checkImage: {
    width: scale(12),
    height: scale(9),
    alignSelf: 'center',
    tintColor: colors.white,
  },
  checkImage2: {
    width: scale(22),
    height: scale(22),
    alignSelf: 'center',
    // tintColor: colors.white,
  },
  statusText: {
    color: colors.white,
    fontSize: scale(16),
    marginLeft: scale(27),
    fontFamily: fonts.avenirNextRegular,
  },
  stylistView: {
    backgroundColor: colors.backColor,
    paddingVertical: scale(16),
    paddingHorizontal: scale(14),
    // marginVertical: scale(10),
  },
  stylist: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueRegular,
    marginBottom: scale(10),
  },
  stylistSubView: {
    flexDirection: 'row',
    marginTop: scale(12),
  },
  stylistImageView: {
    alignItems: 'center',
    width: '30%',
  },
  stylistImage: {
    width: scale(58),
    height: scale(58),
    borderRadius: scale(58),
  },
  creative: {
    color: colors.grayBorder,
    fontSize: scale(10),
    fontFamily: fonts.avenirNextRegular,
  },
  stylistDesView: {
    width: '70%',
    alignContent: 'center',
  },
  stylistDes: {
    color: colors.white,
    marginTop: scale(8),
    fontSize: scale(16),
    fontFamily: fonts.proximaNovaABold,
  },
  likeView: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: scale(8),
    right: scale(15),
    position: 'absolute',
    fontFamily: fonts.avenirNextRegular,
  },
  likePerc: {
    color: colors.grayColor,
    marginLeft: scale(5),
  },
  bookingDetail: {
    backgroundColor: colors.backColor,
    marginTop: scale(15),
    paddingHorizontal: scale(20),
    paddingVertical: scale(12),
    marginBottom: SCREENHEIGHT > 700 ? 0 : scale(70),
    borderColor: colors.greyHomeBorder,
    borderTopWidth: scale(1),
    borderBottomWidth: scale(1),
  },
  booking: {
    color: colors.white,
    fontSize: scale(14),
    // marginBottom: scale(7),
    fontFamily: fonts.helveticaNeueMedium,
  },
  details: {
    marginVertical: scale(7),
  },
  detailTitle: {
    // color: colors.grayColor,
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(14),
  },
  detailValue: {
    color: colors.white,
    marginTop: scale(5),
    fontFamily: fonts.avenirNextRegular,
    // width: '20%',
  },
  scrollContainer: {
    marginTop: scale(20),
  },
  bookingSuccessText: {
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(16),
  },
  priceContainer: {
    marginVertical: scale(10),
    borderTopWidth: 1,
    borderColor: colors.greyHomeBorder,
    // marginHorizontal:scale(10)
  },
  priceTitleAlignment: {
    flexDirection: 'row',
    // marginHorizontal: scale(25),
  },
  priceTitleText: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextRegular,
    width: '80%',
  },
  priceValueText: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextMedium,
    width: '20%',
    textAlign: 'right',
  },
  appointmentContainer: {
    marginVertical: scale(5),
    // marginTop: scale(20),
  },
  serviceName: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    marginVertical: scale(2),
  },
  serviceTime: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
  },
  servicePerson: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    marginVertical: scale(2),
    color: colors.grayBorder,
  },
  appointmentFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appointmentFlex2: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  appointmentImage: {
    height: scale(50),
    width: scale(50),
    justifyContent: 'center',
    marginVertical: scale(5),
    marginHorizontal: scale(10),
    borderRadius: scale(40),
    // resizeMode: 'contain',
  },
  callText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
    marginVertical: scale(5),
    marginHorizontal: scale(10),
  },
  border: {
    borderColor: colors.greyHomeBorder,
    borderBottomWidth: scale(0.5),
    borderTopWidth: scale(0.5),
    padding: scale(5),
  },
  borderTopOnly: {
    borderColor: colors.greyHomeBorder,
    borderTopWidth: scale(0.5),
    marginVertical: scale(20),
    // paddingVertical: scale(10),
  },
  cancleButton: {
    // backg`roundColor: colors.orangeBorder,
    position: 'absolute',
    right: scale(10),
    top: scale(20),
    backgroundColor: 'rgba(241,114,19,0.17)',
    borderColor: colors.orangeBorder,
    borderWidth: scale(1),
    width: '50%',
    padding: scale(10),
    borderRadius: scale(8),
  },
  cancleText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
  },
  cancel: {
    fontSize: scale(12),
    color: colors.textRed,
    fontFamily: fonts.helveticaNeueRegular,
  },
  flatListContainer: {
    marginVertical: scale(20),
  },
  loaderAlign: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(10),
    // justifyContent: 'center',
  },
  paymentOpText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    marginLeft: scale(15),
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderColor: colors.greyHomeBorder,
  },
  rupesText: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.lightOrange,
  },
  payTextButoon: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
  },
  payButton: {
    width: scale(88),
    height: scale(37),
    borderWidth: scale(1),
    borderColor: colors.lightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(14.5),
    alignSelf: 'center',
  },
  supportPosition: {
    position: 'absolute',
    right: scale(16),
    top: scale(75),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  supportPositionText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    color: colors.lightOrange,
  },
  chatIcon: {
    marginRight: scale(5),
  },
  selectPaymentText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueCondensedBold,
  },
  customApplyButton: {
    // marginHorizontal: scale(5),
    width: scale(344),
    height: scale(52),
    // alignItems: 'center',
    // marginRight: scale(120),
  },
  logoWidth: {
    width: scale(60),
    height: scale(60),
  },
  cartButton: {
    marginHorizontal: scale(10),
    width: '95%',
    borderRadius: scale(15),
    // paddingHorizontal: scale(40),
  },
  marginTop: {
    ...Platform.select({
      android: {
        marginTop: scale(40),
      },
    }),
  },
});
