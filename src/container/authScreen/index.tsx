import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import CustomButton from '../../components/Button';
import {scale} from '../../utils/scale';
import {colors} from '../../constants/styles';
import CustomKeyboard from '../../components/CustomKeyboard';
import {sendOtp, storeNumber} from '../../store/user/actions';
import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
import {PERMISSIONS, request, requestMultiple} from 'react-native-permissions';
import {TextInput} from 'react-native-gesture-handler';

interface IProps {
  user: any;
  sendOtp: Function;
  data: any;
  otpSentSuccess: Function;
  navigation: any;
  storeNumber: Function;
  appTheme: Object;
}

interface IState {
  dialNumber: String;
}

class Login extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      dialNumber: '',
    };
  }

  // componentDidMount = () => {
  //   this.setState(
  //     {
  //       dialNumber: '9654916038',
  //     },
  //     () => this.checkIfOtpSent(),
  //   );
  // };

  _onKeyPresss = (d: any) => {
    // if (d !== '10') {
    // console.log('d', d);
    // if (this.state.dialNumber.length < 10) {
    this.setState({
      dialNumber: d,
    });
    // }
    // } else {
    // this.setState({
    //   dialNumber: this.state.dialNumber.slice(0, -1),
    // });
    // }
  };

  checkIfOtpSent = () => {
    const {dialNumber} = this.state;
    // const { status } = this.props.user;
    // const { navigation } = this.props;
    // 9911223344
    let data = {
      user_type: 0,
      user_identifier: dialNumber,
    };
    this.props.sendOtp(data);
    // this.props.storeNumber(data);
    // let check = JSON.stringify(status);

    // if (check === '400'){
    //   alert('Bad request');
    // }
    // if (status && status.res && status.res.success  === true){
    //   navigation.navigate('otpScreen');
    // }
  };

  render() {
    const {dialNumber} = this.state;
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    let validateNumber =
      dialNumber && dialNumber.length && dialNumber.length === 10
        ? true
        : false;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <Text style={[styles.title, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {/* Login with your {'\n'}phone number */}
          Enter Your Phone Number
        </Text>
        <View
          style={[
            styles.numberIput,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              // borderWidth: scale(1),
              borderBottomWidth: scale(1),
              borderTopWidth: scale(1),
              borderLeftWidth: scale(1),
              borderColor: validateNumber
                ? colors.green
                : dialNumber.length === 0
                ? theme.PRIMARY_BACKGROUND_COLOR_LIGHT
                : colors.textRed,
            },
          ]}>
          <Image
            source={require('../../assets/signUp/india.png')}
            style={styles.flag}
          />
          <Text style={styles.code}>+91</Text>
          <View
            style={[styles.line, {backgroundColor: theme.PRIMARY_TEXT_COLOR}]}
          />
          <TextInput
            keyboardType={'number-pad'}
            autoFocus
            value={dialNumber}
            maxLength={10}
            onChangeText={(d) => this._onKeyPresss(d)}
            style={[styles.inbox, {color: theme.PRIMARY_TEXT_COLOR}]}
          />
        </View>
        <Text style={styles.enterValidNumber}>
          {dialNumber.length !== 0 && !validateNumber
            ? `*Please enter valid number`
            : `   `}
        </Text>
        {/* <CustomKeyboard _onKeyPresss={d => this._onKeyPresss(d)} /> */}
        {Platform.OS === 'android' ? (
          <CustomButton
            style={styles.customButton}
            btnText={'Login'}
            onPress={
              validateNumber
                ? () => this.checkIfOtpSent()
                : () => alert('Invalid Number')
            }
            // onPress={() => {}}
          />
        ) : (
          <TouchableOpacity
            onPress={
              validateNumber
                ? () => this.checkIfOtpSent()
                : () => alert('Invalid Number')
            }
            style={[
              styles.next,
              {
                backgroundColor: validateNumber
                  ? colors.darkOrange
                  : colors.textGrey,
              },
            ]}>
            <Icon name="arrow-right" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
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
  sendOtp,
  storeNumber,
})(Login);
