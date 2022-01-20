import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../constants/styles';
import { viewCart } from '../../store/cartCheckout/actions';
import {
    addServiceInCart, addServiceUuidMaster,
    checkServiceType, getAvailableStylist
} from '../../store/cartList/actions';
import { scale } from '../../utils/scale';
import CartAdd from '../cartAdd';
import styles from './style';


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
class ServiceSearchList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  addThisService = (data, stylistAvailable) => {
    const {salonDetail, addServiceUuidMaster, checkServiceType} = this.props;

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
      searchName,
      backColor,
    } = this.props;

    const {categoryLocal = ''} = category_convert;
    const {category = '', items = ''} = data;

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
    let length = datassss && datassss.length !== 0 ? true : false;
    // console.log(datassss.length);
    let unableButton = true;
    let theme = appTheme.theme;

    return (
      <View style={styles.container}>
        {/* <View
            style={[
              styles.textHorizontalContainer,
              {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
            ]}>
            <View
              style={[
                styles.rotateTextContain,
                {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR_LIGHT},
              ]}>
              <Text
                numberOfLines={1}
                style={[styles.rotateText, {color: theme.PRIMARY_TEXT_COLOR}]}>
                {category && category}
                {categoryLocal && categoryLocal}
              </Text>
            </View>
          </View> */}
        <View style={[styles.flexDir]}>
          <View style={styles.secondContainer}>
            <View>
              {/* data = data.filter((item) => item.state == 'New York').map(({id, name, city}) => ({id, name, city})); */}

              {length ? (
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
                            {
                              color: backColor
                                ? colors.blackPrimary
                                : theme.PRIMARY_TEXT_COLOR,
                            },
                          ]}>
                          {name}
                        </Text>
                        <View style={styles.flex}>
                          <Text
                            style={[
                              styles.priceService,
                              {
                                color: backColor
                                  ? colors.blackPrimary
                                  : theme.PRIMARY_TEXT_COLOR,
                              },
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
                            check={true}
                            themeType={theme.type}
                            backgroundColor={colors.whitePrimary}
                            textColor={colors.blackPrimary}
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
                })
              ) : (
                <View style={styles.staticHeight} />
              )}
            </View>
          </View>
        </View>
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
})(ServiceSearchList);
