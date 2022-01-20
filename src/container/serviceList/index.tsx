/* eslint-disable no-shadow */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';

import Search from '../../components/CustomSearch';
import styles from './style';
import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import Moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import TopStylist from '../../components/topStylist';

import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import * as RootNavigation from '../../navigation/rootNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import ServiceList from '../../components/ServiceList';
import CustomButton from '../../components/Button';
// import ServiceProductList from '../../components/serviceProductList';
// import ServiceSearchList from '../../components/ServiceSearchList';

import {fetchSalonDetails} from '../../store/salonDetail/actions';
import {
  getAvailableTimeSlot,
  addStylist,
  addSelectedDate,
  addSelectedTime,
  addServiceAPI,
  addServiceInCart,
  addServiceUuidMaster,
  getAvailableStylist,
} from '../../store/cartList/actions';
import {viewCart} from '../../store/cartCheckout/actions';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface IProps {
  navigation: any;
  data: any;
  appTheme: any;
  getAvailableTimeSlot: Function;
  addStylist: Function;
  addSelectedDate: Function;
  addSelectedTime: Function;
  addServiceAPI: Function;
  viewCart: Function;
  addServiceInCart: Function;
  addServiceUuidMaster: Function;
  getAvailableStylist: Function;
}

interface Istate {
  weekDate: Object;
  generalTime: Object;
  time: Object;
  searchedValue: String;
  selectedGender: String;
  serviceStatus: Object;
  selectedSerice: Array;
  selected_time: Any;
  selected_date: Any;
  stylistSelectedFlag: Boolean;
  mapData: Object;
  serviceType: Boolean;
  localOptionSelect: Object;
  selectLocalStylist: Boolean;
  hideService: Boolean;
}

const _ = require('lodash');

class serviceList extends React.Component<IProps, Istate> {
  CheckOut: any;
  constructor(props: any) {
    super(props);
    this.state = {
      serviceStatus: [],
      searchedValue: '',
      hideService: false,
      selectLocalStylist: false,
      localOptionSelect: [],
      serviceType: false,
      mapData: [],
      stylistSelectedFlag: false,
      selected_date: Moment(new Date()).format('YYYY-MM-DD'),
      selected_time: '',
      selectedSerice: [],
    };
  }

  componentDidMount() {
    const {user = []} = this.props;

    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;

    const {traffic_distributions = '', services = ''} = salonDetail;
    const {serviceStatus} = this.state;

    // this.props.fetchSalonDetails(salonId);
    this.props.addSelectedDate(Moment(new Date()).format('YYYY-MM-DD'));

    let weekDayToday = Moment(new Date()).format('ddd').toUpperCase();
    // console.log('weekDayToday', weekDayToday);
    this.setState({
      mapData: traffic_distributions && traffic_distributions[weekDayToday],
      time: weekDayToday,
    });
    let consumerId = user && user.detail && user.detail.uuid;

    // console.log('consumerId', consumerId);

    this.props.viewCart(consumerId);

    services &&
      services.map((i: Object, key) => {
        let data = {
          name: i.category,
          status: true,
        };
        serviceStatus.push(data);
        this.setState({
          serviceStatus,
        });
      });
  }

  showTime = (data) => {
    // const {weekDate, generalTime} = this.state;
    const {theme} = this.props.appTheme;
    const {timeName = '', times = '', isSelected = ''} = data.item;
    console.log(timeName);
    return (
      <View>
        <Text style={{color: theme.PRIMARY_TEXT_COLOR, fontSize: scale(16)}}>
          {timeName}
        </Text>
      </View>
    );
  };

  checkTake = (i) => {
    const {serviceStatus} = this.state;
    let check = serviceStatus[i].status;
    serviceStatus[i].status = !check;
    this.setState({
      serviceStatus,
    });
  };

  loaderData = () => {
    return (
      <ActivityIndicator
        size={'large'}
        color={colors.orangeText}
        style={styles.loaderAlign}
      />
    );
  };

  listAllServices = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {services = '', basic = '', uuid = ''} = salonDetail;
    const {serviceStatus, searchedValue} = this.state;

    const {cartList = []} = this.props;
    const {isLoadingAvailableList = ''} = cartList;
    // console.log('hehe', isLoadingAvailableList);

    if (services) {
      return services.map((d, i) => {
        let statue =
          serviceStatus &&
          serviceStatus.map((data, index) => {
            if (index === i) {
              return data.status;
            }
          });
        let checkState = statue && statue[i];
        return (
          // <ScrollView>
          isLoadingAvailableList ? (
            i === 0 && this.loaderData()
          ) : (
            <ServiceList
              hideService={() => {
                this.checkTake(i);
              }}
              searchName={searchedValue}
              // searchName={` `}
              hideStatus={checkState}
              data={d}
              ServiceList={true}
              onPress={() => {
                this.CheckOut.open();
              }}
            />
          )
          // </ScrollView>
        );
      });
    }
  };

  renderSearchResult = (data: String) => {
    this.setState({
      searchedValue: data,
    });
  };

  listAllStylist = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {personnels = '', basic = '', uuid = ''} = salonDetail;
    if (personnels) {
      return (
        <FlatList
          data={personnels}
          // keyExtractor={this.keyExtractor}
          renderItem={(personnels) => (
            <TopStylist
              data={personnels}
              salon_Uuid={uuid}
              selectStylist={false}
            />
          )}
          horizontal
          contentContainerStyle={styles.topStylistContainerStyle}
        />
      );
    }
  };

  renderAvailbleTimes = (Data, name) => {
    const {items = ''} = Data;
    const {selected_time} = this.state;
    const {appTheme, cartList} = this.props;
    const {selectedTime = '', isLoadingData} = cartList;
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
          showsHorizontalScrollIndicator={false}
          data={Data}
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
                            ? colors.white
                            : 'rgba(255,195,197,1)'
                          : colors.grayBorder,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.timeAvailableText,
                      {
                        paddingHorizontal: scale(5),
                        color:
                          selectedTime === start
                            ? colors.orangeText
                            : colors.blackPrimary,
                      },
                    ]}>
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

  listSelectStylist = () => {
    const {cartList = '', salonDetail = ''} = this.props;
    const {personnels = '', basic = '', uuid = ''} = salonDetail.salonDetail;
    const {availableStylist = '', selectedStylist = ''} = cartList;
    if (availableStylist) {
      return (
        <FlatList
          data={availableStylist}
          keyExtractor={this.keyExtractor}
          renderItem={(availableStylist) => {
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
            {marginTop: scale(16)},
          ]}
        />
      );
    }
  };

  checkOutListStylist = () => {
    const {appTheme, cartList = '', salonDetail = ''} = this.props;
    const {selected_time, selected_date, localOptionSelect} = this.state;
    const {data = '', selectedStylist = '', serviceUuidMaster = ''} = cartList;
    const {price = '', uuid = '', duration_minutes = ''} = data;
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
      <View>
        {/* Top Stylist */}
        <View style={styles.marginVert}>
          {/* <Image source={{ uri:logo }} /> */}
          <Text
            style={[
              styles.topStlist,
              {
                marginTop: scale(6),
                marginLeft: scale(16),
                color: colors.blackPrimary,
              },
            ]}>
            {data.name}
          </Text>
          {/* <Text
            style={[
              styles.topStlist,
              {
                marginTop: scale(10),
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: scale(16),
                marginLeft: scale(16),
              },
            ]}>
            {'\u20B9 ' + price_net }
          </Text>
          <Text>{duration_minutes</Text> */}
          <View style={[styles.detailBar, {marginRight: scale(17)}]}>
            <Text
              style={[
                styles.servicePrice,
                {marginTop: scale(10), color: colors.blackPrimary},
              ]}>
              {price_net ? `\u20B9 ` + price_net : '-'}
            </Text>
            <Text style={[styles.durationMinute, {marginTop: scale(10)}]}>
              {duration_minutes ? duration_minutes + ` mins` : ''}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.upperLine,
            {marginHorizontal: scale(0), marginTop: scale(10)},
          ]}
        />
        <View style={[styles.flexDirection, {}]}>
          <Text
            style={[
              styles.topStlist,
              {
                width: '80%',
                letterSpacing: 2,
                color: colors.blackPrimary,
              },
            ]}>
            Select Available stylist
          </Text>
        </View>

        {this.listSelectStylist()}
        <View
          style={[
            styles.buttonBottom4,
            {backgroundColor: colors.whitePrimary},
          ]}>
          <CustomButton
            style={[
              styles.cartButton4,
              {
                // width: '95%',
                height: scale(56),
                backgroundColor: selectedStylist
                  ? colors.lightOrange
                  : colors.grayBorder,
              },
            ]}
            // style={[
            //   styles.cartButton,
            //   {
            //     marginTop: scale(70),
            //     marginHorizontal: scale(5),
            //     width: '95%',
            //     backgroundColor: selectedStylist
            //       ? colors.lightOrange
            //       : colors.grayBorder,
            //   },
            // ]}
            btnText={'Proceed'}
            onPress={() => {
              this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
              selectedStylist ? this.setState({stylistSelectedFlag: true}) : {};
            }}
          />
        </View>
        {/* Top Stylist End */}
      </View>
    );
  };

  whatToRender = () => {
    const {
      cartList = [],
      appTheme,
      addServiceUuidMaster,
      salonDetail,
      getAvailableStylist,
      addServiceInCart,
    } = this.props;
    const {
      localOptionSelect = [],
      selectLocalStylist,
      stylistSelectedFlag,
    } = this.state;
    let theme = appTheme.theme;

    const {checkServiceType = []} = cartList;
    const {price = [], uuid = ''} = localOptionSelect;
    const {
      subService = [],
      service_uuid = '',
      mainServiceId = '',
    } = checkServiceType;
    const {variations = [], name = '', duration_minutes = ''} = subService;
    const {price_net = ''} = price;
    let type = checkServiceType && checkServiceType.type ? true : false;
    let typeName = '';
    let selectedName = localOptionSelect && localOptionSelect.name;

    // console.log('ehhe', JSON.stringify(checkServiceType));

    let salonId = salonDetail && salonDetail.salonDetail.uuid;

    let productAdd = {
      productUuid: service_uuid,
      product: true,
    };

    let dataChcek = {
      variation_uuid: uuid,
    };

    if (selectLocalStylist) {
      return (
        <View>
          {stylistSelectedFlag
            ? this.renderCheckoutTime()
            : this.checkOutListStylist()}
        </View>
      );
      // renderCheckoutTime
    } else {
      // console.log('OHHH YEAH', name);
      return (
        <View style={[styles.mainTimePicker, {marginBottom: scale(30)}]}>
          <Text style={[styles.serviceName, {color: colors.blackPrimary}]}>
            {name ? name : ''}
          </Text>
          <View style={[styles.detailBar, {marginRight: scale(17)}]}>
            <Text
              style={[
                styles.servicePrice,
                {marginTop: scale(10), color: colors.blackPrimary},
              ]}>
              {price_net ? `\u20B9 ` + price_net : '-'}
            </Text>
            <Text style={styles.durationMinute}>
              {duration_minutes + ` mins`}
            </Text>
          </View>
          <View style={[styles.upperLine]}>
            <Text style={[styles.availableText, {color: colors.blackPrimary}]}>
              Available Options
            </Text>
          </View>
          <FlatList
            data={variations}
            contentContainerStyle={styles.flatlistMargin}
            renderItem={(data) => {
              const {name = '', price = [], uuid = '', type = ''} = data.item;
              const {price_net = ''} = price;
              typeName = type;

              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      localOptionSelect: data.item,
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
                bottom: scale(-255),
              },
            ]}>
            <View style={styles.bottomDetail}>
              <Text style={styles.clockSubText}>Selected Price</Text>
              <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
                {price_net ? `\u20B9 ` + price_net : '-'}
              </Text>
            </View>
            <CustomButton
              style={[
                styles.cartButton,
                styles.customPosition,
                {
                  backgroundColor:
                    localOptionSelect.length != 0
                      ? colors.lightOrange
                      : colors.grayBorder,
                },
              ]}
              btnText={'Proceed'}
              onPress={() => {
                this.setState(
                  {
                    selectLocalStylist: true,
                  },
                  () => {
                    addServiceUuidMaster(productAdd);
                    addServiceInCart(localOptionSelect);
                    getAvailableStylist(salonId, service_uuid, dataChcek);
                  },
                );
              }}
            />
          </View>
          {/* <View
            style={[
              styles.buttonContain,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                shadowColor: theme.NAVIGATION_SHADOW,
                padding: scale(10),
                top: scale(360),
              },
            ]}>
            <CustomButton
              style={[styles.cartButton, styles.cartContain]}
              btnText={`${`1`} Services`}
              onPress={() => {}}
              type={'cart'}
              price={`₹ ${`22`} (incl.taxes)`}
            />
          </View> */}
        </View>
      );
    }
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
      isLoadingData = '',
    } = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    const {success = ''} = serviceAPI;
    const {start = ''} = selectedTime;
    const {price = '', uuid = '', duration_minutes = ''} = data;

    let hour = selectedTime && selectedTime.substring(0, 2);
    let minute = selectedTime && selectedTime.substring(2, 5);
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;

    const {price_net = ''} = price;
    const {selected_time, selected_date, localOptionSelect} = this.state;
    const {MORNING = '', AFTERNOON = '', EVENING = ''} = availableTimeSlot;
    let theme = appTheme.theme;
    let consumerId = user && user.detail && user.detail.uuid;
    // let consumerId = `4323aa78-0d92-4a03-9cba-5fdfb43aa87e`;
    let salonId =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;
    let stylistId = selectedStylist && selectedStylist.uuid;
    let selected_Ids = {
      service_uuid: productUuid,
      variation_uuid: product ? productUuid : null,
      date: selected_date,
    };

    let service_add = {
      salon_uuid: salonId,
      service_uuid: productUuid,
      variation_uuid: product ? uuid : null,
      on_date: selectedDate,
      at_time: selectedTime,
      personnel_uuid: stylistId,
      discard_existing: true,
    };

    let datesWhitelist = [
      {
        start: Moment(new Date()).format('YYYY-MM-DD'),
        end: Moment().add(6, 'days'), // total 4 days enabled
      },
    ];

    let localName = localOptionSelect && localOptionSelect.name;

    return (
      <View>
        <View style={styles.mainTimePicker}>
          {/* <Text
            style={[
              styles.topStlist,
              {marginTop: scale(30), color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {data.name}
          </Text>
          <View style={[styles.detailBar, {marginHorizontal: scale(16)}]}>
            <Text
              style={[
                styles.topStlist,
                {marginTop: scale(10), color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {'\u20B9 ' + price_net}
            </Text>
          </View> */}

          <Text style={[styles.serviceName, {color: colors.blackPrimary}]}>
            {data ? data.name : ''}
          </Text>
          <View style={[styles.detailBar, {marginRight: scale(17)}]}>
            <Text
              style={[
                styles.servicePrice,
                {marginTop: scale(10), color: colors.blackPrimary},
              ]}>
              {price_net ? `\u20B9 ` + price_net : '-'}
            </Text>
            <Text style={styles.durationMinute}>
              {duration_minutes + ` mins`}
            </Text>
          </View>
          <View style={[styles.upperLine]} />
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            iconStyle={{height: 20, width: 20}}
            // selectedDate={}
            // setSelectedDate={selected_date}
            onDateSelected={(data) => {
              this.setState({selected_date: Moment(data).format('YYYY-MM-DD')});
              selected_Ids.date = Moment(data).format('YYYY-MM-DD');
              this.props.addSelectedDate(Moment(data).format('YYYY-MM-DD'));
              this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
            }}
            showMonth={false}
            style={{
              height: scale(61),
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
              {color: colors.blackPrimary},
            ]}
            dateNameStyle={styles.dateNameStyle}
            highlightDateNumberStyle={styles.dateNumberSelectedStyle}
            highlightDateNameStyle={[
              styles.dateNameSelectedStyle,
              {color: colors.blackPrimary},
            ]}
            iconContainer={{flex: 0.1}}
            datesWhitelist={datesWhitelist}
            disabledDateNameStyle={{color: 'grey'}}
            disabledDateNumberStyle={{color: 'grey'}}
          />
          <View
            style={[
              styles.upperLine,
              {marginTop: scale(5), marginBottom: scale(16)},
            ]}
          />
          <Text
            style={[
              styles.preferedTimeText,
              {
                color: colors.blackPrimary,
              },
            ]}>
            Select preferred time slot
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
            <View style={{marginBottom: scale(5), marginTop: scale(5)}}>
              {MORNING !== ''
                ? this.renderAvailbleTimes(MORNING, 'MORNING')
                : null}
              {AFTERNOON !== ''
                ? this.renderAvailbleTimes(AFTERNOON, 'AFTERNOON')
                : null}
              {EVENING !== ''
                ? this.renderAvailbleTimes(EVENING, 'EVENING')
                : null}

              {MORNING === '' && AFTERNOON === '' && EVENING === '' && (
                <Image
                  source={require('../../assets/onBoarding/onBoading.png')}
                  style={styles.mainImage}
                />
              )}
            </View>
          )}
        </View>
        <View
          style={[
            styles.flexRow,
            styles.buttonBottom,
            {
              backgroundColor: colors.whitePrimary,
              bottom: scale(-120),
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
            onPress={() => {
              this.props.addServiceAPI(consumerId, service_add);
              selectedTime && this.CheckOut.close();
              // this.props.viewCart(consumerId);
              // selectedTime && success && navigation.navigate('checkOutDetails');
            }}
          />
        </View>
      </View>
    );
  };

  render() {
    const {searchedValue, stylistSelectedFlag} = this.state;

    const {appTheme, navigation, cartCheckout = [], cartList = []} = this.props;
    let theme = appTheme.theme;
    const {viewCart = []} = cartCheckout;
    const {items = [], price = []} = viewCart;
    const {price_net = ''} = price;
    const {checkServiceType = ''} = cartList;
    let numberOfSerivices = items && items.length;

    let isLoadingSalon =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.isLoadingData;
    let type =
      checkServiceType &&
      checkServiceType.subService &&
      checkServiceType.subService.variations &&
      checkServiceType.subService.variations.length !== 0
        ? true
        : false;

    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {services = '', basic = '', uuid = ''} = salonDetail;
    const {name = '', location = []} = basic;
    const {micro_market = ''} = location;
    // const {serviceStatus} = this.state;
    // console.log('numberOfSerivices', JSON.stringify(viewCart));
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View>
          <View style={{marginBottom: scale(20)}}>
            <ScreenHeader
              onPress={() => this.props.navigation.goBack()}
              // screenTitle={'Booking Summary'}
            />
          </View>

          {/* Salon Detail */}
          <View style={styles.salonDetainContainer}>
            <Text style={[styles.salonName, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {name}
            </Text>
            <Text style={[styles.locationText]}>
              {micro_market ? micro_market.name : ` `}
            </Text>
          </View>
          {/* Salon Detail End */}
          {/* Search */}
          <Search
            value={searchedValue}
            clear={searchedValue ? true : false}
            clearText={() => this.renderSearchResult('')}
            text={'Search for stylist, salon, services...'}
            onChangeText={(searchedValue: String) =>
              this.renderSearchResult(searchedValue)
            }
          />
          <ScrollView
            style={{
              marginTop: scale(10),
            }}>
            {/* Services */}
            <View
              style={{
                paddingBottom: scale(numberOfSerivices === 0 ? 170 : 250),
              }}>
              {this.listAllServices()}
            </View>
            {/* Services End */}
            {/* CheckOut */}
            <RBSheet
              ref={(ref) => {
                this.CheckOut = ref;
              }}
              height={scale(500)}
              duration={250}
              onClose={() => {
                this.setState({
                  stylistSelectedFlag: false,
                  selected_date: Moment(new Date()).format('YYYY-MM-DD'),
                  localOptionSelect: [],
                  selectLocalStylist: false,
                });
                this.props.addStylist(false);
                // this.props.addSelectedDate(false);
                this.props.addSelectedDate(
                  Moment(new Date()).format('YYYY-MM-DD'),
                );
                this.props.addSelectedTime(false);
              }}
              customStyles={{
                container: {
                  borderTopLeftRadius: scale(12),
                  borderTopRightRadius: scale(12),
                  backgroundColor: colors.White,
                },
              }}>
              {type && this.whatToRender()}
              {stylistSelectedFlag && !type && this.renderCheckoutTime()}
              {!stylistSelectedFlag && !type && this.checkOutListStylist()}
              {/* {this.whatToRender()} */}
            </RBSheet>

            {/* Time Picker End */}
          </ScrollView>
          {/* Cart Button */}
          {/* <View
            style={{
              position: 'absolute',
              top: scale(660),
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              padding: scale(15),
            }}>
            <View style={styles.cartButton}>
              <CustomButton
                style={styles.cartButton}
                btnText={'3 Services'}
                onPress={() =>
                  // this.props.navigation.navigate('checkOutDetails')
                  this.TimeSheet.open()
                }
                type={'cart'}
                price={'₹ 3000 plus taxes'}
              />
            </View>
          </View> */}
          {/* Cart Button End */}

          {/* Cart Button */}
          {numberOfSerivices !== 0 && !isLoadingSalon && (
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
                  // {marginTop: scale(5)},
                ]}
                btnText={`${numberOfSerivices} Services`}
                onPress={() => navigation.navigate('checkOutDetails')}
                type={'cart'}
                price={`₹ ${price_net} (incl.taxes)`}
              />
            </View>
          )}
          {/* Cart Button End */}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({
  appTheme = '',
  algoliaDetail = [],
  salonDetail = [],
  cartCheckout = [],
  cartList = [],
  user = [],
}) => ({
  appTheme,
  algoliaDetail,
  salonDetail,
  cartCheckout,
  cartList,
  user,
});

export default connect(mapStatsToProps, {
  getAvailableTimeSlot,
  addStylist,
  addSelectedDate,
  addSelectedTime,
  addServiceAPI,
  viewCart,
  addServiceInCart,
  addServiceUuidMaster,
  getAvailableStylist,
})(serviceList);
