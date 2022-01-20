import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FastImage from 'react-native-fast-image';

// import Mixpanel from 'react-native-mixpanel';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Swiper from 'react-native-swiper';
import * as Sentry from '@sentry/react-native';
// import SplashScreen from 'react-native-splash-screen';
import styles from './style';
import {colors, SCREENHEIGHT} from '../../constants/styles';
import {scale} from '../../utils/scale';
import CustomButton from '../../components/Button';
import {connect} from 'react-redux';
import {navigate} from '../../navigation/rootNavigation';
import SplashScreen from '../../components/SplashScreen';
// import SafeSquad from '../../assets/svg/safeSquad';
import PaymentImage from '../../assets/onBoarding/payment';
import SafeImage from '../../assets/onBoarding/safe';
import Instruction from '../../assets/onBoarding/instruction';

export interface IProps {
  appTheme: Object;
  user: Object;
  navigation: Object;
}

interface IState {
  initialSlide: number;
  pages: Array<Object>;
  user: Boolean;
  index: Number;
  loadSplashScreen: Boolean;
}

class Onboading extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      initialSlide: 0,
      pages: ['1', '2', '3'],
      user: this.props.user.otpVerify,
      index: 0,
      loadSplashScreen: true,
    };
  }

  componentDidMount() {
    // Mixpanel.sharedInstanceWithToken('2b3821f2c87daf3069932d75673d98f8');
    Sentry.init({
      dsn: 'https://7e6ed2fbd6e44184bd7c7318dccd71e0@sentry.io/5171584',
    });
    // Sentry.captureMessage('TEST ME GOBONY');

    const {authToken} = this.props && this.props.user;
    setTimeout(() => {
      this.setState(
        {
          loadSplashScreen: false,
        },
        () => {
          if (authToken) {
            this.props.navigation.navigate('BottomTabs');
          }
        },
      );
    }, 2500);
  }

  _nextClick = () => {
    let swiper = this.refs.swiper;
    if (swiper) {
      swiper.scrollBy(1);
    }
  };

  onIndexChange = (index) => this.setState({index});

  render() {
    const {appTheme, user} = this.props;
    const {authToken = ''} = user;
    const {index, loadSplashScreen} = this.state;
    let theme = appTheme.theme;
    StatusBar.setBarStyle(
      theme.type === 'darkTheme' ? 'light-content' : 'dark-content',
      true,
    );
    if (loadSplashScreen) {
      return <SplashScreen />;
    }
    if (authToken) {
      return <View style={{backgroundColor: theme.PRIMARY_BACKGROUND_COLOR}} />;
    }
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar
          backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
          barStyle={
            theme.type === 'darkTheme' ? 'light-content' : 'dark-content'
          }
        />
        <View style={styles.dotView}>
          <View style={{flexDirection: 'row'}}>
            {Array(3)
              .fill()
              .map((_: any, i: any) => {
                return (
                  <View
                    key={i.toString()}
                    style={[
                      styles.dot,
                      {
                        borderColor:
                          index === i ? colors.lightOrange : colors.grayBorder,
                        backgroundColor:
                          index === i ? colors.lightOrange : colors.screenBack,
                      },
                    ]}
                  />
                );
              })}
          </View>
          {index !== 2 && (
            <TouchableOpacity onPress={() => navigate('Login')}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          )}
        </View>
        <Swiper
          style={{height: SCREENHEIGHT / 1.5, overflow: 'hidden'}}
          loop={false}
          showsPagination={false}
          ref="swiper"
          onIndexChanged={this.onIndexChange}>
          {this.state.pages.map((d, index) => {
            // console.log('index', index);
            return (
              <View key={index.toString()} style={{flex: 1}}>
                <View style={styles.imageView}>
                  {index === 0 && <SafeImage style={styles.centerImage2} />}
                  {index === 2 && <PaymentImage style={styles.centerImage} />}
                  {index === 1 && (
                    <Instruction style={styles.centerImage} />
                    // <FastImage
                    //   style={styles.centerImage}
                    //   source={require('../../assets/onBoarding/saftey.png')}
                    //   resizeMode={FastImage.resizeMode.contain}
                    // />
                  )}
                </View>

                <View style={styles.textPosition}>
                  {index === 0 && (
                    <View>
                      <Text
                        style={[
                          styles.headerText,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        Enhanced safety guidelines
                      </Text>
                      <Text style={styles.subText}>
                        We ensure to take all the necessary steps to make your
                        grooming experience safe.
                      </Text>
                    </View>
                  )}

                  {index === 1 && (
                    <View>
                      <Text
                        style={[
                          styles.headerText,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        Measures for your safety
                      </Text>
                      <Text style={styles.subText}>
                        You can see all the steps taken by us from the app
                        itself
                      </Text>
                    </View>
                  )}

                  {index === 2 && (
                    <View>
                      <Text
                        style={[
                          styles.headerText,
                          {color: theme.PRIMARY_TEXT_COLOR},
                        ]}>
                        Contactless Experience
                      </Text>
                      <Text style={styles.subText}>
                        You can now book your appointment and pay it from there
                        to get a contactless experience.
                      </Text>
                    </View>
                  )}
                  {/* <Text
                    style={[
                      styles.headerText,
                      {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    Kill the
                    <Text style={styles.fonts}> hassle </Text>
                    to find the right
                    <Text style={styles.fonts}> stylist </Text>
                    which you always wanted
                  </Text>
                  <Text style={styles.subText}>
                    Search salons, stylists or services around you
                  </Text> */}
                </View>
              </View>
            );
          })}
        </Swiper>
        <View>
          {index !== 2 ? (
            <TouchableOpacity onPress={this._nextClick} style={styles.next}>
              <Icon name="arrow-right" size={24} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <CustomButton
              style={styles.customButton}
              btnText={'Get Started'}
              onPress={() => this.props.navigation.navigate('Login')}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({
  user = [],
  isLoadingData = false,
  appTheme = '',
}) => ({
  user,
  isLoadingData,
  appTheme,
});

export default connect(mapStateToProps, {
  // verifyOtp,
  // logOut,
})(Onboading);
