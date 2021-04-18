import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {colors} from '../../constants/styles';

const CustomSearch = (props: any) => {
  const {
    text = ' ',
    appTheme,
    onChangeText,
    value,
    clear = '',
    clearText = '',
    backcolor = '',
  } = props;
  let theme = appTheme.theme;
  return (
    <View style={[styles.container]}>
      <View
        style={[
          styles.SectionStyle,
          {
            backgroundColor: backcolor
              ? colors.whitePrimary
              : theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            borderColor:
              theme.type === 'darkTheme'
                ? colors.stylistName
                : colors.greyHomeBorder,
          },
        ]}>
        <Icon
          name="search"
          size={20}
          style={styles.ImageStyle}
          color={'#797979'}
        />
        <TextInput
          value={value}
          // eslint-disable-next-line no-shadow
          onChangeText={(value: String) => onChangeText(value)}
          style={[
            styles.input,
            {
              backgroundColor: backcolor
                ? colors.whitePrimary
                : theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              color: theme.PRIMARY_TEXT_COLOR,
            },
          ]}
          placeholder={text}
          placeholderTextColor={'#797979'}
        />
        {clear && (
          <TouchableOpacity onPress={clearText}>
            <Image
              style={[styles.ImageStyle2, {tintColor: '#797979'}]}
              source={require('../../assets/component/circleClose.png')}
            />
            {/* <Icon
              name="times-circle"
              size={20}
              style={styles.ImageStyle2}
              color={theme.PRIMARY_TEXT_COLOR_LIGHT}
            /> */}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStatsToProps,
  {},
)(CustomSearch);
