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
  searchContainer: {
    marginVertical: scale(20),
  },
  flexRow: {
    flexDirection: 'row',
  },
  salonName: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  locationText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.stylistName,
  },
  salonDetainContainer: {
    marginHorizontal: scale(16),
    marginBottom: scale(10),
    marginTop: scale(8),
  },
  genderButton: {
    borderRadius: scale(14.5),
    width: scale(105),
    height: scale(32),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  femaleButton: {
    marginLeft: scale(20),
    borderRadius: scale(14.5),
    width: scale(105),
    height: scale(32),
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    borderTopLeftRadius: scale(15),
    borderTopRightRadius: scale(15),
    backgroundColor: colors.touchpadColor,
    height: '100%',
    marginTop: scale(10),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  genderText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueMedium,
    textAlign: 'center',
  },
  genderContain: {
    flexDirection: 'row',
    marginLeft: scale(16),
    marginTop: scale(16),
    marginBottom: scale(32),
  },
  genderIcon: {
    marginLeft: scale(16),
    marginRight: scale(8),
  },
});
