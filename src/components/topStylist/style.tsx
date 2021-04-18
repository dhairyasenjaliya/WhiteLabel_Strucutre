import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(15),
    // marginTop: scale(16),
    padding: scale(10),
  },
  img: {
    height: scale(65),
    width: scale(65),
    borderRadius: scale(50),
    // resizeMode: 'cover',
  },
  name: {
    textAlign: 'center',
    fontSize: scale(12),
    lineHeight: scale(16),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
    marginTop: scale(8),
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
