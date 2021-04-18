/* eslint-disable radix */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import * as RootNavigation from '../../navigation/rootNavigation';

// import { colors, fonts } from '../../constants/styles';
import {scale} from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import CustomButton from '../../components/Button';
import CartAdd from '../../components/cartAdd';
import {colors} from '../../constants/styles';
import {
  getAvailablePaymentOption,
  viewCart,
  checkOutApi,
  removeServiceCart,
  razorPayInit,
  razorPayVerify,
} from '../../store/cartCheckout/actions';
import {getAvailableTimeSlot} from '../../store/cartList/actions';
import {fetchSalonDetails} from '../../store/salonDetail/actions';
import {fetchStylistDetails} from '../../store/stylistDetail/actions';
import {getAllOrder} from '../../store/orderList/actions';
import {removeDealFromCart, checkOutDeal} from '../../store/dealList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
  viewCart: Function;
  removeServiceCart: Function;
  fetchStylistDetails: Function;
  removeDealFromCart: Function;
  fetchSalonDetails: Function;
  getAllOrder: Function;
  getAvailableTimeSlot: Function;
  checkOutApi: Function;
  razorPayVerify: Function;
}

interface IState {
  cartVal: any;
  timeSelectedFlag: Boolean;
  refreshCalenderView: Boolean;
  selected_date: any;
  stylistSelectedFlag: Boolean;
}
const _ = require('lodash');

class checkOutDeals extends React.Component<IProps, IState> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      cartVal: 0,
      timeSelectedFlag: false,
      refreshCalenderView: true,
      selected_date: Moment(new Date()).format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {user = [], viewCart} = this.props;
    const {detail = ''} = user;
    const {uuid = ''} = detail;
    if (uuid) {
      // console.log('uuid===>', uuid);
      viewCart(uuid);
    }
    // this.props.addSelectedDate(Moment(new Date()).format('YYYY-MM-DD'));
  }

  componentWillUnmount() {
    const {
      cartCheckout = [],
      appTheme,
      salonDetail = [],
      user = [],
      navigation,
      removeDealFromCart,
    } = this.props;
    let theme = appTheme.theme;
    const {viewCart = []} = cartCheckout;
    const {items = []} = viewCart;
    let ucheck = '';
    if (items) {
      items.map((d, i) => {
        const {appointment = [], service = [], deal = []} = d;
        const {basic = [], uuid = '', items = []} = deal;
        ucheck = uuid;
      });
    }

    const {detail = ''} = user;
    let consumerId = detail && detail.uuid;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let data = {
      salon_uuid: salonId,
      deal_uuid: ucheck,
      // read: true,
    };
    removeDealFromCart(consumerId, data);
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderServices = () => {
    const {
      cartCheckout = [],
      appTheme,
      salonDetail = [],
      user = [],
      navigation,
    } = this.props;
    let theme = appTheme.theme;
    const {viewCart = []} = cartCheckout;
    const {items = []} = viewCart;

    const {detail = ''} = user;
    let consumerId = detail && detail.uuid;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;

    if (items) {
      return items.map((d, i) => {
        // eslint-disable-next-line no-shadow
        const {removeDealFromCart, viewCart} = this.props;
        const {appointment = [], service = [], deal = []} = d;
        const {basic = [], uuid = '', items = []} = deal;
        const {name = '', price = [], variations = []} = basic;
        const {date = '', time = ''} = appointment;
        const {start = '', end = ''} = time;
        // console.log('basic', JSON.stringify(i));

        let variation_uuid = '';
        const {price_base = ''} = price;
        let logo = '';
        variations &&
          variations.map(val => {
            if (val.logo) {
              logo = val.logo;
            }
            variation_uuid = val.uuid;
          });

        let data = {
          salon_uuid: salonId,
          deal_uuid: uuid,
          // read: true,
        };

        return (
          <View>
            <Text
              style={[styles.titleService, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Selected Deal
            </Text>
            <View style={styles.secondSubContain}>
              {logo !== '' ? (
                <Image
                  source={
                    logo
                      ? {uri: logo}
                      : require('../../assets/profile/Salon_image.png')
                  }
                  style={styles.productImage}
                />
              ) : null}
              <View style={styles.heightSpace}>
                <Text
                  style={[
                    styles.nameOfService,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {name ? name : ''}
                </Text>
                <Text
                  style={[
                    styles.priceService,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  ₹ {price_base ? price_base : ''}
                </Text>
              </View>
              <View style={{position: 'absolute', right: scale(5)}}>
                <CartAdd
                  themeType={theme.type}
                  backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
                  textColor={theme.PRIMARY_TEXT_COLOR}
                  cartCount={1}
                  onPress={() => {}}
                />
                <TouchableOpacity
                  onPress={() => {
                    removeDealFromCart(consumerId, data);
                    setTimeout(() => {
                      // viewCart(consumerId);
                      navigation.goBack();
                    }, 500);
                  }}>
                  <Text style={styles.removeText}>Remove</Text>
                  {/* <Icon
                    name="times"
                    size={scale(30)}
                    style={{alignSelf: 'center'}}
                    color={colors.orangeBorder}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.flexRow}>
              <Text style={styles.serviceName}>Services: </Text>

              {/* {index !== lastIndex && (
                      <View style={styles.directionView} />
                    )} */}

              <FlatList
                data={items}
                horizontal
                renderItem={data => {
                  let lastIndex = items.length - 1;
                  const {service = []} = data.item;
                  const {name = ''} = service;
                  let index = data.index;
                  // console.log('hehehehee', service);
                  return (
                    <View>
                      <Text style={styles.serviceName}>
                        {name ? name : ''}
                        {index !== lastIndex && `, `}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        );
      });
    }
  };

  checkOutApi = () => {
    const {checkOutDeal, user = [], getAllOrder} = this.props;
    const {detail = ''} = user;
    let data = {
      read: false,
      payment_option: 'razorpay',
    };
    let consumerId = detail && detail.uuid;
    checkOutDeal(consumerId, data);
    setTimeout(() => {
      // getAllOrder(consumerId, 'UPCOMING');
      // getAllOrder(consumerId, 'PAST');
      this.fetchRazorDetail();
    }, 1000);
  };

  fetchRazorDetail = () => {
    const {razorPayInit, dealList = []} = this.props;
    const {viewCart = [], checkoutCheck = []} = dealList;
    const {order = ''} = checkoutCheck;
    const {uuid = ''} = order;
    // console.log('uuid', checkout);
    // console.log('chhchchc', checkoutCheck);

    let passThis = {
      order_uuid: uuid,
    };
    if (uuid) {
      razorPayInit(passThis);
      setTimeout(() => {
        this.renderRazorPay();
      }, 1000);
    }
  };

  toggleConfirmScreen = (data: any) => {
    const {razorPayVerify, dealList = []} = this.props;
    const {checkoutCheck = []} = dealList;
    const {order = ''} = checkoutCheck;
    const {uuid = ''} = order;
    razorPayVerify(data);
    setTimeout(() => {
      // console.log('razorPayVerifyData====>>>', razorPayVerifyData);

      RootNavigation.navigate('dealDetailsFirst', {
        successAnimation: true,
        bookingId: uuid,
      });
    }, 500);
  };

  renderRazorPay = () => {
    const {salonDetail = [], user = [], cartCheckout = []} = this.props;

    const {detail = ''} = user;
    const {uuid = '', email = '', mobile = ''} = detail;

    const {basic = ''} = salonDetail.salonDetail;
    const {name = '', logo = '', location = ''} = basic;

    const {viewCart = [], razorPayInit = []} = cartCheckout;
    const {checkout = []} = razorPayInit;
    const {price = []} = viewCart;
    const {price_net = ''} = price;

    let userName = detail && detail.name;

    // console.log('razorPayInit', razorPayInit);

    // let theme = {color: colors.lightOrange};

    // checkout.push(theme);

    var options = {
      description: 'Pay for salon',
      image: logo,
      currency: 'INR',
      key: 'rzp_test_AaN1dyV6H9LnUn',
      amount: parseInt(price_net) * 100,
      name: name,
      prefill: {
        email: email,
        contact: mobile,
        name: userName,
      },
      theme: {color: colors.lightOrange},
    };

    RazorpayCheckout.open(checkout)
      .then((data: any) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        this.toggleConfirmScreen(data);
      })
      .catch(error => {
        const {code = ''} = error;
        if (code === 2) {
          alert('payment cancelled');
        } else {
          alert(
            `Payment failed. If amount is deducted from your account it'll be reverted in 48 hours.`,
          );
        }
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
        // alert(`${error.description}`);
      });
  };

  render() {
    const {
      appTheme,
      navigation,
      salonDetail = [],
      cartCheckout = [],
      user = [],
    } = this.props;

    const {detail = ''} = user;
    // const {uuid = ''} = detail;
    // const {timeSelectedFlag, cartItem, stylistSelectedFlag} = this.state;

    const {viewCart = []} = cartCheckout;
    const {items = [], salon = []} = viewCart;

    let price_base_val = 0;
    let price_gst_val = 0;
    let price_net_val = 0;
    // const {basic = ''} = salon;
    // let basic = salon && salon.basic && salon.basic;
    let name = salon && salon.basic && salon.basic.name;
    let logo = salon && salon.basic && salon.basic.logo;
    // let location = salon && salon.basic && salon.basic.location;
    let micro_market =
      salon && salon.basic && salon.location && salon.micro_market;
    //
    // const {name = '', logo = '', location = ''} = basic;
    // const {micro_market = ''} = location;

    // let checkAvailablePayment = [];
    // checkAvailablePayment =
    //   availablePaymentOption &&
    //   availablePaymentOption.map(d => {
    //     let val = {label: d.name, name: d.name};
    //     return val;
    //   });

    items &&
      items.map((key: Object) => {
        const {deal = []} = key;
        const {basic = []} = deal;
        const {price = []} = basic;
        const {price_base = '', price_gst = '', price_net = ''} = price;
        price_base_val = parseInt(price_base_val + price_base);
        price_gst_val = parseInt(price_gst_val + price_gst);
        price_net_val = parseInt(price_net_val + price_net);
      });

    let theme = appTheme.theme;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View style={styles.headerContain}>
          <ScreenHeader
            onPress={() => navigation.goBack()}
            screenTitle={'Order Summary'}
          />
        </View>
        <ScrollView>
          {/* Saloon Detail */}
          <View
            style={[
              styles.profileDetail,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <Image
              source={
                logo
                  ? {uri: logo}
                  : require('../../assets/profile/Salon_image.png')
              }
              style={styles.saloonImage}
            />
            <View style={styles.imageView}>
              <Text
                style={[styles.saloonTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name ? name : `Looks Salon`}
              </Text>
              <Text style={[styles.address, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {micro_market ? micro_market.name : `Cyber City`}
              </Text>
            </View>
            {/* <View style={styles.timeAlignment}>
              <Text
                style={[styles.timeText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                04:30 pm
              </Text>
            </View> */}
          </View>
          {/* Saloon Detail */}
          {this.renderServices()}
          {/* Service End */}

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
                ₹ {price_gst_val ? price_base_val : ''}
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
                ₹ {price_gst_val ? price_gst_val : ''}
              </Text>
            </View>
            <View
              style={[styles.priceTitleAlignment, {marginVertical: scale(20)}]}>
              <Text
                style={[
                  styles.priceTitleText,
                  {color: theme.PRIMARY_TEXT_COLOR, fontSize: scale(16)},
                ]}>
                Grand Total
              </Text>
              <Text
                style={[
                  styles.priceValueText,
                  {color: theme.PRIMARY_TEXT_COLOR, fontSize: scale(16)},
                ]}>
                ₹ {price_net_val ? price_net_val : ''}
              </Text>
            </View>
          </View>
          {/* Note */}
          <Text style={styles.noteText}>
            Note: You’ll need to pay this amount at the salon
          </Text>
          {/* Note End */}

          {/* Price Component End*/}
        </ScrollView>
        <View
          style={[
            styles.buttonBottom4,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <CustomButton
            style={[
              {
                width: '100%',
                marginHorizontal: scale(18),
                borderRadius: scale(10),
                marginBottom: scale(5),
                backgroundColor:
                  price_net_val !== 0 ? colors.lightOrange : colors.grayBorder,
              },
            ]}
            btnText={'CONFIRM BOOKING'}
            // onPress={() => (price_net_val !== 0 ? this.renderRazorPay() : {})}
            onPress={() => this.checkOutApi()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({
  user = [],
  appTheme = [],
  cartList = [],
  salonDetail = [],
  cartCheckout = [],
  dealList = [],
  stylistDetail = [],
}) => ({
  appTheme,
  cartList,
  salonDetail,
  user,
  cartCheckout,
  stylistDetail,
  dealList,
});

export default connect(
  mapStatsToProps,
  {
    checkOutApi,
    viewCart,
    checkOutDeal,
    removeServiceCart,
    fetchStylistDetails,
    removeDealFromCart,
    fetchSalonDetails,
    getAllOrder,
    razorPayInit,
    getAvailablePaymentOption,
    razorPayVerify,
  },
)(checkOutDeals);
