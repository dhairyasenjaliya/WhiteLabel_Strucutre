import React from 'react';
import Moment from 'moment';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';

const VisitComponent = (props: any) => {
  const {data, onPress, appTheme} = props;

  const {
    uuid = '',
    basic = [],
    items = [],
    personnel = [],
    salon = [],
    details = [],
  } = data;
  let salonDetail = salon && salon.basic;
  let stylistDetail = personnel && personnel.basic;
  const {state = '', date = '', time = []} = basic;
  const {start = ''} = time;
  const {
    name = '',
    location = [],
    timing = [],
    rating_avg = '',
    rating_count = '',
    logo = '',
  } = salonDetail;

  const {
    name_first = '',
    name_last = '',
    rank = '',
    images = [],
    profile_pic = '',
  } = stylistDetail;

  const {service = []} = details;
  const {price = [], duration_minutes = []} = service;
  const {price_net = ''} = price;
  let serviceName = service && service.name;

  let hour = start && start.substring(0, 2);
  let minute = start && start.substring(2, 5);
  let AmOrPm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;

  // console.log('stylistDetail', stylistDetail);

  let stylistImage = images && images.MAIN[0] && images.MAIN[0].url;
  let salonImage =
    salonDetail &&
    salonDetail.images &&
    salonDetail.images.MAIN[0] &&
    salonDetail.images.MAIN[0].url;

  let theme = appTheme.theme;

  return (
    <TouchableOpacity
      onPress={() =>
        RootNavigation.navigate('appointmentdetails', {
          successAnimation: false,
          bookingId: uuid,
        })
      }
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <View style={styles.subContainer}>
        <View style={styles.widthFirst}>
          <View style={styles.innerView}>
            {/* <Image source={{uri: logo}} style={styles.styleImageView} /> */}
            <View style={{alignItems: 'center'}}>
              <FastImage
                style={styles.styleImageView}
                source={{
                  uri: profile_pic ? profile_pic : logo,
                  // headers: { Authorization: 'someAuthToken' },
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <Text style={styles.duretionText}>
                {duration_minutes + 'mins'}
              </Text>
            </View>
            <View style={styles.subView}>
              <Text
                style={[styles.mainData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {name_first}
              </Text>
              <Text style={[styles.subData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {serviceName}
              </Text>
              {/* {data.key == 'a' ? (
                <View style={styles.dataContainer}>
                  <Text style={styles.rateContainer}>{`Rated`}</Text>
                  <View style={styles.rateSubContain}>
                    <MIcon
                      name={'star'}
                      color={'#ED8A19'}
                      size={15}
                      style={{marginHorizontal: 4}}
                    />
                    <Text
                      style={[
                        styles.rateText,
                        {color: theme.PRIMARY_TEXT_COLOR},
                      ]}>
                      4.3
                    </Text>
                  </View>
                </View>
              ) : (
                <Text
                  style={[
                    styles.priceData,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>{`₹ ${price_net}`}</Text>
              )} */}
              <Text
                style={[
                  styles.timeData,
                  {color: theme.PRIMARY_TEXT_COLOR},
                ]}>{`${hour + minute + ` ` + AmOrPm} at ${Moment(date).format(
                'DD MMMM YYYY',
              )}`}</Text>
            </View>
          </View>
        </View>

        <View style={styles.secondView}>
          {/* <Image source={{uri: stylistImage}} style={styles.rightImage} /> */}
          {/* <FastImage
            style={styles.rightImage}
            source={{
              uri: stylistImage,
               priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text
            style={[
              styles.rightMainTextElement,
              {color: theme.PRIMARY_TEXT_COLOR},
            ]}>
            {name_first}
          </Text>
          <Text style={styles.rightText}>{rank}</Text> */}
          <View style={styles.stateButton}>
            <Text style={styles.rightSubTextElement}>{state}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomLine} />
    </TouchableOpacity>
  );
};
// export default VisitComponent;

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {
    // switchTheme,
  },
)(VisitComponent);
