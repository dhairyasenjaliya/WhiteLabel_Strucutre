import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/styles';
import { scale } from '../../utils/scale';

export default StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingRight: scale(12),
    marginTop: scale(16),
  },
  img: {
    height: scale(103),
    width: scale(108),
    resizeMode: 'cover',
    borderRadius: 5,
  },
  name: {
    fontSize: scale(14),
    lineHeight: scale(16),
    color: '#fff',
    marginTop: scale(10),
    fontFamily: fonts.avenirNextMedium,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationTitle: {
    color: '#AAB2B7',
    fontSize: scale(10),
    lineHeight: scale(16),
    fontFamily: fonts.avenirNextRegular,
    // marginLeft: scale(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.White,
    color: '#000',
    width: scale(40),
    position: 'absolute',
    top: scale(5),
    right: scale(12),
    borderTopLeftRadius: scale(3),
    borderBottomLeftRadius: scale(3),
  },
  ratingIcon: {
    height: scale(13),
    width: scale(13),
    resizeMode: 'contain',
    marginLeft: scale(5),
  },
  ratingTitle: {
    fontSize: scale(12),
    lineHeight: scale(21),
    marginHorizontal: scale(2),
    fontFamily: fonts.avenirNextRegular,
  },
});
