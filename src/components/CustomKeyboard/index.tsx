import React from 'react';
import {TouchableHighlight, Text, View, TouchableOpacity} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import {scale} from '../../utils/scale';
import {colors} from '../../constants/styles';
import {connect} from 'react-redux';
export interface IProps {
  _onKeyPresss: () => {};
  appTheme: Object;
}

interface IState {
  keyboardData: Array<Object>;
}

class CustomKeyboard extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      keyboardData: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '10'],
    };
  }

  render() {
    const {keyboardData} = this.state;
    const {_onKeyPresss, appTheme} = this.props;
    let theme = appTheme.theme;
    return (
      <View
        style={[
          styles.touchPad,
          {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
        ]}>
        {keyboardData.map((d: any) => {
          return (
            <TouchableOpacity
              // underlayColor={colors.darkOrange}
              onPress={() => _onKeyPresss(d)}
              style={styles.touchPadButton}>
              {d !== '10' ? (
                // <View style = { { backgroundColor:d !== '10'  ? '#FFF' : colors.darkOrange , padding:5 ,borderRadius:140 ,width:'40%' ,alignContent:'center' ,alignItems:'center'}}>
                <Text
                  style={[
                    styles.touchpadText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {d}
                </Text>
              ) : (
                // </View>
                <MIcon
                  name={'window-close'}
                  size={scale(25)}
                  color={colors.grayBorder}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(CustomKeyboard);
