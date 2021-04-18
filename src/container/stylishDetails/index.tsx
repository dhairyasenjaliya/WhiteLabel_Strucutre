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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Shimmer from 'react-native-shimmer';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';
import ImageView from 'react-native-image-view';
import SafeSquad from '../../assets/svg/safeSquad';
// import { colors, fonts } from '../../constants/styles';
import {scale} from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import CustomButton from '../../components/Button';
import {colors} from '../../constants/styles';
import * as RootNavigation from '../../navigation/rootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ComplimentSlider from '../../components/complimentSlider';
import RBSheet from 'react-native-raw-bottom-sheet';
import {fetchStylistDetails} from '../../store/stylistDetail/actions';
import ServiceList from '../../components/ServiceList';
import ServiceSearchList from '../../components/ServiceSearchList';
import Search from '../../components/CustomSearch';
import {
  getAvailableTimeSlot,
  addStylist,
  addSelectedDate,
  addSelectedTime,
  addServiceAPI,
  addServiceInCart,
  addServiceUuidMaster,
  getAvailableStylist,
  checkServiceType,
} from '../../store/cartList/actions';
import {fetchSalonDetails} from '../../store/salonDetail/actions';
import {viewCart} from '../../store/cartCheckout/actions';
import images from '../../assets/images';

interface IProps {
  appTheme: Object;
  navigation: Object;
  fetchStylistDetails: Function;
  getAvailableTimeSlot: Function;
  addStylist: Function;
  addSelectedDate: Function;
  addSelectedTime: Function;
  addServiceAPI: Function;
  fetchSalonDetails: Function;
  viewCart: Function;
  addServiceInCart: Function;
  addServiceUuidMaster: Function;
  getAvailableStylist: Function;
  checkServiceType: Function;
}
interface IState {
  cartItem: Number;
  timeSelectedFlag: Boolean;
  selected_date: Any;
  refreshCalenderView: Boolean;
  serviceType: Boolean;
  localOptionSelect: Object;
  selectLocalStylist: Boolean;
  viewGallery: Boolean;
  imageIndex: Number;
  searchedValue: String;
}

const _ = require('lodash');

const AllPhotos = [
  {title: 'Haircut'},
  {title: 'Beardtrim'},
  {title: 'HairSpa'},
  {title: 'Styling'},
  {title: 'Smotthening'},
  {title: 'DeTan'},
];

const ComplementData = [
  {title: 'Outstanding service', icon: 'outstanding', rating: 24},
  {title: 'Great attitude', icon: 'attitude', rating: 6},
  {title: 'Great Conversation', icon: 'conversation', rating: 12},
  {title: 'Outstanding service', icon: 'outstanding', rating: 24},
  {title: 'Great attitude', icon: 'attitude', rating: 21},
];

class stylishDetails extends React.Component<IProps, IState> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      searchedValue: '',
      imageIndex: 0,
      viewGallery: false,
      selectLocalStylist: false,
      localOptionSelect: [],
      serviceType: false,
      cartItem: 0,
      timeSelectedFlag: false,
      refreshCalenderView: true,
      selected_date: Moment(new Date()).format('YYYY-MM-DD'),
      // selected_time: '',
    };
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderServicesItem = (data: Object) => {
    const {appTheme, stylistDetail = []} = this.props;
    const {index = '', item = ''} = data;

    const {services = ''} = stylistDetail.stylistDetail;
    let length = parseInt(services.length - 1);
    const {value = ''} = item;
    let theme = appTheme.theme;
    return (
      <View style={styles.serviceContainerComponent}>
        <Text style={[styles.serviceTitle]}>
          {value}
          {index !== length && ` ,`}
        </Text>
      </View>
    );
  };

  componentDidMount() {
    const {stylistId = '', salonId = ''} = this.props.route.params;
    this.props.fetchStylistDetails(salonId, stylistId);
    this.props.fetchSalonDetails(salonId);
    const {stylistDetail, checkServiceType} = this.props;
    this.props.addSelectedDate(Moment(new Date()).format('YYYY-MM-DD'));
    if (stylistDetail.stylistDetail) {
      () => this.props.addStylist(stylistDetail.stylistDetail);
    }
    checkServiceType([]);
    // console.log('ehhhe', Momedatant(new Date()).format('YYYY-MM-DD'));
  }

  renderPhotos = (data: any) => {
    const {item = [], index = ''} = data;
    const {url = ''} = item;
    const {theme} = this.props.appTheme;
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({viewGallery: true, imageIndex: index});
        }}
        style={styles.photoContainer}>
        <FastImage
          style={styles.stylistImages}
          source={{
            uri: url,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.stretch}
        />
      </TouchableOpacity>
    );
  };

  checkSalonCart = (data, salonId) => {
    let cartService = false;

    let firstData = data && data[0];

    if (firstData) {
      const {appointment = []} = firstData;
      const {personnel = []} = appointment;
      const {basic = []} = personnel;
      const {salon = []} = basic;
      const {uuid = ''} = salon;
      // console.log('salonID', salonId);
      // console.log('uuid', uuid);
      cartService = uuid === salonId ? true : false;
    }
    return cartService;
  };

  renderSearchResult = (data: String) => {
    this.setState({
      searchedValue: data,
    });
  };

  renderServices = () => {
    // const {searchedValue = ''} = this.state;
    // const {stylistDetail, navigation, cartCheckout, appTheme} = this.props;

    // let theme = appTheme.theme;
    // const {services = '', basic = []} = stylistDetail.stylistDetail;
    // const {salon = []} = basic;
    // let salonId = salon && salon.uuid;

    // const {viewCart = []} = cartCheckout;
    // const {items = []} = viewCart;

    // let value = _.mapValues(services, 'items');
    // let value_convert = _.map(value, items => ({
    //   items,
    // }));

    // let category = _.mapValues(services, 'category');
    // let category_convert = _.map(category, items => ({
    //   categoryLocal: items,
    // }));

    // if (value_convert) {
    //   return value_convert.map((d, i) => (
    //     <ServiceList
    //       data={d}
    //       stylistAvailable={true}
    //       category_convert={category_convert[i]}
    //       onPress={() => {
    //         this.setState({timeSelectedFlag: true});

    //       }}
    //     />
    //   ));
    // }

    const {searchedValue = ''} = this.state;
    const {appTheme} = this.props;
    let theme = appTheme.theme;

    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {services = ''} = salonDetail;

    return (
      <View>
        {/* <Text style={[styles.topStlist, {color: theme.PRIMARY_TEXT_COLOR}]}>
          Search
        </Text> */}
        <View style={styles.marginVertical}>
          <Search
            backcolor={colors.whitePrimary}
            value={searchedValue}
            clear={searchedValue ? true : false}
            clearText={() => this.renderSearchResult('')}
            text={'Search for services...'}
            onChangeText={(searchedValue: String) =>
              this.renderSearchResult(searchedValue)
            }
          />
        </View>
        <View style={styles.marginBottom}>
          {services &&
            services.map((d, i) => {
              return (
                <ServiceSearchList
                  data={d}
                  ServiceList={true}
                  backColor={colors.whitePrimary}
                  searchName={searchedValue}
                  onPress={() => {
                    this.setState({
                      timeSelectedFlag: true,
                    });
                  }}
                />
              );
            })}
        </View>
      </View>
    );
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
      service_uuid: productUuid,
      variation_uuid: product ? uuid : null,
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
      isLoadingData = '',
    } = cartList;
    const {productUuid = '', product = ''} = serviceUuidMaster;
    const {success = ''} = serviceAPI;
    const {start = ''} = selectedTime;
    const {price = '', uuid = '', duration_minutes = ''} = data;
    const {price_net = ''} = price;
    const {selected_date, refreshCalenderView} = this.state;
    const {MORNING = '', AFTERNOON = '', EVENING = ''} = availableTimeSlot;
    let theme = appTheme.theme;
    let consumerId = user && user.detail && user.detail.uuid;
    // let consumerId = `4323aa78-0d92-4a03-9cba-5fdfb43aa87e`;
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

    if (refreshCalenderView) {
      this.fetchAvailableTimeSloat();
    }

    let hour = selectedTime && selectedTime.substring(0, 2);
    let minute = selectedTime && selectedTime.substring(2, 5);
    let AmOrPm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;

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

    // console.log('service_add', service_add);
    return (
      <View style={styles.mainTimePicker}>
        <Text
          style={[
            styles.topStlist,
            {color: colors.blackPrimary, marginTop: scale(6)},
          ]}>
          {data.name}
        </Text>
        <View style={[styles.detailBar, {marginRight: scale(20)}]}>
          <Text
            style={[
              styles.topStlist,
              {marginTop: scale(10), color: colors.blackPrimary},
            ]}>
            {'\u20B9 ' + price_net}
          </Text>
          <Text style={[styles.minuteText]}>{duration_minutes + ` mins`}</Text>
        </View>
        <View style={styles.calenderContainer}>
          <CalendarStrip
            calendarAnimation={{type: 'sequence', duration: 30}}
            iconStyle={{height: 20, width: 20}}
            onDateSelected={data => {
              this.setState({selected_date: Moment(data).format('YYYY-MM-DD')});
              selected_Ids.date = Moment(data).format('YYYY-MM-DD');
              this.props.addSelectedDate(Moment(data).format('YYYY-MM-DD'));
              this.props.getAvailableTimeSlot(salonId, stylistId, selected_Ids);
            }}
            style={{
              height: scale(61),
              paddingTop: scale(10),
              paddingBottom: scale(10),
            }}
            showMonth={false}
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
        </View>
        <Text
          style={[
            styles.preferedTimeText,
            {
              color: colors.blackPrimary,
            },
          ]}>
          Select Your preferred time slot
        </Text>
        {/* <View style={{flexDirection: 'row'}}>{dateList}</View> */}
        <View style={styles.calenderContain}>
          {isLoadingData ? (
            <View style={styles.contentCenter}>
              <ActivityIndicator
                size={'large'}
                color={colors.lightOrange}
                style={styles.indicator}
              />
            </View>
          ) : (
              <View style={styles.contentCenter}>
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
          <View
            style={[
              styles.flexRow,
              styles.buttonBottom,
              {
                backgroundColor: colors.whitePrimary,
                // left: scale(2),
              },
            ]}>
            <View style={styles.flexRow2}>
              <View
                style={{
                  alignItems: 'center',
                  marginLeft: scale(16),
                  // backgroundColor: 'red',
                  marginTop: scale(20),
                  // marginVertical: scale(20),
                }}>
                <Text style={styles.clockSubText}>Selected Time</Text>
                <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
                  {selectedTime ? hour + minute + ` ` + AmOrPm : ''}
                </Text>
                <Text style={styles.clockSubText}>
                  {Moment(selected_date).format('DD MMMM YYYY')}
                </Text>
              </View>
              {/* <View style={{flex: 1}}> */}
              <CustomButton
                style={[
                  styles.cartButton,
                  styles.customPosition,
                  {
                    // height:scale(120),
                    marginLeft: scale(52),
                    marginRight: scale(16),
                    marginTop: scale(20),
                    marginHorizontal: scale(30),
                    // bottom: scale(1),
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
                      this.props.addServiceAPI(consumerId, service_add);
                      this.setState(
                        {
                          timeSelectedFlag: false,
                          selected_date: Moment(new Date()).format(
                            'YYYY-MM-DD',
                          ),
                          refreshCalenderView: true,
                          localOptionSelect: [],
                        },
                        () => {
                          setTimeout(() => {
                            // this.props.viewCart(consumerId);
                            this.props.addSelectedTime(false);
                            this.props.addSelectedDate(
                              Moment(new Date()).format('YYYY-MM-DD'),
                            );
                          }, 200);
                        },
                      );
                    }
                    : () => {
                      alert('Please Select Time');
                    }
                }
              />
              {/* </View> */}
            </View>
          </View>
        </View>
      </View>
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
                      // color: theme.PRIMARY_TEXT_COLOR,
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

  checkStylist = () => {
    console.log('khikhicheckStylist');
    const {cartList = [], stylistDetail = [], salonDetail = []} = this.props;
    const {localOptionSelect} = this.state;

    let selectedStylistBasic =
      stylistDetail &&
      stylistDetail.stylistDetail &&
      stylistDetail.stylistDetail.basic;

    let stylistRank = selectedStylistBasic && selectedStylistBasic.rank;
    let salonId = salonDetail && salonDetail.salonDetail.uuid;

    const {checkServiceType = []} = cartList;

    const {subService = [], service_uuid = ''} = checkServiceType;
    const {variations = []} = subService;

    // console.log('service_uuid', service_uuid);

    const {uuid = ''} = localOptionSelect;

    let productAdd = {
      productUuid: service_uuid,
      product: true,
    };

    let dataChcek = {
      variation_uuid: uuid,
    };

    if (variations) {
      variations &&
        variations.map((data, key) => {
          const {name = ''} = data;
          if (stylistRank === name) {
            this.setState(
              {
                localOptionSelect: data,
              },
              () => {
                this.props.checkServiceType([]);
                addServiceUuidMaster(productAdd);
                addServiceInCart(data);
                // getAvailableStylist(salonId, service_uuid, dataChcek);
              },
            );
          }
        });
    }
  };

  // {
  //   selectLocalStylist: false,
  //   stylistSelectedFlag: true,
  // },
  // () => {
  //   this.props.checkServiceType([]);

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

    // Solution This For Stylish Selection

    this.checkStylist();

    const {checkServiceType = []} = cartList;
    const {price = [], uuid = ''} = localOptionSelect;
    const {
      subService = [],
      service_uuid = '',
      mainServiceId = '',
    } = checkServiceType;
    const {variations = [], name = ''} = subService;
    const {price_net = ''} = price;
    let type = checkServiceType && checkServiceType.type ? true : false;
    let typeName = '';
    let selectedName = localOptionSelect && localOptionSelect.name;

    let salonId = salonDetail && salonDetail.salonDetail.uuid;

    let productAdd = {
      productUuid: service_uuid,
      product: true,
    };

    let dataChcek = {
      variation_uuid: uuid,
    };
    // console.log('OHHH YEAH', uuid);

    if (selectLocalStylist) {
      return (
        <View>
          {stylistSelectedFlag
            ? this.renderCheckoutTime()
            : this.renderServices()}
        </View>
      );
      // renderCheckoutTime
    } else {
      return (
        <View style={[styles.mainTimePicker2, {marginVertical: scale(30)}]}>
          <Text style={[styles.topStlist, {color: colors.blackPrimary}]}>
            {name ? name : ''}
          </Text>
          <View style={styles.detailBar}>
            <Text
              style={[
                styles.topStlist,
                {marginVertical: scale(10), color: colors.blackPrimary},
              ]}>
              {price_net ? `\u20B9 ` + price_net : ''}
            </Text>
          </View>
          <View style={[styles.upperLine]}>
            <Text style={[styles.availableText, {color: colors.blackPrimary}]}>
              Available Options
            </Text>
          </View>
          <FlatList
            data={variations}
            contentContainerStyle={{
              marginBottom: scale(40),
              marginHorizontal: scale(20),
            }}
            renderItem={data => {
              const {name = '', price = [], uuid = '', type = ''} = data.item;
              const {price_net = ''} = price;
              typeName = type;
              // console.log('data=======', data);
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
            style={
              // styles.optionAvailbleContain
              [
                styles.buttonBottom,
                {
                  backgroundColor: colors.whitePrimary,
                  bottom: scale(-255),
                  paddingBottom: scale(20),
                },
              ]
            }>
            <View
              style={{
                alignItems: 'center',
                marginTop: scale(20),
                marginHorizontal: scale(20),
              }}>
              <Text style={styles.clockSubText}>Selected Price</Text>
              <Text style={[styles.clockText, {color: colors.blackPrimary}]}>
                {price_net ? `\u20B9 ` + price_net : ''}
              </Text>
              {/* <Text style={styles.clockSubText}>
              1200
            </Text> */}
            </View>

            <CustomButton
              style={[
                styles.cartButton,
                styles.customPosition,
                {
                  width: '50%',
                  marginHorizontal: scale(30),
                  marginTop: scale(20),
                  // paddingBottom:scale(20),
                  backgroundColor:
                    localOptionSelect.length != 0
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
                    selectLocalStylist: false,
                    stylistSelectedFlag: true,
                  },
                  () => {
                    this.props.checkServiceType([]);
                    addServiceUuidMaster(productAdd);
                    addServiceInCart(localOptionSelect);
                    getAvailableStylist(salonId, service_uuid, dataChcek);
                    // setTimeout(() => {
                    //   this.setState({
                    //     selectLocalStylist: false,
                    //   });
                    // }, 300);
                  },
                );
              }}
            />
          </View>
        </View>
      );
    }
  };

  renderFooter() {
    return (
      <View style={styles.footer}>
        <View style={styles.flexFooter2}>
          <Icon name={`sign-language`} color={'#FFF'} size={25} />
          <Text style={styles.ratingTextFooter}>{`3.2k`}</Text>
        </View>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => {
            // const imageLikes = likes[title] + 1;
            // this.setState({likes: {...likes, [title]: imageLikes}});
          }}>
          <Icon name={`sign-language`} color={'#FFF'} size={25} />
          <Text style={styles.ratingTextFooter}>{`Appreciate it!`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const {
      appTheme,
      navigation,
      stylistDetail = [],
      cartCheckout = [],
      salonDetail = [],
      cartList = [],
    } = this.props;

    let isLoadingStylist =
      this.props &&
      this.props.stylistDetail &&
      this.props.stylistDetail.isLoadingData;

    const {checkServiceType = ''} = cartList;
    let type =
      checkServiceType &&
        checkServiceType.subService &&
        checkServiceType.subService.variations &&
        checkServiceType.subService.variations.length !== 0
        ? true
        : false;

    const {basic = '', services = ''} = stylistDetail.stylistDetail;
    const {
      name_first = '',
      name_last = '',
      rank = '',
      value = '',
      profile_pic = '',
      bio = '',
    } = basic;
    const {MAIN = [], WORKING = [], OTHERS = []} = basic && basic.images;

    let converted_image =
      OTHERS &&
      OTHERS.map(data => {
        // console.log(data.url);
        let d = {
          source: {
            uri: data.url,
          },
        };
        return d;
      });

    // console.log('chek', basic);

    const {global = ''} = value;
    const {cartItem, timeSelectedFlag, viewGallery, imageIndex} = this.state;
    let theme = appTheme.theme;

    const {salon = []} = basic;
    let salonId = salon && salon.uuid;

    let objectIdConvert = {
      objectID: salonId,
    };

    let salonName =
      salonDetail &&
      salonDetail.salonDetail &&
      salonDetail.salonDetail.basic &&
      salonDetail.salonDetail.basic.name;

    // console.log('salllll==>', JSON.stringify(salonName));

    const {viewCart = []} = cartCheckout;
    const {items = [], price = []} = viewCart;
    const {price_net = ''} = price;

    let numberOfSerivices = items && items.length;
    let checkSalonCart = this.checkSalonCart(items, salonId);

    // console.log('numberOfSerivices', numberOfSerivices);
    // console.log('checkSalonCart', checkSalonCart);
    // console.log('timeSelectedFlag', timeSelectedFlag);

    // Best Possible Way for Object to array
    let category = _.mapValues(services, 'category');
    let category_convert = _.map(category, value => ({value}));
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {/* <ScreenHeader
          onPress={() => navigation.goBack()}
          screenTitle={
            isLoadingStylist ? 'Loading...' : name_first + ` ` + name_last
          }
          align={'left'}
          titleColor={'grey'}
        /> */}
        <View style={[styles.flexRow2, styles.customHeader]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.flexRow}>
            <Icon
              name={'chevron-left'}
              size={20}
              color={theme.PRIMARY_TEXT_COLOR}
            />
            <Text style={styles.stylistName}>
              {isLoadingStylist ? 'Loading...' : name_first + ` ` + name_last}
            </Text>
          </TouchableOpacity>
          {/* <Image source={images.safe2} style={styles.safeImage} /> */}
          <SafeSquad style={styles.safeImage} />
        </View>

        <ScrollView style={styles.scrollContainer}>
          <ImageView
            glideAlways
            images={converted_image}
            imageIndex={imageIndex ? imageIndex : 0}
            animationType="fade"
            isVisible={viewGallery}
            // isVisible={true}
            onClose={() => this.setState({viewGallery: false})}
            renderFooter={() => this.renderFooter()}
          />
          {/* Stylist ShowCase */}
          <View style={styles.stylistShowCase}>
            <View style={styles.stylistCase1}>
              {/* <Image
                source={
                  MAIN
                    ? {uri: profile_pic}
                    : require('../../assets/stylishDetails/stylish1.jpg')
                }
                style={{
                  height: scale(88),
                  width: scale(88),
                }}
              /> */}
              <FastImage
                style={styles.mainStylistImage}
                source={{
                  uri: profile_pic,
                  // headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
            <View style={styles.stylistCase2}>
              {/* Stylist Detail */}
              <View style={styles.flexRow}>
                <View style={styles.stylistDetailWidthCommon}>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.ratingValue,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {global ? global.rating_avg : 4.83}
                    </Text>
                  </View>
                  <Text style={[styles.ratingText]}>Posts</Text>
                </View>
                <View style={styles.stylistDetailWidthCommon}>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.ratingValue,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {global ? global.review_count : `450`}
                    </Text>
                  </View>
                  <Text style={[styles.ratingText]}>Services</Text>
                </View>
                <View style={styles.stylistDetailWidth}>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.ratingValue,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {global ? global.rating_avg : `98%`}
                    </Text>
                  </View>
                  <Text style={[styles.ratingText]}>Recommendation</Text>
                </View>
              </View>
              {/* Stylist Detail End */}
            </View>
          </View>
          {/* Stylist ShowCase End */}

          {/* Stylist Name */}
          <View style={styles.stylistNameContainer}>
            <View style={[styles.flexRow2]}>
              <View>
                <Shimmer animating={isLoadingStylist}>
                  <Text
                    style={[
                      styles.stylistName2,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    {isLoadingStylist
                      ? 'Loading...'
                      : name_first + ` ` + name_last}
                  </Text>
                </Shimmer>
                <Shimmer animating={isLoadingStylist}>
                  <Text
                    style={[
                      styles.stylistSubName,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    {rank}
                  </Text>
                </Shimmer>
              </View>
              <View style={styles.flexRow2}>
                <Icon name={'instagram'} size={30} color={colors.textGrey} />
                <Icon
                  name={'facebook'}
                  size={30}
                  color={colors.textGrey}
                  style={styles.iconSpacing}
                />
              </View>
            </View>
          </View>
          {/* Stylist Name End */}

          {/* Stylist Detail */}
          <Text style={styles.stylistDetail}>{bio}</Text>
          {/* Stylist Detail End*/}

          {/* Salon Name & Safty Sloat */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('salonDetail', {
                salonId: objectIdConvert,
              })
            }>
            <Text style={styles.salonNameText}>{'@ ' + salonName}</Text>
          </TouchableOpacity>

          <Text style={styles.saftyTxt}>
            next safe slot available @ 12:30 pm
          </Text>
          {/* Salon Name & Safty Sloat End */}
          <View style={styles.menuHorizontalLine2} />
          {/* Stylist Services */}
          <View style={styles.serviceContainerMain}>
            <Text
              style={[
                styles.titleMainCategory,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Speciality
            </Text>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={category_convert}
              renderItem={category_convert =>
                this.renderServicesItem(category_convert)
              }
              horizontal
            // numColumns={3}
            // automaticallyAdjustContentInsets={true}
            />
          </View>
          {/* Stylist Services End */}

          {/* Compliments */}
          <View style={styles.complementMainContainer}>
            <Text
              style={[
                styles.titleMainCategory,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Compliments
            </Text>
            <FlatList
              data={ComplementData}
              keyExtractor={this.keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => <ComplimentSlider data={item} />}
            />
          </View>
          {/* Compliments End */}

          {/* Photos */}
          <View style={styles.photoMainContainer}>
            <View style={styles.flexRow}>
              <Text
                style={[
                  styles.titleMainCategory,
                  {color: theme.PRIMARY_TEXT_COLOR, width: '80%'},
                ]}>
                Photos
              </Text>
              {/* <Text style={[styles.viewAllText]}>View All</Text> */}
            </View>
            <FlatList
              data={OTHERS}
              renderItem={data => this.renderPhotos(data)}
              keyExtractor={this.keyExtractor}
              numColumns={3}
              automaticallyAdjustContentInsets={true}
            />
          </View>
          {/* Photos End */}

          {/* Services List */}
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            onClose={() => {
              this.setState({
                timeSelectedFlag: false,
                refreshCalenderView: true,
                selected_date: Moment(new Date()).format('YYYY-MM-DD'),
                localOptionSelect: [],
                selectLocalStylist: false,
                searchedValue: '',
              });
              // this.props.addStylist(false);
              this.props.checkServiceType([]);
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
                // paddingTop: scale(20),
                // paddingHorizontal: scale(30),
                borderTopLeftRadius: scale(12),
                borderTopRightRadius: scale(12),
                backgroundColor: colors.whitePrimary,
              },
            }}>
            <View style={[styles.flexRow2, {paddingHorizontal: scale(30)}]}>
              {!timeSelectedFlag && (
                <Text
                  style={[styles.selectService, {color: colors.blackPrimary}]}>
                  Services Offered
                </Text>
              )}
              {!timeSelectedFlag && (
                <TouchableOpacity onPress={() => this.RBSheet.close()}>
                  <Image
                    source={require('../../assets/stylishDetails/close.png')}
                    style={[styles.closeIcon, {tintColor: colors.blackPrimary}]}
                  />
                </TouchableOpacity>
              )}
            </View>
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
            <View>
              {type && this.whatToRender()}
              {timeSelectedFlag && !type && this.renderCheckoutTime()}
              <View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {!timeSelectedFlag && !type && this.renderServices()}
                </ScrollView>
                {/* Cart Button */}
                {numberOfSerivices !== 0 &&
                  checkSalonCart &&
                  !timeSelectedFlag && (
                    <View
                      style={[
                        styles.buttonContain,
                        {
                          backgroundColor: colors.whitePrimary,
                          shadowColor: theme.NAVIGATION_SHADOW,
                          position: 'absolute',
                          bottom: scale(50),
                        },
                      ]}>
                      <CustomButton
                        style={[
                          styles.cartButton,
                          {
                            marginHorizontal: scale(15),
                            bottom: scale(25),
                            width: '85%',
                          },
                        ]}
                        btnText={`${numberOfSerivices} Services`}
                        onPress={() => {
                          this.RBSheet.close();
                          navigation.navigate('checkOutDetails');
                        }}
                        type={'cart'}
                        price={`₹ ${price_net} (incl.taxes)`}
                      />
                    </View>
                  )}
                {/* Cart Button End */}
              </View>
            </View>
          </RBSheet>
          {/* Services List End */}
        </ScrollView>
        <View style={styles.customButtonPosition}>
          <CustomButton
            style={styles.customButton}
            btnText={'Book Appointment'}
            onPress={() => {
              this.RBSheet.open();
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStatsToProps = ({
  appTheme = [],
  stylistDetail = [],
  cartList = [],
  salonDetail = [],
  user = [],
  cartCheckout = [],
}) => ({
  appTheme,
  stylistDetail,
  cartList,
  salonDetail,
  user,
  cartCheckout,
});

export default connect(
  mapStatsToProps,
  {
    fetchStylistDetails,
    addSelectedDate,
    addSelectedTime,
    addServiceAPI,
    getAvailableTimeSlot,
    fetchSalonDetails,
    viewCart,
    addServiceInCart,
    addServiceUuidMaster,
    getAvailableStylist,
    checkServiceType,
  },
)(stylishDetails);
