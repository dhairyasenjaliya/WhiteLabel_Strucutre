import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './style';
import images from '../../assets/images';
import ServiceProductList from '../serviceProductList';
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/rootNavigation';
import CartAdd from '../cartAdd';
import {scale} from '../../utils/scale';
import {
  addServiceInCart,
  getAvailableStylist,
  addServiceUuidMaster,
  checkServiceType,
} from '../../store/cartList/actions';
import {viewCart} from '../../store/cartCheckout/actions';
import {colors} from '../../constants/styles';

interface IProps {
  addServiceInCart: Function;
  getAvailableStylist: Function;
  addServiceUuidMaster: Function;
  appTheme: [];
  data: [];
  verticalText: String;
  category_convert: [];
  viewCart: Function;
  checkServiceType: Function;
}

interface IState {}
class ServiceList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  addThisService = (data, stylistAvailable) => {
    const {salonDetail, addServiceUuidMaster, checkServiceType} = this.props;

    // console.log('stylistAvailable', stylistAvailable);

    let salonId = salonDetail.salonDetail.uuid;
    let serviceId = data.uuid;
    let productAdd = {
      productUuid: serviceId,
      product: false,
    };
    addServiceUuidMaster(productAdd);
    let dataChcek = {
      variation_uuid: null,
      service_uuid: serviceId,
    };
    // console.log('OHHH YEAH', data);
    this.props.addServiceInCart(data);

    let localCheck = {
      subService: data,
      service_uuid: serviceId,
    };

    checkServiceType(localCheck);
    if (!stylistAvailable) {
      this.props.getAvailableStylist(salonId, serviceId, dataChcek);
    }
  };

  checkIfServiceIsInCart = (serviceId: String) => {
    const {cartCheckout = ''} = this.props;
    const {viewCart = ''} = cartCheckout;
    const {items = ''} = viewCart;
    let check = 0;
    items &&
      items.map((data: any) => {
        const {service = ''} = data;
        const {uuid = '', name = ''} = service;
        // check = serviceId === uuid ? 1 : 0;
        if (serviceId === uuid) {
          check = 1;
        }
      });
    return check;
  };

  render() {
    const {
      appTheme,
      data = '',
      verticalText = '',
      category_convert = '',
      cartList,
      onPress = '',
      stylistAvailable = '',
      serviceList = '',
      hideService,
      hideStatus,
      searchName,
    } = this.props;

    const {categoryLocal = ''} = category_convert;
    const {category = '', items = ''} = data;
    // console.log('meow=====>', category);

    let datassss = items
      .filter((item) => item.name.includes(searchName))
      .map(
        ({name, duration_minutes, price, served_gender, uuid, variations}) => ({
          name,
          duration_minutes,
          price,
          served_gender,
          uuid,
          variations,
        }),
      );

    let dataSize = datassss && datassss.length;
    let unableButton = true;
    let theme = appTheme.theme;

    // console.log('eheh', dataSize);

    return (
      <View style={styles.container}>
        {dataSize !== 0 && (
          <View
            style={[
              styles.textHorizontalContainer,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <TouchableOpacity onPress={hideService}>
              <View
                style={[
                  styles.rotateTextContain,
                  {
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT,
                    borderColor:
                      theme.type === 'darkTheme'
                        ? colors.stylistName
                        : colors.greyHomeBorder,
                  },
                ]}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.rotateText,
                    {color: theme.PRIMARY_TEXT_COLOR},
                  ]}>
                  {category && category}
                  {categoryLocal && categoryLocal}
                </Text>

                <Icon
                  name={hideStatus ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.orangeBorder}
                />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* {dataSize === 0 && <Text>No results found</Text>} */}

        {hideStatus && (
          <View style={[styles.flexDir, verticalText && {height: scale(300)}]}>
            <View style={styles.secondContainer}>
              <View>
                {datassss &&
                  datassss.map((d, i) => {
                    const {
                      name = '',
                      price = '',
                      served_gender = '',
                      duration_minutes = '',
                      products = '',
                      variations = '',
                      uuid = '',
                    } = d;
                    const {price_net = ''} = price;
                    unableButton = variations == '' ? true : true;
                    let checkCart = this.checkIfServiceIsInCart(uuid);
                    let length = variations && variations.length;
                    return (
                      <View style={styles.secondSubContain}>
                        <View style={styles.heightSpace}>
                          <Text
                            style={[
                              styles.nameOfService,
                              {color: theme.PRIMARY_TEXT_COLOR},
                            ]}>
                            {name}
                          </Text>
                          <View style={styles.flex}>
                            <Text
                              style={[
                                styles.priceService,
                                {color: theme.PRIMARY_TEXT_COLOR},
                              ]}>
                              ₹ {price_net}
                            </Text>
                            <Text style={[styles.duration_min]}>
                              {duration_minutes + ` mins`}
                            </Text>
                          </View>

                          {/* {variations && (
                          <FlatList
                            data={variations}
                            contentContainerStyle={{
                              marginVertical: scale(10),
                            }}
                            renderItem={variations => {
                              const {type = ''} = variations.item;
                              if (type === 'PRODUCT') {
                                return (
                                  <ServiceProductList
                                    data={variations}
                                    serviceData={d}
                                    onPress={() => {
                                      onPress();
                                    }}
                                  />
                                );
                              } else {
                                null;
                              }
                            }}
                          />
                        )} */}
                        </View>

                        <View style={{position: 'absolute', right: scale(5)}}>
                          {!serviceList && unableButton && (
                            <CartAdd
                              themeType={theme.type}
                              backgroundColor={theme.PRIMARY_BACKGROUND_COLOR}
                              textColor={theme.PRIMARY_TEXT_COLOR}
                              cartCount={checkCart}
                              onPress={() => {
                                onPress();
                                this.addThisService(d, stylistAvailable);
                              }}
                            />
                          )}
                          {variations && variations.length != 0 && (
                            <Text
                              style={[
                                styles.customizeText,
                                // {color: theme.PRIMARY_TEXT_COLOR},
                              ]}>
                              {`customisable`}
                            </Text>
                          )}
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  appTheme = '',
  cartList = [],
  salonDetail = [],
  cartCheckout = [],
}) => ({
  appTheme,
  cartList,
  salonDetail,
  cartCheckout,
});

export default connect(mapStateToProps, {
  addServiceInCart,
  getAvailableStylist,
  addServiceUuidMaster,
  viewCart,
  checkServiceType,
})(ServiceList);
