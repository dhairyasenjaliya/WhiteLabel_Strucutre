import {StyleSheet, Dimensions, Platform} from 'react-native';
// const { width } = Dimensions.get('window');
import {scale, screenHeight, fontScale, verticalScale, screenWidth} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX(
      {
        marginTop: verticalScale(-10),
      },
      {
        marginTop: verticalScale(-10),
      },
    ),
    // backgroundColor: '#35363A',
  },
  image: {
    // marginLeft: scale(10),
    // marginRight: scale(40),
    width: screenWidth,
    height: verticalScale(440),
    marginLeft: scale(-40),
    // resizeMode: 'stretch',
    // marginTop: scale(Platform.OS === 'ios' ? 40 : 40),
  },
  shareContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    // flex: 1,
  },
  logoSize: {
    // height:scale(40),
    // marginVertical:scale(50),
    marginLeft: scale(5),
    marginTop: verticalScale(60),
    // resizeMode: 'contain',
    // height: scale(64),
    // width: scale(71),
    // borderRadius: scale(12),

    height: verticalScale(60),
    width: scale(70),
    borderRadius: scale(12),
  },
  shareIcon: {
    width: scale(40),
    height: verticalScale(40),
    // marginVertical:scale(50),
    marginLeft: scale(5),
    marginTop: verticalScale(30),
    borderRadius: scale(20),
    // tintColor: 'red',
  },
  favouriteIcon: {
    width: scale(40),
    height: verticalScale(40),
    marginLeft: scale(10),
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    marginLeft: scale(16),
    marginTop: verticalScale(28),
    // backgroundColor: 'red',
    // resizeMode: 'contain',
  },
  productName: {
    color: colors.White,
    fontSize: fontScale(20),
    // marginLeft: scale(20),
    fontWeight: 'bold',
    fontFamily: fonts.proximaNovaABold,
    // width: '80%',

    marginTop: verticalScale(10),
      
  },
  productDetail: {
    color: colors.White,
    fontSize: scale(15),
    // marginLeft: scale(20),
    // marginHorizontal: scale(20),
    fontFamily: fonts.proximaNovaALight,
    // justifyContent: 'flex-start',
    ...ifIphoneX(
      {
        marginTop: scale(20),
      },
      {
        marginTop: scale(Platform.OS === 'ios' ? 10 : 10),
      },
    ),
  },
  productPrice: {
    color: colors.White,
    fontSize: scale(18),
    // marginLeft: scale(20),
    // marginHorizontal: scale(20),
    fontFamily: fonts.proximaNovaABold,
    ...ifIphoneX(
      {
        marginTop: scale(20),
        marginBottom: scale(10),
      },
      {
        marginTop: scale(
          Platform.OS === 'ios' ? 10 : screenHeight > 800 ? 20 : 10,
        ),
      },
    ),
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    marginLeft: scale(25),
    alignContent: 'center',
    marginHorizontal: scale(20),
    // position: 'absolute',
    // top: scale(
    //   Platform.OS === 'ios'
    //     ? screenHeight > 800
    //       ? 260
    //       : 175
    //     : screenHeight > 800
    //     ? 200
    //     : 130,
    // ),
  },
  buyNow: {
    backgroundColor: colors.White,
    // padding: scale(20),
    paddingHorizontal: scale(75),
    borderRadius: scale(12),
    justifyContent: 'center',
    height: scale(56),
  },
  details: {
    backgroundColor: colors.darkBlack,
    // padding: scale(20),
    paddingHorizontal: scale(25),
    borderRadius: scale(12),
    marginLeft: scale(20),
    height: scale(56),
    justifyContent: 'center',
  },
  textDetails: {
    color: colors.White,
    fontWeight: 'bold',
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(15),
  },
  buyButtonText: {
    fontFamily: fonts.helveticaNeueMedium,
    fontSize: scale(15),
    justifyContent: 'center',
  },
  sheetIcon: {
    width: scale(20),
    height: scale(20),
    // marginHorizontal:scale(50)
  },
  sheetContainer: {
    flexDirection: 'row',
    paddingVertical: scale(10),
    // backgroundColor: 'red',
  },
  textWidth: {
    width: '70%',
  },
  backIcon: {
    // marginTop: scale(10),
    resizeMode: 'contain',
    width: scale(48),
    height: scale(48),
    borderRadius: scale(12),
  },
  flatlistInside: {
    marginVertical: scale(2),
  },
  iconAlign: {
    width: '20%',
    // marginLeft: scale(1),
    alignItems: 'center',
  },
  contentContainer: {
    marginVertical: scale(10),
    paddingVertical: scale(5),
  },
  contentHorizontal: {
    marginHorizontal: scale(10),
    marginVertical: scale(10),
    marginBottom: scale(screenHeight > 800 ? 20 : 30),
  },
  serviceNameContain: {
    marginHorizontal: scale(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    // width: '20%',
    // padding: scale(screenHeight > 800 ? 10 : 5),
    borderRadius: scale(12),
  },
  serviceNameText: {
    color: colors.white,
    paddingHorizontal: scale(10),
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
  },
  marginBtm: {
    // marginBottom: scale(screenHeight > 800 ? 20 : 0),
  },
  detailContain: {
    // position: 'absolute',
    // top: scale(screenHeight > 800 ? 400 : 380),
    // bottom: scale(),
  },
  detailText: {
    marginHorizontal: scale(20),
  },
});
