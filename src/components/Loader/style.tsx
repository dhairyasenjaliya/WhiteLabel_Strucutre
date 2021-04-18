import {StyleSheet} from 'react-native';
import {scale} from '../../utils/scale';
import {SCREENWIDTH, colors} from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: scale(12),
    paddingTop: scale(40),
    backgroundColor: '#202020',
  },
  backColor: {
    // backgroundColor: '#343434',
    borderRadius: scale(5),
  },
  topView: {
    width: scale(145),
    height: scale(14),
    borderRadius: scale(5),
    marginBottom: scale(10),
  },
  header: {
    marginTop: scale(17),
    width: SCREENWIDTH - 60,
    height: scale(40),
    borderRadius: scale(5),
  },
  listView: {
    flexDirection: 'row',
    marginTop: scale(20),
  },
  list: {
    width: scale(60),
    height: scale(60),
    marginRight: scale(20),
    borderRadius: scale(5),
  },
  subView: {
    marginTop: scale(50),
  },
  subViewBack: {
    // borderRadius: 2,
    backgroundColor: '#343434',
    borderRadius: scale(5),
  },
  mainView: {
    flexDirection: 'row',
    marginBottom: scale(15),
  },
  leftView: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(5),
  },
  rightView: {
    marginLeft: scale(15),
  },
  section1: {
    width: scale(83),
    height: scale(10),
    borderRadius: scale(5),
  },
  section2: {
    width: scale(155),
    height: scale(8),
    marginTop: scale(10),
    borderRadius: scale(5),
  },
  section3: {
    width: scale(100),
    height: scale(6),
    marginTop: scale(15),
    borderRadius: scale(5),
  },
  textStyle: {
    fontSize: scale(16),
    color: colors.white,
    textAlign: 'center',
    marginTop: scale(30),
  },
  line: {
    width: scale(43),
    height: 2,
    borderRadius: scale(0.5),
    backgroundColor: colors.white,
    alignSelf: 'center',
    marginTop: scale(15),
  },
  circle: {
    width: scale(30),
    height: scale(30),
    alignSelf: 'center',
    marginTop: scale(28),
  },
});
