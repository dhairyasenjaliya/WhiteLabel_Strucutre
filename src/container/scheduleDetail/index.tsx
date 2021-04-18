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
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import RBSheet from 'react-native-raw-bottom-sheet';
import TopStylist from '../../components/topStylist';

import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
// import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import {getMyDealDetail} from '../../store/dealList/actions';
import {getAllOrder} from '../../store/orderList/actions';

import images from '../../assets/images';
import CustomButton from '../../components/Button';

import {
  getAvailableTimeSlot,
  addStylist,
  addSelectedDate,
  addSelectedTime,
  addServiceAPI,
  addServiceInCart,
  addServiceUuidMaster,
  getAvailableStylist,
  getAvailableDateSlot,
} from '../../store/cartList/actions';
import {
  viewScheduleCart,
  getAddableServie,
  addScheduleAPI,
  removeScheduleAPI,
  appointmentCheckout,
  appointmentCancel,
} from '../../store/scheduleCheckout/actions';

import {colors} from '../../constants/styles';
import {scale} from '../../utils/scale';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getMyDealDetail: Function;
  getAddableServie: Function;
  viewScheduleCart: Function;
  getAvailableTimeSlot: Function;
  getAvailableStylist: Function;
  addStylist: Function;

  getAllOrder: Function;
  addSelectedDate: Function;
  addSelectedTime: Function;
  addServiceAPI: Function;
  addServiceInCart: Function;
  addServiceUuidMaster: Function;
  addScheduleAPI: Function;
  removeScheduleAPI: Function;
  appointmentCheckout: Function;
  appointmentCancel: Function;
  getAvailableDateSlot: Function;
}

interface IState {
  // bookingDetails: Array<Object>;
  // confirmScreen: Boolean;
  // bookingId: String;
  // isLoading: Boolean;
  color1: String;
  color2: String;
  orderId: String;
  dealName: String;
  serviceSelected: Object;
  isServiceSelected: Boolean;
  selectedStylist: Boolean;
  stylistSelectedFlag: Boolean;
  selected_time: Any;
  selected_date: Any;
  showScheduleCart: Boolean;
  isServiceVariation: Boolean;
  localOptionSelect: Boolean;
  renderVariation: Boolean;
  serviceIdVariation: String;
  localOption: Object;
  confirmAnimation: Boolean;
  startDate: String;
  stateDateAvailable: Boolean;
}

class scheduleDetail extends React.Component<IProps, IState> {
  CheckOut: Any;
  calender: Any;
  constructor(props: any) {
    super(props);
    this.state = {
      // isLoading: true,
      // confirmScreen:
      //   this.props && this.props.route && this.props.route.params
      //     ? this.props.route.params.successAnimation
      //     : false,
      stateDateAvailable: false,
      startDate: '',
      confirmAnimation: false,
      localOption: [],
      serviceIdVariation: '',
      renderVariation: false,
      localOptionSelect: false,
      isServiceVariation: false,
      showCart: false,
      selected_date: '',
      selected_time: '',
      stylistSelectedFlag: false,
      selectedStylist: false,
      serviceSelected: '',
      isServiceSelected: false,
      dealName:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.name
          : false,
      color1:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.color1
          : false,
      color2:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.color2
          : false,
      orderId:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.dealId
          : false,
    };
  }
  componentDidMount() {
    const {orderId = ''} = this.state;
    const {
      getMyDealDetail,
      getAddableServie,
      user = [],
      viewScheduleCart,
    } = this.props;

    if (orderId) {
      this.refreshOrderDetail();
      getAddableServie(orderId);
      this.refreshScheduleCart();
    }
  }

  refreshOrderDetail = () => {
    const {orderId = ''} = this.state;
    const {getMyDealDetail} = this.props;
    if (orderId) {
      getMyDealDetail(orderId);
    }
  };

  refreshScheduleCart = () => {
    const {orderId = ''} = this.state;
    const {viewScheduleCart} = this.props;
    if (orderId) {
      viewScheduleCart(orderId);
    }
  };

  renderServiceIncluded = () => {
    const {appTheme, dealList = []} = this.props;
    const {myDealDetail = []} = dealList;
    const {items = []} = myDealDetail;
    let theme = appTheme.theme;
    // console.log('ehhee', JSON.stringify(items));
    return (
      <View style={styles.serviceIncludeContain}>
        <Text style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          services included
        </Text>
        <FlatList
          data={items}
          renderItem={data => {
            const {items = []} = data.item;
            // console.log('eeh', JSON.stringify(data.item));
            return (
              <View>
                <FlatList
                  data={items}
                  renderItem={data => {
                    const {service = [], session = []} = data.item;
                    const {name = ''} = service;
                    const {total = '', left = ''} = session;
                    return (
                      <View style={styles.servicesRender}>
                        <Text
                          style={[
                            styles.sessionValue,
                            {color: theme.PRIMARY_TEXT_COLOR},
                          ]}>
                          {name}
                        </Text>
                        <View style={styles.sessionRender}>
                          <View style={styles.marginHori}>
                            <Text
                              style={[
                                styles.sessionValue,
                                {color: theme.PRIMARY_TEXT_COLOR},
                              ]}>
                              {total}
                            </Text>
                            <Text style={styles.sessionText}>Sessions</Text>
                          </View>
                          <View>
                            {/* (API REMAINNG) */}
                            <Text
                              style={[
                                styles.sessionValue,
                                {color: colors.textGrey},
                              ]}>
                              {left}
                            </Text>
                            <Text style={styles.sessionText}>Left</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        />
        <View style={[styles.menuHorizontalLine]} />
      </View>
    );
  };

  cancleAppointment = uId => {
    const {appointmentCancel} = this.props;
    appointmentCancel(uId);
    setTimeout(() => {
      this.refreshOrderDetail();
    }, 200);
  };

  renderAppointmentSchedule = () => {
    const {appTheme, dealList} = this.props;
    const {myDealDetail = []} = dealList;
    const {items = []} = myDealDetail;
    let theme = appTheme.theme;
    let lengthAppointment =
      items &&
      items.map(d => {
        let allTotal = 0;
        allTotal = allTotal + d.latest_appointments.length;
        return allTotal;
      });
    let length = lengthAppointment && lengthAppointment[0];
    return (
      <View style={styles.serviceIncludeContain}>
        {length !== 0 && (
          <Text
            style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
            appointment schedule
          </Text>
        )}
        <FlatList
          data={items}
          renderItem={d => {
            const {latest_appointments = [], variations = []} = d.item;
            // console.log('service', JSON.stringify(d));
            return (
              <FlatList
                data={latest_appointments}
                renderItem={dt => {
                  const {
                    details = [],
                    basic = [],
                    cancellable = '',
                    uuid = '',
                  } = dt.item;
                  const {service = []} = details;
                  const {variations = [], name = ''} = service;
                  const {state = ''} = basic;

                  let check =
                    variations && variations.length !== 0 ? true : false;
                  if (check) {
                    return (
                      <FlatList
                        data={variations}
                        renderItem={d => {
                          // const {uuid = ''} = d.item;
                          let localName = d && d.item && d.item.name;
                          let localUid = d && d.item && d.item.uuid;
                          // console.log('ehehe', d.item);
                          return (
                            <View style={styles.servicesRender}>
                              <View>
                                <Text
                                  style={[
                                    styles.appointButtontext,
                                    {color: theme.PRIMARY_TEXT_COLOR},
                                  ]}>
                                  {localName}
                                </Text>
                                {/* <Text
                              style={[
                                styles.appointService,
                                {color: theme.PRIMARY_TEXT_COLOR},
                              ]}>
                              Haircut
                            </Text> */}
                                <Text style={styles.sessionValue}>
                                  04:30 pm on 30 June 2020
                                </Text>
                                {cancellable && (
                                  <TouchableOpacity
                                    onPress={() =>
                                      this.cancleAppointment(uuid)
                                    }>
                                    <Text style={styles.cancleText}>
                                      Cancel
                                    </Text>
                                  </TouchableOpacity>
                                )}
                              </View>
                              <View
                                style={[
                                  styles.completedButton,
                                  {
                                    backgroundColor:
                                      state === 'CONFIRMED' ||
                                      state === 'COMPLETED'
                                        ? 'rgba(72, 166, 81, 0.2)'
                                        : 'rgba(252, 74, 77, 0.79)',
                                  },
                                ]}>
                                <Text
                                  style={[
                                    styles.completedText,
                                    {color: theme.PRIMARY_TEXT_COLOR},
                                  ]}>
                                  {state === 'CONFIRMED' && `Confirmed`}
                                  {state === 'CANCELLED_CONFIRMED' &&
                                    `Cancelled`}
                                  {state === 'COMPLETED' && `Completed`}
                                  {state === 'MISSED' && `Missed`}
                                </Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    );
                  } else {
                    return (
                      <View style={styles.servicesRender}>
                        <View>
                          <Text
                            style={[
                              styles.appointButtontext,
                              {color: theme.PRIMARY_TEXT_COLOR},
                            ]}>
                            {name}
                          </Text>
                          {/* <Text
                          style={[
                            styles.appointService,
                            {color: theme.PRIMARY_TEXT_COLOR},
                          ]}>
                          Haircut
                        </Text> */}
                          <Text style={styles.sessionValue}>
                            04:30 pm on 30 June 2020
                          </Text>
                          {cancellable && (
                            <TouchableOpacity
                              onPress={() => {
                                this.cancleAppointment(uuid);
                              }}>
                              <Text style={styles.cancleText}>Cancel</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                        <View
                          style={[
                            styles.completedButton,
                            {
                              backgroundColor:
                                state === 'CONFIRMED' || state === 'COMPLETED'
                                  ? 'rgba(72, 166, 81, 0.2)'
                                  : 'rgba(252, 74, 77, 0.79)',
                            },
                          ]}>
                          <Text
                            style={[
                              styles.completedText,
                              {color: theme.PRIMARY_TEXT_COLOR},
                            ]}>
                            {state === 'CONFIRMED' && `Confirmed`}
                            {state === 'CANCELLED_CONFIRMED' && `Cancelled`}
                            {state === 'COMPLETED' && `Completed`}
                            {state === 'MISSED' && `Missed`}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                }}
              />
            );
          }}
        />
        {length !== 0 && (
          <View style={[styles.menuHorizontalLine, {marginTop: scale(10)}]} />
        )}
      </View>
    );
  };

  renderOrderDetail = () => {
    const {appTheme, dealList = []} = this.props;
    const {myDealDetail = []} = dealList;
    let theme = appTheme.theme;
    const {uuid = '', basic = [], items = []} = myDealDetail;
    const {display_id = '', checkout_at = []} = basic;
    const {date = []} = checkout_at;
    let lengthAppointment =
      items &&
      items.map(d => {
        let allTotal = 0;
        allTotal = allTotal + d.latest_appointments.length;
        return allTotal;
      });
    let length = lengthAppointment && lengthAppointment[0];
    return (
      <View
        style={[
          styles.serviceIncludeContain,
          {marginTop: scale(length === 0 ? 5 : 5)},
        ]}>
        <View style={styles.servicesRender}>
          <View>
            <Text
              style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              order_id:
            </Text>
            <Text style={styles.sessionValue}>{display_id}</Text>
          </View>
          <View>
            <Text
              style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              purchased on:
            </Text>
            {/* 30th June 2020 */}
            <Text style={styles.sessionValue}>
              {Moment(date).format('DD MMM ,YYYY')}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
            payment mode:
          </Text>
          <Text style={[styles.sessionValue, {textAlign: 'left'}]}>
            Netbanking
          </Text>
        </View>
      </View>
    );
  };

  datesBlacklistFunc = date => {
    const {
      appTheme,
      navigation,
      cartList = '',
      salonDetail = '',
      user = '',
    } = this.props;

    const {
      availableTimeSlot = '',
      selectedStylist = '',
      data = '',
      selectedTime = '',
      serviceAPI = '',
      selectedDate = '',
      serviceUuidMaster = '',
      availableDateSlot = [],
    } = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    const {success = ''} = serviceAPI;
    const {start = ''} = selectedTime;
    const {price = '', uuid = ''} = data;

    let hour = selectedTime && selectedTime.substring(0, 2);
    let minute = selectedTime && selectedTime.substring(2, 5);
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;

    const {price_net = ''} = price;
    const {
      orderId,
      selected_date,
      serviceSelected,
      isServiceSelected,
      serviceIdVariation,
      isServiceVariation,
      localOption,
      startDate,
      stateDateAvailable,
    } = this.state;
    // const {MORNING = '', AFTERNOON = '', EVENING = ''} = availableTimeSlot;
    // let theme = appTheme.theme;
    // let consumerId = user && user.detail && user.detail.uuid;
    // let consumerId = `4323aa78-0d92-4a03-9cba-5fdfb43aa87e`;

    let selectedUid =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.uuid;

    // let selectedName =
    //   serviceSelected &&
    //   serviceSelected.service &&
    //   serviceSelected.service.name;

    // let duration_minutes =
    //   serviceSelected &&
    //   serviceSelected.service &&
    //   serviceSelected.duration_minutes;

    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let stylistId = selectedStylist && selectedStylist.uuid;

    let selected_Ids = {
      service_uuid: isServiceVariation ? serviceIdVariation : selectedUid,
      variation_uuid: isServiceVariation ? selectedUid : '',
      date: selectedDate,
      // order_uuid: orderId,
    };

    // service_uuid: isServiceSelected ? serviceIdVariation : selectedId,
    //   variation_uuid: isServiceSelected ? selectedId : '',

    // let localUUid = localOption && localOption.uuid;

    let formateDate = Moment(date).format('YYYY-MM-DD');

    let formate = '';

    availableDateSlot &&
      availableDateSlot.map((d, key) => {
        // console.log('heh---e', key, d.date);
        const {state = ''} = d;
        let localDate = d && d.date;
        if (localDate === formateDate) {
          // console.log('localDate==>', localDate);
          if (state === 'AVAILABLE') {
            if (!this.state.stateDateAvailable) {
              // console.log('hust checking==>');
              this.setState(
                {
                  selected_date: localDate,
                  stateDateAvailable: true,
                },
                () => {
                  selected_Ids.date = Moment(localDate).format('YYYY-MM-DD');
                  this.props.addSelectedDate(
                    Moment(localDate).format('YYYY-MM-DD'),
                  );
                  this.calender.setSelectedDate(
                    Moment(localDate).format('YYYY-MM-DD'),
                  );
                  this.props.getAvailableTimeSlot(
                    salonId,
                    stylistId,
                    selected_Ids,
                  );
                },
              );
            }
            formate = localDate;
          }
        }
      });
    return formate; // disable Saturdays
  };

  renderAvailbleTimes = (Data, name) => {
    const {items = ''} = Data;
    const {selected_time} = this.state;
    const {appTheme, cartList} = this.props;
    const {selectedTime = ''} = cartList;
    let theme = appTheme.theme;
    // let currentTime = Moment().format('hh:mm');

    return (
      <View style={{flexDirection: 'row', marginVertical: scale(2)}}>
        {Data && (
          <Image
            source={
              (name === 'MORNING' &&
                require('../../assets/serviceList/icon-morning.png')) ||
              (name === 'AFTERNOON' &&
                require('../../assets/serviceList/icon-afternoon.png')) ||
              (name === 'EVENING' &&
                require('../../assets/serviceList/icon-evening.png'))
            }
            style={styles.imagesGreeting}
          />
        )}
        <FlatList
          horizontal={true}
          data={Data}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{marginLeft: scale(5)}}
          renderItem={(data, key) => {
            const {item = ''} = data;
            const {start = '', state = '', risk_level = ''} = item;
            let hour = start && start.substring(0, 2);
            let minute = start && start.substring(2, 5);
            let AmOrPm = hour >= 12 ? 'pm' : 'am';
            hour = hour % 12 || 12;
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    state === 'AVAILABLE'
                      ? this.props.addSelectedTime(start)
                      : alert('Selected Time Not Available');
                  }}
                  style={[
                    styles.timeSelectContainer,
                    {
                      borderWidth: 1,
                      borderColor:
                        selectedTime === start
                          ? colors.orangeText
                          : colors.greyHomeBorder,
                      backgroundColor:
                        selectedTime === start
                          ? `rgba(238,117,15,0.2)`
                          : state === 'AVAILABLE'
                          ? risk_level === 'LOW'
                            ? colors.whitePrimary
                            : 'rgba(255,195,197,1)'
                          : colors.grayBorder,
                    },
                  ]}>
                  <Text
                    style={{
                      paddingHorizontal: scale(5),
                      color:
                        selectedTime === start
                          ? colors.orangeText
                          : colors.blackPrimary,
                    }}>
                    {hour + minute + ` ` + AmOrPm}
                  </Text>
                </TouchableOpacity>
                {risk_level !== 'LOW' && (
                  <Text style={styles.crowdtext}>crowded</Text>
                )}
              </View>
            );
          }}
        />
      </View>
    );
  };

  datesWhiteFunc = () => {
    const {cartList = ''} = this.props;
    // console.log('whaterver', date);
    const {availableDateSlot = []} = cartList;
    const {selected_date, startDate} = this.state;

    availableDateSlot &&
      availableDateSlot.map(d => {
        const {state = '', date = ''} = d;
        if (state === 'AVAILABLE') {
          if (date) {
            return Moment(date).format('YYYY-MM-DD');
          }
        }
      });
    return Moment(new Date()).format('YYYY-MM-DD');
  };

  renderCheckoutTime = () => {
    const {
      appTheme,
      navigation,
      cartList = '',
      salonDetail = '',
      user = '',
    } = this.props;

    const {
      availableTimeSlot = '',
      selectedStylist = '',
      data = '',
      selectedTime = '',
      serviceAPI = '',
      selectedDate = '',
      serviceUuidMaster = '',
      availableDateSlot = [],
      isLoadingData = '',
    } = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    const {success = ''} = serviceAPI;
    const {start = ''} = selectedTime;
    const {price = '', uuid = ''} = data;

    let hour = selectedTime && selectedTime.substring(0, 2);
    let minute = selectedTime && selectedTime.substring(2, 5);
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;

    const {price_net = ''} = price;
    const {
      orderId,
      selected_date,
      serviceSelected,
      isServiceSelected,
      serviceIdVariation,
      isServiceVariation,
      localOption,
      startDate,
    } = this.state;
    const {MORNING = '', AFTERNOON = '', EVENING = ''} = availableTimeSlot;
    let theme = appTheme.theme;
    let consumerId = user && user.detail && user.detail.uuid;
    // let consumerId = `4323aa78-0d92-4a03-9cba-5fdfb43aa87e`;

    let selectedUid =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.uuid;

    let selectedName =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.name;

    let duration_minutes =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.duration_minutes;

    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let stylistId = selectedStylist && selectedStylist.uuid;

    let selected_Ids = {
      service_uuid: isServiceVariation ? serviceIdVariation : selectedUid,
      variation_uuid: isServiceVariation ? selectedUid : '',
      date: selectedDate,
      // order_uuid: orderId,
    };

    // service_uuid: isServiceSelected ? serviceIdVariation : selectedId,
    //   variation_uuid: isServiceSelected ? selectedId : '',

    let localUUid = localOption && localOption.uuid;
    let localName = localOption && localOption.name;

    // console.log('ehehehhee', localOption);

    let service_add = {
      service_uuid: isServiceVariation ? serviceIdVariation : selectedUid,
      variation_uuid: isServiceVariation ? localUUid : '',
      on_date: selectedDate,
      at_time: selectedTime,
      personnel_uuid: stylistId,
      read: true,
      // discard_existing: true,
    };

    return (
      <View>
        <View style={styles.mainTimePicker}>
          {/* <Text
            style={[
              styles.topStlist,
              {marginTop: scale(30), color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {data.name}
          </Text> */}
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(30), color: colors.blackPrimary},
            ]}>
            {selectedName ? selectedName : localName}
          </Text>
          {/* <View style={styles.detailBar}>
            <Text
              style={[
                styles.topStlist,
                {marginTop: scale(30), color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {selectedName ? selectedName : localName}
            </Text>
         <Text style={[styles.minuteText]}>
              {duration_minutes + ` mins`}
            </Text>  
          </View> */}
          <View style={[styles.upperLine2]}>
            <CalendarStrip
              ref={ref => {
                this.calender = ref;
              }}
              calendarAnimation={{type: 'sequence', duration: 30}}
              iconStyle={{height: 20, width: 20}}
              // selectedDate={Moment(selected_date)}
              setSelectedDate={selected_date}
              onDateSelected={data => {
                this.setState({
                  selected_date: Moment(data).format('YYYY-MM-DD'),
                });
                selected_Ids.date = Moment(data).format('YYYY-MM-DD');
                this.props.addSelectedDate(Moment(data).format('YYYY-MM-DD'));
                this.props.getAvailableTimeSlot(
                  salonId,
                  stylistId,
                  selected_Ids,
                );
              }}
              style={{
                height: scale(61),
                // paddingTop: scale(10),
                paddingVertical: scale(2),
                // marginHorizontal: scale(20),
              }}
              calendarHeaderStyle={[
                styles.headerText,
                // {color: theme.PRIMARY_TEXT_COLOR},
              ]}
              dateNumberStyle={[
                styles.dateNumberStyle,
                {color: colors.blackPrimary},
              ]}
              dateNameStyle={styles.dateNameStyle}
              highlightDateNumberStyle={styles.dateNumberSelectedStyle}
              highlightDateNameStyle={[
                styles.dateNameSelectedStyle,
                {color: colors.blackPrimary},
              ]}
              iconContainer={{flex: 0.1}}
              datesWhitelist={this.datesBlacklistFunc}
              // datesWhitelist={this.datesWhiteFunc()}
              disabledDateNameStyle={{color: 'grey'}}
              disabledDateNumberStyle={{color: 'grey'}}
              showMonth={false}
            />
          </View>
          <Text style={[styles.preferedTimeText]}>
            Select Your preferred time slot
          </Text>
        </View>
        {/* <View style={{flexDirection: 'row'}}>{dateList}</View> */}
        <View style={styles.calenderContain}>
          {isLoadingData ? (
            <ActivityIndicator
              size={'large'}
              color={colors.lightOrange}
              style={styles.indicator}
            />
          ) : (
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
          )}
        </View>

        <View
          style={[
            styles.flexRow,
            styles.buttonBottom,
            {
              backgroundColor: colors.whitePrimary,
              bottom: scale(-155),
              left: scale(2),
            },
          ]}>
          <View
            style={{
              alignItems: 'center',
              marginLeft: scale(30),
              marginTop: scale(20),
              // marginBottom: scale(20),
              // marginBottom: scale(20),
            }}>
            <Text style={styles.clockSubText}>Selected Time</Text>
            <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
              {selectedTime ? hour + minute + ` ` + AmOrPm : ' - '}
            </Text>
            <Text style={styles.clockSubText}>
              {Moment(selected_date).format('DD MMMM YYYY')}
            </Text>
          </View>

          <CustomButton
            style={[
              styles.cartButton,
              styles.customPosition,
              {
                width: '50%',
                heigth: scale(120),
                marginHorizontal: scale(30),
                marginTop: scale(20),
                // marginBottom: scale(20),
                backgroundColor: selectedTime
                  ? colors.lightOrange
                  : colors.grayBorder,
              },
            ]}
            btnText={'Proceed'}
            // onPress={() => {}}
            // this.props.addServiceAPI(consumerId,service_add);
            onPress={
              selectedTime
                ? () => {
                    this.props.addScheduleAPI(orderId, service_add);
                    this.setState({showScheduleCart: true});
                    setTimeout(() => {
                      this.refreshScheduleCart();
                    }, 150);
                  }
                : () => alert('Please Select Date & Time')
            }
          />
        </View>
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
            // console.log('item===>>>>', item);
            return (
              <TopStylist
                data={availableStylist}
                // salon_Uuid={uuid}
                selectStylist={() => {
                  this.props.addStylist(item);
                }}
                fontColor={colors.blackPrimary}
                selectedStylist={selectedStylist === item ? true : false}
              />
            );
          }}
          horizontal
          contentContainerStyle={[
            styles.topStylistContainerStyle,
            {marginTop: scale(30)},
          ]}
        />
      );
    }
  };

  checkOutListStylist = () => {
    const {appTheme, cartList = '', salonDetail = ''} = this.props;
    const {
      selected_time,
      selected_date,
      serviceSelected,
      isServiceSelected,
      serviceIdVariation,
      localOption,
      stateDateAvailable,
    } = this.state;
    const {data = '', selectedStylist = '', serviceUuidMaster = ''} = cartList;
    const {price = '', uuid = ''} = data;
    const {price_net = ''} = price;
    let theme = appTheme.theme;
    const {productUuid = ''} = serviceUuidMaster;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let stylistId = selectedStylist && selectedStylist.uuid;

    let selectedId =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.uuid;

    let selected_Ids = {
      service_uuid: isServiceSelected ? serviceIdVariation : selectedId,
      variation_uuid: isServiceSelected ? selectedId : '',
      date: selected_date,
    };

    let fetchDate = {
      service_uuid: isServiceSelected ? serviceIdVariation : selectedId,
    };

    let selectedName =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.name;

    let localName = localOption && localOption.name;

    let stylistSelectedName =
      selectedStylist &&
      selectedStylist.basic &&
      selectedStylist.basic.name_first;

    // console.log('hehe', selectedStylist);

    return (
      <View
        style={[
          styles.checkOutListStylist,
          {
            // backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
          },
        ]}>
        {/* Top Stylist */}
        <View style={styles.marginVert2}>
          {/* <Image source={{ uri:logo }} /> */}
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(16), color: colors.blackPrimary},
            ]}>
            {selectedName ? selectedName : localName}
          </Text>
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(10), color: colors.blackPrimary},
            ]}>
            {/* {'\u20B9 ' + price_net} */}
          </Text>
        </View>

        <View style={styles.flexDirection}>
          <Text
            style={[
              styles.topStlist,
              {
                width: '70%',
                letterSpacing: 2,
                color: colors.blackPrimary,
              },
            ]}>
            Select Available stylist
          </Text>
        </View>
        {this.listSelectStylist()}
        {/* <View
          style={[
            styles.buttonContain2,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              shadowColor: theme.NAVIGATION_SHADOW,
              padding: scale(15),
            },
          ]}> */}

        <View
          style={[
            styles.buttonBottom,
            {
              backgroundColor: colors.whitePrimary,
              bottom: scale(-240),
              paddingTop: scale(10),
              paddingBottom: scale(10),
              // left: scale(2),
              width: '100%',
              // padding: scale(20),
            },
          ]}>
          <View
            style={{
              // alignItems: 'center',
              marginTop: scale(10),
              width: '35%',
              marginLeft: scale(16),
            }}>
            <Text style={styles.clockSubText}>Selected stylist</Text>
            <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
              {stylistSelectedName ? stylistSelectedName : `-`}
            </Text>
          </View>

          <CustomButton
            style={[
              styles.cartButton,
              styles.cartContain,
              {marginTop: scale(5)},
            ]}
            btnText={'Proceed'}
            onPress={
              selectedStylist
                ? () => {
                    this.props.getAvailableDateSlot(
                      salonId,
                      stylistId,
                      fetchDate,
                    );
                    selectedStylist
                      ? this.setState({stylistSelectedFlag: true})
                      : {};
                  }
                : () => alert('Please Select Stylist')
            }
          />
        </View>
        {/* Top Stylist End */}
      </View>
    );
  };

  whatToRender = () => {
    const {
      appTheme,
      scheduleCheckout,
      dealList,
      getAvailableStylist,
    } = this.props;
    const {addableService = []} = scheduleCheckout;
    const {items = []} = addableService;
    const {serviceSelected = [], isServiceVariation} = this.state;
    let theme = appTheme.theme;

    const {myDealDetail = []} = dealList;
    const {salon = []} = myDealDetail;

    let selectedName =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.name;

    let service_uuid =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.uuid;

    let salonId = salon && salon.uuid;

    // let productAdd = {
    //   productUuid: service_uuid,
    //   product: false,
    // };

    let dataChcek = {
      variation_uuid: '',
    };

    // console.log('eheheh', service_uuid);
    return (
      <View
        style={[styles.mainTimePicker, {marginVertical: scale(30), flex: 1}]}>
        <Text
          style={[
            styles.topStlist,
            {color: colors.blackPrimary, marginTop: scale(1)},
          ]}>
          {`Select Service`}
        </Text>
        {/* <View style={styles.detailBar}>
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(10), color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {`\u20B9 price_net`}
          </Text>
        </View> */}
        <View style={[styles.upperLine]}>
          <View style={[styles.marginVert, {marginTop: scale(20)}]}>
            <Text style={[styles.availableText, {color: colors.blackPrimary}]}>
              Available Services
            </Text>
          </View>
        </View>
        <FlatList
          data={items}
          contentContainerStyle={styles.flatlistMargin}
          renderItem={data => {
            const {state = '', service = [], session = []} = data.item;
            const {
              uuid = '',
              name = '',
              duration_minutes = '',
              variations = [],
            } = service;
            const {left = ''} = session;
            let checkVariation =
              variations && variations.length !== 0 ? true : false;
            // const {price_net = ''} = price;
            // console.log('aaa>-', checkVariation);
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    serviceSelected: data.item,
                    isServiceVariation: checkVariation,
                  });
                }}>
                <View style={styles.detailBar2}>
                  <View style={styles.detailBar2}>
                    <View
                      style={
                        selectedName == name
                          ? styles.checkedCircle
                          : styles.circle
                      }
                    />
                    <Text
                      style={[
                        styles.topStlist,
                        {
                          marginTop: scale(20),
                          color: colors.blackPrimary,
                        },
                      ]}>
                      {name}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.topStlist,
                        {
                          marginTop: scale(15),
                          color: colors.blackPrimary,
                        },
                      ]}>
                      {left + ` Session Left`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={[
            styles.buttonBottom,
            {
              backgroundColor: colors.whitePrimary,
              bottom: scale(-30),
              paddingBottom: scale(30),
              // padding: scale(20),
            },
          ]}>
          <View
            style={{
              alignItems: 'center',
              marginTop: scale(20),
              width: '35%',
              marginLeft: scale(5),
            }}>
            <Text style={styles.clockSubText}>Selected Service</Text>
            <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
              {selectedName ? selectedName : `-`}
            </Text>
          </View>

          <CustomButton
            style={[
              styles.cartButton,
              {
                width: '50%',
                marginHorizontal: scale(30),
                marginTop: scale(20),
                backgroundColor:
                  serviceSelected.length != 0
                    ? colors.lightOrange
                    : colors.grayBorder,
              },
            ]}
            btnText={'Proceed'}
            onPress={
              serviceSelected.length != 0
                ? () => {
                    this.setState(
                      {
                        isServiceSelected: true,
                      },
                      () => {
                        // this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
                        // addServiceUuidMaster(productAdd);
                        // addServiceInCart(localOptionSelect);
                        // this.setState({
                        //   isServiceVariation: checkVariation,
                        // })
                        isServiceVariation
                          ? this.setState({
                              renderVariation: true,
                              serviceIdVariation: service_uuid,
                            })
                          : getAvailableStylist(
                              salonId,
                              service_uuid,
                              dataChcek,
                            );
                      },
                    );
                  }
                : () => {
                    alert('Please Select any one Service');
                  }
            }
          />
        </View>
      </View>
    );
    // }
  };

  viewScheduleCartt = () => {
    const {
      appTheme,
      navigation,
      scheduleCheckout = [],
      removeScheduleAPI,
      appointmentCheckout,
    } = this.props;
    const {orderId, isServiceVariation, selected_date} = this.state;
    let theme = appTheme.theme;
    const {viewScheduleCart = []} = scheduleCheckout;
    const {items = []} = viewScheduleCart;
    let numberOfService = items && items.length;

    // console.log('viewScheduleCartt()=>appointmentList', selected_date);
    return (
      <View style={{flex: 1}}>
        <View style={[styles.mainTimePicker, {marginVertical: scale(5)}]}>
          <Text
            style={[
              styles.topStlist,
              {
                color: colors.blackPrimary,
                marginTop: scale(15),
                marginBottom: scale(10),
              },
            ]}>
            {`Confirm Appointment`}
          </Text>
          <View style={[styles.upperLine]}>
            <Text
              style={[
                styles.availableText,
                {color: colors.blackPrimary, marginTop: scale(30)},
              ]}>
              Available Services
            </Text>
          </View>
          <FlatList
            data={items}
            contentContainerStyle={styles.flatlistMargin}
            renderItem={data => {
              const {service = {}, appointment = {}} = data.item;
              const {name = '', uuid = '', variations = []} = service;
              const {date = '', time = {}} = appointment;
              const {start = ''} = time;
              let hour = start && start.substring(0, 2);
              let minute = start && start.substring(2, 5);
              let AmOrPm = hour >= 12 ? 'pm' : 'am';
              hour = hour % 12 || 12;

              let removeData = {
                service_uuid: uuid,
                variation_uuid: null,
              };

              let length = variations && variations.length != 0 ? true : false;

              if (length) {
                return (
                  <FlatList
                    data={variations}
                    renderItem={data => {
                      const {name = ''} = data.item;
                      let localUuid = data && data.item && data.item.uuid;
                      let removeData = {
                        service_uuid: uuid,
                        variation_uuid: localUuid,
                      };
                      return (
                        <View
                          style={[
                            styles.flexRow,
                            {justifyContent: 'space-between'},
                          ]}>
                          <View>
                            {/* <Text
                              style={[
                                styles.appointButtontext,
                                {color: theme.PRIMARY_TEXT_COLOR},
                              ]}>
                              Session
                            </Text> */}
                            <Text
                              style={[
                                styles.sessionText2,
                                {color: colors.blackPrimary},
                              ]}>
                              {name}
                            </Text>
                            <Text style={styles.sessionText2}>
                              {hour +
                                minute +
                                ` ` +
                                AmOrPm +
                                ` on ` +
                                Moment(date).format('Do MMMM YYYY')}
                            </Text>
                            {/* {`${hour + minute + ` ` + AmOrPm} */}
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              removeScheduleAPI(orderId, removeData);
                              setTimeout(() => {
                                this.refreshScheduleCart();
                              }, 200);
                            }}>
                            <Text style={styles.cancleText}>Cancel</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                );
              } else {
                return (
                  <View
                    style={[styles.flexRow, {justifyContent: 'space-between'}]}>
                    <View>
                      <Text
                        style={[
                          styles.appointButtontext,
                          {color: colors.blackPrimary},
                        ]}>
                        Session
                      </Text>
                      <Text
                        style={[
                          styles.sessionText2,
                          {color: colors.blackPrimary},
                        ]}>
                        {name}
                      </Text>
                      <Text style={styles.sessionText2}>
                        {hour +
                          minute +
                          ` ` +
                          AmOrPm +
                          ` on ` +
                          Moment(date).format('Do MMMM YYYY')}
                      </Text>
                      {/* {`${hour + minute + ` ` + AmOrPm} */}
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        removeScheduleAPI(orderId, removeData);
                        setTimeout(() => {
                          this.refreshScheduleCart();
                        }, 200);
                      }}>
                      <Text style={styles.cancleText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
          />
          <TouchableOpacity
            onPress={() => {
              // this.RBSheet.open();
              // navigation.goBack();
              this.setState(
                {
                  serviceSelected: [],
                  isServiceSelected: false,
                  selectedStylist: false,
                  stylistSelectedFlag: false,
                  showScheduleCart: false,
                  // stateDateAvailable: true,
                },
                () => {
                  // this.calender.setSelectedDate(
                  //   Moment(selected_date).format('YYYY-MM-DD'),
                  // );
                  this.props.addStylist(false);
                  this.props.addSelectedDate(
                    Moment(new Date()).format('YYYY-MM-DD'),
                  );
                  this.props.addSelectedTime(false);
                },
              );
            }}
            style={[styles.serviceButton]}>
            <Text
              numberOfLines={1}
              style={{textAlign: 'center', color: colors.blackPrimary}}>
              + Add More Services
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.floatingCartButton,
            {
              backgroundColor: colors.whitePrimary,
            },
          ]}>
          <CustomButton
            style={[
              styles.cartButton,
              {
                marginTop: scale(20),
                marginBottom: scale(30),
                marginHorizontal: scale(20),
                backgroundColor:
                  numberOfService !== 0
                    ? colors.lightOrange
                    : colors.grayBorder,
                // backgroundColor: colors.lightOrange,
              },
            ]}
            btnText={'Confirm'}
            onPress={
              numberOfService !== 0
                ? () => {
                    this.CheckOut.close();
                    this.setState({confirmAnimation: true}, () =>
                      appointmentCheckout(orderId),
                    );
                  }
                : () => {}
            }
          />
        </View>
      </View>
    );
  };

  renderVariation = () => {
    const {
      cartList = [],
      appTheme,
      addServiceUuidMaster,
      salonDetail,
      getAvailableStylist,
      addServiceInCart,
    } = this.props;
    const {serviceSelected, serviceIdVariation, localOption} = this.state;
    let theme = appTheme.theme;

    let localName = localOption && localOption.name;
    let localUUid = localOption && localOption.uuid;

    // console.log('eheh', localOption);

    let service =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.variations;

    let selectedName =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.name;

    let service_uuid =
      serviceSelected &&
      serviceSelected.service &&
      serviceSelected.service.uuid;

    let salonId = salonDetail && salonDetail.salonDetail.uuid;

    let dataChcek = {
      variation_uuid: localUUid,
    };

    // serviceIdVariation
    return (
      <View
        style={[styles.mainTimePicker, {marginVertical: scale(30), flex: 1}]}>
        <Text
          style={[
            styles.topStlist,
            {color: colors.blackPrimary, marginTop: scale(1)},
          ]}>
          {selectedName}
        </Text>
        <View style={[styles.upperLine]}>
          <Text
            style={[
              styles.availableText,
              {color: colors.blackPrimary, marginTop: scale(30)},
            ]}>
            Available Options
          </Text>
        </View>
        <FlatList
          data={service}
          contentContainerStyle={styles.flatlistMargin}
          renderItem={data => {
            const {name = '', price = [], uuid = '', type = ''} = data.item;
            const {price_net = ''} = price;
            // typeName = type;
            // console.log('data=======', data);
            return (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    localOption: data.item,
                  });
                }}>
                <View style={styles.detailBar2}>
                  <View style={styles.detailBar2}>
                    <View
                      style={
                        localName == name ? styles.checkedCircle : styles.circle
                      }
                    />
                    <Text
                      style={[
                        styles.topStlist,
                        {
                          marginTop: scale(20),
                          color: colors.blackPrimary,
                        },
                      ]}>
                      {name}
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={[
                        styles.topStlist,
                        {
                          marginTop: scale(10),
                          color: colors.blackPrimary,
                        },
                      ]}>
                      {'\u20B9 ' + price_net}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View
          style={[
            styles.buttonBottom,
            {
              backgroundColor: colors.whitePrimary,
              bottom: scale(-30),
              paddingBottom: scale(30),
            },
          ]}>
          <View
            style={{
              alignItems: 'center',
              marginTop: scale(20),
              width: '35%',
              marginLeft: scale(5),
            }}>
            <Text style={styles.clockSubText}>Selected Option</Text>
            <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
              {localName}
            </Text>
            {/* <Text style={styles.clockSubText}>
              1200
            </Text> */}
          </View>

          <CustomButton
            style={[
              styles.cartButton,
              {
                width: '50%',
                marginHorizontal: scale(30),
                marginTop: scale(20),
                backgroundColor: localName
                  ? colors.lightOrange
                  : colors.grayBorder,
              },
            ]}
            btnText={'Proceed'}
            // onPress={() => {}}
            // this.props.addServiceAPI(consumerId,service_add);
            onPress={() => {
              this.setState(
                {
                  isServiceSelected: true,
                  renderVariation: false,
                  serviceSelected: localOption,
                },
                () => {
                  getAvailableStylist(salonId, service_uuid, dataChcek);
                },
              );
            }}
          />
        </View>
      </View>
    );
  };

  getAllOrderList = () => {
    const {getAllOrder, user = []} = this.props;
    const {detail = []} = user;
    let userId = detail && detail.uuid;
    // console.log('dd', detail.uuid);
    getAllOrder(userId, 'UPCOMING');
    // getAllOrder(userId, 'PAST');
    // getFavouriteDeal(userId);
  };

  renderConfirmBooking = () => {
    const {appTheme, navigation} = this.props;
    let theme = appTheme.theme;
    let themeType = appTheme.theme.type;
    setTimeout(() => {
      this.setState(
        {
          confirmAnimation: false,
        },
        () => {
          this.getAllOrderList();
          navigation.navigate('myAccount');
        },
      );
    }, 4000);
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
            Appointment Confirmed
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {
      appTheme,
      navigation,
      dealList = [],
      scheduleCheckout = [],
    } = this.props;
    const {addableService = []} = scheduleCheckout;
    // console.log('myDealDetail', addableService);
    // addableService
    const {myDealDetail = []} = dealList;
    let theme = appTheme.theme;
    const {
      basic = [],
      salon = [],
      items = [],
      appointment_bookable = '',
    } = myDealDetail;

    const {
      name = '',
      price = [],
      description = '',
      images = [],
      state = '',
      expires_at = [],
      display_id = '',
    } = basic;
    console.log('heheheheheh', JSON.stringify(myDealDetail));
    const {date = ''} = expires_at;
    const {price_net = ''} = price;
    // let color1 =
    //   images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    // let color2 =
    //   images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[1];
    let logo = salon && salon.basic && salon.basic.logo;
    let salonName = salon && salon.basic && salon.basic.name;
    const {
      color1,
      color2,
      dealName,
      isServiceSelected,
      stylistSelectedFlag,
      showScheduleCart,
      isServiceVariation,
      serviceSelected,
      renderVariation,
      confirmAnimation,
      selected_date,
    } = this.state;

    // console.log('date ==> render ==>', selected_date);

    if (confirmAnimation) {
      return this.renderConfirmBooking();
    } else {
      return (
        <View
          style={[
            styles.container,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <StatusBar
            translucent
            backgroundColor={color1 ? color1 : theme.PRIMARY_BACKGROUND_COLOR}
          />
          <ScrollView contentContainerStyle={{paddingBottom: scale(60)}}>
            <LinearGradient
              colors={[color1 ? color1 : '#000', color2 ? color2 : '#000']}
              style={styles.linearGradient}>
              <View style={styles.headerContain}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Icon
                    name={'chevron-left'}
                    size={30}
                    color={theme.PRIMARY_TEXT_COLOR}
                  />
                </TouchableOpacity>

                {/* <Image source={images.salon_image} style={styles.salonImages} /> */}
                <FastImage
                  style={styles.salonImages}
                  source={{
                    uri: logo,
                    // headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                  }}
                  // resizeMode={FastImage.resizeMode.contain}
                />
                <Text
                  style={[
                    styles.salonNameHeader,
                    // {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {salonName}
                </Text>
              </View>
              <View style={styles.headItem}>
                <Text
                  style={[
                    styles.titleHeader,
                    // {color: theme.PRIMARY_TEXT_COLOR}
                  ]}>
                  {/* Pay for hair spa and get hair cut free! */}
                  {dealName}
                </Text>
                <Text
                  style={[
                    styles.titleDetail,
                    // {color: theme.PRIMARY_TEXT_COLOR}
                  ]}
                />
              </View>
              <View style={styles.headerPriceContain}>
                <Text
                  style={[
                    styles.priceText,
                    // {color: theme.PRIMARY_TEXT_COLOR}
                  ]}>
                  {'\u20B9 ' + price_net}
                </Text>
                {appointment_bookable && (
                  <TouchableOpacity
                    onPress={() => {
                      this.CheckOut.open();
                    }}
                    style={styles.appointmentButton}>
                    <Text
                      style={[styles.appointButtontext, {color: colors.White}]}>
                       Schedule appointment
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {appointment_bookable &&
              <Text style={[styles.detailText, {color: colors.White}]}>
                click here to view details
              </Text>}
            </LinearGradient>

            <View style={styles.mainView}>
              <View style={styles.statusContain}>
                <View
                  style={[
                    styles.statusButton,
                    {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Status:
                  </Text>
                  <Text
                    style={[
                      styles.statusAvailable,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Available
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusButton,
                    {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    expiring on:
                  </Text>
                  <Text
                    style={[
                      styles.statusAvailable,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    {Moment(new Date()).format('Do MMMM YYYY')}
                  </Text>
                </View>
              </View>
              {/* Serive Included*/}
              {this.renderServiceIncluded()}
              {/* Serive Included End */}

              {/* Appointment Schedule */}
              {this.renderAppointmentSchedule()}
              {/* Appointment Schedule End */}
              {/* CheckOut */}
              <RBSheet
                ref={ref => {
                  this.CheckOut = ref;
                }}
                height={scale(500)}
                // duration={250}
                onClose={() => {
                  this.setState({
                    startDate: '',
                    localOption: false,
                    serviceSelected: [],
                    isServiceSelected: false,
                    selectedStylist: false,
                    stylistSelectedFlag: false,
                    showScheduleCart: false,
                    renderVariation: false,
                    isServiceVariation: false,
                    selected_date: '',
                    stateDateAvailable: false,
                    // localOptionSelect: [],
                    // selectLocalStylist: false,
                  });
                  this.props.addStylist(false);
                  this.props.addSelectedDate(
                    Moment(new Date()).format('YYYY-MM-DD'),
                  );
                  this.props.addSelectedTime(false);
                }}
                customStyles={{
                  container: {
                    borderTopLeftRadius: scale(12),
                    borderTopRightRadius: scale(12),
                    backgroundColor: colors.whitePrimary,
                  },
                }}>
                {/* {type && this.whatToRender()}
              {stylistSelectedFlag && !type && this.renderCheckoutTime()}
              {!stylistSelectedFlag && !type && this.checkOutListStylist()} */}

                {!isServiceSelected &&
                  !showScheduleCart &&
                  !renderVariation &&
                  this.whatToRender()}
                {isServiceSelected &&
                  !stylistSelectedFlag &&
                  !showScheduleCart &&
                  !renderVariation &&
                  this.checkOutListStylist()}
                {stylistSelectedFlag &&
                  !showScheduleCart &&
                  !renderVariation &&
                  this.renderCheckoutTime()}
                {showScheduleCart &&
                  !renderVariation &&
                  this.viewScheduleCartt()}
                {renderVariation &&
                  isServiceVariation &&
                  this.renderVariation()}

                {/* serviceSelected */}
                {/* showCart */}
              </RBSheet>
            </View>
          </ScrollView>
          {/* Order Detai */}
          <View
            style={[
              styles.orderContain,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                // shadowColor: colors.grayBorder,
              },
            ]}>
            {this.renderOrderDetail()}
          </View>
          {/* Order Detai End */}
        </View>
      );
    }
  }
}

const mapStatsToProps = ({
  appTheme = '',
  orderList = [],
  user = [],
  dealList = [],
  scheduleCheckout = [],
  salonDetail = [],
  cartList = [],
}) => ({
  appTheme,
  orderList,
  user,
  dealList,
  scheduleCheckout,
  salonDetail,
  cartList,
});

export default connect(
  mapStatsToProps,
  {
    getMyDealDetail,
    getAddableServie,
    viewScheduleCart,
    getAvailableTimeSlot,
    getAvailableStylist,
    addStylist,
    addSelectedDate,
    addSelectedTime,
    addServiceAPI,
    addServiceInCart,
    addServiceUuidMaster,
    addScheduleAPI,
    removeScheduleAPI,
    appointmentCheckout,
    getAllOrder,
    appointmentCancel,
    getAvailableDateSlot,
  },
)(scheduleDetail);
