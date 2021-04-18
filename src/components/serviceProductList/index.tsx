import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import {connect} from 'react-redux';
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {scale} from '../../utils/scale';
// import * as RootNavigation from '../../navigation/rootNavigation';
import CartAdd from '../cartAdd';

const ServiceProductList = (props: any) => {
  const {data, onPress, appTheme} = props;
  let theme = appTheme.theme;
  keyExtractor = (d: any, i: number) => i.toString();

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.container,
        {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}>
      <View style={styles.subContainer}>
        <View style={styles.widthFirst}>
          <View style={styles.innerView}>
            <Image
              source={require('../../assets/productDetails/kerastaseproduct.png')}
              style={styles.styleImageView}
            />
            <View style={styles.subView}>
              <Text
                style={[styles.mainData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                Kerastase Hair Spa
              </Text>
              <Text style={[styles.subData, {color: theme.PRIMARY_TEXT_COLOR}]}>
                Keratin-the protein that
              </Text>

              <View style={styles.genderContainer}>
                <Text
                  style={[
                    styles.genderText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {'\u20B9' + 1500}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.secondView}>
          <View
            style={[
              styles.bookNowbutton,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <CartAdd
              themeType={theme.type}
              backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
              textColor={theme.PRIMARY_TEXT_COLOR}
              // cartCount={val.addedInCart}
              // cartCount={cartVal}
              // cartReduce={() => {
              //   this.cartUpdate('cartReduce');
              // }}
              // cartAdd={() => {
              //   this.cartUpdate('cartAdd');
              // }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
// export default VisitComponent;

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {
  // switchTheme,
})(ServiceProductList);
