import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { colors } from '../../constants/styles';
import { scale } from '../../utils/scale';
import styles from './style';


const ListWalletHistory = (props: any) => {
  const {appTheme, data = ''} = props;
  const {rewardTitle = '', orderId = '', rewardAmount = ''} = data.item;
  let theme = appTheme.theme;
  let type = appTheme.theme.type;

  return (
    <View
      style={[
        styles.renderCategoryItemContainer,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
        // {backgroundColor: 'red'},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignContent: 'space-between',
          marginHorizontal: scale(16),
          alignItems: 'center',
          // paddingVertical: scale(5),
        }}>
        <View style={{width: '70%'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.symbol, {color: theme.PRIMARY_TEXT_COLOR}]}>
              {`₹ `}
            </Text>
            <Text style={[styles.priceData, {color: theme.PRIMARY_TEXT_COLOR}]}>
              2,200
            </Text>
          </View>
          {/* <Text style={styles.pointsData}>2652 points</Text> */}
        </View>
        <TouchableOpacity
          style={[
            styles.rewardButton,
            {
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
            },
          ]}>
          <Icon
            name={'star'}
            size={15}
            color={colors.orangeBorder}
            style={{marginHorizontal: scale(5)}}
          />
          <Text style={[styles.rewardTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {'Rewards'}
          </Text>
          {/* <Text style={[styles.orderId]}>{`Orders` + orderId}</Text> */}
        </TouchableOpacity>
        {/* <View style={{width: '25%', alignSelf: 'center'}}>
          <Text style={[styles.rewardAmount]}>{`+ ₹` + rewardAmount}</Text>
        </View> */}
      </View>
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(ListWalletHistory);
