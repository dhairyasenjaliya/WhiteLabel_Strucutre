import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {fonts} from '../../constants/styles';

export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    ...Platform.select({
      android: {
        marginTop: scale(20),
      },
      ios: {
        marginTop: scale(20),
      },
    }),
    marginHorizontal: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    width: scale(48),
    height: scale(48),
    padding: scale(8),
    borderRadius: scale(12),
    left: scale(0),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlignVertical: 'center',
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  leftTitle: {
    flexDirection: 'row',
    marginTop: scale(20),
    marginHorizontal: scale(16),
  },
});
