import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
import { scale, screenHeight, verticalScale } from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  dataContainer: {
    // backgroundColor: 'rgba(0,0,0,0.8)',
    flexDirection: 'row',
    paddingTop: verticalScale(20),
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: scale(20),
    marginVertical: verticalScale(8),
  },
  header: {
    fontSize: scale(16),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: verticalScale(5),
  },
  title: {
    fontSize: scale(16),
  },
  scrollViewContainer: {
    width: '30%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sectionListContainer: {
    width: '50%',
    marginLeft: scale(30),
  },
  flatListConstainer: {
    marginHorizontal: scale(5),
  },
  img: {
    width: scale(180),
    height: verticalScale(246),
    marginTop: verticalScale(30),
    borderRadius: scale(20),
    resizeMode: 'contain',
  },
  favImg: {
    width: scale(180),
    height: verticalScale(246),
    marginTop: verticalScale(30),
    borderRadius: scale(20),
    resizeMode: 'contain',
    // position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'rgba(0,0,0,0.1)',
  },
  titleOne: {
    fontSize: scale(16),
    // fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: scale(20),
    fontFamily: fonts.avenirNextRegular,
  },
  activeStyle: {
    width: scale(5),
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: verticalScale(15),
    top: verticalScale(15),
    right: 0,
  },
  favouriteIcon: {
    width: scale(25),
    height: verticalScale(25),
    marginHorizontal: scale(5),
    marginLeft: scale(5),
    // marginTop: scale(5),
    resizeMode: 'contain',
  },
  expiredText: {
    color: colors.white,
    fontSize: scale(10),
    fontFamily: fonts.helveticaNeueLight,
    letterSpacing: 0.5,
  },
  expiredButtonContainer: {
    position: 'absolute',
    right: scale(20),
    top: verticalScale(60),
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    borderRadius: scale(5),
  },
  nameText: {
    color: colors.grayBorder,
    fontSize: scale(20),
    fontFamily: fonts.helveticaNeueRegular,
    letterSpacing: 0.5,
    marginBottom: verticalScale(20),
  },
  offerText: {
    fontSize: scale(22),
    fontFamily: fonts.helveticaNeueRegular,
    letterSpacing: 0.5,
  },
  productImage: {
    height: verticalScale(330),
    width: scale(300),
    marginLeft: scale(Platform.OS === 'android' ? 1 : -10),
    marginTop: scale(Platform.OS === 'android' ? 1 : -2),
    borderTopLeftRadius: scale(20),
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  flexDir: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  logoImage: {
    height: scale(65),
    width: scale(65),
    borderRadius: scale(12),
    // resizeMode: 'contain',
    // marginHorizontal: scale(20),
    marginTop: scale(24),
    right: scale(
      Platform.OS === 'ios'
        ? screenHeight < 700
          ? 15
          : 35
        : screenHeight < 700
        ? 20
        : 40,
    ),
  },
  alignProductTextWidth: {
    marginVertical: scale(10),
    color: colors.white,
    fontSize: scale(22),
    fontFamily: fonts.helveticaNeueMedium,
    lineHeight: scale(32),
    // width: '20%',
  },
  nameContain: {
    marginHorizontal: scale(24),
    marginTop: scale(
      screenHeight < 700 ? (Platform.OS === 'android' ? -45 : -20) : 5,
    ),
  },
  subText: {
    marginHorizontal: scale(24),
    color: colors.white,
    fontSize: scale(15),
    fontFamily: fonts.helveticaNeueLight,
    marginTop: scale(10),
  },

  productImageFav: {
    height: scale(185),
    width: scale(165),
    marginLeft: scale(Platform.OS === 'android' ? 1 : -10),
    marginTop: scale(Platform.OS === 'android' ? 0 : -6),
    borderTopLeftRadius: scale(12),
    borderTopRightRadius: scale(20),
    // resizeMode: 'contain',
    // backgroundColor: 'red',
  },
  logoImageFav: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(6),
    // resizeMode: 'contain',
    // marginHorizontal: scale(20),
    marginTop: scale(20),
    // right: scale(30),
    right: scale(Platform.OS === 'android' ? 50 : 45),
  },

  alignProductTextWidthFav: {
    marginHorizontal: scale(24),
    marginVertical: scale(20),
    color: colors.white,
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    // lineHeight: scale(32),
    // width: '20%',
  },
  manageNoFavContain: {},
  mainContain: {
    alignItems: 'center',
    marginHorizontal: scale(Platform.OS === 'android' ? -12 : -6),
    marginVertical: scale(-15),
  },
  gradientContain: {
    marginVertical: scale(20),
    width: Platform.OS === 'android' ? '80%' : '85%',
    borderRadius: scale(16),
  },
  mainComponent: {
    marginHorizontal: scale(14),
    borderRadius: scale(24),
    height: scale(
      screenHeight < 800 ? (Platform.OS === 'android' ? 430 : 480) : 504,
    ),
    width: scale(342),
    justifyContent: 'center',
    marginTop: screenHeight < 800 ? scale(5) : scale(30),
    //     marginTop: screenHeight > 700 ? scale(25) : scale(30),
  },
});
