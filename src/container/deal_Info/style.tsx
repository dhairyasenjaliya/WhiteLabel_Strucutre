import {StyleSheet, Dimensions, Platform} from 'react-native';
// const { width } = Dimensions.get('window');
import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import {ifIphoneX} from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...ifIphoneX(
      {
        marginTop: scale(-10),
      },
      {
        // marginTop: scale(10),
      },
    ),
    // backgroundColor: '#35363A',
  },
  image: {
    // marginLeft: scale(10),
    // marginRight: scale(40),
    width: scale(450),
    height: scale(440),
    marginLeft: scale(-40),
    // resizeMode: 'stretch',
    // marginTop: scale(Platform.OS === 'ios' ? 40 : 40),
  },
  shareContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    flex: 1,
  },
  logoSize: {
    // height:scale(40),
    // marginVertical:scale(50),
    marginLeft: scale(5),
    marginTop: scale(60),
    // resizeMode: 'contain',
    // height: scale(64),
    // width: scale(71),
    // borderRadius: scale(12),

    height: scale(70),
    width: scale(70),
    borderRadius: scale(12),
  },
  shareIcon: {
    width: scale(40),
    height: scale(40),
    // marginVertical:scale(50),
    marginLeft: scale(5),
    marginTop: scale(30),
    borderRadius: scale(20),
    // tintColor: 'red',
  },
  favouriteIcon: {
    width: scale(40),
    height: scale(40),
    marginLeft: scale(10),
  },
  backButton: {
    position: 'absolute',
    zIndex: 100,
    marginLeft: scale(16),
    marginTop: scale(28),

    // backgroundColor: 'red',
    // resizeMode: 'contain',
  },
  productName: {
    color: colors.White,
    fontSize: scale(20),
    // marginLeft: scale(20),
    fontWeight: 'bold',
    fontFamily: fonts.proximaNovaABold,
    // width: '80%',
    ...ifIphoneX(
      {
        marginTop: scale(10),
      },
      {
        marginTop: scale(Platform.OS === 'ios' ? -45 : -20),
      },
    ),
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
        marginTop: scale(Platform.OS === 'ios' ? 10 : 20),
      },
    ),
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: scale(Platform.OS === 'ios' ? 5 : 30),
    marginLeft: scale(25),
    alignContent: 'center',
    marginHorizontal: scale(20),
    position: 'absolute',
    top: scale(Platform.OS === 'ios' ? 260 : 200),
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
  },
  serviceNameContain: {
    marginHorizontal: scale(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    // width: '20%',
    padding: 10,
    borderRadius: scale(12),
  },
  serviceNameText: {
    color: colors.white,
    paddingHorizontal: scale(10),
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
  },
  marginBtm: {
    marginBottom: scale(20),
  },
  detailContain: {
    position: 'absolute',
    top: scale(400),
    // bottom: scale(),
  },
  detailText: {
    marginHorizontal: scale(20),
  },
  marginTop: {
    marginTop: scale(17),
  },
});
