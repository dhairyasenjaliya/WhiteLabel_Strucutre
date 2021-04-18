import {StyleSheet, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
import {colors, fonts, SCREENWIDTH} from '../../constants/styles';
// import {ifIphoneX} from 'react-native-iphone-x-helper';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  topStlist: {
    marginTop: scale(30),
    marginBottom: scale(20),
    color: '#fff',
    fontSize: scale(16),
    lineHeight: scale(21),
    marginLeft: scale(17),
    fontFamily: fonts.avenirNextMedium,
  },
  topStylistContainerStyle: {
    paddingLeft: scale(17),
  },
  offerCard: {
    marginBottom: scale(200),
    height: scale(140),
    width: scale(180),
    resizeMode: 'contain',
  },
  couponCardHolder: {
    marginLeft: scale(17),
  },
  searchContainer: {
    // marginHorizontal: scale(10),
    marginVertical: scale(20),
  },
  flexRow: {flexDirection: 'row'},
});
