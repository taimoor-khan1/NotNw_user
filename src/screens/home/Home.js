import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useRef} from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';
import {
  CustomHeader,
  SeeAllComp,
  ProductComp,
  SearchBar,
  FilterModal,
  CustomCarousel,
  MyTouchableOpacity,
} from '../../components';
import {useSelector} from 'react-redux';

export default function Home(props) {
  const {navigation} = props;
  const filterModalizeRef = useRef(null);

  const {Categories, Brands, ProductList, banners} = useSelector(
    state => state.home,
  );

  // useFocusEffect(
  //   useCallback(() => {
  //     StatusBar.setBarStyle('dark-content');
  //     Platform.OS === 'android' && StatusBar.setTranslucent(false);
  //     Platform.OS === 'android' && StatusBar.setBackgroundColor(COLORS.white);
  //   }, []),
  // );

  const RenderCategoryList = () => (
    <View style={{paddingVertical: SIZES.twentyFive}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: SIZES.fifteen}}>
        {Categories?.map((item, index) => (
          <MyTouchableOpacity
            key={index}
            style={styles.categoryViewStyle}
            onPress={() =>
              navigation.navigate(SCREENS.ProductsByType, {
                type: 'category',
                _id: item._id,
              })
            }>
            <Image
              resizeMode="contain"
              source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image}}
              style={styles.categoryImgStyle}
            />
            <Text style={[FONTS.mediumFont12, styles.categoryTextStyle]}>
              {item.title}
            </Text>
          </MyTouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const RenderBrandsList = () => (
    <View style={{paddingVertical: SIZES.twentyFive}}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: SIZES.fifteen}}>
        {Brands?.map((item, index) => (
          <MyTouchableOpacity
            key={index}
            style={styles.storeViewStyle}
            onPress={() =>
              navigation.navigate(SCREENS.ProductsByType, {
                type: 'brand',
                _id: item._id,
              })
            }>
            <Image
              resizeMode="contain"
              source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image}}
              style={styles.storeImgStyle}
            />
          </MyTouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const RenderProductList = () => (
    <View style={styles.productsListView}>
      {ProductList?.slice(0, 6).map((item, index) => (
        <MyTouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate(SCREENS.ProductDetail, {item: item})
          }>
          <ProductComp item={item} />
        </MyTouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showLogo showMoreIcon showProfilePic />

      <SearchBar
        showFilterIcon
        showSearchIcon
        onPressFilter={() => navigation.navigate(SCREENS.SearchScreen)}
        onPressSearch={() => navigation.navigate(SCREENS.SearchScreen)}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <SeeAllComp
          heading="Categories"
          onPressSeeAll={() => navigation.navigate(SCREENS.Categories)}
        />

        <RenderCategoryList />

        <View style={{marginVertical: SIZES.ten}}>
          <CustomCarousel data={banners} />
        </View>

        <SeeAllComp
          heading="Brands"
          containerStyle={{marginTop: SIZES.twentyFive}}
          onPressSeeAll={() => navigation.navigate(SCREENS.Brands)}
        />

        <RenderBrandsList />

        <SeeAllComp
          heading="Recommended Products"
          onPressSeeAll={() => navigation.navigate(SCREENS.Products)}
        />

        <RenderProductList />
      </ScrollView>

      <FilterModal
        modalizeRef={filterModalizeRef}
        onDone={() => {}}
        onCancel={() => filterModalizeRef?.current?.close()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twentyFive,
  },
  bannerStyle: {
    width: '100%',
    height: SIZES.fifty * 2.6,
    borderRadius: SIZES.twenty,
  },
  categoryImgStyle: {
    height: SIZES.twentyFive * 1.7,
    width: SIZES.twentyFive * 1.7,
  },
  categoryViewStyle: {
    alignItems: 'center',
    marginRight: SIZES.twenty,
    width: SIZES.twentyFive * 3.5,
  },
  categoryTextStyle: {
    color: COLORS.primary,
    marginTop: SIZES.five,
    textAlign: 'center',
  },
  storeViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.fifteen,
    marginRight: SIZES.twenty,
    backgroundColor: COLORS.halfWhite,
    paddingHorizontal: SIZES.twentyFive,
    paddingVertical: SIZES.ten,
  },
  storeImgStyle: {
    height: SIZES.twenty * 2,
    width: SIZES.twenty * 2,
  },
  productsListView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
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

const storesList = [
  {
    image: IMAGES.triangularLogo,
  },
  {
    image: IMAGES.pumaLogo,
  },
  {
    image: IMAGES.adidasLogo,
  },
  {
    image: IMAGES.triangularLogo,
  },
  {
    image: IMAGES.pumaLogo,
  },
  {
    image: IMAGES.adidasLogo,
  },
];

const productsList = [
  {
    price: 78,
    rating: 3,
    name: 'Vinta Shoes',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.shoes,
  },
  {
    price: 78,
    rating: 4,
    name: 'Men T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.menTshirt,
  },
  {
    price: 78,
    rating: 3,
    name: 'Printed T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.printedTshirt,
  },
  {
    price: 78,
    rating: 4,
    name: 'Women Shoe',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.womenShoe,
  },
  {
    price: 78,
    rating: 3,
    name: 'Classic Watch',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.watches,
  },
  {
    price: 78,
    rating: 3,
    name: 'Vintage T-Shirt',
    description: 'Lorem ipsum dolor sit amitconsectetur',
    image: IMAGES.vintageTshirt,
  },
];

const bannerData = [
  {id: 0, image: IMAGES.olivesBanner, url: 'https://www.google.com/'},
  {id: 1, image: IMAGES.watches, url: 'https://www.google.com/'},
  {id: 2, image: IMAGES.menTshirt, url: 'https://www.google.com/'},
];
