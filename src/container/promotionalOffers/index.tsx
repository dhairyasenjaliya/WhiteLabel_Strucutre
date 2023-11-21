import React from 'react';
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import ScreenHeader from '../../components/ScreenHeader';
import styles from './style';
import {colors} from '../../constants/styles';
import {scale} from '../../utils/scale';
import {connect} from 'react-redux';

interface IProps {
  appTheme: Object;
}
interface IState {
  offerData: Array<Object>;
}

class PromotionalOffers extends React.Component<IProps, IState> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      offerData: ['1', '2', '3', '4', '5'],
    };
  }
  componentDidMount() {
    SplashScreen.hide();
  }

  renderOfferDetails = () => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <View>
        <View style={styles.cardTopView}>
          <Text
            style={[
              styles.detailOffer,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`Offer Details`}</Text>
          <MIcon
            name={'window-close'}
            onPress={() => this.RBSheet.close()}
            size={scale(25)}
            color={theme.PRIMARY_TEXT_COLOR}
          />
        </View>
        <Text
          style={[
            styles.detailOfferText,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Get 30% off upto ₹100`}</Text>
        <Text
          style={[
            styles.offerDesc,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Spend minimum 1000 and get 30% off on selected services`}</Text>
        <Text
          style={[
            styles.voucher,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`voucher code`}</Text>
        <View style={styles.copyView}>
          {this.couponView()}
          <MIcon
            name={'content-copy'}
            onPress={() => {}}
            size={scale(24)}
            color={theme.PRIMARY_TEXT_COLOR}
            style={styles.copy}
          />
        </View>
        <Text
          style={[
            styles.voucher,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Details`}</Text>
        <View style={styles.detailsView}>
          <MIcon
            name={'file-document-outline'}
            size={scale(22)}
            color={theme.PRIMARY_TEXT_COLOR}
          />
          <Text
            style={[
              styles.detailDesc,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`Only applicable for Tony and guy showrooms`}</Text>
        </View>
        <View style={styles.detailsView}>
          <MIcon
            name={'information-outline'}
            size={scale(22)}
            color={theme.PRIMARY_TEXT_COLOR}
          />
          <Text
            style={[
              styles.detailDesc,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`Only applicable for Tony and guy showrooms`}</Text>
        </View>
        <View style={styles.detailsView}>
          <MIcon
            name={'restore-clock'}
            size={scale(22)}
            color={theme.PRIMARY_TEXT_COLOR}
          />
          <Text
            style={[
              styles.detailDesc,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>{`31st December, 2019`}</Text>
        </View>
      </View>
    );
  };

  couponView = () => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <View
        style={[
          styles.couponView,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
        ]}>
        <Text style={styles.couponText}>{`Sample App30`}</Text>
      </View>
    );
  };

  renderOfferItems = ({item, index}) => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <View
        style={[
          styles.card,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
        ]}>
        <View style={styles.cardTopView}>
          {this.couponView()}
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.apply]}>{`APPLY`}</Text>
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.offer,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Get 30% off upto ₹100`}</Text>
        <Text
          style={[
            styles.offerDesc,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Spend minimum 1000 and get 30% off on selected services`}</Text>
        <TouchableOpacity
          onPress={() => this.RBSheet.open()}
          style={styles.detailsBtn}>
          <Text style={[styles.viewDetails]}>{`view details`}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {offerData} = this.state;
    const {appTheme, navigation} = this.props;
    let theme = appTheme.theme;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <ScreenHeader
          onPress={() => navigation.goBack()}
          screenTitle={'Promotional Offers'}
        />
        <TextInput
          style={[
            styles.couponInput,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
          ]}
          placeholder={'Enter Coupon code'}
          placeholderTextColor={colors.grayColor}
        />
        <Text
          style={[
            styles.title,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`Available Coupons`}</Text>

        <FlatList
          data={offerData}
          renderItem={this.renderOfferItems}
          keyExtractor={(d, i) => i.toString()}
        />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={scale(400)}
          duration={250}
          customStyles={{
            container: {
              paddingTop: scale(20),
              paddingHorizontal: scale(16),
              borderTopLeftRadius: scale(30),
              borderTopRightRadius: scale(30),
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            },
          }}>
          {this.renderOfferDetails()}
        </RBSheet>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(PromotionalOffers);
