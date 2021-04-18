import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {SCREENWIDTH, colors, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customViewMoreButton: {
    width: '70%',
    marginHorizontal: scale(50),
    marginVertical: scale(30),
    marginTop: scale(60),
  },
  errorNameText: {
    fontSize: scale(22),
    fontFamily: fonts.avenirNextMedium,
    marginHorizontal: scale(50),
    textAlign: 'center',
    marginTop: scale(20),
  },
  errorDescText: {
    fontSize: scale(14),
    fontFamily: fonts.avenirNextRegular,
    marginHorizontal: scale(40),
    textAlign: 'center',
    lineHeight: scale(18),
    marginTop: scale(10),
  },
});
