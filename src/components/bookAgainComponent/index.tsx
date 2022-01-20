import { Image, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import images from '../../assets/images';
import styles from './style';


const BookAgain = (props: any) => {
  const {appTheme, data = ''} = props;
  const {name = '', type = '', bookingDate = ''} = data.item;
  let theme = appTheme.theme;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        // {backgroundColor: theme.PRIMARY_BACKGROUND_COLOR},
      ]}
      // onPress={() => RootNavigation.navigate('stylishDetails', {})}
    >
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image style={styles.img} source={images.artist2} />
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
          }}>
          <Text style={[styles.name, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {name}
          </Text>
          <Text style={[styles.type, {color: theme.PRIMARY_TEXT_COLOR}]}>
            {type}
          </Text>
          <Text style={[styles.bookingDate]}>{bookingDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = ({appTheme = ''}) => ({
  appTheme,
});

export default connect(mapStateToProps, {})(BookAgain);
