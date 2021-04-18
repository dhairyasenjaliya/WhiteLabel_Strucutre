import React from 'react';
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import styles from './style';
import {scale} from '../../utils/scale';
import {connect} from 'react-redux';
import Search from '../../components/CustomSearch';
import CustomButton from '../../components/Button';
import MapView from 'react-native-maps';
import {colors} from '../../constants/styles';

interface IProps {
  appTheme: Object;
}
interface IState {}

class changeLocation extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View style={{marginVertical: scale(20)}}>
          <Search text={'Search location'} onChangeText={() => {}} />
        </View>
        <View style={{height: '60%'}}>
          <MapView
            style={{
              flex: 1,
              ...StyleSheet.absoluteFillObject,
            }}
            initialRegion={{
              latitude: 19.07609,
              longitude: 72.877426,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
        <View style={{marginHorizontal: scale(20)}}>
          <Text
            style={{
              color: theme.PRIMARY_TEXT_COLOR,
              fontSize: scale(16),
              marginVertical: scale(20),
            }}>
            Select Your location
          </Text>
          <Text
            style={{
              color: theme.PRIMARY_TEXT_COLOR,
              fontSize: scale(10),
              marginBottom: scale(3),
            }}>
            Your location
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: theme.PRIMARY_TEXT_COLOR,
                fontSize: scale(14),
                marginBottom: scale(10),
                width: '85%',
              }}>
              32nd Milestone, Sector 15, Gurgaon
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  styles.changeButton,
                  {
                    color: colors.orangeText,
                  },
                ]}>
                Change
              </Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            btnText={'Confirm Location'}
            style={{borderRadius: scale(50), width: '90%', alignSelf: 'center'}}
            onPress={() => {}}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(changeLocation);
