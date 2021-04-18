import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';

import styles from './style';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from '../../utils/scale';
import {AppVersion} from '../../utils/api-configuration';

const SplashScreen = (props: any) => {
  const {appTheme} = props;
  let theme = appTheme.theme;
  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <StatusBar
        backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
        barStyle={theme.type === 'darkTheme' ? 'light-content' : 'dark-content'}
      />
      <Image
        source={require('../../assets/splashScreen/looks.png')}
        style={[
          styles.splashImage,
          {tintColor: theme.type === 'darkTheme' ? '#FFF' : '#000'},
        ]}
      />
      <View style={{position: 'absolute', bottom: scale(60)}}>
        <Text style={styles.powerdText}>Powered by</Text>
        <Image
          source={require('../../assets/splashScreen/logo.png')}
          style={styles.splashImage1}
        />
        <Text style={styles.versionName}>{AppVersion}</Text>
        {/* <View style={styles.logoPosition}></View> */}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {},
)(SplashScreen);
