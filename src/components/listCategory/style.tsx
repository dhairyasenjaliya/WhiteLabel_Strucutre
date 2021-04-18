import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts} from '../../constants/styles';

export default StyleSheet.create({
  renderCategoryItemContainer: {
    marginLeft: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    height: scale(96),
    width: scale(64),
    resizeMode: 'contain',
  },
  categoryTitle: {
    color: '#fff',
    fontSize: scale(12),
    lineHeight: scale(21),
    fontFamily: fonts.avenirNextRegular,
  },
});
