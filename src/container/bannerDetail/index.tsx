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
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import {scale} from '../../utils/scale';
import images from '../../assets/images';
import {colors} from '../../constants/styles';
// import {getAllMyDeal, getMyDealNextLink} from '../../store/dealList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
}

interface IState {
  bannerId: String;
}

class BannerDetail extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {bannerId: ''};
  }

  componentDidMount() {
    // const {user = [], getAllMyDeal} = this.props;
    // const {detail = []} = user;
  }

  keyExtractor = (d: any, i: number) => i.toString();

  render() {
    const {appTheme, navigation} = this.props;
    const {bannerId = ''} = this.state;
    let theme = appTheme.theme;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {/* ScreenHeader */}
        <ScrollView>
          <ScreenHeader
            onPress={() => navigation.goBack()}
            screenTitle={' '}
            align={'left'}
            // backArrowColor={theme.PRIMARY_BACKGROUND_COLOR_LIGHT}
          />
          {/* ScreenHeader End */}
          <View style={styles.contentContain}>
            <Text
              style={[styles.mainTitleText, {color: theme.PRIMARY_TEXT_COLOR}]}>
              GoBony Shield Score
            </Text>
            <Text style={[styles.subTitleText]}>
              Salons with best sanitisation standard near you
            </Text>
            <Text style={[styles.descriptionText]}>
              Salons with best sanitisation standard near you Salons with best
              sanitisation standard near you Salons with best sanitisation
              standard near you
            </Text>
            <View
              style={[
                styles.paddingContent,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}
            />
            <Text
              style={[
                styles.subMainTitleText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              1. Heading 1
            </Text>
            <Text style={[styles.descriptionText]}>
              Salons with best sanitisation standard near you Salons with best
              sanitisation standard near you Salons with best sanitisation
              standard near you
            </Text>
            <View
              style={[
                styles.paddingContent,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}
            />
            <Text
              style={[
                styles.subMainTitleText,
                {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              2. Heading 2
            </Text>
            <Text style={[styles.descriptionText]}>
              Salons with best sanitisation standard near you Salons with best
              sanitisation standard near you Salons with best sanitisation
              standard near you
            </Text>
            <View
              style={[
                styles.paddingContent,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', user = []}) => ({
  appTheme,
  user,
});

export default connect(
  mapStatsToProps,
  {},
)(BannerDetail);
