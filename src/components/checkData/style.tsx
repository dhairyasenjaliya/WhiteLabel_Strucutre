import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {colors, fonts, SCREENHEIGHT} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    height: '60%',
  },
});
