// import DataCheck from '../../components/checkData';
import axios from 'axios';
import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import codePush from 'react-native-code-push';
import FastImage from 'react-native-fast-image';
import firebase from 'react-native-firebase';
import OneSignal from 'react-native-onesignal';
import RNPickerSelect from 'react-native-picker-select';
// import Mixpanel from 'react-native-mixpanel';
// import SplashScreen from 'react-native-splash-screen';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import images from '../../assets/images';
import MadeByStyle from '../../assets/svg/live.svg';
import BookAgain from '../../components/bookAgainComponent';
import CustomButton from '../../components/Button';
import HomeScreenHeader from '../../components/header';
import FeaturedComponent from '../../components/homeScreens/featuredComponent';
import ListCategory from '../../components/listCategory';
import ListWalletHistory from '../../components/listWalletData';
import Loader from '../../components/Loader';
import NearbySalon from '../../components/nearbySalon';
import SuggestServices from '../../components/suggestedServices';
import SwipeablePanel from '../../components/SwipeablePanel';
import TopSalon from '../../components/topSalonAround';
import TopStylist from '../../components/topStylist';
import {colors} from '../../constants/styles';
import {fetchAlgoliaConfig} from '../../store/algoliaConfig/actions';
import {
  getAllDealList,
  getDealTag,
  getFavouriteDeal,
} from '../../store/dealList/actions';
import {getAllOrder, getAllOrderHistory} from '../../store/orderList/actions';
import {fetchSalonDetails} from '../../store/salonDetail/actions';
import analyticsManager from '../../utils/analytics-manager';
import {OneSignalId} from '../../utils/api-configuration';
import {scale} from '../../utils/scale';
import styles from './style';

const codePushOptions = {checkFrequency: codePush.CheckFrequency.ON_APP_RESUME};

interface Props {
  appTheme: Object;
  navigation: Object;
  user: Object;
  fetchAlgoliaConfig: Function;
  fetchSalonDetails: Function;
  getAllOrder: Function;
  getAllDealList: Function;
  getDealTag: Function;
  getFavouriteDeal: Function;
  getAllOrderHistory: Function;
}
interface State {
  loading: boolean;
  activeInex: Number;
  value: Number;
  filterData: Array;
  DataCheck: Boolean;
  showFilter: Boolean;
  selectedSalon: String;
  reviewPanel: Boolean;
  reviewSelected: Number;
}

const nearBySalonDummyData = [1, 2, 3, 4, 5];
const featuredSalonData = [1, 2, 3, 4, 5];

const categoriesData = [
  {title: 'best', icon: images.best},
  {title: 'neame', icon: images.neame},
  {title: 'saftey', icon: images.saftey},
  {title: 'shield', icon: images.shield},
  // {title: 'best', icon: images.best},
  {title: 'makup', icon: images.makup},
];

const walletData = [
  {rewardTitle: 'Reward points', points: '2652 ponits', rewardAmount: '2200'},
  // {rewardTitle: 'In Store credits', orderId: '#886402', rewardAmount: '22,000'},
];

const gallery = [
  {
    productImage: images.square,
  },
  {
    productImage: images.square3,
  },
  {
    productImage: images.square2,
  },
];
const suggestedService = [
  {
    name: 'Hairmasters Salon',
    subName: 'Keratin—the protein that',
    price: '1,500',
    offer: '30% off on selected products',
    productImage: images.productImageSquare1,
  },
  {
    name: 'Hair Spa- Kerastace',
    subName: 'Keratin—the protein that',
    price: '1,500',
    offer: '30% off on selected products',
    productImage: images.productImageSquare2,
  },

  // {
  //   name: 'Hair Spa',
  //   price: '1000',
  //   offer: '10% off on selected products',
  //   productImage: 'blah',
  // },
];

const bookingHistory = [
  {
    name: 'Surveen. K',
    type: 'Haircut, manicure',
    bookingDate: 'Last booked 24 days ago',
  },
  {
    name: 'Surveen. K',
    type: 'Haircut, manicure',
    bookingDate: 'Last booked 24 days ago',
  },
  {
    name: 'Surveen. K',
    type: 'Haircut, manicure',
    bookingDate: 'Last booked 24 days ago',
  },
];

const _ = require('lodash');

class homeScreen extends React.Component<Props, State> {
  RBSheet: any;
  Picker: any;
  notificationListener: any;
  constructor(props: Props) {
    super(props);

    // OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init(OneSignalId, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    // OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    this.state = {
      reviewSelected: 5,
      reviewPanel: true,
      selectedSalon: '',
      showFilter: false,
      loading: true,
      activeInex: 0,
      value: 0,
      DataCheck: false,
      filterData: [
        // {numberOfFilterApplied : 0},
        {title: 'Filters', icon: 'filter'},
        {title: 'Rating: High to low', isSelected: true},
        {title: 'Price High to low', isSelected: true},
        {title: 'Recommendation', isSelected: false},
      ],
    };
    // console.log('homeeeeee',this.props);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
    // BackHandler.removeEventListener('hardwareBackPress');
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    analyticsManager.trackWithProperties('User Logged In');

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   BackHandler.exitApp();
    // });
    // Mixpanel.track('WhiteLabel App Started');

    const {authToken = '', detail = ''} = this.props.user;
    // const {global_uuid = ''} = detail;
    // console.log('--->',global_uuid);
    // if (global_uuid) {
    //   OneSignal.setExternalUserId(global_uuid, results => {
    //     //  console.log('Results of setting external user id', results);
    //   });
    // }
    // const {algoliaConfig} = this.props.algoliaDetail;
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    }
    this.props.fetchAlgoliaConfig();
    setTimeout(() => {
      this.props.fetchSalonDetails('');
      this.getAllOrderList();
      this.getAllData();
    }, 300);

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2000);
    const channel = new firebase.notifications.Android.Channel(
      'whiteLabel',
      'Channel Name',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);

    this.notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        if (Platform.OS === 'android') {
          const localNotification = new firebase.notifications.Notification()
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId('whiteLabel')
            .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch((err) => console.error(err));
        }
      });
    this.checkPermission();
  }

  getAllData = () => {
    const {algoliaDetail = '', salonDetail = ''} = this.props;
    const {algoliaConfig = '', isLoadingData = ''} = algoliaDetail;
    let basic =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.basic;
    // console.log('salonDetail', salonDetail);

    let salon_name = basic && basic.name;
    let app_id = algoliaConfig && algoliaConfig.app_id;
    let search_key = algoliaConfig && algoliaConfig.search_key;
    this.setState({selectedSalon: salon_name});

    if (app_id) {
      const algoliasearch = require('algoliasearch');
      const client = algoliasearch(app_id, search_key);
      const index = client.initIndex('prod_salons', 'prod_stylists');

      const prod_deals = client.initIndex('prod_deals');
      prod_deals
        .search('', {
          hitsPerPage: 300,
        })
        .then(({hits}) => {
          this.props.getAllDealList(hits);
          console.log('DealList', hits.length);
        })
        .catch((err) => {
          console.log('prod_deals err', err);
        });
    }
  };

  getAllOrderList = () => {
    const {
      getAllOrder,
      user = [],
      getFavouriteDeal,
      getAllOrderHistory,
    } = this.props;
    const {detail = []} = user;
    let userId = detail && detail.uuid;
    // console.log('dd', detail.uuid);
    let Global = detail && detail.global_uuid;
    if (Global) {
      OneSignal.setExternalUserId(Global, (results) => {
        // console.log('Results of setting external user id', results);
      });
    }
    getAllOrderHistory(userId);
    getAllOrder(userId, 'UPCOMING');
    getAllOrder(userId, 'PAST');
    getFavouriteDeal(userId);
  };

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      // this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  renderDealItem = () => {
    return <Image source={images.deal} style={styles.offerCard} />;
  };

  renderCouponItem = () => {
    return <Image source={images.coupon} style={styles.couponOffer} />;
  };

  keyExtractor = (d: any, i: number) => i.toString();

  renderCategoryItem = ({item: {title, icon}}: any) => {
    const {theme} = this.props.appTheme;
    // console.log('sss',theme)
    return (
      <View style={[styles.renderCategoryItemContainer]}>
        <Image
          source={icon}
          style={[styles.categoryIcon, {overlayColor: 'red'}]}
        />
        <Text style={[styles.categoryTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {title}
        </Text>
      </View>
    );
  };

  nearBySalons = () => {
    const {navigation} = this.props;
    return nearBySalonDummyData.map((d, i) => (
      <View style={styles.nearBySalonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('salonDetail')}>
          <NearbySalon transparent key={i.toString()} />
        </TouchableOpacity>
      </View>
    ));
  };

  featuredSalon = () => {
    const {navigation} = this.props;
    return featuredSalonData.map((d, i) => (
      <View style={styles.featuredContainer}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('salonDetail')}>
          <FeaturedComponent transparent key={i.toString()} />
        </TouchableOpacity>
      </View>
    ));
  };

  topSalon = () => {
    const {navigation} = this.props;
    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.topStlist, {width: '70%'}]}>
            Top Salons around you
          </Text>
          <View style={{width: '30%'}}>
            {/* <TouchableOpacity>
              <Text style={[styles.topStlist]}>view all</Text>
            </TouchableOpacity> */}
          </View>
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          keyExtractor={this.keyExtractor}
          renderItem={() => <TopSalon />}
          horizontal
          contentContainerStyle={styles.topStylistContainerStyle}
        />
      </View>
    );
  };

  renderFilterMenu = () => {
    const {activeInex, value} = this.state;
    const {theme} = this.props.appTheme;
    const titles = [
      'Sort By',
      'HAIR CARE',
      'BEAUTY SERVICES',
      'MAKE UP',
      'HAIR CUT',
      'PACKAGES',
      '',
    ];

    var radio_props = [
      {label: 'Popularity', value: 0},
      {label: 'Price High to High', value: 1},
      {label: 'Price Low to High', value: 2},
      {label: 'Ratings', value: 3},
      {label: 'Recommendation', value: 4},
    ];

    return (
      <View>
        <View style={styles.menuContainer}>
          <Text style={[{color: theme.PRIMARY_TEXT_COLOR}, styles.menuText]}>
            Sort and Filters
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.RBSheet.close();
            }}>
            <Icon name="close" size={28} color={theme.PRIMARY_TEXT_COLOR} />
          </TouchableOpacity>
        </View>
        <View style={styles.sortMainContainer}>
          <ScrollView
            style={[
              styles.scrollViewContainer,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            {titles.map((d, i) => (
              <TouchableOpacity
                onPress={() => {
                  this.setState({activeInex: i});
                }}>
                <View>
                  <Text
                    style={[
                      styles.titleOne,
                      {
                        color:
                          activeInex === i
                            ? theme.PRIMARY_TEXT_COLOR
                            : colors.grayBorder,
                      },
                    ]}>
                    {d}
                  </Text>
                  {activeInex === i && <View style={styles.activeStyle} />}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.filterOptionContainer}>
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => (
                <RadioButton key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.value === i}
                    onPress={(value) => {
                      this.setState({value});
                    }}
                    borderWidth={2}
                    buttonInnerColor={colors.darkOrange}
                    buttonOuterColor={colors.darkOrange}
                    buttonSize={20}
                    // buttonOuterSize={0}
                    // buttonStyle={{}}
                    buttonWrapStyle={styles.radioButtonWraper}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    onPress={(value: any) => {
                      this.setState({value: value});
                    }}
                    labelStyle={[
                      styles.radioButtonLable,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}
                    // labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
        </View>
        <View style={styles.filterMenuButtonContainer}>
          <TouchableOpacity
            style={[
              styles.clearButton,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}>
            <Text
              style={[
                styles.clearButtonText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              Clear All
            </Text>
          </TouchableOpacity>
          <CustomButton
            style={styles.customApplyButton}
            btnText={'Apply'}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  };

  changeFilter = (index: React.ReactText) => {
    if (index !== 0) {
      const {filterData} = this.state;
      const newData = [...filterData];
      newData[index].isSelected = !newData[index].isSelected;
      this.setState({filterData: newData});
    }
  };

  renderFiltertem = (filterData: {item?: any; index?: any}) => {
    const {title = '', icon = '', isSelected = ''} = filterData.item;
    const {index = ''} = filterData;
    const {theme} = this.props.appTheme;
    return (
      <View style={{flexDirection: 'row'}}>
        {/* {isSelected === true ? (
          <TouchableOpacity
            style={{marginVertical: scale(10)}}
            onPress={() => this.changeFilter(index)}>
            >
            <Icon name="close" size={28} color={theme.PRIMARY_TEXT_COLOR} />
          </TouchableOpacity>
        ) : (
          <View />
        )} */}
        <TouchableOpacity
          activeOpacity={1}
          style={{height: scale(50)}}
          onPress={() => this.changeFilter(index)}>
          <View
            style={[
              styles.filterBackground,
              {
                backgroundColor: isSelected
                  ? colors.darkOrange
                  : theme.PRIMARY_BACKGROUND_COLOR,
                borderWidth: isSelected ? 0 : 0.5,
              },
            ]}>
            {icon === 'filter' && (
              <Image
                source={images.equalizer}
                style={[
                  {tintColor: theme.PRIMARY_TEXT_COLOR, marginRight: scale(10)},
                ]}
              />
            )}
            <Text
              style={[
                styles.filterCountText,
                {color: isSelected ? colors.white : theme.PRIMARY_TEXT_COLOR},
              ]}>
              {title}
            </Text>
            {title === 'Filters' && (
              <View style={styles.filterIcon}>
                <Text
                  style={[
                    styles.filterCountText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {' '}
                  2{' '}
                </Text>
              </View>
            )}
            {isSelected === true && (
              // <View>
              <Icon
                name="close"
                size={20}
                color={colors.white}
                style={{marginLeft: scale(5)}}
              />
              // </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  refScroll = (event: Object) => {
    const {showFilter} = this.state;
    // console.log(event.nativeEvent.contentOffset.y);
    var currentOffset = event.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    // console.log(direction);
    if (direction === 'down') {
      this.setState({showFilter: true});
    } else {
      this.setState({showFilter: false});
    }
  };

  clearAllFilter = () => {
    const {filterData} = this.state;
    Object.keys(filterData).forEach((key) => {
      if (filterData[key].isSelected) {
        let filterDataNew = filterData;
        filterDataNew[key].isSelected = false;
        this.setState({filterData: filterDataNew});
      }
    });
  };

  stylesImage = (d) => {
    const {productImage} = d.item;
    return (
      <Image
        source={productImage}
        style={{
          width: scale(125),
          height: scale(125),
          // marginHorizontal: scale(5),
          marginRight: scale(16),
          borderRadius: scale(6),
        }}
      />
    );
  };

  renderHeaderItem = (data: Object) => {
    let index = data.index;
    const {appTheme = []} = this.props;
    let theme = appTheme.theme;
    if (index === 0) {
      return (
        <View style={styles.firstInfo}>
          <View style={styles.smallButton}>
            <Icon name={'shield'} size={16} />
            <Text style={[styles.safeText]}># Stay Safe</Text>
          </View>
          <Text style={styles.firstOfferTextTitle3}>
            Safety measures for your safety while visiting to Salon
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.firstComponent}>
          <View style={styles.flexRow}>
            <View>
              <Text
                style={[
                  styles.firstOfferTextTitle,
                  {color: colors.blackPrimary},
                ]}>
                Wear Masks
              </Text>
              <Text
                style={[
                  styles.firstOfferTextTitle2,
                  {color: colors.blackPrimary},
                ]}>
                Always wear mask when going outside in public
              </Text>
            </View>
            <Image source={images.mask} style={styles.offerCardTop2} />
          </View>
        </View>
      );
    }
  };

  renderCouponShield = (data) => {
    const {name = '', desc = '', know = '', color = '', image = ''} = data.item;
    const {appTheme = [], navigation} = this.props;
    let theme = appTheme.theme;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('bannerDetail')}
        style={[styles.couponShield, {backgroundColor: color}]}>
        <View style={styles.flexRow}>
          <View>
            <Text
              style={[
                styles.couponShieldTextTitle,
                // {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {name}
            </Text>
            <Text
              style={[
                styles.couponShieldTextTitle2,
                // {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {desc}
            </Text>
            <View style={styles.menuContainer}>
              <Text
                style={[
                  styles.couponShieldTextTitle3,
                  // {color: theme.PRIMARY_TEXT_COLOR},
                ]}>
                {know}
              </Text>
              <Icon
                name={'caret-right'}
                color={'#FFF'}
                size={16}
                style={styles.arrowRight}
              />
            </View>
          </View>
          <Image source={image} style={styles.couponShieldImage} />
        </View>
      </TouchableOpacity>
    );
  };

  changeSalon = (data: any, key: any) => {
    // console.log('gehgegeegegeegee==>', data, key);
    this.setState(
      {
        selectedSalon: data ? data : 'Style Salon',
      },
      () =>
        this.props.fetchSalonDetails(
          key === 2
            ? `776c23b5-054f-4adb-8301-152ce1e35b3a`
            : `839bec35-8989-459d-9733-b463c8cc4dba`,
        ),
    );
  };

  onButtonPress() {
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    });
  }

  renderStarPanel = (data) => {
    const {index = ''} = data;
    const {reviewSelected = ''} = this.state;
    const {appTheme} = this.props;
    const {theme} = appTheme;
    return (
      <View style={styles.flexBox}>
        <TouchableOpacity
          onPress={() => this.setState({reviewSelected: index + 1})}
          style={[
            styles.ratingBox,
            {
              borderWidth: reviewSelected === index + 1 ? 1 : 0,
              borderColor:
                reviewSelected === index + 1
                  ? colors.lightOrange
                  : colors.greyHomeBorder,
            },
          ]}>
          <Text style={styles.indexNumber}>{index + 1}</Text>
          <Image
            source={images.star}
            style={[
              styles.starLogo,
              {
                tintColor:
                  reviewSelected === index + 1
                    ? colors.lightOrange
                    : colors.blackPrimary,
              },
            ]}
          />
        </TouchableOpacity>
        {/* {reviewSelected !== 0 && index === 4 && (
          <Text
            style={[
              styles.rateName,
              {color: reviewSelected > 3 ? colors.green : colors.textRed},
            ]}>
            {reviewSelected > 3 ? `Excellent` : `Poor`}
          </Text>
        )} */}
      </View>
    );
  };

  renderAmbienceButton = (data) => {
    const {salonDetail = [], appTheme, user = []} = this.props;
    // console.log('user', user);
    const {theme} = appTheme;
    return (
      <View style={styles.ambienceButton}>
        <Text style={[styles.ambienceText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          Ambience
        </Text>
      </View>
    );
  };

  renderReviewPanel = () => {
    // screenHeight
    const {salonDetail = [], appTheme, user = []} = this.props;
    // console.log('user', user);
    const {theme} = appTheme;
    const {selectedSalon = ''} = this.state;
    let userName = user && user.detail && user.detail.name_first;

    let basic =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.basic;
    // console.log('screenHeight', screenHeight);

    let salon_name = basic && basic.name;
    let salon_logo = basic && basic.logo;
    let salon_location =
      basic &&
      basic.location &&
      basic.location.micro_market &&
      basic.location.micro_market.name;
    return (
      <View
        style={[
          styles.reviewPanelContain,
          {
            marginVertical: scale(
              // Platform.OS === 'ios' ? (screenHeight < 800 ? 25 : 5) : 12,
              Platform.OS === 'ios' ? 2 : 12,
            ),
          },
        ]}>
        <View style={styles.flexRow4}>
          <FastImage
            style={styles.styleImageView}
            source={{
              uri: salon_logo,
              // headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
            }}
            // resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.marginLeft}>
            <Text
              style={[
                styles.salonNameReview,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {salon_name}
            </Text>
            <Text style={styles.salonLocationReview}>{salon_location}</Text>
          </View>
        </View>
        <Text style={[styles.rateText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          Rate your experience
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={(index) => this.renderStarPanel(index)}
          keyExtractor={this.keyExtractor}
          data={[1, 2, 3, 4, 5]}
          contentContainerStyle={[
            styles.headerContentContainerStyle,
            {marginLeft: scale(0)},
          ]}
        />
        <Text
          style={[
            styles.rateText,
            {color: theme.PRIMARY_TEXT_COLOR, marginTop: scale(32)},
          ]}>
          What didn’t you like?
        </Text>
        <Text style={styles.subHeading}>
          search tag or select tags from below
        </Text>
        <View style={styles.bottomLine} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          renderItem={(index) => this.renderAmbienceButton(index)}
          // numRows={2}
          keyExtractor={this.keyExtractor}
          data={[1, 2, 3, 4, 5, 1, 2, 3]}
          numColumns={8 / 2}
          contentContainerStyle={[
            styles.headerContentContainerStyle,
            {marginLeft: scale(0)},
          ]}
        />

        <Text
          style={[
            styles.rateText,
            {color: theme.PRIMARY_TEXT_COLOR, marginTop: scale(24)},
          ]}>
          Is there anything you liked?
        </Text>
        <Text style={styles.subHeading}>
          search tag or select tags from below
        </Text>
        <View style={styles.bottomLine} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          renderItem={(index) => this.renderAmbienceButton(index)}
          // numRows={2}
          keyExtractor={this.keyExtractor}
          data={[1, 2, 3, 4, 5, 1, 2, 3]}
          numColumns={8 / 2}
          contentContainerStyle={[
            styles.headerContentContainerStyle,
            {marginLeft: scale(0)},
          ]}
        />

        <Text
          style={[
            styles.rateText,
            {color: theme.PRIMARY_TEXT_COLOR, marginTop: scale(24)},
          ]}>
          Tell us more
        </Text>
        <Text style={styles.subHeading}>
          search tag or select tags from below
        </Text>
        <View style={styles.bottomLine} />
        <CustomButton
          style={[styles.customSubmitButton]}
          btnText={'Submit'}
          onPress={() => {}}
        />
      </View>
    );
  };

  render() {
    const {salonDetail = [], appTheme, user = []} = this.props;
    // console.log('user', user);
    const {selectedSalon = ''} = this.state;
    let userName = user && user.detail && user.detail.name_first;

    let basic =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.basic;
    // console.log('salonDetail', JSON.stringify(basic));

    let salon_name = basic && basic.name;
    let salon_logo = basic && basic.logo;
    let salon_location =
      basic &&
      basic.location &&
      basic.location.micro_market &&
      basic.location.micro_market.name;

    let salon_rating = basic && basic.rating_avg;
    let personnels =
      salonDetail &&
      salonDetail.salonDetail &&
      salonDetail.salonDetail.personnels;

    let salon_Uuid =
      salonDetail && salonDetail.salonDetail && salonDetail.salonDetail.uuid;

    const {theme} = appTheme;
    const {filterData, showFilter} = this.state;
    let isFilterEmpty = false;
    Object.keys(filterData).forEach((key) => {
      if (filterData[key].isSelected === true) {
        isFilterEmpty = true;
      }
    });
    StatusBar.setBarStyle(
      theme.type === 'darkTheme' ? 'light-content' : 'dark-content',
      true,
    );
    if (this.state.loading) {
      return <Loader />;
    }
    return (
      <View style={[{backgroundColor: theme.PRIMARY_BACKGROUND_COLOR}]}>
        <Animated.View>
          <StatusBar
            translucent
            backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
          />
          <RNPickerSelect
            onValueChange={(data, key) => this.changeSalon(data, key)}
            // value={this.state.selectedSalon}
            // initialIndex={1}
            items={[
              {label: 'Style Salon', value: 'Style Salon'},
              {label: 'Amaaya Spa & salon', value: 'Amaaya Spa & salon'},
            ]}>
            <HomeScreenHeader name={salon_name} />
          </RNPickerSelect>

          {/* {showFilter && (
            <View
              style={{
                flexDirection: 'row',
              }}>
              {isFilterEmpty && (
                <TouchableOpacity
                  style={{
                    marginVertical: scale(20),
                    marginLeft: scale(5),
                  }}
                  onPress={() => {
                    this.clearAllFilter();
                  }}>
                  <Icon
                    name="close"
                    size={20}
                    color={theme.PRIMARY_TEXT_COLOR}
                    style={{marginLeft: scale(5)}}
                  />
                </TouchableOpacity>
              )}
              <Animated.FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                renderItem={this.renderFiltertem}
                keyExtractor={this.keyExtractor}
                data={filterData}
                contentContainerStyle={[styles.filterContentContainerStyle]}
              />
            </View>
          )} */}

          <Animated.ScrollView
            // showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            onScrollEndDrag={this.refScroll}
            style={[{backgroundColor: theme.HOME_BACKGROUND_COLOR}]}>
            {/* Salon Name */}
            <View style={{marginTop: scale(18)}}>
              {/* <View>
                <TouchableOpacity onPress={this.onButtonPress}>
                  <Text>Check for updates</Text>
                </TouchableOpacity>
              </View> */}
              <Text
                style={[
                  styles.welcomeText,
                  {
                    width: '70%',
                    marginBottom: scale(0),
                  },
                ]}>
                WELCOME TO
                {/* {`Screen Height :` + screenHeight} */}
              </Text>
              <Text
                style={[
                  styles.salonNameText,
                  {
                    color: theme.PRIMARY_TEXT_COLOR,
                    // width: '80%',
                    marginTop: scale(10),
                  },
                ]}>
                {salon_name}
              </Text>
            </View>
            {/* <Text>{salon_rating}</Text> */}
            <View style={styles.flexR}>
              <View
                style={[
                  styles.flexDirection,
                  {
                    // marginTop: scale(5),
                    paddingVertical: scale(8),
                    // marginLeft: scale(5),
                  },
                ]}>
                <TouchableOpacity
                  onPress={() => this.setState({reviewPanel: true})}
                  style={[
                    styles.ratingContainer,
                    {
                      backgroundColor:
                        salon_rating < 3 ? colors.textRed : colors.teal,
                    },
                  ]}>
                  <Image
                    style={styles.ratingIcon}
                    source={images.favorite_icon}
                  />
                  <Text style={[styles.ratingTitle]}>
                    {salon_rating && salon_rating}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.shieldScoreText}>
                Sample App Shield Score
              </Text>
            </View>

            {/* Salon Name End*/}

            <View
              style={[
                styles.horizontalLine,
                {
                  borderColor:
                    theme.type === 'darkTheme'
                      ? colors.stylistName
                      : colors.greyHomeBorder,
                },
              ]}
            />
            <Text style={styles.slotText}>
              next safe slot available @ 12:30 pm
            </Text>

            {/* Copuon Shield */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={(index) => this.renderHeaderItem(index)}
              keyExtractor={this.keyExtractor}
              data={[1, 2, 3, 4]}
              contentContainerStyle={[
                styles.headerContentContainerStyle,
                {marginTop: scale(0)},
              ]}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={this.keyExtractor}
              data={[
                {
                  name: 'Safe time slots',
                  desc: 'Choose time slots when it’s safest to visit the salon',
                  know: 'Know more',
                  color: '#EB4654',
                  image: images.seat,
                },
              ]}
              renderItem={(data) => this.renderCouponShield(data)}
              // contentContainerStyle={styles.headerContentContainerStyle}
            />

            {/* Coupon SHield end */}

            {/* Category Component */}

            <View style={{marginTop: scale(30)}}>
              <Text
                style={[
                  styles.topStlist,
                  {
                    color: theme.PRIMARY_TEXT_COLOR,
                    width: '70%',
                    marginTop: scale(10),
                  },
                ]}>
                Quick Book
              </Text>
              <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(categoriesData) => (
                  <ListCategory data={categoriesData} />
                )}
                keyExtractor={this.keyExtractor}
                data={categoriesData}
              />
            </View>
            {/* Category Component End*/}

            {/* ListWalletHistory */}

            <View style={[styles.nearBySalons]}>
              <Text
                style={[
                  styles.topStlist,
                  {color: theme.PRIMARY_TEXT_COLOR, width: '70%'},
                ]}>
                {/* {`${userName}'s Wallet`} */}
                {`${userName ? userName + `'s` : ' '} Wallet`}
              </Text>
              {/* <TouchableOpacity
                onPress={() => {
                  // this.RBSheet.open();
                }}>
                <Text style={styles.viewAll}>View details</Text>
              </TouchableOpacity> */}
            </View>

            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              renderItem={(walletData) => (
                <ListWalletHistory data={walletData} />
              )}
              keyExtractor={this.keyExtractor}
              data={walletData}
            />

            {/* ListWalletHistory End */}

            {/* BookAgain  */}
            <View style={[styles.nearBySalons]}>
              <Text
                style={[
                  styles.topStlist,
                  {color: theme.PRIMARY_TEXT_COLOR, width: '70%'},
                ]}>
                Book Again
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // this.RBSheet.open();
                }}>
                <Text style={styles.viewAll}>View history</Text>
              </TouchableOpacity>
            </View>
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              renderItem={(bookingHistory) => (
                <BookAgain data={bookingHistory} />
              )}
              keyExtractor={this.keyExtractor}
              data={bookingHistory}
              horizontal
              style={styles.leftMargin}
            />
            {/* BookAgain End */}

            {/* Offer For You */}
            {/* <Text style={[styles.topStlist, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Special deal for you
            </Text>
            <View style={{marginTop: scale(10), flexDirection: 'row'}}>
              <View style={{width: '40%'}}>
                <Image
                  source={images.productcard2}
                  style={{
                    height: scale(175),
                    width: scale(155),
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={[
                  styles.offerForYouContainer,
                  {
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                  },
                ]}>
                <View style={styles.secondaryComponent}>
                  <Text style={styles.exclusiveText}>Exclusive for you</Text>
                  <Text
                    style={[
                      styles.spendText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Spend {'\u20B9'}3000 &
                  </Text>
                  <Text
                    style={[
                      styles.voucherText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    get a Kerastase voucher
                  </Text>
                  <Text
                    style={[
                      styles.worthText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    free worth {'\u20B9'}599
                  </Text>
                </View>
              </View>
            </View> */}
            {/* Offer For You End */}

            {/* Suggested services */}
            <Text style={[styles.topStlist, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Suggested services for you
            </Text>
            <Animated.FlatList
              showsHorizontalScrollIndicator={false}
              data={suggestedService}
              renderItem={(data) => {
                const {index = ''} = data;
                let checkSize = suggestedService.length - 1;
                let lastData = checkSize === index ? false : true;
                return <SuggestServices lastData={lastData} data={data} />;
              }}
              keyExtractor={this.keyExtractor}
            />
            {/* Suggested services End*/}

            {/* Top Stylist  */}
            <Text
              style={[
                styles.topStlist,
                {color: theme.PRIMARY_TEXT_COLOR, marginBottom: scale(5)},
              ]}>
              Top Stylist
            </Text>
            <Animated.FlatList
              data={personnels}
              keyExtractor={this.keyExtractor}
              renderItem={(personnels: Object) => (
                <TopStylist data={personnels} salon_Uuid={salon_Uuid} />
              )}
              horizontal
              contentContainerStyle={styles.topStylistContainerStyle}
            />
            {/* Top Stylist End */}

            {/* Styles for you */}
            <View
              style={{
                marginHorizontal: scale(20),
                marginTop: scale(20),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                borderTopLeftRadius: scale(6),
                borderTopRightRadius: scale(6),
                // height: '52%',
                // elevation: 1,
              }}>
              <Text
                style={[
                  styles.topStlist,
                  {
                    marginLeft: scale(0),
                    color: theme.PRIMARY_TEXT_COLOR,
                    marginBottom: scale(10),
                    marginTop: scale(1),
                  },
                ]}>
                Measures taken by us
              </Text>
            </View>
            <View
              style={{
                // marginHorizontal: scale(20),
                // marginTop: scale(30),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                paddingVertical: scale(16),
                borderBottomLeftRadius: scale(6),
                borderBottomRightRadius: scale(6),
                borderRadius: scale(4),
                paddingLeft: scale(5),
              }}>
              <Animated.FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={(gallery) => this.stylesImage(gallery)}
                keyExtractor={this.keyExtractor}
                data={gallery}
              />
            </View>
            {/* Styles for you End */}

            <View style={styles.lastComponent}>
              <View style={styles.footerComponent}>
                {/* <Text style={[styles.liveText, {}]}>
                  LIVE{'\n'}WITH{'\n'}STYLE
                </Text> */}
                <View
                  style={{
                    alignSelf: 'flex-end',
                    marginLeft: scale(16),
                  }}>
                  <MadeByStyle />
                  {/* <Image
                    source={require('../../assets/svg/live.svg')}
                    style={styles.dryerStyle}
                  /> */}
                </View>
              </View>
              {/* <View>
                <Text style={styles.madeByText}>
                  MADE BY STYLE ENTHUSIASTS{'\n'}Sample App HQ, GURGAON
                </Text>
              </View> */}
            </View>
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={scale(600)}
              duration={250}
              customStyles={{
                container: {
                  // justifyContent: "center"
                  paddingTop: scale(35),
                  paddingHorizontal: scale(30),
                  borderTopLeftRadius: scale(30),
                  borderTopRightRadius: scale(30),
                  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                },
              }}>
              {this.renderFilterMenu()}
            </RBSheet>
          </Animated.ScrollView>
        </Animated.View>
        <SwipeablePanel
          // noBackgroundOpacity={true}
          fullWidth={true}
          closeOnTouchOutside={true}
          barStyle={{
            width: scale(134),
            backgroundColor: theme.PRIMARY_TEXT_COLOR,
          }}
          style={{
            borderTopLeftRadius: scale(32),
            borderTopRightRadius: scale(32),
            // backgroundColor: 'red',
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
          }}
          // showCloseButton={true}
          onClose={() => this.setState({reviewPanel: false, reviewSelected: 0})}
          // onPressCloseButton={() => this.setState({reviewPanel: false})}
          isActive={this.state.reviewPanel}>
          {this.renderReviewPanel()}
        </SwipeablePanel>
      </View>
    );
  }
}

const mapStateToProps = ({
  user = [],
  isLoadingData = false,
  appTheme = '',
  algoliaDetail = [],
  salonDetail = [],
}) => ({
  user,
  algoliaDetail,
  isLoadingData,
  appTheme,
  salonDetail,
});

// homeScreen = codePush(codePushOptions)(homeScreen);

export default connect(mapStateToProps, {
  fetchAlgoliaConfig,
  fetchSalonDetails,
  getAllOrder,
  getAllDealList,
  getDealTag,
  getFavouriteDeal,
  getAllOrderHistory,
  // verifyOtp,
  // logOut,
})(homeScreen);
