import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Platform} from 'react-native';
import {colors} from '../../constants/styles';

import {ifIphoneX} from 'react-native-iphone-x-helper';
import {scale} from '../../utils/scale';
import Tab from './Tab';

const TabBar = (props: any) => {
  const {
    state = {},
    tabColors = [],
    descriptors = {},
    activeTintColor,
    navigation = {},
    style,
  } = props;
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        },
        styles.container,
      ]}>
      {state.routes.map((route, index) => {
        return (
          <Tab
            key={route.key}
            renderIcon={descriptors[route.key].options.tabBarIcon}
            tabBarLabel={descriptors[route.key].options.tabBarLabel}
            route={route}
            isActive={index === state.index}
            activeColors={tabColors[index]}
            inactiveColor={activeTintColor}
            onTabPress={({route: {name}}) => {
              navigation.navigate(name);
            }}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...ifIphoneX(
      {
        height: scale(85),
      },
      {
        height: scale(65),
      },
    ),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderTopWidth: 0,
    backgroundColor: colors.primaryColor,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    ...Platform.select({
      android: {
        elevation: 16,
      },
      ios: {
        borderBottomWidth: 2,
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
      },
    }),
  },
});

TabBar.propTypes = {
  renderIcon: PropTypes.func.isRequired,
  tabColors: PropTypes.array.isRequired,
  inactiveTintColor: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  onTabPress: PropTypes.func.isRequired,
};

export default TabBar;
