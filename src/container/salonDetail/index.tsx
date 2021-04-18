import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  Picker,
  PixelRatio,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import Icon from 'react-native-vector-icons/FontAwesome';
import SplashScreen from 'react-native-splash-screen';
import {
  BarChart,
  Grid,
  LinearGradient,
  XAxis,
  LineChart,
} from 'react-native-svg-charts';
import Moment from 'moment';

import {Defs, Line, Stop, Svg} from 'react-native-svg';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {connect} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import Animated from 'react-native-reanimated';
import RNPickerSelect from 'react-native-picker-select';
import BucketOrange from '../../assets/svg/bucketOrange';

import {scale, screenHeight, screenWidth} from '../../utils/scale';
import images from '../../assets/images';
import {colors, fonts} from '../../constants/styles';
// import TopStylist from '../../components/topStylist';
import StylistList from '../../components/stylistList';
import CustomButton from '../../components/Button';
import * as RootNavigation from '../../navigation/rootNavigation';
import CurrentOffers from '../../components/currentOffers';
// import BarChart from '../../components/BarChart';
import styles from './style';

interface IProps {
  appTheme: Object;
  navigation: Object;
}

interface IState {
  index: Number;
  routes: Object;
  cartItem: Number;
  weekDate: Object;
  generalTime: Object;
  time: Object;
  mapData: Object;
  activeSlide: Number;
}

const pickerStyleLight = {
  inputIOS: {
    color: 'white',
  },
  inputAndroid: {
    color: 'white',
  },
};

const pickerStyleDark = {
  inputIOS: {
    color: '#000',
  },
  inputAndroid: {
    color: '#000',
  },
};

const offersData = [
  {offerDiscount: '30%', offerDetils: 'GOBONY30'},
  {offerDiscount: '20%', offerDetils: 'GOBONY20'},
];

// const fill = 'rgb(134, 65, 255)';
const fill = '#F9D5B7';
const data1 = [24, 22, 22, 22, 22];
const data = [
  {
    label: '1pm',
    value: 10,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    label: '2pm',
    value: 20,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    label: '3pm',
    value: 60,
    svg: {
      // stroke: 'purple',
      // strokeWidth: 2,
      // fill: 'white',
      // strokeDasharray: [4, 2],
      fill: '#F9D5B7',
    },
  },
  // {
  //   value: 70,
  //   svg: {
  //     fill: 'url(#gradient)',
  //   },
  // },
  {
    rushHour: '12pm: Usually a bit busy',
    label: '4pm',
    value: 70,
    svg: {
      fill: colors.orangeText,
    },
  },
  {
    label: '5pm',
    value: 50,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    label: '6pm',
    value: 40,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    label: '7pm',
    value: 20,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 20,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 10,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 20,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 50,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 60,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 40,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 30,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 20,
    svg: {
      fill: '#F9D5B7',
    },
  },
  {
    value: 10,
    svg: {
      fill: '#F9D5B7',
    },
  },
];

const Gradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
      <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
      <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
    </LinearGradient>
  </Defs>
);

class salonDetail extends React.Component<IProps, IState> {
  RBSheet: any;
  TimeSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      activeSlide: 0,
      index: 0,
      mapData: [],
      time: 'MON',
      routes: [
        {key: 'Stylists', title: 'Stylists'},
        {key: 'Nonstylists', title: 'Non Stylists'},
      ],
      cartItem: 1,
      weekDate: [
        {weekName: 'Sat', weekDate: '19', isSelected: true},
        {weekName: 'Sun', weekDate: '20', isSelected: false},
        {weekName: 'Mon', weekDate: '21', isSelected: false},
        {weekName: 'Tue', weekDate: '22', isSelected: false},
        {weekName: 'Wed', weekDate: '23', isSelected: false},
        {weekName: 'Thu', weekDate: '24', isSelected: false},
        {weekName: 'Fri', weekDate: '25', isSelected: false},
      ],
      generalTime: [
        {
          timeName: 'Morning',
          times: [
            '11:00 am',
            '11:30 am',
            '12:00 am',
            '12:30 am',
            '01:00 pm',
            '01:30 am',
          ],
          isSelected: ['Morning', '11:00 am'],
        },
        {
          timeName: 'Afternoon',
          times: [
            '11:00 am',
            '11:30 am',
            '12:00 am',
            '12:30 am',
            '01:00 pm',
            '01:30 am',
          ],
          isSelected: ['Afternoon', '12:30 am'],
        },
        {
          timeName: 'Evening',
          times: [
            '11:00 am',
            '11:30 am',
            '12:00 am',
            '12:30 am',
            '01:00 pm',
            '01:30 am',
          ],
          isSelected: ['Evening', '01:30 am'],
        },
      ],
    };
  }
  componentDidMount() {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;

    const {traffic_distributions = ''} = salonDetail;
    // console.log('hehehehehe', JSON.stringify(traffic_distributions['MON']));

    let weekDayToday = Moment(new Date())
      .format('ddd')
      .toUpperCase();
    // console.log('weekDayToday', weekDayToday);
    this.setState({
      mapData: traffic_distributions && traffic_distributions[weekDayToday],
    });
    // this.TimeSheet.open();
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderDealItem = () => {
    return <Image source={images.deal} style={styles.offerCard} />;
  };

  FirstRoute = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: this.props.appTheme.theme
            .PRIMARY_BACKGROUND_COLOR_LIGHT,
        },
      ]}>
      <FlatList
        data={[
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
        ]}
        renderItem={({item}) => (
          <StylistList
            onPress={() => {
              this.RBSheet.close();
              RootNavigation.navigate('stylishDetails', {});
            }}
            data={item}
          />
        )}
        contentInset={{bottom: scale(60)}}
      />
    </View>
  );
  SecondRoute = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: this.props.appTheme.theme
            .PRIMARY_BACKGROUND_COLOR_LIGHT,
        },
      ]}>
      <FlatList
        data={[
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
        ]}
        renderItem={({item}) => (
          <StylistList
            onPress={() => {
              this.RBSheet.close();
              RootNavigation.navigate('stylishDetails', {});
            }}
            data={item}
          />
        )}
        contentInset={{bottom: scale(60)}}
      />
    </View>
  );

  _handleIndexChange = (index: any) => this.setState({index});

  _renderTabBar = (props: {
    navigationState: {routes: any[]};
    position: Animated.Adaptable<number>;
  }) => {
    const {theme} = this.props.appTheme;
    return (
      <View style={{opacity: 10}}>
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.lightOrange}}
          style={{
            height: scale(40),
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            borderTopLeftRadius: scale(15),
            borderTopRightRadius: scale(15),
          }}
          renderLabel={({route, focused, color}) => (
            <Text
              style={{
                fontFamily: fonts.robotoRegular,
                color: focused ? theme.PRIMARY_TEXT_COLOR : colors.grayColor,
                // letterSpacing: scale(2.22);
              }}>
              {route.title}
            </Text>
          )}
        />
        <View style={{backgroundColor: '#979797'}} />
      </View>
    );
  };

  _renderScene = SceneMap({
    Stylists: this.FirstRoute,
    Nonstylists: this.SecondRoute,
  });

  renderTabView = () => {
    // const { checkData } = this.state;
    // const { theme } = this.props.appTheme;
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        swipeEnabled={true}
      />
    );
  };

  renderTimePicker = () => {
    const {weekDate, generalTime} = this.state;
    const {theme} = this.props.appTheme;

    const dateList = weekDate.map((item, index) => {
      const {weekName = '', weekDate = '', isSelected = ''} = item;
      return (
        <View
          style={[
            styles.timeContainer,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            },
          ]}>
          <View style={styles.timeSubContainer}>
            <Text
              style={[
                styles.weekNameText,
                {
                  color: theme.PRIMARY_TEXT_COLOR,
                  fontWeight: isSelected ? 'bold' : 'normal',
                },
              ]}>
              {weekName}
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.weekDateText,
                  {
                    color: isSelected
                      ? colors.orangeText
                      : theme.PRIMARY_TEXT_COLOR,
                    fontWeight: isSelected ? 'bold' : 'normal',
                    fontSize: scale(isSelected ? 18 : 16),
                  },
                ]}>
                {weekDate}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });

    const timeList = generalTime.map((item, index) => {
      const {timeName = '', times = '', isSelected = ''} = item;
      if (timeName) {
        return (
          <View>
            <Text
              style={{color: theme.PRIMARY_TEXT_COLOR, fontSize: scale(16)}}>
              {timeName}
            </Text>
            <View style={styles.timeNameContainer}>
              {times.map((item, index) => {
                // console.log('isSelected', isSelected[1]);
                // console.log('item', item);
                return (
                  <TouchableOpacity
                    style={[
                      styles.timeSelectContainer,
                      {
                        borderWidth: item === isSelected[1] ? 1 : 0,
                        borderColor: colors.orangeText,
                        backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                      },
                    ]}>
                    <Text
                      style={{
                        color:
                          item === isSelected[1]
                            ? colors.orangeText
                            : theme.PRIMARY_TEXT_COLOR,
                      }}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      }
    });

    return (
      <ScrollView>
        <View style={styles.mainTimePicker}>
          <Text
            style={[
              styles.preferedTimeText,
              {
                color: theme.PRIMARY_TEXT_COLOR,
              },
            ]}>
            Select Your preferred timings
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>{dateList}</View>
        <View style={{marginHorizontal: scale(20)}}>
          <Text
            style={[
              styles.selectedDataText,
              {
                color: theme.PRIMARY_TEXT_COLOR,
              },
            ]}>
            Today, 19 October
          </Text>
          <View style={{marginBottom: scale(30)}}>{timeList}</View>
        </View>
        <CustomButton
          style={[styles.cartButton, {bottom: scale(20)}]}
          btnText={'Preferred time'}
          btnLable={'Proceed'}
          onPress={() => {}}
          type={'cart'}
          price={'11:00 am'}
        />
      </ScrollView>
    );
  };

  listAllAmenities = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    const {amenities = ''} = salonDetail;
    return (
      <FlatList
        data={amenities}
        // columnWrapperStyle={{
        //   flex: 1,
        //   backgroundColor: 'green',
        //   justifyContent: 'space-between',

        // }}
        style={{marginHorizontal: scale(5)}}
        contentContainerStyle={{
          // marginLeft: scale(20),
          // alignSelf: 'center',
          marginTop: scale(10),

          // backgroundColor: 'red',
          // marginBottom: scale(150),
        }}
        numColumns={2}
        renderItem={d => {
          const {images = '', name = '', present = ''} = d.item;
          // console.log('d.item', JSON.stringify(d.item));
          // if (present) {
          return (
            <View style={styles.amenitiesMainContainer}>
              <Image
                source={{uri: images.MAIN[0].url}}
                style={[
                  styles.amenitiesSub,
                  {tintColor: theme.PRIMARY_TEXT_COLOR},
                ]}
              />
              <Text
                style={[styles.centerText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name}
              </Text>
            </View>
          );
          // }
        }}
      />
    );
    // if (amenities) {
    //   return amenities.map((d, i) => {
    //     const {images = '', name = '', present = ''} = d;
    //     if (present) {
    //       return (
    //         <View style={styles.amenitiesMainContainer}>
    //           <Image
    //             source={{uri: images.MAIN[0].url}}
    //             style={styles.amenitiesSub}
    //           />
    //           <Text
    //             style={[styles.centerText, {color: theme.PRIMARY_TEXT_COLOR}]}>
    //             {name}
    //           </Text>
    //         </View>
    //       );
    //     } else {
    //       null;
    //     }
    //   });
    // }
  };

  changeWeekName = data => {
    if (data) {
      this.setState({time: data});

      let salonDetail =
        this.props &&
        this.props.salonDetail &&
        this.props.salonDetail.salonDetail;

      const {basic = '', traffic_distributions = ''} = salonDetail;
      // console.log('heheh', traffic_distributions);
      this.setState({
        mapData: traffic_distributions && traffic_distributions[data],
      });
    }
  };

  checkIfSalonIsOpen = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {operational_days = ''} = salonDetail;
    let weekday = new Array(7);
    weekday[0] = 'MON';
    weekday[1] = 'TUE';
    weekday[2] = 'WED';
    weekday[3] = 'THU';
    weekday[4] = 'FRI';
    weekday[5] = 'SAT';
    weekday[6] = 'SUN';
    return operational_days[weekday[3]];
  };

  renderSafteyCard = () => {
    const {appTheme = [], navigation} = this.props;
    let theme = appTheme.theme;
    return (
      <View style={styles.marginHorizontal}>
        <FlatList
          data={[1, 2]}
          horizontal
          contentContainerStyle={styles.marginLeft}
          showsHorizontalScrollIndicator={false}
          renderItem={() => {
            return (
              <View
                style={[
                  styles.safteyContainer,
                  {
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                    borderColor:
                      theme.type === 'darkTheme'
                        ? colors.stylistName
                        : colors.greyHomeBorder,
                  },
                ]}>
                <View style={styles.flexRowCard}>
                  {/* <Image source={images.bucketO} style={styles.safteyImage} /> */}
                  <BucketOrange height={screenHeight > 700 ? '40' : '35'} />
                  <View style={styles.leftText}>
                    <Text
                      style={[
                        styles.safteyTitle,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      SALON SAFETY MEASURES
                    </Text>
                    <Text
                      style={[
                        styles.safteyDec,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      Well Sanitized Ambience
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  handleSlideChange(index: Number) {
    // console.log('d', index);
    this.setState({activeSlide: index});
  }

  render() {
    const {appTheme, navigation} = this.props;
    const {cartItem, time, mapData} = this.state;
    let theme = appTheme.theme;
    // console.log('mapData', mapData);

    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;

    const {basic = '', traffic_distributions = ''} = salonDetail;
    // console.log('salonDetail', JSON.stringify(salonDetail));
    let checkOpenSalon = this.checkIfSalonIsOpen();
    const {
      name = '',
      location = '',
      served_gender = '',
      stylists = '',
      rating_avg = '',
      review_count = '',
      timing = '',
      logo = '',
      uuid = '',
    } = basic;

    // console.log('images', JSON.stringify(salonDetail));

    let imagess = basic && basic.images && basic.images.MAIN;

    let imageMain =
      basic && basic.images && basic.images.MAIN && basic.images.MAIN[0].url;

    const {micro_market = []} = location;

    let openTime = timing && timing.open;
    let closeTime = timing && timing.close;

    let closeHour = closeTime && closeTime.substring(0, 2);
    let minute = closeTime && closeTime.substring(2, 5);
    let AmOrPm = closeHour >= 12 ? 'pm' : 'am';
    closeHour = closeHour % 12 || 12;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {/* <Image source={{uri: imageMain}} style={styles.imageContainer} /> */}

          <Carousel
            ref={carousel => {
              this._carousel = carousel;
            }}
            // indicatorStyle
            layout={'stack'}
            horizontal={true}
            data={imagess}
            renderItem={data => {
              const {url = ''} = data.item;
              return (
                <FastImage
                  style={styles.imageContainer}
                  source={{
                    uri: url,
                    // headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                  }}
                  // resizeMode={FastImage.resizeMode.stretch}
                />
              );
            }}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop={true}
            onSnapToItem={d => this.handleSlideChange(d)}
            enableSnap={true}
          />

          <Pagination
            // containerStyle={{paddingVertical: 0}}
            dotsLength={imagess.length}
            activeDotIndex={this.state.activeSlide}
            containerStyle={styles.indicator}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#FFF',
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />

          {/* <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backButton]}>
            <Icon name={'angle-left'} size={scale(40)} color={'#FFF'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={[styles.galleryButton]}>
            <Icon
              name={'photo'}
              size={scale(20)}
              color={'#FFF'}
              style={{marginHorizontal: 10}}
            />
            <Text style={styles.galleryText}>view gallery</Text>
          </TouchableOpacity> */}

          {/* Details */}
          <View style={styles.detailContainer}>
            <View style={styles.detailText1}>
              <Text
                style={[styles.salonName, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name}
              </Text>
              <Text style={[styles.locationText, {color: colors.textGrey}]}>
                {micro_market && micro_market.name}
              </Text>
              <View style={styles.offerContainer}>
                <Text style={[styles.openText]}>
                  {checkOpenSalon ? `OPEN NOW` : `CLOSED NOW`}
                </Text>
              </View>
              <Text
                style={[
                  styles.locationText,
                  {
                    color:
                      theme.type === 'darkTheme'
                        ? colors.greyHomeBorder
                        : colors.textGrey,
                  },
                ]}>
                {timing
                  ? `( ` +
                    timing.open +
                    ` am` +
                    ` - ` +
                    closeHour +
                    minute +
                    ` ` +
                    AmOrPm +
                    `)`
                  : `(11:00 am - 09:00 pm)`}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('checkOutDetails')}
                style={[
                  styles.detailText2,
                  {
                    backgroundColor:
                      theme.type === 'darkTheme'
                        ? 'rgba(255,255,255,0.3)'
                        : 'rgba(255,255,255,0.1)',
                    borderWidth: 0.2,
                  },
                ]}>
                <Image
                  style={[styles.cartIcon, {}]}
                  source={images.shopping_cart}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={[styles.viewCart, {color: theme.PRIMARY_TEXT_COLOR}]}>
                  View Cart
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={[
                styles.horizontalLine,
                {
                  backgroundColor:
                    theme.type === 'darkTheme'
                      ? colors.stylistName
                      : colors.greyHomeBorder,
                },
              ]}
            />
            <Text style={styles.slotText}>
              next safe slot available @ 12:30 pm
            </Text>
            {this.renderSafteyCard()}
          </View>
          {/* Details End */}

          {/* Offer  */}
          {/* <View>
            <Text
              style={[styles.servicesText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Current Offers
            </Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={offersData => <CurrentOffers data={offersData} />}
              keyExtractor={this.keyExtractor}
              data={offersData}
              style={{marginLeft: scale(20)}}
            />
          </View> */}
          {/* Offers End */}

          {/* List Category */}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('serviceList')}
            activeOpacity={1}
            style={[
              styles.serviceDataContainer,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                borderColor:
                  theme.type === 'darkTheme'
                    ? colors.stylistName
                    : colors.greyHomeBorder,
              },
            ]}>
            <View
              style={[
                styles.serviceSubDataContainer,
                {marginVertical: scale(20)},
              ]}>
              <Image
                style={styles.serviceIcon}
                source={require('../../assets/salonDetaill/scissors.png')}
              />
              <View style={styles.leftMargin}>
                <Text
                  style={[
                    styles.serviceName,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Book Service
                </Text>
                <Text style={styles.serviceDetail}>
                  Select the service which you want to book
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('bookStylist')}
            activeOpacity={1}
            style={[
              styles.serviceDataContainer,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                marginTop: scale(-22),
                borderColor:
                  theme.type === 'darkTheme'
                    ? colors.stylistName
                    : colors.greyHomeBorder,
              },
            ]}>
            <View
              style={[
                styles.serviceSubDataContainer,
                {marginVertical: scale(12)},
              ]}>
              <Image
                style={styles.serviceIcon}
                source={require('../../assets/salonDetaill/comb.png')}
              />
              <View style={styles.leftMargin}>
                <Text
                  style={[
                    styles.serviceName,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  Book Stylist
                </Text>
                <Text style={styles.serviceDetail}>
                  Find your right stylist
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {}}
            activeOpacity={1}
            style={[
              styles.serviceDataContainer,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                marginTop: scale(-1),
                // borderWidth: 1,
              },
            ]}>
            {/* <View style={[styles.serviceSubDataContainer]}>
              <Image
                style={styles.serviceIcon}
                source={require('../../assets/salonDetaill/info.png')}
              />
              <View style={[styles.leftMargin]}>
                <Text
                  style={[
                    styles.serviceName,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  More Info
                </Text>
                <Text style={styles.serviceDetail}>More Info</Text>
              </View>
            </View> */}
          </TouchableOpacity>

          {/* List Category End */}

          {/* Deal  */}
          {/* <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.topStlist,
                {width: '70%', color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Popular Deals
            </Text>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={this.renderDealItem}
            keyExtractor={this.keyExtractor}
            data={[1, 2, 3, 4]}
            style={{marginLeft: scale(20)}}
          /> */}
          {/* Deal End */}

          {/* Bar Chat  */}
          {/* <View
            style={[
              styles.amenitiesMain,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.amenitiesText,
                  {color: theme.PRIMARY_TEXT_COLOR, width: '65%'},
                ]}>
                Popular Timings
              </Text>
              <View style={styles.pickerContainer}>
                <RNPickerSelect
                  style={
                    theme.type === 'darkTheme'
                      ? pickerStyleLight
                      : pickerStyleDark
                  }
                  value={time}
                  onValueChange={value => {
                    this.changeWeekName(value);
                    // this.setState({time: value});
                  }}
                  Icon={() => {
                    return (
                      <Icon
                        name={'chevron-down'}
                        size={scale(15)}
                        color={theme.PRIMARY_TEXT_COLOR}
                        style={styles.dropdownIcon}
                      />
                    );
                  }}
                  items={[
                    {label: 'Thrusday', value: 'THU'},
                    {label: 'Friday', value: 'FRI'},
                    {label: 'Saturday', value: 'SAT'},
                    {label: 'Sunday', value: 'SUN'},
                    {label: 'Monday', value: 'MON'},
                    {label: 'Tuesday', value: 'TUE'},
                    {label: 'Wednesday', value: 'WED'},
                  ]}
                />
              </View>
            </View>
            <BarChart
              style={styles.barContainer}
              data={mapData && mapData}
              gridMin={0}
              spacingInner={'0.40'}
              svg={{fill: colors.orangeText}}
              yAccessor={({item}) => item + 1}
              contentInset={{top: 20, bottom: 20}}
            />
            <View style={{marginHorizontal: scale(10)}}>
            </View>
          </View> */}
          {/* <FlatList
                horizontal
                data={[
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  10,
                  11,
                  12,
                  13,
                  14,
                  15,
                  16,
                  17,
                  18,
                  19,
                  20,
                  21,
                  22,
                  23,
                  24,
                ]}
                renderItem={() => {
                  return (
                    <Text
                      style={{
                        color: theme.PRIMARY_TEXT_COLOR,
                        marginHorizontal: scale(1),
                      }}>
                      12
                    </Text>
                  );
                }}
              /> */}

          {/* Bar Chart End */}

          <View
            style={[
              styles.amenitiesMain,
              {
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                marginBottom: scale(130),
                // borderColor:
                //   theme.type === 'darkTheme'
                //     ? colors.stylistName
                //     : colors.greyHomeBorder,
              },
            ]}>
            <Text
              style={[styles.amenitiesText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Amenities
            </Text>
            {this.listAllAmenities()}
          </View>

          {/* View All Tab */}
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={scale(600)}
            duration={250}
            customStyles={{
              container: {
                borderTopLeftRadius: scale(30),
                borderTopRightRadius: scale(30),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              },
            }}>
            {this.renderTabView()}
          </RBSheet>
          {/*  View All Tab End */}

          {/* Time Picker */}
          <RBSheet
            ref={ref => {
              this.TimeSheet = ref;
            }}
            height={scale(600)}
            duration={250}
            customStyles={{
              container: {
                borderTopLeftRadius: scale(30),
                borderTopRightRadius: scale(30),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              },
            }}>
            {this.renderTimePicker()}
          </RBSheet>
          {/* Time Picker End */}
        </ScrollView>
      </View>
    );
  }
}

const mapStatsToProps = ({appTheme = '', salonDetail = []}) => ({
  appTheme,
  salonDetail,
});

export default connect(
  mapStatsToProps,
  {},
)(salonDetail);
