import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
// import * as RootNavigation from '../../navigation/rootNavigation';

const ComplimentSlider = (props: any) => {
  const {appTheme, data} = props;
  let theme = appTheme.theme;
  return (
    <TouchableOpacity
      style={styles.container}
      // onPress  ={ () => RootNavigation.navigate('stylishDetails',{}) }
    >
      <Image
        style={styles.img}
        source={
          (data.icon === 'outstanding' && images.outstanding) ||
          (data.icon === 'attitude' && images.attitude) ||
          (data.icon === 'conversation' && images.conversation)
        }
      />
      <View style={styles.ratingContain}>
        <Text style={styles.ratingPosition}>{data.rating}</Text>
      </View>
      {/* <Text
        numberOfLines={2}
        style={[styles.name, {color: theme.PRIMARY_TEXT_COLOR}]}>
        {data.title.replace(' ', '\n')}
      </Text> */}
    </TouchableOpacity>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {})(ComplimentSlider);
