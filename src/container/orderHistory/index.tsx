import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import { connect } from 'react-redux';
import { scale } from '../../utils/scale';
import images from '../../assets/images';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/styles';
import { getAllMyDeal, getMyDealNextLink } from '../../store/dealList/actions';
import themeReducer from '../../store/switchTheme';
import { getOrderHistoryNextLink } from '../../store/orderList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getAllMyDeal: Function;
  getMyDealNextLink: Function;
  getOrderHistoryNextLink: Function;
}

interface IState {
  orderHistory: Object;
  orderHistoryNextLink: String;
  isLoading: Boolean;
}

class OrderHistory extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      orderHistory: [],
      orderHistoryNextLink: '',
      isLoading: true,
    };
    this.onEndReachedCalledDuringMomentum = true;

  }

  componentDidMount() {
    const { orderList = [], appTheme, user = [] } = this.props;
    const { myOrderHistory = [] } = orderList;
    const { next_link = '', value = [] } = myOrderHistory;

    this.setState({
      orderHistory: value,
      orderHistoryNextLink: next_link,
    });
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderMoreOrderData = () => {
    // myOrderHistoryNext
    // console.log('ehehhehehehehehehhe morwe');

    const { orderList = [], getOrderHistoryNextLink } = this.props;
    const { orderHistoryNextLink = '' } = this.state;
    const { myOrderHistoryNext = [], isLoadingData = '' } = orderList;
    let myOrderHistoryNextLink2 =
      myOrderHistoryNext && myOrderHistoryNext.next_link;

    let myOrderHistoryNextValue =
      myOrderHistoryNext && myOrderHistoryNext.value;

    if (orderHistoryNextLink) {
      getOrderHistoryNextLink(orderHistoryNextLink);
    }

    console.log("myOrderHistoryNextLink2", myOrderHistoryNextLink2);
    console.log("myOrderHistoryNextValue", myOrderHistoryNextValue);

    if (orderHistoryNextLink !== myOrderHistoryNextLink2) {
      this.setState({
        orderHistoryNextLink: myOrderHistoryNextLink2,
        orderHistory: this.state.orderHistory.concat(myOrderHistoryNextValue),
      });
    }
  };

  fetchOrderHistory = () => {
    const { orderList = [], appTheme, user = [], navigation } = this.props;
    const { orderHistory } = this.state;
    console.log("orderHistory", orderHistory);
    const { value = [], next_link = '' } = orderHistory;
    let theme = appTheme.theme;

    return (
      <FlatList
        data={orderHistory}
        extraData={[this.props, this.state]}
        onEndReached={() => {
          if (!this.onEndReachedCalledDuringMomentum) {
            this.renderMoreOrderData();
            this.onEndReachedCalledDuringMomentum = true;
          }
        }}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          const { basic = [], items = [], uuid = '' } = item;
          let type = items && items[0] && items[0].type;
          const { checkout_at = [], price = [], state = [] } = basic;
          const { price_net = '' } = price;
          const { date = '' } = checkout_at;
          // const {uuid = ''} = items;

          // console.log('basic', JSON.stringify(item));

          return (
            <TouchableOpacity
              style={styles.orderContain}
              onPress={() => {
                navigation.navigate('OrderHistoryDetails', {
                  successAnimation: false,
                  bookingId: uuid,
                });
              }}>
              <View style={styles.flexRow2}>
                <Image
                  source={
                    (type === 'SERVICE' && images.serviceIcon) ||
                    (type === 'DEAL' && images.discountColor) ||
                    (type === 'PRODUCT' && images.productColor)
                  }
                  style={styles.logoSize}
                />
                <Text
                  style={[
                    styles.timeData,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}>{` ${Moment(date).format('dddd ,DD MMMM YYYY')}`}</Text>

                <Text style={[styles.statusText, { color: state == "CANCELLED" ? colors.textRed : colors.green }]}>
                  {state}
                </Text>
              </View>

              <Text style={[styles.typeOfServiceText]}>{type}</Text>

              <FlatList
                data={items}
                horizontal={true}
                renderItem={val => {
                  let index = val.index;
                  let lastIndex = items.length - 1;
                  const { type = '', service = [], deal = [] } = val.item;
                  const { name = '' } = service;
                  const { basic = [] } = deal;
                  let dealName = basic && basic.name;
                  return (
                    <Text
                      style={[
                        styles.servicenameText,
                        { color: theme.PRIMARY_TEXT_COLOR },
                      ]}>
                      {/*  index !== lastIndex +  */}
                      {name
                        ? lastIndex === index
                          ? name
                          : name + `, `
                        : dealName}
                    </Text>
                  );
                }}
              />
              <Text style={{ color: theme.PRIMARY_TEXT_COLOR }}>
                {`\u20B9` + price_net}
              </Text>
            </TouchableOpacity>
          );
        }}
        // ListFooterComponent={this.renderFooterUpcoming()}
        style={styles.flatListStyle}
        contentInset={{ bottom: scale(150) }}
      />
      // </View>
    );
    // }
  };

  render() {
    const { appTheme, navigation } = this.props;
    const { orderHistory = [], isLoading } = this.state;
    let theme = appTheme.theme;
    <StatusBar
      backgroundColor={theme.PRIMARY_BACKGROUND_COLOR_LIGHT}
      barStyle={theme.type === 'darkTheme' ? 'light-content' : 'dark-content'}
    />;
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
        ]}>
        {/* ScreenHeader */}
        <View
          style={{
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            paddingVertical: scale(40),
            paddingBottom: scale(30),
          }}>
          <ScreenHeader
            onPress={() => navigation.goBack()}
            screenTitle={'Orders'}
          // align={'left'}
          // backArrowColor={theme.PRIMARY_BACKGROUND_COLOR}
          />
        </View>
        {/* ScreenHeader End */}

        {/* {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.orangeText}
            style={styles.loaderAlign}
          />
        ) : ( */}
        <View>{this.fetchOrderHistory()}</View>
        {/* )} */}
      </View>
    );
  }
}

const mapStatsToProps = ({
  appTheme = '',
  user = [],
  dealList = [],
  orderList = [],
}) => ({
  appTheme,
  user,
  dealList,
  orderList,
});

export default connect(
  mapStatsToProps,
  { getAllMyDeal, getMyDealNextLink, getOrderHistoryNextLink },
)(OrderHistory);
