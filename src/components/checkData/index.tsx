import React from 'react';
import {View, Text, Image} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
import CustomButton from '../Button';

const DataCheck = (props: any) => {
  const {data, onPress, appTheme} = props;
  let theme = appTheme.theme;
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <Image
        source={require('../../assets/referral/group.png')}
        style={styles.imageContainer}
      />
      <Text>hilla</Text>
      <CustomButton
        btnText={'Enable'}
        onPress={() => {}}
        style={{
          marginTop: 50,
          width: '65%',
          borderRadius: 10,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {})(DataCheck);
