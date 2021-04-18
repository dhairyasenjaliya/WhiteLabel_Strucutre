import { Animated, StyleSheet } from 'react-native';
import { scale } from '../../../utils/scale';

export default StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  childView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: scale(20),
  },
  text: {
    marginLeft: 5,
    fontSize: 12,
  },
});
