import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {scale} from '../../utils/scale';
import {connect} from 'react-redux';
import styles from './styles';
import {colors} from '../../constants/styles';
const ScreenHeader = (props: any) => {
  const {
    onPress = '',
    screenTitle = '',
    appTheme,
    align = '',
    titleColor = '',
    backArrowColor = '',
    share = '',
  } = props;
  let theme = appTheme.theme;
  return (
    <View style={[align === 'left' ? styles.leftTitle : styles.header, {}]}>
      <StatusBar translucent backgroundColor={theme.PRIMARY_BACKGROUND_COLOR} />
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.backButton,
          {
            backgroundColor: backArrowColor ? backArrowColor : `#D4D4D4`,
          },
        ]}>
        <Icon name={'arrow-left'} size={scale(22)} color={'#282828'} />
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color:
              titleColor === 'grey'
                ? colors.grayBorder
                : theme.PRIMARY_TEXT_COLOR,
            marginLeft: align === 'left' ? scale(55) : 0,
            marginTop: align === 'left' ? 10 : 0,
          },
        ]}>
        {screenTitle}
      </Text>
      {share === true && (
        <Icon
          name={'link'}
          size={scale(22)}
          color={theme.PRIMARY_TEXT_COLOR_LIGHT}
          style={{position: 'absolute', right: scale(5)}}
        />
      )}
    </View>
  );
};

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(ScreenHeader);
