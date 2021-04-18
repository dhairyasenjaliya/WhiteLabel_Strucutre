import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../utils/scale';

const CurrentOffers = (props: any) => {
  const {appTheme, data = ''} = props;
  const {offerDiscount = '', offerDetils = ''} = data.item;
  let theme = appTheme.theme;
  // let type = appTheme.theme.type;
  return (
    <View
      style={[
        styles.renderCategoryItemContainer,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <View style={styles.rowComponent}>
        <View
          style={[
            styles.commonContainer,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <Text style={[styles.offerDiscount]}>{offerDiscount}</Text>
          <Text style={[styles.offerDiscount]}>{`OFF`}</Text>
        </View>
        <View
          style={[
            styles.commonContainer,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
          ]}>
          <Text style={[styles.offerDetail, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {`Use ` + offerDetils + ` to`}
          </Text>
          <Text style={[styles.offerDetail, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {`avail offer`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(CurrentOffers);
