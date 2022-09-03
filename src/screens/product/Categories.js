import React, {useCallback, useState} from 'react';
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

export default function Categories(props) {
  const {navigation} = props;
  const {Categories} = useSelector(state => state.home);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onNextBtnPress = () => {
    if (selectedCategory === null) {
      showSimpleMessage('warning', {
        message: 'Please select category!',
      });
      return;
    }

    navigation.navigate(SCREENS.ProductsByType, {
      type: 'category',
      _id: selectedCategory?._id,
    });
  };

  const renderItem = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={styles.categoryViewStyle}
      onPress={() => setSelectedCategory(item)}>
      <Image
        resizeMode="contain"
        source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image}}
        style={[
          styles.categoryImgStyle,
          {
            tintColor:
              selectedCategory?.title === item.title
                ? COLORS.primary
                : COLORS.black,
          },
        ]}
      />
      <Text
        style={[
          FONTS.mediumFont12,
          styles.categoryTextStyle,
          {
            color:
              selectedCategory?.title === item.title
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
        title="All Categories"
        onNextBtnPress={onNextBtnPress}
      />

      <FlatList
        numColumns={3}
        data={Categories}
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
  categoryViewStyle: {
    flex: 1 / 3,
    alignItems: 'center',
    paddingBottom: SIZES.fifteen,
    marginBottom: SIZES.fifteen,
  },
  categoryImgStyle: {
    height: SIZES.twentyFive * 1.7,
    width: SIZES.twentyFive * 1.7,
  },
  categoryTextStyle: {
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
