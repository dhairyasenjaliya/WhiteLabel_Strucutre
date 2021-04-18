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
  StatusBar,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import images from '../../assets/images';
import RazorpayCheckout from 'react-native-razorpay';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

// import { colors, fonts } from '../../constants/styles';
import {scale} from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import CustomButton from '../../components/Button';
import CartAdd from '../../components/cartAdd';
import ServiceList from '../../components/ServiceList';
import {colors} from '../../constants/styles';
import TopStylist from '../../components/topStylist';
import * as RootNavigation from '../../navigation/rootNavigation';
import {
  getAvailablePaymentOption,
  viewCart,
  checkOutApi,
  removeServiceCart,
  razorPayInit,
  razorPayVerify,
} from '../../store/cartCheckout/actions';
import {
  getAvailableTimeSlot,
  addStylist,
  addSelectedDate,
  addSelectedTime,
  addServiceAPI,
} from '../../store/cartList/actions';
import {fetchSalonDetails} from '../../store/salonDetail/actions';
import {fetchStylistDetails} from '../../store/stylistDetail/actions';
import {getAllOrder} from '../../store/orderList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
  viewCart: Function;
  checkOutApi: Function;
  removeServiceCart: Function;
  fetchStylistDetails: Function;
  getAvailableTimeSlot: Function;
  addStylist: Function;
  addSelectedDate: Function;
  addSelectedTime: Function;
  addServiceAPI: Function;
  fetchSalonDetails: Function;
  getAllOrder: Function;
  // razorPayInit:Function;
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

class checkOutDetails extends React.Component<IProps, IState> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
      cartVal: 0,
      timeSelectedFlag: false,
      refreshCalenderView: true,
      selected_date: Moment(new Date()).format('YYYY-MM-DD'),
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-shadow
    const {user = [], viewCart, getAvailablePaymentOption} = this.props;
    const {detail = ''} = user;
    const {uuid = ''} = detail;
    if (uuid) {
      // console.log('uuid===>', uuid);
      viewCart(uuid);
      getAvailablePaymentOption();
    }
    this.props.addSelectedDate(Moment(new Date()).format('YYYY-MM-DD'));
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderServices = () => {
    const {
      cartCheckout = [],
      appTheme,
      salonDetail = [],
      user = [],
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
        const {removeServiceCart, viewCart} = this.props;
        const {appointment = [], service = []} = d;
        // console.log('heheheehe', JSON.stringify(d));
        const {
          name = '',
          price = [],
          uuid = '',
          variations = [],
          duration_minutes = '',
        } = service;
        const {date = '', time = '', personnel = []} = appointment;
        const {basic = ''} = personnel;
        const {name_first = '', name_last = ''} = basic;
        const {start = '', end = ''} = time;

        let variation_uuid = '';

        // Need Fixes

        let varPrice =
          variations &&
          variations[0] &&
          variations[0].price &&
          variations[0].price.price_base;

        const {price_net = '', price_base = ''} = price;
        let logo = '';
        variations &&
          variations.map(val => {
            if (val.logo) {
              logo = val.logo;
            }
            variation_uuid = val.uuid;
          });
        let service_ids = {
          salon_uuid: salonId,
          service_uuid: uuid,
          variation_uuid: variation_uuid,
        };

        let hour = start && start.substring(0, 2);
        let minute = start && start.substring(2, 5);
        let AmOrPm = hour >= 12 ? 'pm' : 'am';
        hour = hour % 12 || 12;
        return (
          <View style={styles.serviceContain}>
            <View style={styles.secondSubContain}>
              {/* Logo Available */}
              {/* {logo !== '' ? (
                <Image
                  source={
                    logo
                      ? {uri: logo}
                      : require('../../assets/profile/Salon_image.png')
                  }
                  style={styles.productImage}
                />
              ) : null} */}
              <View style={styles.heightSpace}>
                <Text
                  style={[
                    styles.nameOfService,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{width: '40%'}}>
                    <Text
                      style={[
                        styles.priceService,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      ₹ {varPrice ? varPrice : price_base}
                    </Text>
                  </View>

                  <Text style={[styles.durationService]}>
                    {duration_minutes + ` mins`}
                  </Text>
                </View>
                <Text style={[styles.timeService]}>
                  {`by ` + name_first + ` ` + name_last}
                </Text>

                <Text style={[styles.timeService]}>
                  at {hour + minute + ` ` + AmOrPm} ,
                  {Moment(date).format('DD MMMM YYYY')}
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
                    removeServiceCart(consumerId, service_ids);
                    setTimeout(() => {
                      viewCart(consumerId);
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
            <View
              style={[
                styles.horizontalLineShow,
                {
                  borderColor:
                    theme.type === 'darkTheme'
                      ? colors.stylistName
                      : colors.greyHomeBorder,
                },
              ]}
            />
          </View>
        );
      });
    }
  };

  toggleConfirmScreen = data => {
    const {razorPayVerify, cartCheckout = []} = this.props;
    const {
      viewCart = [],
      checkOutApi = [],
      razorPayVerifyData = [],
    } = cartCheckout;
    const {order = ''} = checkOutApi;
    const {uuid = ''} = order;
    razorPayVerify(data);
    setTimeout(() => {
      console.log('razorPayVerifyData====>>>', razorPayVerifyData);
      RootNavigation.navigate('bookingDetails', {
        successAnimation: true,
        bookingId: uuid,
      });
    }, 500);
  };

  renderServicesForAdd = () => {
    const {stylistDetail = [], navigation, salonDetail = []} = this.props;
    const {services = ''} = salonDetail.salonDetail;
    // console.log('salonDetail', salonDetail);
    let value = _.mapValues(services, 'items');
    // let meee = _.mapValues(services, function(o) {
    //   return o.items;
    // });
    let value_convert = _.map(value, items => ({
      items,
    }));

    let category = _.mapValues(services, 'category');
    // let meee = _.mapValues(services, function(o) {
    //   return o.items;
    // });
    let category_convert = _.map(category, items => ({
      categoryLocal: items,
    }));

    if (value_convert) {
      return value_convert.map((d, i) => (
        <ServiceList
          // verticalText={false}
          data={d}
          stylistAvailable={true}
          category_convert={category_convert[i]}
          onPress={() => {
            this.setState({timeSelectedFlag: true});
            // this.fetchAvailableTimeSloat();
            // this.RBSheet.close() && navigation.navigate('checkOutDetails');
          }}
        />
      ));
    }
  };

  fetchAvailableTimeSloat = () => {
    // console.log('MOHH MAYA');
    const {cartList = '', stylistDetail = ''} = this.props;
    const {data = '', serviceUuidMaster = ''} = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    // console.log('data====>', data);
    const {uuid = ''} = data;
    const {selected_date} = this.state;
    let salonId =
      stylistDetail &&
      stylistDetail.stylistDetail &&
      stylistDetail.stylistDetail.basic &&
      stylistDetail.stylistDetail.basic.salon &&
      stylistDetail.stylistDetail.basic.salon.uuid;
    let stylistId =
      stylistDetail &&
      stylistDetail.stylistDetail &&
      stylistDetail.stylistDetail.uuid;
    let selected_Ids = {
      service_uuid: uuid,
      variation_uuid: product ? productUuid : null,
      date: Moment(new Date()).format('YYYY-MM-DD'),
    };
    this.props.addSelectedDate(Moment(new Date()).format('YYYY-MM-DD'));
    this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
    this.setState({refreshCalenderView: false});
  };

  renderCheckoutTime = () => {
    const {
      appTheme,
      navigation,
      cartList = '',
      salonDetail = '',
      user = '',
      stylistDetail = '',
    } = this.props;

    const {
      availableTimeSlot = '',
      selectedStylist = '',
      data = '',
      selectedTime = '',
      serviceAPI = '',
      selectedDate = '',
      serviceUuidMaster = '',
    } = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    const {success = ''} = serviceAPI;
    const {start = ''} = selectedTime;
    const {uuid = ''} = data;
    const {selected_date, refreshCalenderView} = this.state;
    const {MORNING = '', AFTERNOON = '', EVENING = ''} = availableTimeSlot;
    let theme = appTheme.theme;
    let consumerId = user && user.detail && user.detail.uuid;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let selected_Ids = {
      service_uuid: uuid,
      variation_uuid: product ? productUuid : null,
      date: selected_date,
    };
    let stylistId = selectedStylist && selectedStylist.uuid;

    if (refreshCalenderView) {
      // this.fetchAvailableTimeSloat();
    }

    // console.log('consumerId', consumerId);
    // console.log('salonId', stylistDetail);

    let service_add = {
      salon_uuid: salonId,
      service_uuid: productUuid,
      variation_uuid: product ? uuid : null,
      on_date: selectedDate,
      at_time: selectedTime,
      personnel_uuid: stylistId,
      discard_existing: false,
    };

    let datesWhitelist = [
      {
        start: Moment(new Date()).format('YYYY-MM-DD'),
        end: Moment().add(1, 'days'), // total 4 days enabled
      },
    ];

    // console.log('service_add', service_add);
    return (
      <ScrollView style={styles.mainTimePicker}>
        <View style={styles.calenderContainer}>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            iconStyle={{height: 20, width: 20}}
            onDateSelected={data => {
              selected_Ids.date = Moment(data).format('YYYY-MM-DD');
              this.props.addSelectedDate(Moment(data).format('YYYY-MM-DD'));
              this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
            }}
            style={{
              height: 100,
              paddingTop: scale(10),
              paddingBottom: scale(10),
              // marginHorizontal: scale(20),
            }}
            calendarHeaderStyle={[
              styles.headerText,
              // {color: theme.PRIMARY_TEXT_COLOR},
            ]}
            dateNumberStyle={[
              styles.dateNumberStyle,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}
            dateNameStyle={styles.dateNameStyle}
            highlightDateNumberStyle={styles.dateNumberSelectedStyle}
            highlightDateNameStyle={[
              styles.dateNameSelectedStyle,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}
            iconContainer={{flex: 0.1}}
            datesWhitelist={datesWhitelist}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
          />
        </View>
        {/* <View style={{flexDirection: 'row'}}>{dateList}</View> */}
        <View style={{marginHorizontal: scale(20), marginBottom: scale(120)}}>
          <View style={{marginBottom: scale(5), marginTop: scale(20)}}>
            {MORNING !== ''
              ? this.renderAvailbleTimes(MORNING, 'MORNING')
              : null}
            {AFTERNOON !== ''
              ? this.renderAvailbleTimes(AFTERNOON, 'AFTERNOON')
              : null}
            {EVENING !== ''
              ? this.renderAvailbleTimes(EVENING, 'EVENING')
              : null}
          </View>
        </View>

        <CustomButton
          style={[
            styles.cartButton,
            {
              // position: 'absolute',
              // bottom: scale(-20),
              width: '80%',
              marginHorizontal: scale(30),
              // marginTop: scale(50),
              backgroundColor: selectedTime
                ? colors.lightOrange
                : colors.grayBorder,
            },
          ]}
          btnText={'Proceed'}
          onPress={() => {
            this.props.addServiceAPI(consumerId, service_add);
            setTimeout(() => {
              // this.props.viewCart(uuid);
              selectedTime && this.RBSheet.close();
            }, 100);
          }}
        />
      </ScrollView>
    );
  };

  renderAvailbleTimes = (Data, name) => {
    const {items = ''} = Data;
    const {selected_time} = this.state;
    const {appTheme, cartList} = this.props;
    const {selectedTime = ''} = cartList;
    let theme = appTheme.theme;

    // let currentTime = Moment().format('hh:mm');

    return (
      <View style={{flexDirection: 'row', marginVertical: scale(5)}}>
        <Image
          source={
            name === 'EVENING'
              ? require('../../assets/myAccount/moon.png')
              : require('../../assets/myAccount/sun.png')
          }
          style={styles.imagesGreeting}
        />
        <FlatList
          horizontal={true}
          data={Data}
          contentContainerStyle={{marginLeft: scale(5)}}
          renderItem={(data, key) => {
            const {item = ''} = data;
            const {start = '', state = ''} = item;
            let hour = start.substring(0, 2);
            let minute = start.substring(2, 5);
            let AmOrPm = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12 || 12;
            return (
              <TouchableOpacity
                onPress={() => {
                  state === 'AVAILABLE'
                    ? this.props.addSelectedTime(start)
                    : alert('Selected Time Not Available');
                }}
                style={[
                  styles.timeSelectContainer,
                  {
                    borderWidth: selectedTime === start ? 1 : 0,
                    borderColor: colors.orangeText,
                    backgroundColor:
                      state === 'AVAILABLE'
                        ? theme.PRIMARY_BACKGROUND_COLOR_LIGHT
                        : colors.grayBorder,
                  },
                ]}>
                <Text
                  style={{
                    // color: theme.PRIMARY_TEXT_COLOR,
                    paddingHorizontal: scale(5),
                    color:
                      selectedTime === start
                        ? colors.orangeText
                        : theme.PRIMARY_TEXT_COLOR,
                  }}>
                  {hour + minute + ` ` + AmOrPm}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  listSelectStylist = () => {
    const {cartList = '', salonDetail = ''} = this.props;
    const {personnels = '', basic = '', uuid = ''} = salonDetail.salonDetail;
    const {availableStylist = '', selectedStylist = ''} = cartList;
    if (availableStylist) {
      return (
        <FlatList
          data={availableStylist}
          keyExtractor={this.keyExtractor}
          renderItem={availableStylist => {
            const {item = ''} = availableStylist;
            console.log('item===>>>>', item);
            return (
              <TopStylist
                data={availableStylist}
                salon_Uuid={uuid}
                selectStylist={() => {
                  this.props.addStylist(item);
                  // this.props.fetchStylistDetails(salonId, stylistId);
                }}
                selectedStylist={selectedStylist === item ? true : false}
              />
            );
          }}
          horizontal
          contentContainerStyle={styles.topStylistContainerStyle}
        />
      );
    }
  };

  checkOutListStylist = () => {
    const {appTheme, cartList = '', salonDetail = ''} = this.props;
    const {selected_time, selected_date, stylistSelectedFlag} = this.state;
    const {data = '', selectedStylist = '', serviceUuidMaster = ''} = cartList;
    const {price = '', uuid = ''} = data;
    const {price_net = ''} = price;
    let theme = appTheme.theme;
    const {productUuid = ''} = serviceUuidMaster;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let stylistId = selectedStylist && selectedStylist.uuid;
    let selected_Ids = {
      service_uuid: productUuid,
      variation_uuid: uuid,
      date: selected_date,
    };
    // console.log('selected_Ids===>', selected_Ids);
    return (
      <View
        style={[
          styles.checkOutListStylist,
          {
            // backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
          },
        ]}>
        {/* Top Stylist */}
        {/* <View style={styles.flexDirection}>
          <Text
            style={[
              styles.topStlist,
              {
                width: '70%',
                letterSpacing: 2,
                color: theme.PRIMARY_TEXT_COLOR,
              },
            ]}>
            Select preferred stylist
          </Text>
        </View> */}
        <View>
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(30), color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {data.name}
          </Text>
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(10), color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {'\u20B9 ' + price_net}
          </Text>
        </View>

        {this.listSelectStylist()}
        <CustomButton
          style={[
            styles.cartButton,
            {
              bottom: scale(40),
              marginTop: scale(20),
              backgroundColor: selectedStylist
                ? colors.lightOrange
                : colors.grayBorder,
            },
          ]}
          btnText={'Proceed'}
          onPress={() => {
            this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
            // this.fetchAvailableTimeSloat();

            selectedStylist ? this.setState({stylistSelectedFlag: true}) : {};
          }}
        />
        {/* Top Stylist End */}
      </View>
    );
  };

  _onRefresh = () => {
    const {cartCheckout = []} = this.props;
    const {isLoadingData} = cartCheckout;
    this.setState({refreshing: true});
    const {user = [], viewCart} = this.props;
    const {detail = ''} = user;
    const {uuid = ''} = detail;
    console.log('uuid===>', detail);
    if (uuid) {
      // console.log('uuid===>', uuid);
      viewCart(uuid);
      this.setState({refreshing: isLoadingData});
    }
  };

  checkOutApi = () => {
    const {checkOutApi, user = [], getAllOrder} = this.props;
    const {detail = ''} = user;
    let data = {
      read: false,
      payment_option: 'razorpay',
    };
    let consumerId = detail && detail.uuid;

    checkOutApi(consumerId, data);

    setTimeout(() => {
      getAllOrder(consumerId, 'UPCOMING');
      getAllOrder(consumerId, 'PAST');
      this.fetchRazorDetail();
    }, 1000);
  };

  fetchRazorDetail = () => {
    const {razorPayInit, cartCheckout = []} = this.props;
    const {viewCart = [], checkOutApi = []} = cartCheckout;
    const {order = ''} = checkOutApi;
    const {uuid = ''} = order;
    // console.log('uuid', checkout);
    // console.log('chhchchc', checkOutApi);

    let passThis = {
      order_uuid: uuid,
    };
    if (passThis) {
      razorPayInit(passThis);
      setTimeout(() => {
        this.renderRazorPay();
      }, 1000);
    }
  };

  renderRazorPay = () => {
    const {
      salonDetail = [],
      user = [],
      cartCheckout = [],
      navigation,
    } = this.props;

    const {detail = ''} = user;
    const {email = '', mobile = ''} = detail;

    const {basic = ''} = salonDetail.salonDetail;
    const {name = '', logo = '', location = ''} = basic;

    const {viewCart = [], razorPayInit = [], checkOutApi = []} = cartCheckout;
    const {checkout = []} = razorPayInit;
    const {price = []} = viewCart;
    const {price_net = ''} = price;

    let userName = detail && detail.name;

    // const {viewCart = [], } = cartCheckout;
    const {order = ''} = checkOutApi;
    const {uuid = ''} = order;

    // console.log('razorPayInit', uuid);

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
      .then(data => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        this.toggleConfirmScreen(data);
      })
      .catch(error => {
        // const {code = ''} = error;
        // if (code === 2) {
        //   alert('payment cancelled');
        // } else {
        //   alert(
        //     `Payment failed. If amount is deducted from your account it'll be reverted in 48 hours.`,
        //   );
        // }

        // navigation.navigate('bookingDetails', {
        //   // successAnimation: true,
        //   bookingId: uuid,
        // });

        navigation.navigate('OrderHistoryDetails', {
          successAnimation: false,
          bookingId: uuid,
        });

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
      // checkOutApi,
      user = [],
    } = this.props;

    const {detail = ''} = user;
    const {uuid = ''} = detail;
    const {timeSelectedFlag, cartItem, stylistSelectedFlag} = this.state;

    const {basic = ''} = salonDetail.salonDetail;
    const {name = '', logo = '', location = ''} = basic;
    const {address = ''} = location;
    const {micro_market = ''} = address;
    const {viewCart = [], availablePaymentOption = []} = cartCheckout;
    const {items = [], price = []} = viewCart;
    const {price_net = '', price_base = '', price_gst = ''} = price;
    let theme = appTheme.theme;
    let checkAvailablePayment = [];
    checkAvailablePayment =
      availablePaymentOption &&
      availablePaymentOption.map(d => {
        let val = {label: d.name, name: d.name};
        return val;
      });

    // console.log('availablePaymentOption', check);

    let cartItemNumber = items && items.length != 0 ? false : true;

    if (cartItemNumber) {
      return (
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <StatusBar
            translucent
            backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
          />

          <View style={styles.headerContain}>
            <ScreenHeader
              onPress={() => navigation.goBack()}
              screenTitle={'Order summary'}
            />
          </View>
          <View style={styles.centerPoint}>
            <Image source={images.chair} />
            <Text style={[styles.heyText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Hey, it feels so empty
            </Text>
            <Text style={styles.noServiceText}>
              There’s no service in your cart, Let’s add some.
            </Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <StatusBar
            translucent
            backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
          />

          <View style={styles.headerContain}>
            <ScreenHeader
              onPress={() => navigation.goBack()}
              screenTitle={'Order summary'}
            />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
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
                  style={[
                    styles.saloonTitle,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {name ? name : `Looks Salon`}
                </Text>
                <Text style={[styles.address, {}]}>
                  {micro_market ? micro_market : `Cyber City`}
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
            <View
              style={[
                styles.dateTimeViewer,
                // {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}>
              <Text
                style={[
                  styles.selectedText,
                  {color: theme.PRIMARY_TEXT_COLOR},
                ]}>
                Selected Service
              </Text>
            </View>
            {this.renderServices()}
            {/* Service End */}

            {/* Service Button */}
            <TouchableOpacity
              onPress={() => {
                // this.RBSheet.open();
                navigation.goBack();
              }}
              style={[styles.serviceButton]}>
              <Text
                numberOfLines={1}
                style={[
                  styles.addmMore,
                  {textAlign: 'center', color: theme.PRIMARY_TEXT_COLOR},
                ]}>
                + Add More Services
              </Text>
            </TouchableOpacity>
            {/* Service Button End*/}

            {/* Available  Payment Option */}
            {/* <View style={styles.marginHorizontal}>
              <RadioForm
                buttonColor={colors.darkOrange}
                // buttonInnerColor={'red'}
                radio_props={checkAvailablePayment}
                // buttonOuterColor={'green'}
                buttonInnerColor={colors.darkOrange}
                buttonOuterColor={colors.darkOrange}
                initial={0}
                labelStyle={[
                  styles.radioButtonLable,
                  {color: theme.PRIMARY_TEXT_COLOR},
                ]}
                onPress={value => {
                  this.setState({value: value});
                }}
              />
            </View> */}

            {/* <FlatList
              data={availablePaymentOption}
              renderItem={data => {
                const {name = ''} = data.item;
                return (
                  <View style={styles.marginHorizontal}>
                 <Text
                      style={[
                        styles.paymentOption,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {name}
                    </Text>  
                    
                  </View>
                );
              }}
            /> */}

            {/* Available  Payment Option End*/}

            {/* Coupon TEXT */}

            {/* <TouchableOpacity
                style={styles.couponContainer}
                onPress={() => RootNavigation.navigate('promotionalOffers', {})}>
                <Image
                  source={require('../../assets/navigator/tab/discount.png')}
                  style={{tintColor: colors.orangeText, height: 20, width: 20}}
                />
                <Text style={[styles.coupontext, {color: colors.orangeText}]}>
                  Apply Coupon
                </Text>
            </TouchableOpacity> */}

            {/* Coupon TEXT End*/}

            {/* Price Component */}
            <View
              style={[
                styles.priceContainer,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}>
              <View
                style={[styles.priceTitleAlignment, {marginTop: scale(20)}]}>
                <Text
                  style={[
                    styles.priceTitleText,
                    // {color: theme.PRIMARY_TEXT_COLOR},
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
                    // {color: theme.PRIMARY_TEXT_COLOR},
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
                style={[
                  styles.priceTitleAlignment,
                  {marginVertical: scale(20)},
                ]}>
                <Text
                  style={[
                    styles.totalTitleText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Total Price
                </Text>
                <Text
                  style={[
                    styles.priceValueText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  ₹ {price_net}
                </Text>
              </View>
            </View>
            {/* Price Component End*/}
            {/* Note */}
            <Text style={styles.noteText}>
              Note: You’ll need to pay this amount at the salon
            </Text>
            {/* Note End */}
          </ScrollView>
          <View
            style={[
              styles.buttonContain,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                shadowColor: theme.NAVIGATION_SHADOW,
                padding: scale(10),
              },
            ]}>
            <CustomButton
              style={[
                styles.cartButton,
                styles.cartContain,
                {
                  backgroundColor:
                    price_net !== 0 ? colors.lightOrange : colors.grayBorder,
                },
              ]}
              btnText={'CONFIRM BOOKING'}
              onPress={
                () =>
                  // price_net !== 0 ? this.toggleConfirmScreen() : {}
                  this.checkOutApi()
                // this.renderRazorPay()
              }
            />
          </View>
          {/* Services List */}
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            onClose={() => {
              this.setState({
                timeSelectedFlag: false,
                refreshCalenderView: true,
                stylistSelectedFlag: false,
              });
              // this.props.addStylist(false);
              this.props.addStylist(false);
              this.props.addSelectedTime(false);
              this.props.addSelectedDate(
                Moment(new Date()).format('YYYY-MM-DD'),
              );
            }}
            height={scale(550)}
            duration={250}
            customStyles={{
              container: {
                // justifyContent: "center",
                paddingTop: scale(20),
                // paddingHorizontal: scale(30),
                borderTopLeftRadius: scale(30),
                borderTopRightRadius: scale(30),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              },
            }}>
            <Text
              style={[styles.selectService, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {timeSelectedFlag &&
                stylistSelectedFlag &&
                `Select Your preferred timings`}
              {timeSelectedFlag &&
                !stylistSelectedFlag &&
                `Select preferred stylist`}
              {!timeSelectedFlag && !stylistSelectedFlag && `Select Services`}
            </Text>
            {/*  <Text
            style={[
              styles.preferedTimeText,
              {
                color: theme.PRIMARY_TEXT_COLOR,
              },
            ]}>
            Select Your preferred timings
          </Text> */}
            <View
              style={[
                styles.menuHorizontalLine,
                !timeSelectedFlag && {borderBottomWidth: 1},
              ]}
            />
            <ScrollView>
              {timeSelectedFlag &&
                stylistSelectedFlag &&
                this.renderCheckoutTime()}
              {timeSelectedFlag &&
                !stylistSelectedFlag &&
                this.checkOutListStylist()}
              {!timeSelectedFlag &&
                !stylistSelectedFlag &&
                this.renderServicesForAdd()}
            </ScrollView>
          </RBSheet>
          {/* Services List End */}
        </SafeAreaView>
      );
    }
  }
}

const mapStatsToProps = ({
  user = [],
  appTheme = [],
  cartList = [],
  salonDetail = [],
  cartCheckout = [],
  stylistDetail = [],
}) => ({
  appTheme,
  cartList,
  salonDetail,
  user,
  cartCheckout,
  stylistDetail,
});

export default connect(
  mapStatsToProps,
  {
    viewCart,
    checkOutApi,
    removeServiceCart,
    fetchStylistDetails,
    addSelectedDate,
    addSelectedTime,
    addServiceAPI,
    getAvailableTimeSlot,
    fetchSalonDetails,
    addStylist,
    getAllOrder,
    getAvailablePaymentOption,
    razorPayInit,
    razorPayVerify,
  },
)(checkOutDetails);
