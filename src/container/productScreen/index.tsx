import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SectionList,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import images from '../../assets/images';
import styles from './style';
import Search from '../../components/CustomSearch';
import Icon from 'react-native-vector-icons/FontAwesome';

// import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
// import {FlatList} from 'react-native-gesture-handler';
import {scale} from '../../utils/scale';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../constants/styles';
import ErrorHandle from '../../components/errorHandle';

const FadeInView = (props) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 5,
      duration: 3500,
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

const DATA = [
  {
    title: 'STYLING',
    data: ['STYLING'],
  },
  {
    title: 'HAIR CARE',
    data: ['HAIR CARE'],
  },
  {
    title: 'BEAUTY SERVICES',
    data: ['BEAUTY SERVICES'],
  },
  {
    title: 'MAKE UP',
    data: ['MAKE UP'],
  },
  {
    title: 'HAIR CUT',
    data: ['BEAUTY SERVICES'],
  },
  {
    title: 'PACKAGES',
    data: ['MAKE UP'],
  },
];

const imageData = [
  images.productcard1,
  images.productcard2,
  images.productcard1,
  images.productcard2,
  images.productcard1,
  images.productcard2,
];

interface IProps {
  appTheme: any;
  navigation: any;
}

interface IState {
  activeInex: Number;
  listView: Boolean;
}
class productScreen extends React.Component<IProps, IState> {
  sectionList: any;
  constructor(props: any) {
    super(props);
    this.state = {
      activeInex: 0,
      listView: true,
    };
  }

  componentDidMount() {
    // SplashScreen.hide();
  }

  // scrollToIndex = (i) =>{
  //   this.sectionList.scrollToLocation(
  //     {
  //       sectionIndex: i,
  //       itemIndex: i-1,
  //     }
  //   );
  // }

  renderCouponShield = (data) => {
    const {name = '', desc = '', know = '', color = '', image = ''} = data.item;
    const {appTheme = [], navigation} = this.props;
    let theme = appTheme.theme;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('bannerDetail')}
        style={[styles.couponShield, {backgroundColor: color}]}>
        <View style={styles.flexRow}>
          <View>
            <Text
              style={[
                styles.couponShieldTextTitle,
                // {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {name}
            </Text>
            <Text
              style={[
                styles.couponShieldTextTitle2,
                // {color: theme.PRIMARY_TEXT_COLOR},
              ]}>
              {desc}
            </Text>
            <View style={styles.menuContainer}>
              <Text
                style={[
                  styles.couponShieldTextTitle3,
                  // {color: theme.PRIMARY_TEXT_COLOR},
                ]}>
                {know}
              </Text>
              <Icon
                name={'caret-right'}
                color={'#FFF'}
                size={16}
                style={styles.arrowRight}
              />
            </View>
          </View>
          <Image source={image} style={styles.couponShieldImage} />
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (d: any, i: number) => i.toString();

  renderProduct = (data: any) => {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    // console.log('index', index);
    // const {objectID = '', name = '', salon = [], images = [], tags = []} = data;
    // const {logo = ''} = salon;
    // let image = images && images.MAIN && images.MAIN[0].url;
    // let color1 =
    //   images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    // let color2 =
    //   images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[1];
    // let currentName = tags && tags[0].name;

    // console.log('currentName=>', currentName);
    // onPress={() => this.props.navigation.navigate('dealProductDetail')}
    // if (getName === currentName) {
    return (
      // Spacing Margin & Vertical
      <View style={{marginTop: scale(14), paddingVertical: scale(1)}}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            marginLeft: scale(1),
            marginRight: scale(16),
            // width: '85%',
            width: scale(184),
            height: scale(232),
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.44,
            shadowRadius: 1,
            elevation: 16,

            // width: '55%',
            // padding: scale(40),
            // paddingHorizontal: scale(30),
            borderRadius: scale(16),
          }}
          onPress={() =>
            this.props.navigation.navigate('singleProductDetail', {
              dealId: `daa4c9a3-de1c-4d6a-8e0e-e99bb2181815`,
              currentIndex: 1,
            })
          }>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <FastImage
              style={styles.productImage}
              source={require('../../assets/images/homeScreen/product2transparent.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <FastImage
              style={styles.logoImage}
              source={require('../../assets/stylishDetails/logo.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text
            numberOfLines={2}
            style={[
              styles.alignProductTextWidth,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {`Kerastace Shampoo`}
          </Text>
          <Text
            numberOfLines={2}
            style={[
              styles.alignProductTextWidth2,
              // {color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {`\u20B9 3200`}
          </Text>
        </TouchableOpacity>
      </View>
    );
    // } else {
    //   null;
    // }
  };

  render() {
    const {activeInex, listView} = this.state;
    const {appTheme, dealList = [], user = [], navigation} = this.props;
    const {detail = []} = user;
    let consumerName = detail && detail.name_first;
    const {listDealAll = [], favouriteDeal = []} = dealList;
    const {value = []} = favouriteDeal;

    let theme = appTheme.theme;
    let type = theme.type;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <ScrollView contentContainerStyle={styles.bottom}>
          <StatusBar
            translucent
            backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
          />
          <View>
            <View>
              {/* Filter Strip */}
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: scale(15),
                  // justifyContent: 'center',
                  justifyContent: 'space-between',
                  marginTop: scale(10),
                }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('MyDeal')}
                  style={{
                    paddingVertical: scale(5),
                    paddingHorizontal: scale(5),
                    marginHorizontal: scale(5),
                    // backgroundColor:
                    //   type === 'darkTheme'
                    //     ? 'rgba(0,0,0,0.5)'
                    //     : 'rgba(0,0,0,0.1)',
                    backgroundColor: '#D4D4D4',

                    borderRadius: scale(10),
                  }}>
                  <Image
                    style={[
                      styles.favouriteIcon,
                      {
                        tintColor: '#282828',
                        marginVertical: scale(3),
                      },
                    ]}
                    source={require('../../assets/dealScreen/image.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // this.setState({listView: !listView});
                    navigation.navigate('checkOutDetails');
                  }}
                  style={{
                    paddingVertical: scale(5),
                    paddingHorizontal: scale(5),
                    // backgroundColor:
                    //   type === 'darkTheme'
                    //     ? 'rgba(0,0,0,0.5)'
                    //     : 'rgba(0,0,0,0.1)',
                    backgroundColor: '#D4D4D4',

                    borderRadius: scale(10),
                  }}>
                  <Image
                    style={[
                      styles.favouriteIcon,
                      {
                        // tintColor:
                        //   listView === false ? colors.textRed : '#282828',
                        marginVertical: scale(5),
                      },
                    ]}
                    // source={require('../../assets/dealScreen/Heart.png')}
                    source={images.shopping_cart}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Filter Strip */}

            {/* Search */}
            <Search
              value={'Search for products...'}
              // clear={searchedValue ? true : false}
              // clearText={() => this.renderSearchResult('')}
              clear={true}
              clearText={() => {}}
              text={'Search for stylist, salon, services...'}
              onChangeText={() => {}}
              // onChangeText={(searchedValue: String) =>
              //   this.renderSearchResult(searchedValue)
              // }
            />
            {/* Search end */}

            {/* Coupon SHield */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={this.keyExtractor}
              data={[
                {
                  name: 'Special offer on SkinCare',
                  desc:
                    'Get products delivered to your place totally contactles',
                  know: 'Know more',
                  color: '#2EABB4',
                  image: images.shieldnew,
                },
              ]}
              renderItem={(data) => this.renderCouponShield(data)}
              // contentContainerStyle={styles.headerContentContainerStyle}
            />

            {/* Coupon SHield end */}

            {/* Featured Products */}

            <View style={styles.horizontalSide}>
              <Text
                style={[styles.headText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                Featured Products
              </Text>
              <FlatList
                data={[1, 2, 3, 4]}
                horizontal
                renderItem={(data) => this.renderProduct(data)}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.horizontalSide}>
              <Text
                style={[styles.headText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                Haircare Products
              </Text>
              <FlatList
                data={[1, 2, 3, 4]}
                horizontal
                renderItem={(data) => this.renderProduct(data)}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.horizontalSide}>
              <Text
                style={[styles.headText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                Skin Care
              </Text>
              <FlatList
                data={[1, 2, 3, 4]}
                horizontal
                renderItem={(data) => this.renderProduct(data)}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/* Featured Products End */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', dealList = [], user = []}) => ({
  appTheme,
  dealList,
  user,
});

export default connect(mapStatsToProps)(productScreen);
