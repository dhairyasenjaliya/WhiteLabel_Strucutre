import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Linking,
  Platform,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import {scale} from '../../utils/scale';
import {
  getOrderDetail,
  getAllOrder,
  orderCancle,
  getAllOrderHistory,
} from '../../store/orderList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getOrderDetail: Function;
  getAllOrder: Function;
  orderCancle: Function;
  getAllOrderHistory: Function;
}

interface IState {
  bookingDetails: Array<Object>;
  confirmScreen: Boolean;
  bookingId: String;
  isLoading: Boolean;
}

class Bookingdetails extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      confirmScreen:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.successAnimation
          : false,
      bookingId:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.bookingId
          : false,
    };
  }
  componentDidMount() {
    const {bookingId = ''} = this.state;
    const {getOrderDetail} = this.props;
    if (bookingId) {
      console.log('Blah Blah ::::', this.state.bookingId);
      getOrderDetail(bookingId);
    }
    // console.log('confirmScreen', this.state.confirmScreen);
    console.log('bookingId', this.state.bookingId);
  }
  dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }
    Linking.openURL(phoneNumber);
  };

  renderConfirmBooking = () => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    let themeType = appTheme.theme.type;
    console.log('appTheme', appTheme);
    setTimeout(() => {
      this.setState({
        confirmScreen: false,
      });
    }, 3000);
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {/* <Image
          source={require('../../assets/bookingDetails/logo.png')}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: scale(70),
            marginBottom: scale(30),
            resizeMode: 'contain',
            height: scale(50),
          }}
        /> */}
        <Text
          style={[
            styles.orderStatusText,
            {
              color: theme.PRIMARY_TEXT_COLOR,
              alignSelf: 'center',
              justifyContent: 'center',
              marginTop: scale(70),
              marginBottom: scale(30),
              resizeMode: 'contain',
              height: scale(50),
            },
          ]}>
          Order Status
        </Text>
        <Image
          source={
            themeType === 'darkTheme'
              ? require('../../assets/bookingDetails/blackSuccess.gif')
              : require('../../assets/bookingDetails/whiteSuccess.gif')
          }
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginVertical: scale(40),
            resizeMode: 'contain',
            height: scale(300),
            width: scale(300),
            // tintColor: theme.PRIMARY_BACKGROUND_COLOR,
          }}
        />
        <View style={{alignSelf: 'center'}}>
          <Text
            style={[
              styles.bookingSuccessText,
              {
                color: theme.PRIMARY_TEXT_COLOR,
              },
            ]}>
            Booking Confirmed
          </Text>
        </View>
      </View>
    );
  };

  cancleOrder = () => {
    const {bookingId} = this.state;
    const {orderCancle, getAllOrder, user = []} = this.props;
    const {detail = []} = user;
    const {uuid = ''} = detail;
    let data = {
      read: false,
    };
    orderCancle(bookingId, data);
    setTimeout(() => {
      getOrderDetail(bookingId);
      getAllOrder(uuid, 'UPCOMING');
      getAllOrder(uuid, 'PAST');
    }, 500);
  };

  renderStylist = () => {
    const {appTheme, orderList = []} = this.props;
    let theme = appTheme.theme;
    const {orderDetail = []} = orderList;
    let stylistDetail = orderDetail && orderDetail.items;
    return (
      <View style={styles.stylistContain}>
        <FlatList
          data={stylistDetail}
          renderItem={(stylistDetailss) => {
            const {item = ''} = stylistDetailss;
            const {appointment = ''} = item;
            const {personnel = ''} = appointment;
            let stylistDetail = personnel && personnel.basic;

            let name_first = stylistDetail && stylistDetail.name_first;
            let rank = stylistDetail && stylistDetail.rank;
            let bio = stylistDetail && stylistDetail.bio;
            let images = stylistDetail && stylistDetail.images;
            let values = stylistDetail && stylistDetail.values;
            let recommendation_avg =
              values && values.salon && values.salon.recommendation_avg;
            let stylistImage = stylistDetail.profile_pic;
            // console.log('ehhehe', stylistImage);
            return (
              <View
                style={[
                  styles.stylistView,
                  {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                ]}>
                <Text
                  style={[
                    styles.stylist,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>{`Know your stylist`}</Text>
                <View style={styles.stylistSubView}>
                  <View style={styles.stylistImageView}>
                    <Image
                      source={{uri: stylistImage}}
                      style={styles.stylistImage}
                    />
                    <Text
                      style={[
                        styles.whiteColor,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {name_first}
                    </Text>
                    <Text style={[styles.creative]}>{rank}</Text>
                  </View>
                  <View style={styles.stylistDesView}>
                    <Text
                      style={[
                        styles.stylistDes,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {bio}
                    </Text>
                    <View style={styles.likeView}>
                      <Icon name={'heart'} color={'#EC4756'} size={12} />
                      <Text
                        style={[
                          styles.likePerc,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        {recommendation_avg + ` %`}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  listAvailabelList = () => {
    const {appTheme, orderList} = this.props;
    let theme = appTheme.theme;
    const {orderDetail = []} = orderList;
    const {items = [], basic = []} = orderDetail;
    const {price = []} = basic;
    const {price_gst = '', price_base = '', price_net = ''} = price;
    return (
      <View>
        <FlatList
          data={items}
          contentContainerStyle={styles.flatListContainer}
          renderItem={(data) => {
            const {item = []} = data;
            const {appointment = [], service = []} = item;
            const {personnel = []} = appointment;
            const {basic = []} = personnel;
            const {duration_minutes = '', name = '', price = []} = service;
            const {price_base = ''} = price;
            const {
              name_first = '',
              name_last = '',
              rank = '',
              profile_pic = '',
            } = basic;
            let time =
              appointment && appointment.basic && appointment.basic.time;
            const {start = ''} = time;
            let hour = start.substring(0, 2);
            let minute = start.substring(2, 5);
            let AmOrPm = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12 || 12;

            return (
              <View style={styles.appointmentContainer}>
                <View style={styles.appointmentFlex}>
                  <View style={styles.appointmentFlex2}>
                    <View>
                      <Text
                        style={[
                          styles.serviceName,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        {/* {`${name} by ${rank}`} */}
                        {name}
                      </Text>
                      <Text
                        style={[
                          styles.serviceTime,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        {`${duration_minutes} mins at ${
                          hour + minute + ` ` + AmOrPm
                        } `}
                      </Text>
                      <Text
                        style={[
                          styles.servicePerson,
                        ]}>{`by ${name_first} ${name_last}`}</Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.serviceName,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {`\u20B9 ${price_base}`}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        {/* Price Component */}
        <View
          style={[
            styles.priceContainer,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
          ]}>
          <View style={[styles.priceTitleAlignment, {marginTop: scale(20)}]}>
            <Text
              style={[
                styles.priceTitleText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Service Total
            </Text>
            <Text
              style={[
                styles.priceValueText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              ₹ {price_base}
            </Text>
          </View>
          <View style={[styles.priceTitleAlignment, {marginTop: scale(5)}]}>
            <Text
              style={[
                styles.priceTitleText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Taxes & charges
            </Text>
            <Text
              style={[
                styles.priceValueText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              ₹ {price_gst}
            </Text>
          </View>
          <View
            style={[styles.priceTitleAlignment, {marginVertical: scale(20)}]}>
            <Text
              style={[
                styles.priceTitleText,
                {color: theme.PRIMARY_TEXT_COLOR, fontWeight: 'bold'},
              ]}>
              Total
            </Text>
            <Text
              style={[
                styles.priceValueText,
                {color: theme.PRIMARY_TEXT_COLOR, fontWeight: 'bold'},
              ]}>
              ₹ {price_net}
            </Text>
          </View>
        </View>
        {/* Price Component End*/}
      </View>
    );
  };

  render() {
    const {
      appTheme,
      navigation,
      orderList = [],
      user = [],
      getAllOrder,
      getAllOrderHistory,
    } = this.props;
    const {detail = []} = user;
    const {mobile = '', uuid = ''} = detail;
    let user_name_first = detail && detail.name_first;
    let user_name_last = detail && detail.name_last;
    const {orderDetail = []} = orderList;
    const {confirmScreen, bookingId} = this.state;
    // return null;

    const {
      // uuid = '',
      basic = [],
      items = [],
      personnel = [],
      salon = [],
      details = [],
    } = orderDetail;
    let timeLine = basic && basic.timeline;
    let salonDetail = salon && salon.basic;
    let stylistDetail = personnel && personnel.basic;
    let cancellable = orderDetail && orderDetail.cancellable;
    let bookingIdLive = basic && basic.display_id;
    // const {state = '', date = '', time = []} = basic;
    // const {start = ''} = time;
    // let orderItem = items && items[0];
    // let service = orderItem && orderItem.service;
    // console.log('orderDetail===>', JSON.stringify(service));

    let start =
      orderDetail &&
      orderDetail.basic &&
      orderDetail.basic.checkout_at &&
      orderDetail.basic.checkout_at.time;

    let state = orderDetail && orderDetail.basic && orderDetail.basic.state;

    let date =
      orderDetail &&
      orderDetail.basic &&
      orderDetail.basic.checkout_at &&
      orderDetail.basic.checkout_at.date;

    let name = salonDetail && salonDetail.name;
    let address =
      salonDetail && salonDetail.location && salonDetail.location.address;
    let logo = salonDetail && salonDetail.logo;

    // const {service = []} = details;
    // const {price = []} = service;
    // const {price_net = ''} = price;
    // let serviceName = service && service.name;
    // let minute_coy = start;

    let hour = start && start.substring(0, 2);
    let minute = start && start.substring(2, 5);
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;

    let theme = appTheme.theme;
    if (confirmScreen) {
      return this.renderConfirmBooking();
    }
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <ScreenHeader
          onPress={() => {
            getAllOrder(uuid, 'UPCOMING');
            getAllOrder(uuid, 'PAST');
            getAllOrderHistory(uuid);
            navigation.navigate('myAccount');
          }}
          screenTitle={`Order Summary`}
        />
        <ScrollView style={styles.scrollContainer}>
          <View
            style={[
              styles.profileDetail,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            {/* <Image source={{uri: logo}} style={styles.map} /> */}
            <FastImage
              style={styles.map}
              source={{
                uri: logo,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.imageView}>
              <Text
                style={[styles.whiteColor, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name ? name : ''}
              </Text>
              <Text style={styles.address}>{address ? address : ''}</Text>
              {/* <TouchableOpacity style={styles.summaryBtn}>
                <Text style={styles.summaryText}>{`View summary`}</Text>
              </TouchableOpacity> */}
            </View>
            {/* <TouchableOpacity
              onPress={() => this.dialCall()}
              style={[
                styles.callView,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}>
              <Image
                source={require('../../assets/bookingDetails/call.png')}
                style={styles.callImage}
              />
              <Text style={styles.call}>Call</Text>
            </TouchableOpacity> */}
          </View>

          {/* <TouchableOpacity onPress={() => this.cancleOrder()}>
              <Text
                style={{
                  color: theme.PRIMARY_TEXT_COLOR,
                  // textAlign: 'center',
                  marginVertical: 20,
                  marginHorizontal: 120,
                }}>
                CANCLE
              </Text>
            </TouchableOpacity> */}
          <FlatList
            data={timeLine}
            contentContainerStyle={styles.flatListContainer}
            renderItem={(data) => {
              // console.log('timeLine', timeLine.length - 1);
              let lastIndex = timeLine.length - 1;
              const {item = '', index = ''} = data;
              let checkStatus =
                item === 'Visit Cancelled' || item === 'Visit Missed'
                  ? false
                  : true;
              return (
                <View style={styles.statusView}>
                  <View style={styles.statusSubView}>
                    <View style={styles.checkView}>
                      {checkStatus ? (
                        <Image
                          source={require('../../assets/profile/check.png')}
                          style={styles.checkImage}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/profile/error.png')}
                          style={styles.checkImage2}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.statusText,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {item}
                    </Text>
                  </View>
                  {index !== lastIndex && <View style={styles.directionView} />}
                </View>
              );
            }}
          />
          <View
            style={[
              styles.stylistView,
              // styles.border,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              style={[
                styles.stylist,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`Appointments`}</Text>
            {/* Services Added */}
            {this.listAvailabelList()}
            {/* Services Added End */}
          </View>

          <View>{this.renderStylist()}</View>

          <View
            style={[
              styles.bookingDetail,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              style={[
                styles.booking,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`Booking Details`}</Text>
            <View style={styles.details}>
              <Text style={[styles.detailTitle]}>BOOKING ID</Text>
              <Text
                style={[styles.detailValue, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {bookingIdLive}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={[styles.detailTitle]}>DATE</Text>
              <Text
                style={[styles.detailValue, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {`${hour + minute + ` ` + AmOrPm} ${Moment(date).format(
                  'dddd',
                )}  || ${Moment(date).format('DD MMM ,YYYY')}`}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={[styles.detailTitle]}>NAME</Text>
              <Text
                style={[styles.detailValue, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {user_name_first + ` ` + user_name_last}
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={[styles.detailTitle]}>PHONE</Text>
              <Text
                style={[styles.detailValue, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {mobile}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', orderList = [], user = []}) => ({
  appTheme,
  orderList,
  user,
});

export default connect(mapStatsToProps, {
  getOrderDetail,
  getAllOrder,
  orderCancle,
  getAllOrderHistory,
})(Bookingdetails);
