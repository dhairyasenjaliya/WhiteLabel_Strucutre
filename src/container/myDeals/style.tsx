import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {colors, fonts, SCREENHEIGHT} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.screenBackground,
    ...Platform.select({
      android: {
        // marginTop: scale(30),
      },
    }),
  },
  renderCouponsContainer: {},
  couponTitle: {
    color: colors.white,
    fontSize: scale(16),
    fontFamily: fonts.proximaNovaABold,
  },
  mainCouponContainer: {
    marginHorizontal: scale(20),
    borderRadius: scale(12),
    marginVertical: scale(5),
  },
  voucherContainer: {
    // backgroundColor: 'rgba(0,0,0,0.2)',
    marginLeft: scale(7),
    marginRight: scale(24),
    borderRadius: scale(10),
    // paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    paddingBottom: scale(10),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    width: '70%',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(25),
    marginVertical: scale(26),
    alignItems: 'center',
  },
  flexRowSalon: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // marginHorizontal: scale(25),
    // marginVertical: scale(20),
  },
  img: {
    height: scale(48),
    width: scale(56),
    // resizeMode: 'contain',
    borderRadius: scale(12),
    marginLeft: scale(16),
    marginTop: scale(25),
    marginBottom: scale(15),
  },
  salonName: {
    fontSize: scale(16),
    fontFamily: fonts.helveticaNeueMedium,
    marginLeft: scale(9),
    color: colors.white,
  },
  validateText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.white,
  },
  statusbutton: {
    padding: scale(5),
    backgroundColor: 'rgba(216, 216, 216, 0.3)',
    borderRadius: scale(8),
    width: scale(127),
    height: scale(40),
    paddingLeft: scale(12),
  },
  statusText: {
    fontSize: scale(12),
    fontFamily: fonts.proximaNovaALight,
    color: colors.white,
  },
  statusValue: {
    fontSize: scale(14),
    fontFamily: fonts.proximaNovaABold,
    color: colors.white,
  },
  flatListStyle: {
    marginBottom: scale(70),
  },
  loaderAlign: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // indicator: {
  //   justifyContent: 'center', //Centered vertically
  //   alignItems: 'center', // Centered horizontally
  //   flex: 1,
  // },
});
