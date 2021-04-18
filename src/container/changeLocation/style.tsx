import {StyleSheet, Platform} from 'react-native';
import {colors, SCREENHEIGHT} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
    ...Platform.select({
      android: {
        marginTop: scale(30),
      },
    }),
    // alignItems: 'center'
  },
  goBack: {
    width: scale(40),
    height: scale(40),
    padding: scale(5),
    marginTop: scale(13),
  },
  gobonyImage: {
    marginVertical: SCREENHEIGHT > 700 ? scale(10) : scale(20),
  },
  title: {
    fontSize: scale(16),
    color: colors.white,
  },
  groupImage: {
    marginTop: SCREENHEIGHT > 700 ? scale(45) : scale(30),
    height: SCREENHEIGHT > 700 ? scale(210) : scale(190),
  },
  eachReferral: {
    marginTop: scale(20),
    color: colors.white,
    marginBottom: scale(5),
  },
  verticalLine: {
    width: 1,
    height: scale(10),
    backgroundColor: colors.purple,
  },
  horizontalLine: {
    height: 1,
    width: scale(210),
    backgroundColor: colors.purple,
  },
  verticalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(210),
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: scale(60),
    marginRight: scale(30),
  },
  detail: {
    width: '35%',
  },
  selfText: {
    color: colors.white,
    fontSize: scale(12),
    lineHeight: scale(21),
  },
  rupees: {
    color: colors.lightOrange,
    lineHeight: scale(21),
  },
  terms: {
    color: colors.white,
    fontSize: scale(12),
    marginTop: SCREENHEIGHT > 700 ? scale(40) : scale(15),
    textAlign: 'center',
    lineHeight: scale(21),
  },
  inviteButton: {
    paddingVertical: SCREENHEIGHT > 700 ? scale(18) : scale(16),
    backgroundColor: colors.lightOrange,
    marginHorizontal: scale(20),
    borderRadius: scale(5),
    marginTop: SCREENHEIGHT > 700 ? scale(25) : scale(15),
  },
  inviteText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
  },
  changeButton: {
    fontSize: scale(12),
    ...Platform.select({
      android: {
        marginBottom: scale(25),
      },
      ios: {
        marginBottom: scale(10),
      },
    }),
  },
});
