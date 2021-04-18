import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {colors, fonts, SCREENHEIGHT} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    ...Platform.select({
      android: {
        marginTop: scale(30),
      },
    }),
  },
  contentContain: {
    marginHorizontal: scale(20),
    paddingTop: scale(20),
  },
  mainTitleText: {
    fontSize: scale(18),
    fontFamily: fonts.helveticaNeueMedium,
  },
  subTitleText: {
    fontSize: scale(12),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textGrey,
    marginTop: scale(5),
    marginBottom: scale(15),
  },
  descriptionText: {
    fontSize: scale(13),
    fontFamily: fonts.helveticaNeueLight,
    color: colors.textGrey,
  },
  paddingContent: {
    padding: scale(70),
    marginVertical: scale(10),
  },
  subMainTitleText: {
    fontSize: scale(14),
    fontFamily: fonts.helveticaNeueMedium,
    marginVertical: scale(10),
  },
});
