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
    width: '60%',
    marginHorizontal: scale(10),
  },
  saloonImage: {
    width: scale(54),
    height: scale(55),
    borderRadius: scale(5),
  },
  productImage: {
    width: scale(54),
    height: scale(60),
    marginRight: scale(10),
    // borderRadius: scale(5),
  },
  saloonTitle: {
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: fontScale(16),
  },
  address: {
    fontSize: scale(14),
    marginTop: scale(5),
    fontFamily: fonts.helveticaNeueLight,
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
    marginVertical: scale(20),
    padding: scale(10),
    borderRadius: scale(6),
    borderColor: colors.grayBorder,
    borderWidth: scale(1),
    marginHorizontal: scale(180),
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
    marginVertical: scale(20),
  },
  priceTitleAlignment: {
    flexDirection: 'row',
    marginHorizontal: scale(25),
  },
  priceTitleText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueLight,
    width: '80%',
  },
  priceValueText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    width: '20%',
    textAlign: 'right',
  },
  noteText: {
    fontSize: scale(14),
    color: colors.darkGray,
    fontFamily: fonts.helveticaNeueMedium,
    marginHorizontal: scale(20),
    // marginVertical: scale(10),
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
    color: colors.grayColor,
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
    fontSize: fontScale(14),
    fontFamily: fonts.avenirNextMedium,
    marginBottom: scale(5),
    width: '70%',
  },
  timeService: {
    fontSize: scale(16),
    fontFamily: fonts.avenirNextMedium,
    marginBottom: scale(5),
  },
  priceService: {
    fontSize: scale(14),
    fontFamily: fonts.robotoRegular,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  cartButton: {
    marginHorizontal: scale(15),
    position: 'absolute',
    bottom: scale(40),
    width: '90%',
    borderRadius: scale(10),
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
    color: colors.orangeBorder,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    textAlign: 'right',
    marginVertical: scale(5),
  },
  titleService: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginHorizontal: scale(20),
    marginVertical: scale(10),
  },
  flexRow: {
    marginHorizontal: scale(20),
    marginVertical: scale(10),
    flexDirection: 'row',
  },
  headerContain: {
    marginBottom: scale(10),
    ...Platform.select({
      android: {
        marginTop: scale(30),
      },
    }),
  },
  buttonBottom4: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
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
    width: '100%',
  },
});
