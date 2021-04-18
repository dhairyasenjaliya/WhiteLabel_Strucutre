import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../utils/scale';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import {colors, fonts} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: scale(10),
    // marginBottom: scale(10),
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    //android
    elevation: 1,
    ...ifIphoneX(
      {
        // marginTop: scale(10),
      },
      {
        // marginTop: scale(15),
      },
    ),
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(5),

    ...Platform.select({
      android: {
        marginTop: scale(35),
      },
      ios: {
        marginTop: scale(35),
      },
    }),
    // marginTop: scale(30),
  },
  lhsIcon: {
    flex: 0.05,
    height: scale(16),
    width: scale(13),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  title: {
    flex: 0.9,
    fontSize: scale(16),
    lineHeight: scale(21),
    color: '#fff',
    fontFamily: fonts.helveticaNeueMedium,
  },
  rhsIcon: {
    height: scale(25),
    width: scale(25),
  },
});
