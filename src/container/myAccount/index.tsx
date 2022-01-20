import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import OneSignal from 'react-native-onesignal';

import Icon from 'react-native-vector-icons/FontAwesome';
import Animated, {Value} from 'react-native-reanimated';
import RBSheet from 'react-native-raw-bottom-sheet';
// import SplashScreen from 'react-native-splash-screen';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import CustomButton from '../../components/Button';
import {scale} from '../../utils/scale';
import VisitComponent from '../../components/Visit';
import styles from './style';
import {colors, fonts, SCREENWIDTH} from '../../constants/styles';
import {connect} from 'react-redux';
import {switchTheme} from '../../store/switchTheme/actions';
import {userSignOut, editUser} from '../../store/user/actions';
import {getAllOrder, getOrderByNextLink} from '../../store/orderList/actions';

import {Switch} from 'react-native-switch';
import {ScrollView} from 'react-native-gesture-handler';
import images from '../../assets/images';

// import {navigate} from '../../navigation/rootNavigation';

interface IProps {
  navigation: any;
  data: any;
  appTheme: any;
  switchTheme: Function;
  userSignOut: Function;
  editUser: Function;
  user: IuserDetailProp;
  getAllOrder: Function;
  getOrderByNextLink: Function;
}

interface IuserDetailProp {
  detail: IuserDetail;
}
interface IuserDetail {
  name_first?: string;
  name_last?: string;
  mobile: number;
  email?: string;
}
interface IState {
  checkData: Boolean;
  index: Number;
  setIndex: Number;
  routes: Object;
  topIconArray: Array<Object>;
  detail: IuserDetail;
  upcomingAppointMentData: Object;
  pastAppointMentData: Object;
  upcomingAppointMentLink: String;
  pastAppointMentLink: String;
  pastAppointMentLinkLatest: String;
  upcomingAppointMentLinkLatest: String;
}

const optionMenu = [
  {
    name: 'Order History',
    logo: images.receipt,
    // onPress: `this.userLogOut()`,
  },
  {
    name: 'Transactions',
    logo: images.creditCard,
  },
  {
    name: 'Offers',
    logo: images.discount,
  },
  {
    name: 'Help',
    logo: images.lifeSaver,
  },
  {
    name: 'Logout',
    logo: images.exit,
    onPress: 'this.userLogOut()',
  },
];

class myAccount extends React.Component<IProps, IState> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      upcomingAppointMentLinkLatest: '',
      pastAppointMentLinkLatest: '',
      upcomingAppointMentLink: '',
      pastAppointMentLink: '',
      upcomingAppointMentData: [],
      pastAppointMentData: [],
      detail: this.props.user.detail,
      checkData: false,
      index: 0,
      setIndex: 0,
      routes: [
        // {key: 'PASTVISITS', title: 'PAST VISITS'},
        {key: 'UPCOMINGVISITS', title: 'UPCOMING VISITS'},
        {key: 'PASTVISITS', title: 'PAST VISITS'},
      ],
      topIconArray: [
        {
          title: 'Favorites',
          image: require('../../assets/profile/favorites.png'),
        },
        {title: 'Reviews', image: require('../../assets/profile/reviews.png')},
        {
          title: 'My orders',
          image: require('../../assets/profile/myOrder.png'),
        },
      ],
    };
  }

  componentDidMount() {
    const {user = '', getAllOrder, orderList = []} = this.props;
    const {detail = ''} = user;
    const {uuid = ''} = detail;

    const {pastOrders = [], upcomingOrders = []} = orderList;
    const {value = [], next_link = ''} = pastOrders;
    let checkEmptyPastOrder = value && value.length;
    let checkEmptyUpcomingOrder =
      upcomingOrders && upcomingOrders.value && upcomingOrders.value.length;

    let upcomingOrdersValue = upcomingOrders && upcomingOrders.value;
    let upcomingLink = upcomingOrders && upcomingOrders.next_link;

    let finalCheck =
      checkEmptyPastOrder + checkEmptyUpcomingOrder !== 0 ? false : true;
    this.setState({
      checkData: finalCheck,
      upcomingAppointMentData: upcomingOrdersValue,
      pastAppointMentData: value,
      upcomingAppointMentLink: upcomingLink,
      upcomingAppointMentLinkLatest: upcomingLink,
      pastAppointMentLink: next_link,
      pastAppointMentLinkLatest: next_link,
    });
  }

  componentWillUnmount() {
    // console.log('unmount');
    const {getOrderByNextLink} = this.props;
    const {
      pastAppointMentLinkLatest,
      upcomingAppointMentLinkLatest,
    } = this.state;
    this.setState({
      pastAppointMentLink: '',
      upcomingAppointMentLink: '',
    });
    getOrderByNextLink(pastAppointMentLinkLatest, 'PAST');
    getOrderByNextLink(upcomingAppointMentLinkLatest, 'UPCOMIMG');
  }

  renderNoBooking = () => {
    const {checkData} = this.state;
    const {navigation} = this.props;
    const {theme} = this.props.appTheme;
    return (
      <View>
        <Image
          source={require('../../assets/onBoarding/onBoading.png')}
          style={styles.mainImage}
        />
        <Text style={[styles.mainText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          It’s time to get a neat look.{'\n'}
          Let’s book your first service
        </Text>
        <CustomButton
          style={styles.customButton}
          btnText={'Book Now'}
          onPress={() => {
            navigation.navigate('salonDetail');
          }}
        />
      </View>
    );
  };

  renderMoreOrderData = (whichData: String) => {
    // console.log('renderMoreOrderData');
    const {orderList = [], getOrderByNextLink} = this.props;
    const {upcomingAppointMentLink = '', pastAppointMentLink = ''} = this.state;
    const {
      pastOrders = [],
      upcomingOrders = [],
      pastOrdersNext = [],
      upcomingOrdersNext = [],
      isLoadingData = '',
    } = orderList;
    let pastOrdersNextLink = pastOrders && pastOrders.next_link;
    let upComingOrdersNextLink = upcomingOrders && upcomingOrders.next_link;
    const {value = [], next_link = ''} = pastOrdersNext;
    let upcomingOrdersNextValue =
      upcomingOrdersNext && upcomingOrdersNext.value;

    // console.log('isLoading PROPS', pastOrdersNextLink);
    // console.log('pastAppointMentLink STATE', pastAppointMentLink);

    if (whichData === 'upcomingOrders') {
      if (upcomingAppointMentLink !== upComingOrdersNextLink) {
        getOrderByNextLink(
          upComingOrdersNextLink
            ? upComingOrdersNextLink
            : upcomingAppointMentLink,
          'UPCOMING',
        );
        if (upcomingAppointMentLink !== upComingOrdersNextLink) {
          this.setState({
            upcomingAppointMentLink: upComingOrdersNextLink,
            upcomingAppointMentData: [
              ...this.state.upcomingAppointMentData,
              ...upcomingOrdersNextValue,
            ],
          });
        }
      }
    } else {
      if (pastAppointMentLink !== next_link) {
        getOrderByNextLink(next_link ? next_link : pastAppointMentLink, 'PAST');
        if (pastAppointMentLink !== next_link) {
          this.setState({
            pastAppointMentLink: next_link,
            pastAppointMentData: [...this.state.pastAppointMentData, ...value],
          });
        }
      }
    }
  };

  FirstRoute = () => {
    const {orderList = [], appTheme, user = []} = this.props;
    // console.log('FIRST dataLoad');
    const {pastOrders = []} = orderList;
    const {pastAppointMentData = []} = this.state;
    const {value = [], next_link = ''} = pastOrders;
    let checkEmpty = value && value.length ? 1 : 0;
    // let checkEmpty =1
    // console.log('PAST ROUTE', stateData);
    // console.log('ROUTE', value);
    if (checkEmpty === 0) {
      return this.renderNoBooking();
    } else {
      return (
        <View
          style={[
            styles.container2,
            {
              backgroundColor: 'transparent',
            },
          ]}>
          <FlatList
            data={pastAppointMentData}
            extraData={this.state}
            renderItem={({item}) => {
              return <VisitComponent data={item} />;
            }}
            initialNumToRender={10}
            onEndReached={() => {
              this.renderMoreOrderData('pastOrders');
            }}
            // extraData={[this.props, this.state]}
            onEndReachedThreshold={0.2}
            style={styles.flatListStyle}
            contentInset={{bottom: scale(150)}}
            ListFooterComponent={this.renderFooterPast()}

            // removeClippedSubviews={true}
            // extraData={this.state}
            // refreshing={true}
            // contentContainerStyle={{flex: 1}} // important!
          />
        </View>
      );
    }
  };

  SecondRoute = () => {
    // console.log('SecondRoute ROUTE');
    const {orderList = [], appTheme, user = []} = this.props;
    const {upcomingOrders = []} = orderList;
    const {value = [], next_link = ''} = upcomingOrders;
    let checkEmpty = value && value.length;
    // console.log('checkEmpty', value);
    if (checkEmpty === 0) {
      return this.renderNoBooking();
    } else {
      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'transparent',
            },
          ]}>
          <FlatList
            data={value}
            extraData={[this.props, this.state]}
            onEndReached={() => {
              this.renderMoreOrderData('upcomingOrders');
            }}
            // onEndReachedThreshold={0.5}
            renderItem={({item}) => {
              return (
                <VisitComponent
                  onPress={() =>
                    this.props.navigation.navigate('bookingDetails')
                  }
                  data={item}
                />
              );
            }}
            ListFooterComponent={this.renderFooterUpcoming()}
            style={styles.flatListStyle}
            // contentInset={{bottom: scale(150)}}
          />
        </View>
      );
    }
  };

  renderFooterUpcoming = () => {
    const {orderList = []} = this.props;
    const {isLoadingData = ''} = orderList;
    // console.log('orderListorderList', isLoadingData);
    return (
      <View style={{padding: 10}}>
        {isLoadingData && (
          <ActivityIndicator
            color={colors.orangeBorder}
            size={'large'}
            // hidesWhenStopped={isLoadingData}
          />
        )}
      </View>
    );
  };

  renderFooterPast = () => {
    const {orderList = []} = this.props;
    const {isLoadingData = '', pastOrdersNext = []} = orderList;
    const {next_link = ''} = pastOrdersNext;
    // console.log('next_link', next_link);
    let checkLoading = isLoadingData && next_link !== 'null' ? true : false;
    // console.log('checkLoading', checkLoading);
    return (
      <View style={{padding: 10}}>
        {isLoadingData && (
          <ActivityIndicator
            color={colors.orangeBorder}
            size={'large'}
            // hidesWhenStopped={isLoadingData}
          />
        )}
      </View>
    );
  };

  _handleIndexChange = (index: any) => this.setState({index});

  _renderTabBar = (props: {
    navigationState: {routes: any[]};
    position: Animated.Adaptable<number>;
  }) => {
    // const inputRange = props.navigationState.routes.map((x, i) => i);
    const {theme} = this.props.appTheme;
    return (
      <View style={{opacity: 10}}>
        <TabBar
          {...props}
          navigationsState={this.state}
          indicatorStyle={{backgroundColor: colors.lightOrange}}
          // onIndexChange={setIndex}
          style={{
            height: 40,
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
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
        <View
          style={{backgroundColor: '#979797', height: StyleSheet.hairlineWidth}}
        />
      </View>
    );
  };

  // _renderScene = SceneMap({
  //   PASTVISITS: this.FirstRoute,
  //   UPCOMINGVISITS: this.SecondRoute,
  // });

  renderTabView = () => {
    return (
      <TabView
        navigationState={this.state}
        // renderScene={this._renderScene}
        renderScene={({route}) => {
          switch (route.key) {
            case 'UPCOMINGVISITS':
              return this.SecondRoute();
            case 'PASTVISITS':
              return this.FirstRoute();
          }
        }}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        // extraData={[this.props, this.state]}
        // renderPager={props => <ScrollPager {...props} />}
        // initialLayout={{width: Dimensions.get('window').width}}
      />
    );
  };

  renderEditMenu = () => {
    const {checkData, detail} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {theme} = this.props.appTheme;
    return (
      <View>
        <Text
          style={[
            styles.editTextBottomSheet,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>
          EDIT ACCOUNT
        </Text>

        <Text
          style={[
            styles.inputLabelBottomSheet,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>
          First Name
        </Text>
        <TextInput
          style={[styles.customInput, {color: theme.PRIMARY_TEXT_COLOR}]}
          value={detail.name_first}
          onChangeText={(val) => {
            this.setState({
              detail: {
                ...detail,
                name_first: val,
              },
            });
          }}
        />
        <View style={styles.inputDivider} />

        <Text
          style={[
            styles.inputLabelBottomSheet,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>
          Last Name
        </Text>
        <TextInput
          style={[styles.customInput, {color: theme.PRIMARY_TEXT_COLOR}]}
          value={detail.name_last}
          onChangeText={(val) => {
            this.setState({
              detail: {
                ...detail,
                name_last: val,
              },
            });
          }}
        />
        <View style={styles.inputDivider} />

        <Text
          style={[
            styles.inputLabelBottomSheet,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>
          Phone
        </Text>
        <View style={styles.textInputView}>
          <TextInput
            style={[
              styles.customInput,
              {width: SCREENWIDTH - 90, color: theme.PRIMARY_TEXT_COLOR},
            ]}
            // `+91-` +
            value={`+91-` + detail.mobile}
            keyboardType={'numeric'}
            // onChangeText={val => {
            //   this.setState({
            //     detail: {
            //       ...detail,
            //       mobile: val,
            //     },
            //   });
            // }}
          />
          {/* <MIcon name={'check'} size={22} color={colors.lightOrange} style={{}} /> */}
          {/* reg */}
          <Image
            source={require('../../assets/profile/check.png')}
            style={styles.checkImage}
          />
        </View>
        <View
          style={[styles.inputDivider, {backgroundColor: colors.lightOrange}]}
        />

        <Text
          style={[
            styles.inputLabelBottomSheet,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>
          Email
        </Text>
        <View style={styles.textInputView}>
          <TextInput
            style={[
              styles.customInput,
              {width: SCREENWIDTH - 90, color: theme.PRIMARY_TEXT_COLOR},
            ]}
            value={detail.email}
            onChangeText={(val) => {
              this.setState({
                detail: {
                  ...detail,
                  email: val,
                },
              });
            }}
          />
          {reg.test(detail.email) === false ? (
            console.log('false')
          ) : (
            <Image
              source={require('../../assets/profile/check.png')}
              style={styles.checkImage}
            />
          )}
        </View>
        <View style={styles.inputDivider} />

        <CustomButton
          style={{marginTop: scale(40), marginHorizontal: 0}}
          btnText={'Save'}
          onPress={() => {
            this.props.editUser(detail);
            this.RBSheet.close();
          }}
        />
      </View>
    );
  };

  customThemeIcon = () => {
    const {checkData} = this.state;
    const {theme} = this.props.appTheme;
    const active = require('../../assets/myAccount/moon.png');
    const inActive = require('../../assets/myAccount/sun.png');
    const img = theme.type === 'lightTheme' ? inActive : active;
    // checkData ? this.renderNoBooking() : this.renderTabView();
    return <Image style={styles.innerComponent} source={img} />;
  };

  userLogOut = () => {
    const {user = []} = this.props;
    const {detail = []} = user;
    const {uuid = ''} = detail;
    OneSignal.removeExternalUserId((results) => {
      // The results will contain push and email success statuses
      // console.log('Results of removing external user id');
      // console.log(results);
    });
    this.props.userSignOut();
  };

  renderOptions = (data: any) => {
    const {name = '', logo = ''} = data.item;
    const {appTheme, navigation} = this.props;
    let theme = appTheme.theme;

    // console.log('onPress', name);
    return (
      <TouchableOpacity
        onPress={() =>
          (name === 'Order History' && navigation.navigate('OrderHistory')) ||
          (name === 'Transactions' && {}) ||
          (name === 'Offers' && {}) ||
          (name === 'Help' && {}) ||
          (name === 'Logout' && this.userLogOut())
        }
        style={styles.paddVertical}>
        <View style={styles.renderOptions}>
          <View style={styles.logoHolder}>
            <Image source={logo} style={styles.settingAndGiftIconSize2} />
          </View>
          {/* <View style={styles.logoHolder}>
            <Icon
              name={logo ? logo : 'credit-card'}
              size={scale(20)} 
            />
          </View> */}
          <View style={styles.optionNameContain}>
            <Text style={styles.optionName}>{name}</Text>
          </View>
        </View>
        <View style={styles.bottomLine} />
      </TouchableOpacity>
    );
  };

  render() {
    const {checkData, pastAppointMentData = []} = this.state;
    const {orderList = [], appTheme, user = [], navigation} = this.props;
    const {detail = []} = user;
    let theme = appTheme.theme;
    let fullName = detail.name_first + ' ' + detail.name_last;

    // console.log('checkData', checkData);

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View
          style={[
            styles.detailComponent,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <View style={styles.userDetail}>
            <View style={styles.flexComponent}>
              <Text
                style={[styles.userName, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {fullName !== 'null null' ? fullName : 'Edit Profile'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.RBSheet.open();
                }}
                style={styles.editOption}>
                <Text style={styles.editText}>EDIT</Text>
              </TouchableOpacity>
            </View>
            <Text
              style={[styles.userNumber, {color: theme.PRIMARY_TEXT_COLOR}]}>
              +91-{detail.mobile}
            </Text>
            <Text style={[styles.userEmail, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {detail.email ? detail.email : 'Add Email'}
            </Text>
            {/* <View style={[styles.flexComponent, {marginTop: scale(5)}]}>
              <Icon
                name={'location-pin'}
                size={scale(12)}
                color={theme.PRIMARY_TEXT_COLOR}
              />
              <Text
                style={[
                  styles.userLocation,
                  {color: theme.PRIMARY_TEXT_COLOR},
                ]}>
                New Delhi, NCR
              </Text>
            </View> */}
          </View>

          <View style={styles.settingAndGiftIconPlacement}>
            <View style={styles.customSwitch}>
              <Switch
                value={theme.type === 'lightTheme' ? true : false}
                onValueChange={(value) => this.props.switchTheme(value)}
                disabled={false}
                circleSize={25}
                barHeight={30}
                circleBorderWidth={0}
                backgroundActive="#D7DDE1"
                backgroundInactive="#D7DDE1"
                circleActiveColor="transparent"
                circleInActiveColor="transparent"
                changeValueImmediately={true}
                renderInsideCircle={() => this.customThemeIcon()}
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  width: 30,
                }}
                outerCircleStyle={{}} // style for outer animated circle
              />
            </View>

            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ShareReferral')}>
              <Image
                source={require('../../assets/profile/gift.png')}
                style={styles.settingAndGiftIconSize}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.userLogOut()}>
              <Icon
                name={'logout'}
                size={scale(22)}
                color={colors.orangeText}
                style={[styles.settingAndGiftIconSize]}
              />
            </TouchableOpacity> */}
          </View>
        </View>
        {/* <View style={styles.topIconView}>
          {!checkData &&
            this.state.topIconArray.map((d: any, i: number) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('dealScreen')}>
                  <View key={i.toString()} style={styles.iconView}>
                    <Image source={d.image} />
                    <Text
                      style={[
                        styles.topViewText,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      {d.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View> */}
        {/* <View
          style={[
            styles.subContainer,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
          ]}>
          {checkData ? this.renderNoBooking() : this.renderTabView()}
        </View> */}

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={scale(400)}
          duration={250}
          customStyles={{
            container: {
              // justifyContent: "center",
              paddingTop: scale(35),
              paddingHorizontal: scale(30),
              borderTopLeftRadius: scale(30),
              borderTopRightRadius: scale(30),
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            },
          }}>
          {this.renderEditMenu()}
        </RBSheet>
        <ScrollView contentContainerStyle={styles.secondView}>
          <FlatList
            data={optionMenu}
            contentContainerStyle={{marginLeft: scale(17)}}
            renderItem={(i) => this.renderOptions(i)}
          />
          <View style={styles.recentContain}>
            <Text
              style={[styles.recentText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              Recent orders
            </Text>
            <View style={styles.bottomLine2} />
          </View>
          {this.SecondRoute()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({
  user = [],
  isLoadingData = false,
  appTheme = '',
  orderList = [],
}) => ({
  user,
  appTheme,
  isLoadingData,
  orderList,
});

export default connect(mapStateToProps, {
  switchTheme,
  userSignOut,
  editUser,
  getAllOrder,
  getOrderByNextLink,
})(myAccount);
