import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(12),

    // marginBottom: scale(5),
  },
  inputView: {
    backgroundColor: 'rgba(0,0,0,0)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

    //   borderWidth: scale(1),
    // borderColor: colors.grayBorder,
  },
  input: {
    width: '80%',
    fontSize: scale(14),
    borderRadius: scale(8),
    color: colors.grayColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: fonts.helveticaNeueLight,
    paddingVertical: scale(1),
  },
  SectionStyle: {
    flexDirection: 'row',
    borderRadius: scale(8),
    backgroundColor: '#35363A',
    color: colors.White,
    alignSelf: 'center',
    height: scale(40),
    // marginHorizontal: scale(16),
    borderWidth: scale(1),
    borderColor: colors.greyHomeBorder,
  },
  ImageStyle: {
    margin: scale(10),
    justifyContent: 'center',
  },
  ImageStyle2: {
    margin: scale(10),
    justifyContent: 'center',
    position: 'absolute',
    right: scale(2),
    height: scale(20),
    width: scale(20),
  },
});
