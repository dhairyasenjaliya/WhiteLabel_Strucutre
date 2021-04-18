import {StyleSheet} from 'react-native';
import {colors, fonts} from '../../constants/styles';
import {scale} from '../../utils/scale';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.screenBackground,
  },
  couponInput: {
    backgroundColor: colors.screenBack,
    marginHorizontal: scale(16),
    marginVertical: scale(10),
    marginTop: scale(25),
    borderRadius: scale(8),
    paddingHorizontal: scale(16),
    fontSize: scale(16),
    letterSpacing: 0.7,
    color: colors.grayColor,
    paddingVertical: scale(11),
  },
  title: {
    marginHorizontal: scale(15),
    marginVertical: scale(12),
    fontSize: scale(16),
    color: colors.white,
    letterSpacing: 1,
    fontFamily: fonts.avenirNextMedium,
  },
  card: {
    backgroundColor: colors.backColor,
    marginBottom: scale(10),
    paddingVertical: scale(11),
    paddingHorizontal: scale(15),
  },
  cardTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  copyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  couponView: {
    backgroundColor: colors.touchpadColor,
    paddingVertical: scale(10),
    width: scale(123),
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: scale(8),
    borderColor: colors.dotedBorderColor,
  },
  couponText: {
    letterSpacing: 3,
    fontSize: scale(16),
    color: colors.lightOrange,
  },
  apply: {
    fontSize: scale(16),
    color: colors.lightOrange,
    padding: scale(10),
  },
  offer: {
    marginTop: scale(15),
    fontSize: scale(18),
    color: colors.white,
    fontFamily: fonts.robotoRegular,
  },
  offerDesc: {
    fontSize: scale(12),
    color: colors.grayColor,
    lineHeight: scale(21),
    fontFamily: fonts.avenirNextMedium,
  },
  detailsBtn: {
    width: scale(100),
    paddingVertical: 2,
  },
  viewDetails: {
    fontSize: scale(12),
    color: colors.orangeText,
    fontFamily: fonts.avenirNextMedium,
  },
  detailOffer: {
    fontSize: scale(16),
    letterSpacing: 1,
    color: colors.white,
  },
  detailOfferText: {
    marginTop: scale(28),
    fontFamily: fonts.robotoRegular,
    color: colors.white,
  },
  voucher: {
    fontSize: scale(12),
    marginTop: scale(27),
    color: colors.white,
    marginBottom: scale(5),
  },
  copy: {
    marginLeft: scale(8),
    transform: [{scaleX: -1}],
  },
  detailsView: {
    flexDirection: 'row',
    marginBottom: scale(10),
    alignItems: 'center',
  },
  detailDesc: {
    fontSize: scale(12),
    color: colors.white,
    fontFamily: fonts.robotoRegular,
    marginLeft: scale(7),
  },
});
