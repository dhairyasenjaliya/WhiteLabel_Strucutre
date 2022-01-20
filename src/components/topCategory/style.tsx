import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    backgroundColor: '#282828',
    marginHorizontal: 5,
    borderRadius: scale(5),
    marginTop: scale(20),
  },
  imageContainer: {
    backgroundColor: '#282828',
    marginHorizontal: 5,
    borderRadius: scale(5),
  },
  img: {
    height: scale(103),
    width: scale(108),
    resizeMode: 'cover',
    borderRadius: 5,
    top: -10,
    left: -5,
  },
  name: {
    fontSize: scale(16),
    lineHeight: scale(20),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
    // marginTop:scale(1),
  },
});
