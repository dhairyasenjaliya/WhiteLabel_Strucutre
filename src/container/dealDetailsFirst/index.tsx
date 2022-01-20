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
  Alert,
} from 'react-native';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import {scale} from '../../utils/scale';
import {
  getAppointmentDetail,
  getAllOrder,
  orderCancle,
} from '../../store/orderList/actions';

import {getDealOrderDetail} from '../../store/dealList/actions';

import images from '../../assets/images';
import {colors} from '../../constants/styles';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getappointmentDetail: Function;
  getAllOrder: Function;
  orderCancle: Function;
  getDealOrderDetail: Function;
}

interface IState {
  bookingDetails: Array<Object>;
  confirmScreen: Boolean;
  bookingId: String;
  isLoading: Boolean;
}

class dealDetailsFirst extends React.Component<IProps, IState> {
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
    const {getDealOrderDetail, dealList = []} = this.props;
    const {checkoutCheck = []} = dealList;
    // console.log('Blah Blah ::::', JSON.stringify(bookingId));
    if (bookingId) {
      // console.log('Blah Blah ::::', this.state.bookingId);
      getDealOrderDetail(bookingId);
    }
    // console.log('confirmScreen', this.state.confirmScreen);
    // console.log('bookingId', this.state.bookingId);
  }

  renderConfirmBooking = () => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    let themeType = appTheme.theme.type;
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
        <Image
          source={require('../../assets/bookingDetails/logo.png')}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: scale(70),
            marginBottom: scale(30),
            resizeMode: 'contain',
            height: scale(50),
          }}
        />
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
            Booking Request Sent {`\n`} Successfully
          </Text>
        </View>
      </View>
    );
  };

  // cancleOrder = () => {
  //   const {bookingId} = this.state;
  //   // eslint-disable-next-line no-shadow
  //   const {orderCancle, getAppointmentDetail} = this.props;
  //   let data = {
  //     read: false,
  //   };
  //   orderCancle(bookingId, data);
  //   setTimeout(() => {
  //     getAppointmentDetail(bookingId);
  //   }, 500);
  // };

  listAvailabelList = () => {
    const {appTheme, navigation, dealList = []} = this.props;
    const {dealOrderDetail = []} = dealList;
    const {items = []} = dealOrderDetail;
    let theme = appTheme.theme;
    // console.log(JSON.stringify(dealOrderDetail));
    return (
      <FlatList
        data={items}
        renderItem={(data: any) => {
          const {deal = [], items = []} = data.item;
          const {basic = []} = deal;
          const {name = '', price = []} = basic;
          const {price_net = ''} = price;
          return (
            <View style={styles.appointmentContainer}>
              <View style={styles.appointmentFlex}>
                <View style={styles.appointmentFlex2}>
                  <View>
                    {/* <Image
                source={{uri: profile_pic}}
                style={styles.appointmentImage}
              /> */}
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.serviceName,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {name}
                    </Text>
                    <Text
                      style={[
                        styles.serviceTime,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}
                    />
                  </View>
                </View>
              </View>
              <Text
                style={[styles.serviceName, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {`\u20B9 ${price_net}`}
              </Text>
              <View style={styles.flexRow}>
                <Text style={styles.serviceNameAll}>Services : </Text>

                <FlatList
                  data={items}
                  renderItem={(data) => {
                    const {service = []} = data.item;
                    let index = data.index;
                    const {name = ''} = service;
                    let lastIndex = items.length - 1;
                    return (
                      <View style={styles.marginFix}>
                        <Text style={styles.serviceNameAll}>{name}</Text>
                        {index !== lastIndex && (
                          <Text style={styles.serviceNameAll}> ,</Text>
                        )}
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          );
        }}
      />
    );
  };

  dialCall = () => {
    const {dealList = []} = this.props;
    const {dealOrderDetail = [], isLoadingData = ''} = dealList;
    const {salon = []} = dealOrderDetail;
    const {basic = []} = salon;
    const {poc = []} = basic;
    const {phone = ''} = poc;
    // console.log('ehh', phone);
    let phoneNumber = phone;
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  };

  openMap = () => {
    const {dealList = []} = this.props;
    const {dealOrderDetail = []} = dealList;
    const {salon = []} = dealOrderDetail;
    const {basic = []} = salon;
    const {location = [], name = ''} = basic;
    const {geo = []} = location;
    const {latitude = '', longitude = ''} = geo;

    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${latitude},${longitude}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: 'geo:' + latitude + ',' + longitude + '?q=' + name,
      // android: `${scheme}${latLng}+(${label})`,
    });
    Linking.openURL(url);
  };

  render() {
    const {
      appTheme,
      navigation,
      orderList = [],
      user = [],
      dealList = [],
    } = this.props;
    const {dealOrderDetail = []} = dealList;
    // console.log('dealOrderDetail', JSON.stringify(dealOrderDetail));
    const {confirmScreen, bookingId} = this.state;
    const {
      uuid = '',
      basic = [],
      items = [],
      personnel = [],
      salon = [],
    } = dealOrderDetail;
    let salonDetail = salon && salon.basic;

    let timeLine = basic && basic.timeline;

    let name = salonDetail && salonDetail.name;
    let address =
      salonDetail &&
      salonDetail.location &&
      salonDetail.location.micro_market &&
      salonDetail.location.micro_market.name;
    let logo = salonDetail && salonDetail.logo;

    let imagess =
      items &&
      items[0] &&
      items[0].deal &&
      items[0].deal.basic &&
      items[0].deal.basic.images;

    let localName =
      items &&
      items[0] &&
      items[0].deal &&
      items[0].deal.basic &&
      items[0].deal.basic.name;

    let color1 =
      imagess &&
      imagess.MAIN &&
      imagess.MAIN[0].bg &&
      imagess.MAIN[0].bg.colors[0];
    let color2 =
      imagess &&
      imagess.MAIN &&
      imagess.MAIN[0].bg &&
      imagess.MAIN[0].bg.colors[1];

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
        <View style={styles.headerContain}>
          <ScreenHeader
            onPress={() => {
              navigation.navigate('myAccount');
            }}
            screenTitle={`Order Summary`}
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <View
            style={[
              styles.profileDetail,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Image source={{uri: logo}} style={styles.logoImage} />
            <View style={styles.imageView}>
              <Text
                style={[styles.whiteColor, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name ? name : ''}
              </Text>
              <Text style={styles.address}>{address ? address : ''}</Text>
            </View>
          </View>

          <FlatList
            data={timeLine}
            contentContainerStyle={styles.flatListContainer}
            renderItem={(data) => {
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
              styles.border,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              style={[
                styles.stylist,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`Order details`}</Text>
            {/* Services Added */}
            {this.listAvailabelList()}
            <View style={[styles.flexRow, {justifyContent: 'space-between'}]}>
              <Text style={styles.notesText}>
                Note: You can book appointment to redeem purchased deal from my
                deals
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('scheduleDetail', {
                    dealId: uuid,
                    color1: color1,
                    color2: color2,
                    name: localName,
                  });
                }}
                style={styles.bookNow}>
                <Text style={styles.bookText}>Book now</Text>
              </TouchableOpacity>
            </View>
            {/* Services Added End */}
          </View>

          <View
            style={[
              styles.bookingDetail,
              styles.border,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              style={[
                styles.booking,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`Salon details`}</Text>
            <View style={styles.appointmentFlex}>
              <View>
                <View style={styles.details}>
                  <Text style={[styles.detailTitle]}>Manager</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Mr.Man
                  </Text>
                </View>
                <View style={styles.details}>
                  <Text style={[styles.detailTitle]}>Address</Text>
                  <Text
                    style={[
                      styles.detailValue,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Cyber city, Gurgaon
                  </Text>
                </View>
              </View>
              <Image source={images.map} />
            </View>
            {/* <View style={styles.borderTopOnly}> */}
            <View>
              <View
                style={[styles.appointmentFlex, {marginHorizontal: scale(40)}]}>
                <TouchableOpacity
                  onPress={() => this.dialCall()}
                  style={[styles.appointmentFlex]}>
                  <Icon
                    name="phone"
                    size={scale(20)}
                    style={{alignSelf: 'center'}}
                    color={colors.grayBorder}
                  />
                  <Text
                    style={[
                      styles.callText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Call
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.openMap()}
                  style={styles.appointmentFlex}>
                  <Icon
                    name="map"
                    size={scale(20)}
                    style={{alignSelf: 'center'}}
                    color={colors.grayBorder}
                  />
                  <Text
                    style={[
                      styles.callText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Directions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({
  appTheme = '',
  orderList = [],
  user = [],
  dealList = [],
}) => ({
  appTheme,
  orderList,
  user,
  dealList,
});

export default connect(mapStatsToProps, {
  getAppointmentDetail,
  getAllOrder,
  orderCancle,
  getDealOrderDetail,
})(dealDetailsFirst);
