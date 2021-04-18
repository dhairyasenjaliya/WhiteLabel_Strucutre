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
  ActivityIndicator,
} from 'react-native';
import Moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';

import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import CustomButton from '../../components/Button';

import {scale} from '../../utils/scale';
import {
  getAppointmentDetail,
  getAllOrder,
  orderCancle,
  getOrderHistoryDetail,
} from '../../store/orderList/actions';
import images from '../../assets/images';
import {colors} from '../../constants/styles';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getappointmentDetail: Function;
  getAllOrder: Function;
  orderCancle: Function;
  getOrderHistoryDetail: Function;
}

interface IState {
  bookingDetails: Array<Object>;
  confirmScreen: Boolean;
  bookingId: String;
  isLoading: Boolean;
}

class OrderHistoryDetails extends React.Component<IProps, IState> {
  RBSheet: any;
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
    const {getOrderHistoryDetail} = this.props;
    if (bookingId) {
      // console.log('Blah Blah ::::', this.state.bookingId);
      getOrderHistoryDetail(bookingId);
    }
    // console.log('confirmScreen', this.state.confirmScreen);
    // console.log('bookingId', this.state.bookingId);
  }
  dialCall = () => {
    const {orderList = []} = this.props;
    const {appointmentDetail = [], isLoadingData = ''} = orderList;
    const {salon = []} = appointmentDetail;
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

  cancleOrder = () => {
    const {bookingId} = this.state;
    // eslint-disable-next-line no-shadow
    const {orderCancle, getAppointmentDetail} = this.props;
    let data = {
      read: false,
    };
    orderCancle(bookingId, data);
    setTimeout(() => {
      getAppointmentDetail(bookingId);
    }, 500);
  };

  // listAvailabelList = () => {
  //   const {appTheme, orderList} = this.props;
  //   let theme = appTheme.theme;
  //   const {appointmentDetail = []} = orderList;
  //   const {personnel = [], details = []} = appointmentDetail;
  //   const {service = []} = details;
  //   const {duration_minutes = '', name = '', price = []} = service;
  //   const {basic = []} = personnel;
  //   const {price_base = '', price_net = '', price_gst = ''} = price;
  //   const {
  //     name_first = '',
  //     name_last = '',
  //     rank = '',
  //     profile_pic = '',
  //   } = basic;

  //   console.log('orderList', service);

  //   return (
  //     // <FlatList
  //     //   data={[1, 2, 3]}
  //     //   renderItem={stylistList => {
  //     // return (
  //     <View style={styles.appointmentContainer}>
  //       <View style={styles.appointmentFlex}>
  //         <View style={styles.appointmentFlex2}>
  //           <View>
  //             <Text
  //               style={[styles.serviceName, {color: theme.PRIMARY_TEXT_COLOR}]}>
  //               {/* {`${name} by ${rank}`} */}
  //               {name}
  //             </Text>
  //             <Text
  //               style={[styles.serviceTime, {color: theme.PRIMARY_TEXT_COLOR}]}>
  //               {/* {`${duration_minutes} mins at ${hour +
  //                 minute +
  //                 ` ` +
  //                 AmOrPm} `} */}
  //             </Text>
  //             <Text
  //               style={[
  //                 styles.servicePerson,
  //               ]}>{`by ${name_first} ${name_last}`}</Text>
  //           </View>
  //         </View>
  //         <View>
  //           <Text
  //             style={[styles.serviceName, {color: theme.PRIMARY_TEXT_COLOR}]}>
  //             {`\u20B9 ${price_base}`}
  //           </Text>
  //         </View>
  //       </View>
  //     </View>
  //     //     );
  //     //   }}
  //     // />
  //   );
  // };

  listAvailabelList = () => {
    const {appTheme, orderList} = this.props;
    let theme = appTheme.theme;
    const {orderHistoryDetail = []} = orderList;
    const {
      personnel = [],
      details = [],
      order = [],
      basic = [],
      items = [],
    } = orderHistoryDetail;

    console.log('orderHistoryDetail', JSON.stringify(orderHistoryDetail));

    const {profile_pic = '', price = []} = basic;

    // let date =
    //   orderHistoryDetail &&
    //   orderHistoryDetail.basic &&
    //   orderHistoryDetail.basic.checkout_at &&
    //   orderHistoryDetail.basic.checkout_at.date;

    // let start = orderHistoryDetail && orderHistoryDetail.basic;
    // orderHistoryDetail.basic.checkout_at &&
    //   orderHistoryDetail.basic.checkout_at.time;

    const {service = []} = details;
    const {duration_minutes = '', name = ''} = service;
    const {price_base = '', price_net = '', price_gst = ''} = price;

    // let hour = start && start.substring(0, 2);
    // let minute = start && start.substring(2, 5);
    // let AmOrPm = hour >= 12 ? 'pm' : 'am';
    // hour = hour % 12 || 12;

    return (
      <View>
        <FlatList
          data={items}
          renderItem={data => {
            const {item = []} = data;
            const {service = [], appointment = [], deal = []} = item;

            const {personnel = []} = appointment;
            const {basic = []} = personnel;
            const {name = '', price = [], duration_minutes = ''} = service;
            const {price_base = '', price_net = '', price_gst = ''} = price;
            const {name_first = '', name_last = '', rank = ''} = basic;

            let dealName = deal && deal.basic && deal.basic.name;
            // console.log('items', JSON.stringify(dealName));
            return (
              <View style={styles.appointmentContainer}>
                <View style={styles.appointmentFlex}>
                  <View style={styles.appointmentFlex2}>
                    {dealName ? (
                      <Text
                        style={[
                          styles.serviceName,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        {dealName}
                      </Text>
                    ) : (
                      <View>
                        <Text
                          style={[
                            styles.serviceName,
                            {color: theme.PRIMARY_TEXT_COLOR},
                          ]}>
                          {`${name} by ${rank}`}
                        </Text>
                        <View style={styles.flexRow}>
                          <Text
                            style={[
                              styles.serviceName,
                              {color: theme.PRIMARY_TEXT_COLOR},
                            ]}>
                            {`\u20B9 ${price_base}`}
                          </Text>
                          <Text
                            style={[
                              styles.serviceTime,
                              {color: theme.PRIMARY_TEXT_COLOR},
                            ]}>
                            {`${duration_minutes} mins`}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.servicePerson,
                          ]}>{`by ${name_first} ${name_last}`}</Text>
                        {/* <Text style={[styles.servicePerson]}>
                          {`at ${hour + minute + ` ` + AmOrPm}, ` +
                            Moment(date).format('DD MMM YYYY')}
                        </Text> */}
                      </View>
                    )}
                  </View>
                  <Text style={styles.cancel}>Cancel</Text>

                  {/* <View style=s{styles.horizontalLine} /> */}
                  {/* <Text
              style={[styles.serviceName, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {`\u20B9 ${price_base}`}
            </Text> */}
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
            style={[styles.priceTitleAlignment, {marginVertical: scale(5)}]}>
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

  openMap = () => {
    const {orderList = []} = this.props;
    const {appointmentDetail = []} = orderList;
    const {salon = []} = appointmentDetail;
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

  paymentOption = () => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <View>
        <Text
          style={[styles.selectPaymentText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          Select Payment Method
        </Text>
        <View style={[styles.flexRow2, {marginTop: scale(30)}]}>
          <Image source={images.barberPoll} style={styles.logoWidth} />
          <Text
            style={[styles.paymentOpText, {color: theme.PRIMARY_TEXT_COLOR}]}>
            Pay at Salon
          </Text>
        </View>
        <View style={styles.flexRow2}>
          <Image source={images.creditCard} style={styles.logoWidth} />
          <Text
            style={[styles.paymentOpText, {color: theme.PRIMARY_TEXT_COLOR}]}>
            Pay Online
          </Text>
        </View>
        <CustomButton
          style={[
            styles.cartButton,
            {
              marginTop: scale(20),
              // backgroundColor:
              //   serviceSelected.length != 0
              //     ? colors.lightOrange
              //     : colors.grayBorder,
            },
          ]}
          // style={styles.customApplyButton}
          btnText={'Proceed'}
          onPress={() => {}}
        />
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
    } = this.props;
    const {detail = []} = user;
    const {mobile = '', uuid = ''} = detail;
    let user_name_first = detail && detail.name_first;
    let user_name_last = detail && detail.name_last;
    const {
      appointmentDetail = [],
      isLoadingData = '',
      orderHistoryDetail = [],
    } = orderList;
    const {confirmScreen, bookingId} = this.state;
    // console.log('appointmentDetail===>', JSON.stringify(orderHistoryDetail));
    // return null;

    const {
      // uuid = '',
      basic = [],
      items = [],
      personnel = [],
      salon = [],
      details = [],
    } = orderHistoryDetail;
    let salonDetail = salon && salon.basic;
    let stylistDetail = personnel && personnel.basic;

    let cancellable = appointmentDetail && appointmentDetail.cancellable;
    // const {state = '', date = '', time = []} = basic;
    // const {start = ''} = time;

    let bookingIdLive = basic && basic.display_id;
    let timeLine = basic && basic.timeline;

    // let start =
    //   appointmentDetail &&
    //   appointmentDetail.basic &&
    //   appointmentDetail.basic.time &&
    //   appointmentDetail.basic.time.start;

    // let state = appointmentDetail && appointmentDetail.basic && checkout_at;
    // appointmentDetail.basic.state;

    let date = basic && basic.checkout_at && basic.checkout_at.date;

    let name = salonDetail && salonDetail.name;
    let address =
      salonDetail &&
      salonDetail.location &&
      salonDetail.location.micro_market &&
      salonDetail.location.micro_market.name;
    let logo = salonDetail && salonDetail.logo;

    let name_first = stylistDetail && stylistDetail.name_first;
    let rank = stylistDetail && stylistDetail.rank;
    let imagess = stylistDetail && stylistDetail.images;
    let values = stylistDetail && stylistDetail.values;
    let recommendation_avg =
      values && values.salon && values.salon.recommendation_avg;

    // let priceCopy = order && order.basic && order.basic.price;

    let price = basic && basic.price;
    let paymentState = basic && basic.payment_state;
    let price_net = price && price.price_net;
    let price_base = price && price.price_base;
    let price_gst = price && price.price_gst;

    // let hour = start && start.substring(0, 2);
    // let minute = start && start.substring(2, 5);
    // let AmOrPm = hour >= 12 ? 'pm' : 'am';
    // hour = hour % 12 || 12;

    let stylistImage = imagess && imagess.MAIN[0] && imagess.MAIN[0].url;
    let salonImage =
      salonDetail &&
      salonDetail.images &&
      salonDetail.images.MAIN &&
      salonDetail.images.MAIN[0] &&
      salonDetail.images.MAIN[0].url;

    let theme = appTheme.theme;

    let personName =
      appointmentDetail &&
      appointmentDetail.salon &&
      appointmentDetail.salon.basic &&
      appointmentDetail.salon.basic.poc &&
      appointmentDetail.salon.basic.poc.name;

    // const {basic = []} = salon;
    // const {poc = []} = basic;
    // const {phone = ''} = poc;

    if (confirmScreen) {
      return this.renderConfirmBooking();
    }
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View style={styles.marginTop}>
          <ScreenHeader
            onPress={() => {
              // getAllOrder(uuid, 'UPCOMING');
              // getAllOrder(uuid, 'PAST');
              navigation.navigate('myAccount');
            }}
            screenTitle={`Order details`}
            align={'left'}
          />
        </View>
        <View style={styles.supportPosition}>
          <Icon
            size={22}
            style={styles.chatIcon}
            name={'comments'}
            color={colors.lightOrange}
          />
          <Text style={styles.supportPositionText}>Support</Text>
        </View>
        {isLoadingData ? (
          <ActivityIndicator
            size={'large'}
            color={colors.orangeText}
            style={styles.loaderAlign}
          />
        ) : (
          <ScrollView style={styles.scrollContainer}>
            {/* <View
              style={[
                styles.profileDetail,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}>
              <FastImage
                style={styles.logo}
                source={{
                  uri: salonImage ? salonImage : logo,
                  priority: FastImage.priority.normal,
                }}
              />
              <View style={styles.imageView}>
                <Text
                  style={[
                    styles.whiteColor,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {name ? name : ''}
                </Text>
                <Text style={styles.address}>{address ? address : ''}</Text>
              </View>
              </View>

            <FlatList
              data={timeLine}
              contentContainerStyle={styles.flatListContainer}
              renderItem={data => {
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
                    {index !== lastIndex && (
                      <View style={styles.directionView} />
                    )}
                  </View>
                );
              }}
            /> */}

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
                ]}>{`Order number`}</Text>
              <View style={[styles.details, {marginVertical: scale(1)}]}>
                {/* <Text style={[styles.detailTitle]}>Order Number</Text> */}
                <Text
                  style={[
                    styles.detailValue,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {bookingIdLive}
                </Text>
              </View>
              <View style={styles.details}>
                <Text
                  style={[
                    styles.detailTitle,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Date
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {` ${Moment(date).format('DD MMM YYYY')}   `}
                  {/* ${hour +
                    minute +
                    ` ` +
                    AmOrPm} */}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.detailTitle,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Payment mode
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Pay at salon
                </Text>
              </View>

              <View style={styles.details}>
                <Text
                  style={[
                    styles.detailTitle,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Order Status
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    {
                      color:
                        paymentState === 'PAID'
                          ? colors.green
                          : colors.lightOrange,
                    },
                  ]}>
                  {paymentState}
                </Text>
              </View>

              {/* {state === 'CONFIRMED' && (
                <TouchableOpacity
                  // onPress={() => this.cancleOrder()}
                  onPress={() =>
                    Alert.alert(
                      'Are You Sure You Want To Cancle Request',
                      ' ',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => this.cancleOrder()},
                      ],
                      {cancelable: false},
                    )
                  }
                  style={styles.cancleButton}>
                  <Text
                    style={[
                      styles.cancleText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Request Cancellation
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>

            <View
              style={[
                styles.stylistView,
                styles.border,
                {
                  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                  marginVertical: scale(10),
                },
              ]}>
              <View style={[styles.flexRow]}>
                <View>
                  <Text
                    style={[
                      styles.stylist,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>{`Payment status`}</Text>
                  <Text
                    style={[
                      styles.rupesText,
                      {
                        color:
                          paymentState === 'PAID'
                            ? colors.grayColor
                            : colors.lightOrange,
                      },
                    ]}>
                    {paymentState === 'PAID'
                      ? `All clear`
                      : `Rs ` + price_net + ' due'}
                  </Text>
                </View>

                {paymentState === 'PAID' ? (
                  // <Text>thumbsUp</Text>
                  <Image source={images.thumbsUp} />
                ) : (
                  <TouchableOpacity
                    onPress={() => this.RBSheet.open()}
                    style={styles.payButton}>
                    <Text
                      style={[
                        styles.payTextButoon,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {'Pay now'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

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
                ]}>{`Appointments`}</Text>
              {/* Services Added */}
              {this.listAvailabelList()}
              {/* Services Added End */}
            </View>

            {/* <View
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
                      {personName}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={[styles.detailTitle]}>Address</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {address}
                    </Text>
                  </View>
                </View>
                <Image source={images.map} />
              </View>
               <View>
                <View
                  style={[
                    styles.appointmentFlex,
                    {marginHorizontal: scale(40)},
                  ]}>
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
            </View>*/}

            {/* Services List */}
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              onClose={() => {}}
              height={scale(336)}
              duration={250}
              customStyles={{
                container: {
                  paddingTop: scale(30),
                  paddingHorizontal: scale(30),
                  borderTopLeftRadius: scale(30),
                  borderTopRightRadius: scale(30),
                  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                },
              }}>
              {this.paymentOption()}
            </RBSheet>
            {/* Services List End */}
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', orderList = [], user = []}) => ({
  appTheme,
  orderList,
  user,
});

export default connect(
  mapStatsToProps,
  {getAppointmentDetail, getAllOrder, orderCancle, getOrderHistoryDetail},
)(OrderHistoryDetails);
