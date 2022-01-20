import {StyleSheet} from 'react-native';
import {colors, fonts, SCREENWIDTH, SCREENHEIGHT} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  touchPad: {
    backgroundColor: colors.touchpadColor,
    height: SCREENHEIGHT > 700 ? scale(270) : 230,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  touchPadButton: {
    width: SCREENWIDTH / 3,
    height: scale(34),
    marginTop: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchpadText: {
    fontSize: scale(28),
    color: colors.white,
    fontFamily: fonts.robotoRegular,
  },
});
