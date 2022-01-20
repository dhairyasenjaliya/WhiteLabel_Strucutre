/* eslint-disable no-mixed-spaces-and-tabs */
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Animated,
  Alert,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './style';
import ScreenHeader from '../../components/ScreenHeader';

import {scale} from '../../utils/scale';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../assets/images';
import {getDealDetail} from '../../store/dealList/actions';
import {dealFavourite} from '../../store/manageFavourites/actions';
import {
  getAllDealList,
  addDealInCart,
  getFavouriteDeal,
} from '../../store/dealList/actions';
// import ErrorHandle from '../../components/errorHandle';
import {colors} from '../../constants/styles';

interface IProps {
  navigation: any;
  data: any;
  route: any;
  params: any;
  appTheme: Object;
  getDealDetail: Function;
  dealFavourite: Function;
  getAllDealList: Function;
  addDealInCart: Function;
  getFavouriteDeal: Function;
}

interface IState {
  data: any;
  switchValue: boolean;
  currentIndex: Number;
}

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 5,
      duration: 2000,
    }).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

class DealInfo extends Component<IProps, IState> {
  RBSheet: any;
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentIndex:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.currentIndex
          : 0,
      dealId:
        this.props && this.props.route && this.props.route.params
          ? this.props.route.params.dealId
          : false,
    };
  }

  componentDidMount() {
    // this.getSelectDealDetail();
    // console.log('ehheh state :==>', this.state.currentIndex);
  }

  getSelectDealDetail = () => {
    // const {dealId} = this.state;
    // const {getDealDetail} = this.props;
    // if (dealId) {
    //   getDealDetail(dealId);
    // }
  };

  _renderItem = ({item, index}) => {
    const {appTheme, dealList, addDealInCart, user} = this.props;
    let theme = appTheme.theme;
    const {dealDetail = []} = dealList;
    const {basic = [], uuid = '', salon = [], items = []} = dealDetail;
    const {images = [], price = [], state = ''} = basic;
    const {price_net = ''} = price;
    const {name = '', description = ''} = basic;
    let image = images && images.MAIN && images.MAIN[0].url;

    console.log('basic', basic);

    let salonUuid = salon && salon.uuid;
    let consumerId = user && user.detail && user.detail.uuid;

    let data2 = {
      salon_uuid: salonUuid,
      deal_uuid: uuid,
      discard_existing: true,
      read: true,
    };

    let color1 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    let color2 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[1];

    return (
      <LinearGradient
        colors={[color1 ? color1 : '#000', color2 ? color2 : '#000']}
        style={[styles.container]}>
        <View style={styles.shareContainer}>
          <View>
            <FastImage
              style={styles.image}
              source={{
                uri: image,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          {/* <View style={{alignItems: 'flex-end'}} /> */}
        </View>
        <View style={styles.detailContain}>
          <View style={styles.marginBtm}>
            <FlatList
              data={items}
              horizontal
              // data={[{name: 'dp'}, {name: 'hehehhe'}]}
              contentContainerStyle={styles.contentHorizontal}
              renderItem={(data) => {
                const {service = []} = data.item;
                const {name = ''} = service;
                return (
                  <View style={styles.serviceNameContain}>
                    <Text style={styles.serviceNameText}>{name}</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.detailText}>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productDetail}> {description}</Text>
            {/* <Text style={styles.productDetail}>
              {`description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`}
            </Text> */}
            <Text style={styles.productPrice}>{'\u20B9 ' + price_net}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={
                state === 'AVAILABLE'
                  ? () => addDealInCart(consumerId, data2)
                  : () => alert('Out Of Stock')
              }
              style={[
                styles.buyNow,
                {
                  backgroundColor:
                    state === 'AVAILABLE' ? colors.white : colors.grayColor,
                },
              ]}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.RBSheet.open();
              }}
              style={styles.details}>
              <Text style={styles.textDetails}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };

  changeDealItem = (index) => {
    // console.log('index', val);
    const {dealList = []} = this.props;
    const {dealDetail = [], listDealAll = []} = dealList;

    const {objectID = ''} = listDealAll && listDealAll[index];
    console.log('objectID', objectID);
    if (objectID) {
      const {getDealDetail} = this.props;
      getDealDetail(objectID);
    }
    this.setState({currentIndex: index});
  };

  refreshAllDeals = () => {
    const {algoliaDetail = '', salonDetail = []} = this.props;
    const {algoliaConfig = '', isLoadingData = ''} = algoliaDetail;
    // const {algoliaConfig = ''} = algoliaDetail;
    const {app_id = '', search_key = ''} = algoliaConfig;
    const algoliasearch = require('algoliasearch');
    const client = algoliasearch(app_id, search_key);

    // prod_deals
    const prod_deals = client.initIndex('prod_deals');
    prod_deals
      .search('')
      .then(({hits}) => {
        this.props.getAllDealList(hits);
        // console.log('DealList', hits);
      })
      .catch((err) => {
        console.log('prod_deals err', err);
      });
  };

  addRemoveFavouriteDeal = (type: String, dealId: String) => {
    this.setState({
      dealId,
    });
    const {
      dealList = [],
      user = [],
      dealFavourite,
      getFavouriteDeal,
    } = this.props;
    const {detail = []} = user;
    const {uuid = ''} = detail;
    const {dealDetail = []} = dealList;
    // let dealId = dealDetail && dealDetail.uuid;
    let data = {
      deal_uuid: dealId,
      read: false,
    };
    if (type) {
      dealFavourite(uuid, type, data);
      setTimeout(() => {
        this.getSelectDealDetail();
        getFavouriteDeal(uuid);
        // this.refreshAllDeals();
      }, 200);
    }
  };

  handleBack = () => {
    // const {getAllOrder, user = [], getFavouriteDeal} = this.props;
    // const {detail = []} = user;
    // let userId = detail && detail.uuid;
    // // console.log('dd', detail.uuid);
    // getFavouriteDeal(userId);
    this.props.navigation.goBack('dealScreen');
  };

  render() {
    const {appTheme, dealList = [], user = []} = this.props;
    const {detail = []} = user;
    const {uuid = ''} = detail;
    const {currentIndex} = this.state;
    // let color = data[currentIndex].color;
    // let logo = data[currentIndex].logo;
    let theme = appTheme.theme;

    const {dealDetail = [], listDealAll = []} = dealList;
    let checkError = dealDetail && dealDetail.basic ? false : true;
    // console.log('dealDetail', dealDetail);
    let dealId = dealDetail && dealDetail.uuid;
    const {basic = [], salon = [], favourite = ''} = dealDetail;
    const {images = [], price = []} = basic;
    const {price_net = ''} = price;
    const {expires_at = [], redeem_steps = [], tnc = []} = basic;
    const {date = ''} = expires_at;
    let color1 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    let logo = salon && salon.basic && salon.basic.logo;
    // console.log('basic===>', JSON.stringify(basic));
    let customDate = date && Moment(date).format('DD MMM ,YYYY');

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
        <View>
          <View style={styles.marginTop}>
            <ScreenHeader onPress={() => this.handleBack()} screenTitle={``} />
          </View>

          {/* <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={[styles.backButton]}
            onPress={() => this.handleBack()}>
            <Image
              style={styles.backIcon}
              source={require('../../assets/dealProductDetail/Back_button_2.png')}
            />
          </TouchableOpacity> */}
          {/* header */}
        </View>
        <ScrollView style={{marginTop: scale(32)}}>
          <View>
            <View>
              <View style={styles.sheetContainer}>
                <View style={styles.iconAlign}>
                  <Icon
                    style={[styles.sheetIcon]}
                    name={'doc'}
                    size={scale(20)}
                    color={theme.PRIMARY_TEXT_COLOR}
                  />
                </View>
                <View style={styles.textWidth}>
                  <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>T&C</Text>
                  <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={tnc}
                    renderItem={(data) => {
                      let name = data.item;
                      let index = data.index + 1;
                      return (
                        <View style={styles.flatlistInside}>
                          <Text
                            style={{
                              color: theme.PRIMARY_TEXT_COLOR,
                              marginVertical: scale(2),
                            }}>
                            {index + `. `}
                            {name}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.sheetContainer}>
              <View style={styles.iconAlign}>
                <Icon
                  style={styles.sheetIcon}
                  name={'info'}
                  size={scale(20)}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
              </View>
              <View style={styles.textWidth}>
                <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>
                  How to Redeem?
                </Text>
                <FlatList
                  contentContainerStyle={styles.contentContainer}
                  data={redeem_steps}
                  renderItem={(data) => {
                    let name = data.item;
                    let index = data.index + 1;
                    return (
                      <View style={styles.flatlistInside}>
                        <Text
                          style={{
                            color: theme.PRIMARY_TEXT_COLOR,
                            marginVertical: scale(2),
                          }}>
                          {index + `. `}
                          {name}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={styles.sheetContainer}>
              <View style={styles.iconAlign}>
                <Icon
                  style={styles.sheetIcon}
                  name={'clock'}
                  size={scale(20)}
                  color={theme.PRIMARY_TEXT_COLOR}
                />
              </View>
              <View style={styles.textWidth}>
                <Text style={{color: theme.PRIMARY_TEXT_COLOR}}>
                  Offer Expiry
                </Text>
                <Text
                  style={[
                    styles.contentContainer,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {customDate}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({
  appTheme = '',
  dealList = [],
  user = [],
  algoliaDetail = [],
}) => ({
  appTheme,
  dealList,
  user,
  algoliaDetail,
});

export default connect(mapStatsToProps, {
  getDealDetail,
  dealFavourite,
  getAllDealList,
  addDealInCart,
  getFavouriteDeal,
})(DealInfo);
