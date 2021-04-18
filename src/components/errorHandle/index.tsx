import React from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import styles from './style';
import CustomButton from '../Button';

// import { scale } from '../../utils/scale';
// import { colors } from '../../constants/styles';
import {connect} from 'react-redux';
import errorHandle from '../../assets/errorHandle';
interface IProps {
  appTheme: Object;
}

class ErrorHandle extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const {
      appTheme,
      data,
      buttonName = '',
      errorName = '',
      errorDetail = '',
      errorImage = '',
      onPress = '',
    } = this.props;
    // let image = `${errorHandle}.${errorImage}`;
    console.log(errorImage);
    let theme = appTheme.theme;
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        <StatusBar
          translucent
          backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
        />
        <Image source={errorHandle[errorImage]} />
        <Text style={[styles.errorNameText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {errorName}
        </Text>
        <Text style={[styles.errorDescText, {color: theme.PRIMARY_TEXT_COLOR}]}>
          {errorDetail}
        </Text>
        <CustomButton
          style={styles.customViewMoreButton}
          btnText={buttonName}
          onPress={onPress}
        />
      </View>
    );
  }
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(ErrorHandle);
