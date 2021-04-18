import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {scale} from '../../../utils/scale';
import {colors} from '../../../constants/styles';
import CustomKeyboard from '../../../components/CustomKeyboard';
import {verifyOtp, logOut} from '../../../store/user/actions';
import {connect} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export interface IProps {
  user: any;
  verifyOtp: Function;
  logOut: Function;
  route: any;
  appTheme: object;
}

interface IState {
  inputData: Array<Object>;
  userData: any;
  code: Number;
}

class otpScreen extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.SMSReadSubscription = {};
    const {phoneNumber} = this.props.route.params;
    this.state = {
      inputData: [{value: ''}, {value: ''}, {value: ''}, {value: ''}],
      userData: phoneNumber,
      code: '',
    };
  }

  _onKeyPresss = (d: any) => {
    let newInputData = this.state.inputData;

    let firstUnFilledIndex = newInputData.findIndex(item => item.value == '');

    if (d != 10) {
      let indexData = newInputData[firstUnFilledIndex];
      if (indexData) {
        newInputData[firstUnFilledIndex] = {value: d};
        if (firstUnFilledIndex === 3) {
          this.checkOtp();
        }
      }
    } else {
      if (firstUnFilledIndex === -1) {
        firstUnFilledIndex = 4;
      }

      if (firstUnFilledIndex !== 0) {
        firstUnFilledIndex = firstUnFilledIndex - 1;
      }
      let indexData = newInputData[firstUnFilledIndex];
      if (indexData) {
        // console.log('indexData');
        newInputData[firstUnFilledIndex] = {value: ''};
      }
    }
    this.setState({
      inputData: newInputData,
    });
  };

  clear = () => {
    this.props.logOut();
  };

  // componentDidMount = () => {
  //   this.setState(
  //     {
  //       code: '8149',
  //     },
  //     () => this.checkOtp(),
  //   );
  // };

  checkOtp = () => {
    const {userData = {}, inputData, code} = this.state;
    var getOtp = inputData.map(x => x.value);
    // var joinOtp = getOtp.join('');
    var joinOtp = code;
    console.log('joinOtp,', joinOtp);
    if (joinOtp.length < 4) {
      // alert('Please Input OTP');
    } else {
      let fetchData = userData;
      let user_credential = joinOtp;
      Object.assign(fetchData, {user_credential: user_credential});
      this.props.verifyOtp(fetchData);
    }
  };

  render() {
    let unFilledIndex = this.state.inputData.findIndex(
      item => item.value === '',
    );
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.goBack}>
          <Icon
            name={'arrow-left'}
            size={scale(16)}
            color={colors.grayBorder}
          />
        </TouchableOpacity>
        <Text style={[styles.title, {color: theme.PRIMARY_TEXT_COLOR}]}>
          Verify your account
        </Text>
        <View style={[styles.numberIput]}>
          <OTPInputView
            // style={{justifyContent: 'flex-start'}}
            // style={[styles.numberIput]}
            pinCount={4}
            selectionColor={theme.PRIMARY_BACKGROUND_COLOR_LIGHT}
            codeInputFieldStyle={[
              styles.textInputView,
              {
                backgroundColor:
                  theme.type === 'darkTheme'
                    ? '#35363A'
                    : theme.PRIMARY_BACKGROUND_COLOR,
                borderColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              },
            ]}
            // selectionColor={{backgroundColor: 'red'}}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => {
              this.setState({code});
            }}
            autoFocusOnLoad
            codeInputHighlightStyle={{backgroundColor: colors.darkOrange}}
            onCodeFilled={code => {
              this.setState(
                {
                  code,
                },
                () => this.checkOtp(),
              );
              // console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>

        {/* <View style={styles.resendView}>
          <Text style={[styles.isResend, styles.fonts]}>
            {`Bad luck with OTP ? `}
          </Text>
           <TouchableOpacity onPress={() => this.checkOtp()}>
            <Text style={[styles.resend, styles.fonts]}>Resend</Text>
          </TouchableOpacity>


        </View> */}

        {/* <TouchableOpacity onPress={() =>  this.clear()}>
            <Text style={[styles.resend, styles.fonts]}>{`\n\n\n\n`}Clear DATA</Text>
          </TouchableOpacity> */}

        {/* <View style={styles.keyboardHeight}>
          {Platform.OS === 'android' ? (
            <CustomKeyboard _onKeyPresss={d => this._onKeyPresss(d)} />
          ) : null}
        </View> */}

        {/* <View style={[styles.numberIput]}>
          {this.state.inputData.map((d: any, i: any) => {
            let supportingVal = this.state.inputData;
            return (
              <TextInput
                keyboardType={'number-pad'}
                maxLength={1}
                onChangeText={d => {
                  console.log('d', d);
                  supportingVal[i] = d;
                  this.setState({inputData: supportingVal});
                }}
                style={[
                  styles.textInputView,
                  styles.textInput,
                  {
                    backgroundColor:
                      d.value === ''
                        ? theme.type === 'darkTheme'
                          ? '#35363A'
                          : theme.PRIMARY_BACKGROUND_COLOR
                        : colors.darkOrange,
                    borderColor:
                      d.value === '' ? colors.white : colors.orangeBorder,
                    shadowColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                  },
                ]}>
                {unFilledIndex !== i ? (
                  <Text style={styles.textInput}>{d.value}</Text>
                ) : (
                  <View style={styles.focusInput} />
                )}
              </TextInput>
            );
          })}
        </View> */}
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

export default connect(
  mapStateToProps,
  {
    verifyOtp,
    logOut,
  },
)(otpScreen);
