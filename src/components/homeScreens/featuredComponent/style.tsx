import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/scale';
import {fonts} from '../../../constants/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(10),
    paddingVertical: scale(5),
    marginTop: scale(10),
    marginLeft: scale(20),
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 8,
    // },
    // shadowOpacity: 0.44,
    // shadowRadius: 10.32,
    // elevation: 12,
  },
  detailsContainer: {
    marginLeft: scale(27),
  },
  salonNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  img: {
    height: scale(103),
    width: scale(103),
    resizeMode: 'contain',
    borderRadius: scale(10),
    marginLeft: scale(-20),
  },
  salonName: {
    fontSize: scale(16),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.helveticaNeueMedium,
    width: '70%',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: scale(5),
  },
  ratingIcon: {
    height: scale(11),
    width: scale(15),
    resizeMode: 'contain',
  },
  ratingTitle: {
    fontSize: scale(12),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
  },
  distance: {
    fontSize: scale(12),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
  },
  availability: {
    fontSize: scale(12),
    lineHeight: scale(21),
    color: '#ED8A19',
    fontFamily: fonts.avenirNextMedium,
  },
  timing: {
    fontSize: scale(12),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerIcon: {
    height: scale(16),
    width: scale(16),
    resizeMode: 'contain',
  },
  offerTitle: {
    fontSize: scale(12),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.avenirNextRegular,
  },
});
