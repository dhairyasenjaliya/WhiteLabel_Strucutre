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
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from './style';
import {scale, screenHeight} from '../../utils/scale';
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
import {navigate} from '../../navigation/rootNavigation';

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

const FadeInView = props => {
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

class DealProductDetail extends Component<IProps, IState> {
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
    this.getSelectDealDetail();
    // console.log('ehheh state :==>', this.state.currentIndex);
  }

  getSelectDealDetail = () => {
    const {dealId} = this.state;
    const {getDealDetail} = this.props;
    if (dealId) {
      getDealDetail(dealId);
    }
  };

  _renderItem = ({item, index}) => {
    const {appTheme, dealList, addDealInCart, user, navigation} = this.props;
    let theme = appTheme.theme;
    const {dealDetail = []} = dealList;
    const {basic = [], uuid = '', salon = [], items = []} = dealDetail;
    const {images = [], price = [], state = ''} = basic;
    const {price_net = ''} = price;
    const {name = '', description = ''} = basic;
    let image = images && images.MAIN && images.MAIN[0].url;
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
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
        <View style={styles.detailContain}>
          <View style={styles.marginBtm}>
            <FlatList
              data={items}
              horizontal
              contentContainerStyle={styles.contentHorizontal}
              renderItem={data => {
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
            <Text numberOfLines={2} style={styles.productName}>{name}</Text>
            <Text numberOfLines={2} style={styles.productDetail}> {description}</Text>
            {/* <Text style={styles.productDetail}>
              {`description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescription`}
            </Text> */}
            <Text numberOfLines={2} style={styles.productPrice}>{'\u20B9 ' + price_net}</Text>
          </View>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={
                // () => addDealInCart(consumerId, data2)
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
                // this.RBSheet.open();
                navigation.navigate('DealInfo');
              }}
              style={styles.details}>
              <Text style={styles.textDetails}>Details</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </LinearGradient>
    );
  };

  changeDealItem = index => {
    // console.log('index', val);
    const {dealList = []} = this.props;
    const {dealDetail = [], listDealAll = []} = dealList;

    const {objectID = ''} = listDealAll && listDealAll[index];
    // console.log('objectID', objectID);
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
      .catch(err => {
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
    let dealId = dealDetail && dealDetail.uuid;
    const {basic = [], salon = [], favourite = ''} = dealDetail;
    const {images = [], price = []} = basic;
    const {price_net = ''} = price;
    const {expires_at = [], redeem_steps = [], tnc = []} = basic;
    const {date = ''} = expires_at;
    let color1 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    let logo = salon && salon.basic && salon.basic.logo;
    let customDate = date && Moment(date).format('DD MMM ,YYYY');
    // if (checkError) {
    //   return (
    //     <ErrorHandle
    //       buttonName={'Go Back'}
    //       errorName={'Something Went Wrong'}
    //       // errorDetail={'Please enable location access to view places near you'}
    //       errorImage={'missingData'}
    //       onPress={() => this.props.navigation.goBack('dealScreen')}
    //     />
    //   );
    // }
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: color1}]}>
        <StatusBar
          backgroundColor={color1}
          barStyle={
            theme.type === 'darkTheme' ? 'light-content' : 'dark-content'
          }
        />
        <View>
          {/* <View
            style={{
              position: 'absolute',
              zIndex: 200,
              // position: 'absolute',
              top: 100,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View> */}
          {/* header */}
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            style={[styles.backButton]}
            onPress={() => this.handleBack()}>
            <Image
              style={styles.backIcon}
              source={require('../../assets/dealProductDetail/Back_button_2.png')}
            />
          </TouchableOpacity>
          {/* header */}

          {/* In case static button */}
          <View
            style={{
              alignItems: 'flex-end',
              position: 'absolute',
              zIndex: 100,
              right: scale(20),
            }}>
            <TouchableOpacity>
              <FadeInView>
                <FastImage
                  style={styles.logoSize}
                  source={{
                    uri: logo,
                    // headers: { Authorization: 'someAuthToken' },
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </FadeInView>
            </TouchableOpacity>
            <TouchableOpacity>
              <FastImage
                style={styles.shareIcon}
                source={require('../../assets/dealProductDetail/Share.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
            {favourite === true ? (
              <TouchableOpacity
                onPress={() => this.addRemoveFavouriteDeal('remove', dealId)}>
                <FastImage
                  style={styles.shareIcon}
                  source={require('../../assets/dealProductDetail/heartFill.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => this.addRemoveFavouriteDeal('add', dealId)}>
                <FastImage
                  style={styles.shareIcon}
                  source={require('../../assets/dealProductDetail/heart.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* In case static button */}

          {/* Main Carousel */}

          <View>
            <Carousel
              ref={carousel => {
                this._carousel = carousel;
              }}
              onSnapToItem={(index, data) => {
                this.changeDealItem(index);
              }}
              data={listDealAll}
              renderItem={data => this._renderItem(data)}
              sliderHeight={scale(1000)}
              itemHeight={scale(1200)}
              vertical={true}
              // firstItem={currentIndex}
              loop={true}
              enableSnap={true}
            />
          </View>
          {/* Main Carousel */}
        </View>
        <View>
          <RBSheet
            ref={ref => {
              this.RBSheet = ref;
            }}
            height={scale(500)}
            duration={250}
            customStyles={{
              container: {
                paddingTop: scale(40),
                alignItems: 'center',
                borderTopLeftRadius: scale(30),
                borderTopRightRadius: scale(30),
                backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              },
            }}>
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
                      renderItem={data => {
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
                      renderItem={data => {
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
            </View>
          </RBSheet>
        </View>
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

export default connect(
  mapStatsToProps,
  {
    getDealDetail,
    dealFavourite,
    getAllDealList,
    addDealInCart,
    getFavouriteDeal,
  },
)(DealProductDetail);
