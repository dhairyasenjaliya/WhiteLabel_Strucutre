import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts, colors} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: scale(15),
    marginTop: scale(16),
  },
});
