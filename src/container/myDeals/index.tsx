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
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { colors, fonts } from '../../constants/styles';
// import { scale } from '../../utils/scale';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';
import {connect} from 'react-redux';
import {scale} from '../../utils/scale';
import images from '../../assets/images';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../constants/styles';
import {getAllMyDeal, getMyDealNextLink} from '../../store/dealList/actions';

interface IProps {
  appTheme: Object;
  navigation: Object;
  getAllMyDeal: Function;
  getMyDealNextLink: Function;
}

interface IState {
  allDeals: Object;
  allDealsNextLink: String;
  isLoading: Boolean;
}

class MyDeal extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {allDeals: [], allDealsNextLink: '', isLoading: true};
  }

  componentDidMount() {
    const {user = [], getAllMyDeal} = this.props;
    const {detail = []} = user;
    let consumerId = detail && detail.uuid;
    if (consumerId) {
      getAllMyDeal(consumerId);
    }
    setTimeout(() => {
      const {dealList = []} = this.props;
      const {myAllDeals = []} = dealList;
      let next_link = myAllDeals && myAllDeals.next_link;
      let value = myAllDeals && myAllDeals.value;
      this.setState({
        allDeals: value,
        allDealsNextLink: next_link,
        isLoading: false,
      });
    }, 500);
  }

  keyExtractor = (d: any, i: number) => i.toString();

  renderCoupon = (data: any) => {
    const {navigation} = this.props;
    const {theme} = this.props.appTheme;
    const {items = [], uuid = ''} = data.item;
    return (
      <FlatList
        data={items}
        renderItem={data => {
          const {deal = []} = data.item;
          const {basic = [], salon = []} = deal;
          const {name = '', images = [], state = '', expires_at = []} = basic;
          const {date = ''} = expires_at;

          let color1 =
            images &&
            images.MAIN &&
            images.MAIN[0].bg &&
            images.MAIN[0].bg.colors[0];
          let color2 =
            images &&
            images.MAIN &&
            images.MAIN[0].bg &&
            images.MAIN[0].bg.colors[1];

          let logo = salon && salon.basic && salon.basic.logo;
          let salonName = salon && salon.basic && salon.basic.name;

          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('scheduleDetail', {
                  dealId: uuid,
                  color1: color1,
                  color2: color2,
                  name: name,
                });
              }}>
              <LinearGradient
                colors={[color1 ? color1 : '#000', color2 ? color2 : '#000']}
                style={[styles.mainCouponContainer]}>
                <View style={styles.flexRowSalon}>
                  <FastImage
                    style={styles.img}
                    source={{
                      uri: logo,
                      // headers: { Authorization: 'someAuthToken' },
                      priority: FastImage.priority.normal,
                    }}
                    // resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={styles.salonName}>{salonName}</Text>
                </View>

                <View style={styles.voucherContainer}>
                  <Text
                    style={[
                      styles.couponTitle,
                      // {color: theme.PRIMARY_TEXT_COLOR},
                    ]}>
                    {name}
                  </Text>
                </View>
                <View style={styles.flexRow}>
                  <View style={styles.statusbutton}>
                    <Text style={styles.statusText}>status:</Text>
                    <Text style={styles.statusValue}>Activated</Text>
                  </View>
                  <View>
                    <Text style={styles.validateText}>
                      valid till {Moment(date).format('DD MMMM YYYY')}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  renderMoreOrderData = () => {
    console.log('renderMoreOrderData');
    const {getMyDealNextLink, dealList = []} = this.props;
    const {allDealsNextLink = ''} = this.state;
    const {myDealsNext = []} = dealList;
    const {value = [], next_link = ''} = myDealsNext;
    if (allDealsNextLink !== next_link) {
      getMyDealNextLink(next_link ? next_link : allDealsNextLink);
      if (allDealsNextLink !== next_link) {
        this.setState({
          allDealsNextLink: next_link,
          allDeals: [...this.state.allDeals, ...value],
        });
      }
    }
  };

  render() {
    const {appTheme, navigation} = this.props;
    const {allDeals = [], isLoading} = this.state;
    let theme = appTheme.theme;
    <StatusBar
      backgroundColor={theme.PRIMARY_BACKGROUND_COLOR_LIGHT}
      barStyle={theme.type === 'darkTheme' ? 'light-content' : 'dark-content'}
    />;
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {/* ScreenHeader */}
        <View
          style={{
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            paddingVertical: scale(20),
            paddingBottom: scale(30),
          }}>
          <ScreenHeader
            onPress={() => navigation.goBack()}
            screenTitle={'My deals'}
            align={'left'}
            // backArrowColor={theme.PRIMARY_BACKGROUND_COLOR}
          />
        </View>
        {/* ScreenHeader End */}

        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            color={colors.orangeText}
            style={styles.loaderAlign}
          />
        ) : (
          <FlatList
            data={allDeals}
            extraData={this.state}
            renderItem={data => this.renderCoupon(data)}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={{marginTop: scale(5)}}
            initialNumToRender={10}
            onEndReached={() => {
              this.renderMoreOrderData();
            }}
            onEndReachedThreshold={0.2}
            // contentInset={{bottom: scale(50)}}
          />
        )}
      </View>
    );
  }
}

const mapStatsToProps = ({appTheme = '', user = [], dealList = []}) => ({
  appTheme,
  user,
  dealList,
});

export default connect(
  mapStatsToProps,
  {getAllMyDeal, getMyDealNextLink},
)(MyDeal);
