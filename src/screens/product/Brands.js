import React, {useState} from 'react';
import {Text, Image, FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {CustomHeader, MyTouchableOpacity} from '../../components';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function Brands(props) {
  const {navigation} = props;
  const {Brands} = useSelector(state => state.home);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const onNextBtnPress = () => {
    if (selectedBrand === null) {
      showSimpleMessage('warning', {
        message: 'Please select brand!',
      });
      return;
    }

    navigation.navigate(SCREENS.ProductsByType, {
      type: 'brand',
      _id: selectedBrand?._id,
    });
  };

  const renderItem = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={styles.brandViewStyle}
      onPress={() => setSelectedBrand(item)}>
      <Image
        resizeMode="contain"
        source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image}}
        style={[
          styles.brandImgStyle,
          {
            tintColor:
              selectedBrand?.title === item.title
                ? COLORS.primary
                : COLORS.black,
          },
        ]}
      />
      <Text
        style={[
          FONTS.mediumFont12,
          styles.brandTextStyle,
          {
            color:
              selectedBrand?.title === item.title
                ? COLORS.primary
                : COLORS.black,
          },
        ]}>
        {item.title}
      </Text>
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader
        showBackButton
        showNextBtn
        title="All Brands"
        onNextBtnPress={onNextBtnPress}
      />

      <FlatList
        numColumns={3}
        data={Brands}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatlistStyle: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: height * 0.015,
    paddingHorizontal: SIZES.fifteen,
  },
  brandViewStyle: {
    flex: 1 / 3,
    alignItems: 'center',
    paddingBottom: SIZES.fifteen,
    marginBottom: SIZES.fifteen,
  },
  brandImgStyle: {
    height: SIZES.twentyFive * 1.8,
    width: SIZES.twentyFive * 1.8,
  },
  brandTextStyle: {
    marginTop: SIZES.ten,
    textAlign: 'center',
    width: SIZES.twentyFive * 3,
  },
});

const categoriesList = [
  {
    title: 'Women Fashion',
    image: IMAGES.highHeelsOutline,
  },
  {
    title: 'Men Fashion',
    image: IMAGES.suitsOutline,
  },
  {
    title: 'Men/Women Watches',
    image: IMAGES.watchOutline,
  },
  {
    title: 'Jewellery Collection',
    image: IMAGES.necklaceOutline,
  },
  {
    title: 'Kids Fashion',
    image: IMAGES.bibOutline,
  },
];
