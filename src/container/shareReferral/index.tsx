import React from 'react';
import {SafeAreaView, View, Image, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SplashScreen from 'react-native-splash-screen';
import styles from './style';
import {scale} from '../../utils/scale';
import {connnect, connect} from 'react-redux';

interface IProps {
  appTheme: Object;
}
interface IState {}

class ShareReferral extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const {appTheme, user = []} = this.props;
    let theme = appTheme.theme;
    let userName = user && user.detail && user.detail.name_first;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={styles.goBack}>
          <Icon name={'arrow-left'} size={scale(16)} color={'#4A4A4A'} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/referral/Sample App.png')}
            style={styles.Sample AppImage}
          />
          <Text
            style={[
              styles.title,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`${userName}, invite your friends and earn rewards`}</Text>
          <Image
            source={require('../../assets/referral/group.png')}
            style={styles.groupImage}
          />
          <Text
            style={[
              styles.eachReferral,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`with each referral`}</Text>
          <View style={styles.verticalLine} />
          <View style={styles.horizontalLine} />
          <View style={styles.verticalView}>
            <View style={styles.verticalLine} />
            <View style={styles.verticalLine} />
          </View>
        </View>
        <View style={styles.detailView}>
          <View style={styles.detail}>
            <Text
              style={[
                styles.selfText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`you`}</Text>
            <Text style={[styles.selfText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              get
              <Text style={[styles.rupees, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {' '}
                ₹100{' '}
              </Text>
              off on your next service
            </Text>
          </View>
          <View style={styles.detail}>
            <Text
              style={[
                styles.selfText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>{`your friend`}</Text>
            <Text style={[styles.selfText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              gets
              <Text style={[styles.rupees, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {' '}
                ₹100{' '}
              </Text>
              off on the first service
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.terms,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Offer valid till 31 December 2019 \n Terms & Conditions applied`}</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteText}>{`INVITE YOUR FRIENDS`}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', user = []}) => ({
  appTheme,
  user,
});

export default connect(mapStatsToProps)(ShareReferral);
