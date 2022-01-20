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
// import SplashScreen from 'react-native-splash-screen';
import {connect} from 'react-redux';
// import {FlatList} from 'react-native-gesture-handler';
import {scale, screenHeight} from '../../utils/scale';
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
class dealScreen extends React.Component<IProps, IState> {
  sectionList: any;
  constructor(props: any) {
    super(props);
    this.state = {
      activeInex: 0,
      listView: true,
    };
  }

  Item = () => {
    // onPress={() => this.props.navigation.navigate('dealProductDetail')}
    return (
      <View>
        {imageData.map((d) => (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('dealProductDetail')}>
            <Image source={d} style={styles.img} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  onViewableItemsChanged = ({changed}) => {
    // const data = changed && changed.length && changed.slice(-1)[0] || {};
    if (changed && changed.length === 1) {
      const data = changed[0];
      const {item = {}} = data;
      const {title} = item;
      this.checkForCurrentIndex(title);
    }
  };

  checkForCurrentIndex = (title: any) => {
    const activeInex = DATA.findIndex((d) => d.title === title);

    if (title && activeInex >= 0) {
      if (this.state.activeInex !== activeInex) {
        this.setState({
          activeInex,
        });
      }
    }
  };
  componentDidMount() {
    console.log('screenHeight', screenHeight);
    // SplashScreen.hide();
  }

  fav_Item = (item, index) => {
    // onPress={() => this.props.navigation.navigate('dealProductDetail')}
    const {uuid = '', basic = [], salon = []} = item;
    const {images = [], name = ''} = basic;
    let objectID = uuid;
    let image = images && images.MAIN && images.MAIN[0].url;
    let logo = salon && salon.basic && salon.basic.logo;

    let color1 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    let color2 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[1];

    return (
      // <View>
      <TouchableOpacity
        style={styles.mainContain}
        onPress={() =>
          this.props.navigation.navigate('dealProductDetail', {
            dealId: objectID,
            currentIndex: index,
          })
        }>
        <LinearGradient
          colors={[color1 ? color1 : '#000', color2 ? color2 : '#000']}
          style={styles.gradientContain}>
          {/* <View> */}
          <View style={styles.flexDir}>
            <FastImage
              style={styles.productImageFav}
              source={{
                uri: image,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
              style={[styles.logoImageFav]}
              source={{
                uri: logo,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <View style={{width: scale(180)}}>
            <Text numberOfLines={2} style={styles.alignProductTextWidthFav}>
              {name}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      // </View>
    );
  };

  _renderItem = (data, index) => {
    // console.log('index', index);
    const {
      objectID = '',
      name = '',
      salon = [],
      images = [],
      tags = [],
      description = '',
    } = data;
    const {logo = ''} = salon;
    let image = images && images.MAIN && images.MAIN[0].url;
    let color1 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[0];
    let color2 =
      images && images.MAIN && images.MAIN[0].bg && images.MAIN[0].bg.colors[1];
    let currentName = tags && tags[0].name;

    // console.log('currentName=>', data);
    // onPress={() => this.props.navigation.navigate('dealProductDetail')}

    return (
      // Spacing Margin & Vertical
      <View style={{marginVertical: scale(14)}}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('dealProductDetail', {
              dealId: objectID,
              currentIndex: index,
            })
          }>
          <LinearGradient
            colors={[color1 ? color1 : '#000', color2 ? color2 : '#000']}
            style={styles.mainComponent}>
            {/* <View> */}
            <View style={styles.flexDir}>
              {/* <Image source={{uri: image}} style={styles.productImage} /> */}
              {/* <Image source={{uri: logo}} style={styles.logoImage} /> */}
              <FastImage
                style={styles.productImage}
                source={{
                  uri: image,
                  // headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.stretch}
              />

              <FastImage
                style={styles.logoImage}
                source={{
                  uri: logo,
                  // headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.nameContain}>
              <Text style={styles.alignProductTextWidth}>{name}</Text>
            </View>
            <Text style={styles.subText}>{description}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  renderFavouriteView = () => {
    const {favouriteDeals} = this.state;

    const {dealList = [], appTheme} = this.props;
    const {isLoadingData = '', favouriteDeal = []} = dealList;
    const {value = []} = favouriteDeal;

    let noFavourite = value && value.length === 0 ? true : false;

    // Paginate use favouriteDeals

    let theme = appTheme.theme;
    // if (isLoadingData) {
    //   <ActivityIndicator
    //     size={'large'}
    //     color={colors.orangeText}
    //     style={styles.loaderAlign}
    //   />;
    // } else {

    if (noFavourite) {
      return (
        <View style={{height: '90%'}}>
          <ErrorHandle
            buttonName={'Add Favourite Deal'}
            errorName={'No Favourite Deal Found'}
            errorDetail={' '}
            errorImage={'missingData'}
            onPress={() => {
              this.setState({listView: true});
            }}
          />
        </View>
      );
    } else {
      return (
        // <ScrollView>
        <FadeInView>
          <FlatList
            // horizontal={true}
            data={value}
            extraData={[this.state, this.props]}
            initialNumToRender={10}
            // onEndReached={() => {
            //   this.renderMoreOrderData();
            // }}
            // onRefresh={() => this.refreshFavouriteDeal()}
            // horizontal
            numColumns={2}
            // refreshControl={
            //   <RefreshControl
            //     //refresh control used for the Pull to Refresh
            //     refreshing={isLoadingData}
            //     onRefresh={() => this.refreshFavouriteDeal()}
            //   />
            // }
            onEndReachedThreshold={0.2}
            onViewableItemsChanged={this.onViewableItemsChanged}
            style={{marginHorizontal: scale(5)}}
            contentContainerStyle={{
              // marginLeft: scale(20),
              // alignSelf: 'center',
              marginTop: scale(10),
              // backgroundColor: 'red',
              // marginBottom: scale(150),
            }}
            contentInset={{bottom: scale(250)}}
            keyExtractor={(item, index) => item + index}
            renderItem={({item, index}) => this.fav_Item(item, index)}
          />
        </FadeInView>
        // </ScrollView>
      );
    }
    // }
  };

  // scrollToIndex = (i) =>{
  //   this.sectionList.scrollToLocation(
  //     {
  //       sectionIndex: i,
  //       itemIndex: i-1,
  //     }
  //   );
  // }

  render() {
    const {activeInex, listView} = this.state;
    const {appTheme, dealList = [], user = []} = this.props;
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
                  this.setState({listView: !listView});
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
                      tintColor:
                        listView === false ? colors.textRed : '#282828',
                      marginVertical: scale(5),
                    },
                  ]}
                  source={require('../../assets/dealScreen/Heart.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* Filter Strip */}

          {/* Data Type Of Listing */}

          {listView === true ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {/* <FadeInView> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // marginLeft: scale(15),
                }}>
                {/* <View style={{alignSelf: 'center'}}>
                    <Text style={styles.nameText}>hi, {consumerName}</Text>
                    <Text
                      style={[
                        styles.offerText,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      we got some{'\n'}special offers{'\n'}for you!
                    </Text>
                  </View> */}
                <FlatList
                  horizontal
                  data={listDealAll}
                  // renderItem={Fav_Data => this._renderItem(Fav_Data)}
                  showsHorizontalScrollIndicator={false}
                  // contentContainerStyle={{marginLeft: scale(100)}}
                  contentContainerStyle={{marginLeft: scale(2)}}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({item, index}) => this._renderItem(item, index)}
                />
              </View>
              {/* </FadeInView> */}
            </ScrollView>
          ) : (
            this.renderFavouriteView()
          )}
          {/* {listView === 'renderFavouriteView'
            ? this.renderFavouriteView()
            : null} */}
          {/* Data Type Of Listing End*/}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', dealList = [], user = []}) => ({
  appTheme,
  dealList,
  user,
});

export default connect(mapStatsToProps)(dealScreen);
