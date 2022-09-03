import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getFilteredProducts, hideLoader, showLoader} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import {
  CustomHeader,
  FilterModal,
  ListEmptyComponent,
  MyTouchableOpacity,
  SearchBar,
} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';

export default function SearchScreen(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const {ProductList} = useSelector(state => state.home);

  const filterModalizeRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    setProducts(ProductList);
  }, [ProductList]);

  const onFilterHandler = (price, category, brand) => {
    const params = {
      brandId: brand,
      categoryId: category,
      minPrice: price > 1 ? 1 : null,
      maxPrice: price > 1 ? price : null,
    };

    dispatcher(showLoader());

    dispatcher(getFilteredProducts(params))
      .unwrap()
      .then(response => {
        // console.log('filter response: ', response.data);

        setProducts(response.data);
        setFilterApplied(true);
        dispatcher(hideLoader());
      })
      .catch(error => {
        setFilterApplied(false);
        dispatcher(hideLoader());
        console.log('filter error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const renderItem = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={styles.itemContainer}
      onPress={() => navigation.navigate(SCREENS.ProductDetail, {item: item})}>
      <Image
        source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item.image[0]}}
        style={styles.imgStyle}
      />

      <View style={styles.itemContentView}>
        <Text
          numberOfLines={1}
          style={[
            FONTS.mediumFont14,
            {color: COLORS.black, textTransform: 'capitalize'},
          ]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
          {item.description}
        </Text>
      </View>

      <View style={styles.priceTagStyle}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
          ${item.price}
        </Text>
      </View>
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <View style={styles.headerView}>
        <View style={{flex: 0.17}}>
          <CustomHeader showBackButton />
        </View>

        <View style={{flex: 1}}>
          <SearchBar
            showFilterIcon
            searchText={searchText}
            setSearchText={setSearchText}
            onPressFilter={() => filterModalizeRef?.current?.open()}
            containerStyle={{
              borderWidth: 1,
              borderRadius: SIZES.ten,
              height: SIZES.twentyFive * 2,
            }}
          />
        </View>
      </View>

      {filterApplied && (
        <MyTouchableOpacity
          onPress={() => {
            setFilterApplied(false);
            setProducts(ProductList);
          }}>
          <Text
            style={[
              FONTS.mediumFont10,
              {
                color: COLORS.primary,
                textDecorationLine: 'underline',
                textAlign: 'right',
                marginHorizontal: SIZES.twenty,
              },
            ]}>
            Clear Filter
          </Text>
        </MyTouchableOpacity>
      )}

      <FlatList
        data={products?.filter(i =>
          i.name.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
        ListEmptyComponent={() => (
          <ListEmptyComponent
            text={[
              'No products to show!',
              'Please try again with different filters.',
            ]}
          />
        )}
      />

      <FilterModal
        modalizeRef={filterModalizeRef}
        onApply={onFilterHandler}
        onCancel={() => filterModalizeRef?.current?.close()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatlistStyle: {
    flexGrow: 1,
    paddingHorizontal: SIZES.fifteen,
    paddingBottom: SIZES.twentyFive,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.gray,
    paddingVertical: SIZES.fifteen,
  },
  imgStyle: {
    height: SIZES.fifty,
    width: SIZES.fifty,
    borderRadius: SIZES.fifty,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  itemContentView: {
    flex: 1,
    marginHorizontal: SIZES.fifteen,
  },
  priceTagStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
    height: SIZES.twentyFive * 1.3,
    paddingHorizontal: SIZES.twenty,
    backgroundColor: COLORS.primary,
  },
});

const data = [
  {
    id: 0,
    price: 80,
    image: IMAGES.shoes,
    name: 'Vintage Shoes',
    description: 'New arrival',
  },
  {
    id: 1,
    price: 50,
    image: IMAGES.watches,
    name: 'Awesome Watch',
    description: 'New arrival',
  },
  {
    id: 2,
    price: 60,
    image: IMAGES.womenShoe,
    name: 'Women Shoe',
    description: 'New arrival',
  },
  {
    id: 3,
    price: 40,
    image: IMAGES.menTshirt,
    name: 'Men T-Shirt',
    description: 'New arrival',
  },
  {
    id: 4,
    price: 80,
    image: IMAGES.printedTshirt,
    name: 'Printed T-Shirt',
    description: 'New arrival',
  },
];
