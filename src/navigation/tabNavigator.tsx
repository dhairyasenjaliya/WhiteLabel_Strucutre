import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../constants/styles';
import dealScreen from '../container/dealScreen';
import homeScreen from '../container/homeScreen';
import myAccount from '../container/myAccount';
import productScreen from '../container/productScreen';
// import searchScreen from '../container/searchScreen';
import salonDetail from '../container/salonDetail';
import styles from './styles';


type BottomTabParams = {
  homeScreen: undefined;
  searchScreen: undefined;
  dealScreen: undefined;
  myAccount: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

function BottomTabsScreen(props: any) {
  const {appTheme} = props;
  let theme = appTheme.theme;
  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        activeTintColor: colors.darkOrange,
        style: [
          styles.tabContainer,
          {
            // shadowColor: '#0B0C0D',
          },
        ],
        // inactiveBackgroundColor:theme.PRIMARY_BACKGROUND_COLOR
      }}>
      <BottomTabs.Screen
        name="homeScreen"
        component={homeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/navigator/home.png')}
              style={{
                tintColor: color,
                height: 30,
                width: 30,
                alignContent: 'center',
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="salonDetail"
        component={salonDetail}
        options={{
          tabBarLabel: 'Booking',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/navigator/shopping-bag.png')}
              style={{
                tintColor: color,
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Products"
        component={productScreen}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/navigator/lotion.png')}
              style={{
                tintColor: color,
                alignContent: 'center',
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="dealScreen"
        component={dealScreen}
        options={{
          tabBarLabel: 'Deals',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/navigator/tab/discount.png')}
              style={{
                tintColor: color,
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="myAccount"
        component={myAccount}
        options={{
          tabBarLabel: 'My account',
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/navigator/tab/account.png')}
              style={{
                tintColor: color,
                height: 30,
                width: 30,
                resizeMode: 'contain',
              }}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(BottomTabsScreen);
