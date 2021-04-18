import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

import styles from './style';
import images from '../../assets/images';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';

const ListCategory = (props: any) => {
  const {appTheme, data = ''} = props;
  const {icon = '', title = ''} = data.item;
  let theme = appTheme.theme;
  let type = appTheme.theme.type;

  return (
    <View style={[styles.renderCategoryItemContainer]}>
      <Image
        source={type === 'lightTheme' ? icon + 1 : icon}
        // source={icon}
        style={[styles.categoryIcon]}
      />
      {/* <Text style={[styles.categoryTitle, {color: theme.PRIMARY_TEXT_COLOR}]}>
        {title}
      </Text> */}
    </View>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(
  mapStateToProps,
  {
    // switchTheme,
  },
)(ListCategory);
