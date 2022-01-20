/* eslint-disable no-shadow */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import HomeScreenHeader from '../../components/header';
import Search from '../../components/CustomSearch';
import styles from './style';
import TopStylist from '../../components/topStylist';
import TopSalon from '../../components/topSalonAround';
import TopCategory from '../../components/topCategory';
import SearchData from '../../components/searchData';
import {connect} from 'react-redux';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import StylistList from '../../components/stylistList';
import Animated from 'react-native-reanimated';
import * as RootNavigation from '../../navigation/rootNavigation';
import images from '../../assets/images';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps {
  navigation: any;
  data: any;
  appTheme: any;
}

interface Istate {
  searchedValue: String;
  routes: Object;
  index: Number;
  searchedSalonList: Object;
}

const _ = require('lodash');

const searchData = [
  {
    type: 'salon',
    name: 'Geetanjali Salon',
    image: images.salon_image,
    location: '300m - Chattarpur, New Delhi',
    rating: 3.8,
    status: 'Open Now',
    time: '(11:00 am - 09:00 pm)',
    offer: '₹1,000 off on spend of ₹5,000',
  },
  {
    type: 'stylist',
    name: 'Karan Singh',
    subName: 'Sr. Stylist',
    image: images.artist,
    rating: 2.4,
  },
  {
    type: 'stylist',
    name: 'Karan Singh',
    subName: 'Sr. Stylist',
    image: images.artist,
    rating: 2.4,
  },
  {
    type: 'salon',
    name: 'Geetanjali Salon 2',
    image: images.salon_image,
    location: '300m - Chattarpur, New Delhi',
    rating: 3.8,
    status: 'Open Now',
    time: '(11:00 am - 09:00 pm)',
    offer: '₹1,000 off on spend of ₹5,000',
  },
];

let sortedSearchData = _.orderBy(searchData, ['type', 'type'], ['desc', 'asc']);

// Logic For Search
// var string = 'foo',
// substring = 'oo';
// console.log(string.includes(substring));

class searchScreen extends React.Component<IProps, Istate> {
  RBSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      searchedSalonList: [],
      searchedValue: '',
      index: 0,
      routes: [
        {key: 'Stylists', title: 'Stylists'},
        {key: 'Nonstylists', title: 'Non Stylists'},
      ],
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  keyExtractor = (d: any, i: number) => i.toString();

  FirstRoute = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: this.props.appTheme.theme
            .PRIMARY_BACKGROUND_COLOR_LIGHT,
        },
      ]}>
      <FlatList
        data={[
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
        ]}
        renderItem={({item}) => (
          <StylistList
            onPress={() => {
              this.RBSheet.close();
              RootNavigation.navigate('stylishDetails', {});
            }}
            data={item}
          />
        )}
        contentInset={{bottom: scale(60)}}
      />
    </View>
  );
  SecondRoute = () => (
    <View
      style={[
        styles.container,
        {
          backgroundColor: this.props.appTheme.theme
            .PRIMARY_BACKGROUND_COLOR_LIGHT,
        },
      ]}>
      <FlatList
        data={[
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
          {key: 'a'},
          {key: 'b'},
        ]}
        renderItem={({item}) => (
          <StylistList
            onPress={() => {
              this.RBSheet.close();
              RootNavigation.navigate('stylishDetails', {});
            }}
            data={item}
          />
        )}
        contentInset={{bottom: scale(60)}}
      />
    </View>
  );

  _handleIndexChange = (index: any) => this.setState({index});

  _renderTabBar = (props: {
    navigationState: {routes: any[]};
    position: Animated.Adaptable<number>;
  }) => {
    const {theme} = this.props.appTheme;
    return (
      <View style={{opacity: 10}}>
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: colors.lightOrange}}
          style={{
            height: scale(40),
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            borderTopLeftRadius: scale(15),
            borderTopRightRadius: scale(15),
          }}
          renderLabel={({route, focused, color}) => (
            <Text
              style={{
                fontFamily: fonts.robotoRegular,
                color: focused ? theme.PRIMARY_TEXT_COLOR : colors.grayColor,
                // letterSpacing: scale(2.22);
              }}>
              {route.title}
            </Text>
          )}
        />
        <View style={{backgroundColor: '#979797'}} />
      </View>
    );
  };

  _renderScene = SceneMap({
    Stylists: this.FirstRoute,
    Nonstylists: this.SecondRoute,
  });

  renderTabView = () => {
    // const { checkData } = this.state;
    // const { theme } = this.props.appTheme;
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        swipeEnabled={true}
      />
    );
  };

  renderDealItem = () => {
    return <Image source={images.deal} style={styles.offerCard} />;
  };

  renderSearchResult = (value: string) => {
    this.setState({
      searchedValue: value,
    });
    const {app_id, indexes, search_key} =
      this.props &&
      this.props.algoliaDetail &&
      this.props.algoliaDetail.algoliaConfig;
    const {searchedValue} = this.state;

    const algoliasearch = require('algoliasearch');

    // {"app_id": "KOTCSEJ6AA", "expires_at": 1583234211, "indexes": {"salon": "prod_salons", "stylist": "prod_stylists"}, "search_key": "c7db91b5a05f50bb6f768519cae7ab8d"}

    const client = algoliasearch(app_id, search_key);
    const index = client.initIndex('prod_salons', 'prod_stylists');

    index
      .search(searchedValue)
      .then(({hits}) => {
        console.log('hits==>', JSON.stringify(hits));
        this.setState({
          searchedSalonList: hits,
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  render() {
    const {searchedValue, searchedSalonList} = this.state;
    // console.log('searchedSalonList', searchedSalonList);
    const {theme} = this.props.appTheme;
    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View>
          <HomeScreenHeader />
          {/* Search */}
          <Search
            value={searchedValue}
            text={'Search for salon, services…'}
            onChangeText={(searchedValue: string) =>
              this.renderSearchResult(searchedValue)
            }
          />
          <ScrollView>
            {/* Render Item Based On Search */}
            {searchedValue === '' ? (
              <View>
                {/* TopSalon Component */}
                <View>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.topStlist,
                        {
                          width: '70%',
                          color: theme.PRIMARY_TEXT_COLOR,
                        },
                      ]}>
                      Top Salons around you
                    </Text>
                    <View style={{width: '30%'}}>
                      <TouchableOpacity>
                        {/* <Text style={[styles.topStlist,{color:theme.PRIMARY_TEXT_COLOR}]}>view all</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={this.keyExtractor}
                    renderItem={() => <TopSalon />}
                    horizontal
                    contentContainerStyle={styles.topStylistContainerStyle}
                  />
                </View>

                {/* TopStylist Component */}
                <View>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.topStlist,
                        {width: '70%', color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      Top Stylist in your area
                    </Text>
                    <View style={{width: '30%'}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.RBSheet.open();
                        }}>
                        {/* <Text style={[styles.topStlist,{color:theme.PRIMARY_TEXT_COLOR}]}>view all</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={this.keyExtractor}
                    renderItem={() => <TopStylist />}
                    horizontal
                    contentContainerStyle={styles.topStylistContainerStyle}
                  />
                </View>

                {/* TopCategories Component */}
                <View>
                  <View style={styles.flexRow}>
                    <Text
                      style={[
                        styles.topStlist,
                        {width: '70%', color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      Top Categories
                    </Text>
                    <View style={{width: '30%'}}>
                      <TouchableOpacity>
                        {/* <Text style={[styles.topStlist,{color:theme.PRIMARY_TEXT_COLOR}]}>view all</Text> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    keyExtractor={this.keyExtractor}
                    renderItem={() => <TopCategory />}
                    horizontal
                    contentContainerStyle={styles.topStylistContainerStyle}
                  />
                </View>

                {/* Deals Component */}
                <Text
                  style={[
                    styles.topStlist,
                    {
                      width: '70%',
                      color: theme.PRIMARY_TEXT_COLOR,
                      marginBottom: scale(20),
                    },
                  ]}>
                  Deals
                </Text>
                <View style={styles.couponCardHolder}>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    renderItem={this.renderDealItem}
                    keyExtractor={this.keyExtractor}
                    data={[1, 2, 3, 4]}
                  />
                </View>
                {/* Deals Component End */}
              </View>
            ) : (
              <View style={styles.searchContainer}>
                {/* Search Data Display by*/}
                <FlatList
                  data={searchedSalonList}
                  keyExtractor={this.keyExtractor}
                  renderItem={(sortedSearchData) => (
                    <SearchData data={sortedSearchData} />
                  )}
                  // horizontal
                  contentContainerStyle={styles.topStylistContainerStyle}
                />
                {/* Search Data Display End*/}
              </View>
            )}

            {/* View All Tab */}
            <RBSheet
              ref={(ref) => {
                this.RBSheet = ref;
              }}
              height={scale(600)}
              duration={250}
              customStyles={{
                container: {
                  borderTopLeftRadius: scale(30),
                  borderTopRightRadius: scale(30),
                  backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                },
              }}>
              {this.renderTabView()}
            </RBSheet>
            {/*  View All Tab End */}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({appTheme = '', algoliaDetail = []}) => ({
  appTheme,
  algoliaDetail,
});

export default connect(mapStatsToProps, {})(searchScreen);
