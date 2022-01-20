// Import Screens
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import homeScreen from '../container/homeScreen';
// import searchScreen from '../container/searchScreen';
// import myAccount from '../container/myAccount';
// import otpScreen from '../container/authScreen/loginScreen';
import * as React from 'react';
import { YellowBox } from 'react-native';
import { connect } from 'react-redux';
import appointmentdetails from '../container/appointmentDetails';
import Login from '../container/authScreen';
import otpScreen from '../container/authScreen/otpScreen';
import bannerDetail from '../container/bannerDetail';
import bookingDetails from '../container/bookingDetails';
import bookStylist from '../container/bookStylist';
import changeLocation from '../container/changeLocation';
import checkOutDeals from '../container/checkOutDeals';
import checkOutDetails from '../container/checkOutDetails';
import dealDetailsFirst from '../container/dealDetailsFirst';
import dealProductDetail from '../container/dealProductDetail';
import dealScreen from '../container/dealScreen';
import DealInfo from '../container/deal_Info';
import MyDeal from '../container/myDeals';
import onBoarding from '../container/onBoarding/';
import OrderHistory from '../container/orderHistory';
import OrderHistoryDetails from '../container/orderHistoryDetails';
import productDetail from '../container/productDetail';
import productScreen from '../container/productScreen';
import promotionalOffers from '../container/promotionalOffers';
import salonDetail from '../container/salonDetail';
import scheduleDetail from '../container/scheduleDetail';
import serviceList from '../container/serviceList';
import ShareReferral from '../container/shareReferral';
import SingleProductDetail from '../container/singleProductDetail';
import stylishDetails from '../container/stylishDetails';
import { navigationRef } from './rootNavigation';
import BottomTabs from './tabNavigator';

YellowBox.ignoreWarnings(['Require cycle:', 'Warning: Async Storage']);
const Stack = createStackNavigator();

export interface IProps {
  user: Object;
}

class Navigator extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {authToken} = this.props.user;
    return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none">
          {authToken ? (
            <>
              <Stack.Screen name="onBoard" component={onBoarding} />
              <Stack.Screen
                name="BottomTabs"
                component={BottomTabs}
                options={{
                  gestureEnabled: false,
                  // title: 'Profile',
                  // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen name="dealScreen" component={dealScreen} />
              <Stack.Screen name="productScreen" component={productScreen} />
              <Stack.Screen
                name="singleProductDetail"
                component={SingleProductDetail}
              />

              <Stack.Screen
                name="dealProductDetail"
                component={dealProductDetail}
              />
              <Stack.Screen name="DealInfo" component={DealInfo} />
              <Stack.Screen name="OrderHistory" component={OrderHistory} />
              <Stack.Screen
                name="OrderHistoryDetails"
                component={OrderHistoryDetails}
              />
              <Stack.Screen name="bookingDetails" component={bookingDetails} />
              <Stack.Screen
                name="promotionalOffers"
                component={promotionalOffers}
              />
              <Stack.Screen name="salonDetail" component={salonDetail} />
              <Stack.Screen
                name="checkOutDetails"
                component={checkOutDetails}
              />
              <Stack.Screen name="checkOutDeals" component={checkOutDeals} />
              <Stack.Screen name="ShareReferral" component={ShareReferral} />
              <Stack.Screen name="stylishDetails" component={stylishDetails} />
              <Stack.Screen name="MyDeal" component={MyDeal} />
              <Stack.Screen name="serviceList" component={serviceList} />
              <Stack.Screen name="bookStylist" component={bookStylist} />
              <Stack.Screen
                name="dealDetailsFirst"
                component={dealDetailsFirst}
              />
              <Stack.Screen name="productDetail" component={productDetail} />
              <Stack.Screen name="scheduleDetail" component={scheduleDetail} />
              <Stack.Screen
                name="appointmentdetails"
                component={appointmentdetails}
              />
              <Stack.Screen name="bannerDetail" component={bannerDetail} />

              <Stack.Screen name="changeLocation" component={changeLocation} />
            </>
          ) : (
            <>
              <Stack.Screen name="onBoard" component={onBoarding} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="otpScreen" component={otpScreen} />
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = ({user = []}) => ({
  user,
});

export default connect(mapStateToProps, {
  // verifyOtp,
  // logOut,
})(Navigator);
