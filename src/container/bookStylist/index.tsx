/* eslint-disable no-shadow */
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Search from '../../components/CustomSearch';
import styles from './style';
import {connect} from 'react-redux';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

import {scale} from '../../utils/scale';
import {colors, fonts} from '../../constants/styles';
import * as RootNavigation from '../../navigation/rootNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScreenHeader from '../../components/ScreenHeader';
import StylistList from '../../components/stylistList';

interface IProps {
  navigation: any;
  data: any;
  appTheme: any;
}

interface Istate {
  searchedValue: String;
  index: Number;
  routes: Object;
  selectedGender: String;
}

// const _ = require('lodash');

// let sortedSearchData = _.orderBy(searchData, ['type', 'type'], ['desc', 'asc']);

// Logic For Search
// var string = 'foo',
// substring = 'oo';
// console.log(string.includes(substring));

class serviceList extends React.Component<IProps, Istate> {
  TimeSheet: any;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedGender: 'M',
      index: 0,
      routes: [
        {key: 'Stylists', title: 'Stylists'},
        {key: 'Nonstylists', title: 'Non Stylists'},
      ],
      searchedValue: '',
    };
  }

  componentDidMount() {}

  _handleIndexChange = (index: any) => this.setState({index});

  FirstRoute = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {personnels = '', basic = '', uuid = ''} = salonDetail;
    const {searchedValue = ''} = this.state;
    // console.log('personnels', JSON.stringify(personnels));
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.appTheme.theme.PRIMARY_BACKGROUND_COLOR,
          },
        ]}>
        <FlatList
          data={personnels}
          renderItem={({item}) => {
            const {basic = []} = item;
            const {name_first = ''} = basic;
            let datassss = name_first.includes(searchedValue);
            if (datassss) {
              return (
                <StylistList
                  data={item}
                  salonId={uuid}
                  searchName={searchedValue}
                />
              );
            }
          }}
          contentInset={{bottom: scale(300)}}
        />
      </View>
    );
  };
  SecondRoute = () => {
    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {personnels = '', basic = '', uuid = ''} = salonDetail;
    const {searchedValue = ''} = this.state;

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: this.props.appTheme.theme.PRIMARY_BACKGROUND_COLOR,
          },
        ]}>
        <FlatList
          data={personnels}
          renderItem={({item}) => {
            const {basic = []} = item;
            const {name_first = ''} = basic;
            let datassss = name_first.includes(searchedValue);
            if (datassss) {
              return <StylistList data={item} salonId={uuid} />;
            }
          }}
          contentInset={{bottom: scale(300)}}
        />
      </View>
    );
  };

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
            backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
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

  // _renderScene = SceneMap({
  //   Stylists: this.FirstRoute,
  //   Nonstylists: this.SecondRoute,
  // });

  renderTabView = () => {
    // const { checkData } = this.state;
    // const { theme } = this.props.appTheme;
    return (
      <TabView
        navigationState={this.state}
        // renderScene={this._renderScene}
        renderScene={({route}) => {
          switch (route.key) {
            case 'Stylists':
              return this.FirstRoute();
            case 'Nonstylists':
              return this.SecondRoute();
          }
        }}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        swipeEnabled={true}
      />
    );
  };

  renderSearchResult = (data: String) => {
    this.setState({
      searchedValue: data,
    });
  };

  render() {
    const {searchedValue, selectedGender} = this.state;
    const {theme} = this.props.appTheme;

    let salonDetail =
      this.props &&
      this.props.salonDetail &&
      this.props.salonDetail.salonDetail;
    const {personnels = '', basic = '', uuid = ''} = salonDetail;
    const {name = '', location = []} = basic;
    const {micro_market = []} = location;

    return (
      <SafeAreaView
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <View>
          <View style={{marginBottom: scale(20)}}>
            <ScreenHeader
              onPress={() => this.props.navigation.goBack()}
              // screenTitle={'Booking Summary'}
            />
          </View>

          {/* Salon Detail */}
          <View style={styles.salonDetainContainer}>
            <Text style={[styles.salonName, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {name}
            </Text>
            <Text style={[styles.locationText]}>
              {micro_market && micro_market.name}
            </Text>
          </View>

          {/* Salon Detail End */}
          {/* Search */}
          <Search
            value={searchedValue}
            clear={searchedValue ? true : false}
            clearText={() => this.renderSearchResult('')}
            text={'Search for stylist ... '}
            onChangeText={(searchedValue: String) =>
              this.renderSearchResult(searchedValue)
            }
          />
          {/* Search End */}
        </View>
        {/* Gender Select  */}
        <View style={styles.genderContain}>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedGender: 'M'});
            }}
            style={[
              styles.genderButton,
              {
                borderWidth: selectedGender === 'M' ? 1 : 0,
                borderColor: colors.lightOrange,
                backgroundColor:
                  selectedGender === 'M'
                    ? theme.PRIMARY_BACKGROUND_COLOR
                    : theme.type === 'darkTheme'
                    ? colors.touchpadColor
                    : colors.greyHomeBorder,
              },
            ]}>
            <Icon
              name="mars"
              size={scale(20)}
              style={styles.genderIcon}
              color={
                selectedGender === 'M' ? colors.lightOrange : colors.stylistName
              }
            />
            <Text
              style={[
                styles.genderText,
                {
                  color:
                    selectedGender === 'M'
                      ? theme.PRIMARY_TEXT_COLOR
                      : colors.stylistName,
                },
              ]}>
              For Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setState({selectedGender: 'F'});
            }}
            style={[
              styles.femaleButton,
              {
                borderColor: colors.lightOrange,
                borderWidth: selectedGender === 'F' ? 1 : 0,
                backgroundColor:
                  selectedGender === 'F'
                    ? theme.PRIMARY_BACKGROUND_COLOR
                    : theme.type === 'darkTheme'
                    ? colors.touchpadColor
                    : colors.greyHomeBorder,
              },
            ]}>
            <Icon
              name="venus"
              size={scale(20)}
              style={[
                styles.genderIcon,
                {marginLeft: scale(12), marginRight: scale(8)},
              ]}
              color={
                selectedGender === 'F' ? colors.lightOrange : colors.stylistName
              }
            />
            <Text
              style={[
                styles.genderText,
                {
                  color:
                    selectedGender === 'F'
                      ? theme.PRIMARY_TEXT_COLOR
                      : colors.stylistName,
                },
              ]}>
              For Female
            </Text>
          </TouchableOpacity>
        </View>
        {/* Gender Select End */}

        {/* Tabs */}

        <View
          style={[
            styles.subContainer,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              // shadowColor: theme.NAVIGATION_SHADOW,
            },
          ]}>
          {this.renderTabView()}
        </View>
        {/* Tabs End */}
      </SafeAreaView>
    );
  }
}

const mapStatsToProps = ({
  appTheme = '',
  algoliaDetail = [],
  salonDetail = [],
}) => ({
  appTheme,
  algoliaDetail,
  salonDetail,
});

export default connect(
  mapStatsToProps,
  {},
)(serviceList);
