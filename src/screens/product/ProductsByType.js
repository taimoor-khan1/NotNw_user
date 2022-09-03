import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {SCREENS, SIZES, STYLES} from '../../constants';
import {
  SearchBar,
  ProductComp,
  CustomHeader,
  MyTouchableOpacity,
  ListEmptyComponent,
} from '../../components';
import {
  getProductsByBrand,
  getProductsByCategory,
  hideLoader,
  showLoader,
} from '../../redux/slices';

export default function ProductsByType(props) {
  const {navigation, route} = props;
  const {type, _id} = route?.params;

  const dispatcher = useDispatch();
  const isLoading = useSelector(state => state.loader.isVisible);
  const [productList, setProductList] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (type === 'category') {
      productsByCategory(_id);
    } else {
      productsByBrand(_id);
    }
  }, [type, _id]);

  const productsByCategory = id => {
    const params = {
      categoryId: id,
    };

    dispatcher(showLoader());

    dispatcher(getProductsByCategory(params))
      .unwrap()
      .then(response => {
        // console.log('productsByCategory response: ', response);

        setProductList(response);
        dispatcher(hideLoader());
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('productsByCategory error', error);
      });
  };

  const productsByBrand = id => {
    const params = {
      brandId: id,
    };

    dispatcher(showLoader());

    dispatcher(getProductsByBrand(params))
      .unwrap()
      .then(response => {
        // console.log('productsByBrand response: ', response);

        setProductList(response);
        dispatcher(hideLoader());
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('productsByBrand error', error);
      });
  };

  const renderItems = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={{flex: 1, alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end'}}
      onPress={() => navigation.navigate(SCREENS.ProductDetail, {item: item})}>
      <ProductComp item={item} />
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Products" />

      <SearchBar
        showSearchIcon
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <FlatList
        numColumns={2}
        data={productList?.filter(i =>
          i.name.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={renderItems}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
        ListEmptyComponent={() =>
          !isLoading && <ListEmptyComponent text={['No products to show!']} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatlistStyle: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
});
