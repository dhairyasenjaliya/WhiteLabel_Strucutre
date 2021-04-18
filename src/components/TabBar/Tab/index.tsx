import React, { PureComponent } from 'react';
import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
const screenWidth = Dimensions.get('window').width;

class Tab extends PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onTabPress: PropTypes.func.isRequired,
    renderIcon: PropTypes.func.isRequired,
    activeColors: PropTypes.object.isRequired,
    inactiveColor: PropTypes.string.isRequired,
  };

  constructor(props: anu) {
    super(props);

    this.tabWidth = screenWidth / 5;

    const tabWidth = props.isActive ? this.tabWidth : 50;
    const labelOpacity = props.isActive ? 1 : 0;
    const labelWidth = props.isActive ? this.tabWidth - 25 : 0;

    this.state = {
      tabWidth: new Animated.Value(tabWidth),
      labelOpacity: new Animated.Value(labelOpacity),
      labelWidth: new Animated.Value(labelWidth),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isActive !== this.props.isActive && prevProps.isActive) {
      this.animatedHide();
    } else {
      this.animatedOpen();
    }
  }

  animatedOpen = () => {
    const { tabWidth, labelWidth, labelOpacity } = this.state;

    Animated.parallel([
      Animated.timing(tabWidth, {
        toValue: this.tabWidth,
        duration: 300,
      }).start(),
      Animated.timing(labelWidth, {
        toValue: 50,
        duration: 300,
      }).start(),
      Animated.timing(labelOpacity, {
        toValue: 1,
        duration: 150,
        delay: 150,
      }).start(),
    ]);
  };

  animatedHide = () => {
    const { tabWidth, labelWidth, labelOpacity } = this.state;

    Animated.parallel([
      Animated.timing(tabWidth, {
        toValue: 50,
        duration: 300,
      }).start(),
      Animated.timing(labelWidth, {
        toValue: 0,
        duration: 300,
      }).start(),
      Animated.timing(labelOpacity, {
        toValue: 0,
        duration: 100,
      }).start(),
    ]);
  };

  render() {
    const { route, isActive, onTabPress, renderIcon, activeColors, inactiveColor, tabBarLabel } = this.props;
    const { tabWidth, labelWidth, labelOpacity } = this.state;
    const color = isActive ? activeColors : inactiveColor;

    console.log("this.state", this.state);
    console.log("this.props", this.props);

    return (
      <TouchableOpacity
        onPress={() => {
          onTabPress({ route });
        }}
        style={styles.container}
      >
        <Animated.View
          style={[{ width: tabWidth, backgroundColor: isActive ? activeColors : 'transparent' }, styles.childView]}
          isActive={isActive}
          activeBgColor={activeColors}
        >
          {renderIcon({
            route,
            focused: isActive,
            tintColor: color,
          })}
          {isActive && <Animated.Text
            numberOfLines={1}
            isActive={isActive}
            color={color}
            style={[{ opacity: labelOpacity, width: labelWidth, color: isActive ? "#fff" : "transparent" }, styles.text]}
          >
            {tabBarLabel}
          </Animated.Text> || <View />}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}



export default Tab;
