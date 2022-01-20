import { StyleSheet } from 'react-native';
import { fonts } from '../../constants/styles';
import { scale } from '../../utils/scale';

export default StyleSheet.create({
  stylistContainer: {
    flexDirection: 'row',
  },
  saloonContainer: {},
  img: {
    height: scale(80),
    width: scale(80),
    resizeMode: 'contain',
  },
  name: {
    // textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(16),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
  },
  heartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    height: scale(12),
    width: scale(12),
    resizeMode: 'contain',
  },
  heartTitle: {
    color: '#AAB2B7',
    fontSize: scale(12),
    lineHeight: scale(16),
    marginLeft: scale(4),
    fontFamily: fonts.avenirNextRegular,
  },
});
