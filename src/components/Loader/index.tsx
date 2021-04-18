import React from 'react';
import {View, Text, ActivityIndicator, StatusBar} from 'react-native';
import Shimmer from 'react-native-shimmer';
import styles from './style';
// import { scale } from '../../utils/scale';
// import { colors } from '../../constants/styles';
import {connect} from 'react-redux';
import {colors} from '../../constants/styles';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

interface IProps {
  appTheme: Object;
}

class Loader extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      dialNumber: '',
    };
  }

  render() {
    const {appTheme} = this.props;
    let theme = appTheme.theme;
    let type = theme.type;
    console.log(type);
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
        {/* <ShimmerPlaceHolder autoRun={true} style={styles.topView}> */}
        <ShimmerPlaceHolder
          autoRun={true}
          style={[styles.topView]}
          colorShimmer={[
            theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            type === 'darkTheme' ? colors.textGrey : 'rgba(52, 52, 52, 0.1)',
          ]}
        />
        <ShimmerPlaceHolder
          autoRun={true}
          style={[
            styles.backColor,
            {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
          ]}
          colorShimmer={[
            theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            type === 'darkTheme' ? colors.textGrey : 'rgba(52, 52, 52, 0.1)',
          ]}
        />
        {/* </ShimmerPlaceHolder> */}
        <ShimmerPlaceHolder
          autoRun={true}
          style={styles.header}
          colorShimmer={[
            theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
            type === 'darkTheme' ? colors.textGrey : 'rgba(52, 52, 52, 0.1)',
          ]}>
          <ShimmerPlaceHolder
            autoRun={true}
            style={[
              styles.backColor,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
            ]}
            colorShimmer={[
              theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
              type === 'darkTheme' ? colors.textGrey : 'rgba(52, 52, 52, 0.1)',
            ]}
          />
        </ShimmerPlaceHolder>
        <View style={styles.listView}>
          {Array(5)
            .fill()
            .map((d, i) => {
              return (
                <ShimmerPlaceHolder
                  colorShimmer={[
                    theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                    type === 'darkTheme'
                      ? colors.textGrey
                      : 'rgba(52, 52, 52, 0.1)',
                  ]}
                  autoRun={true}
                  style={[
                    styles.list,
                    {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                  ]}>
                  {/* <ShimmerPlaceHolder
                  autoRun={true}
                  // visible={true}
                  style={[
                    styles.backColor,
                    {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                  ]}
                /> */}
                </ShimmerPlaceHolder>
              );
            })}
        </View>
        <View style={styles.subView}>
          {Array(2)
            .fill()
            .map((d, i) => {
              return (
                <View style={styles.mainView}>
                  <ShimmerPlaceHolder
                    colorShimmer={[
                      theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                      type === 'darkTheme'
                        ? colors.textGrey
                        : 'rgba(52, 52, 52, 0.1)',
                    ]}
                    autoRun={true}
                    style={styles.leftView}>
                    <View
                      style={[
                        styles.backColor,
                        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
                      ]}
                    />
                  </ShimmerPlaceHolder>
                  <View style={styles.rightView}>
                    <ShimmerPlaceHolder
                      colorShimmer={[
                        theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                        type === 'darkTheme'
                          ? colors.textGrey
                          : 'rgba(52, 52, 52, 0.1)',
                      ]}
                      autoRun={true}
                      style={styles.section1}>
                      <View
                        style={[
                          styles.subViewBack,
                          {
                            backgroundColor:
                              theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                          },
                        ]}
                      />
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                      colorShimmer={[
                        theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                        type === 'darkTheme'
                          ? colors.textGrey
                          : 'rgba(52, 52, 52, 0.1)',
                      ]}
                      autoRun={true}
                      style={styles.section2}>
                      <View
                        style={[
                          styles.subViewBack,
                          {
                            backgroundColor:
                              theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                          },
                        ]}
                      />
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                      colorShimmer={[
                        theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                        type === 'darkTheme'
                          ? colors.textGrey
                          : 'rgba(52, 52, 52, 0.1)',
                      ]}
                      autoRun={true}
                      style={styles.section3}>
                      <View
                        style={[
                          styles.subViewBack,
                          {
                            backgroundColor:
                              theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                          },
                        ]}
                      />
                    </ShimmerPlaceHolder>
                  </View>
                </View>
              );
            })}
        </View>
        <Text
          style={[
            styles.textStyle,
            {color: theme.PRIMARY_TEXT_COLOR},
          ]}>{`"Life is too short to have Bad Hair"`}</Text>
        <View
          style={[styles.line, {backgroundColor: theme.PRIMARY_TEXT_COLOR}]}
        />
        {/* <View style={styles.circle} /> */}
        <ActivityIndicator
          size={'large'}
          style={styles.circle}
          color={colors.orangeText}
        />
      </View>
    );
  }
}

const mapStatsToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStatsToProps)(Loader);
