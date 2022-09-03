import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, SCREENS, SIZES, STYLES} from '../../constants';
import {
  SearchBar,
  ProductComp,
  CustomHeader,
  MyTouchableOpacity,
  ListEmptyComponent,
} from '../../components';

export default function Products(props) {
  const {navigation} = props;
  const {ProductList} = useSelector(state => state.home);

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
      <CustomHeader showBackButton title="All Products" />

      <SearchBar
        showFilterIcon
        showSearchIcon
        onPressFilter={() => navigation.navigate(SCREENS.SearchScreen)}
        onPressSearch={() => navigation.navigate(SCREENS.SearchScreen)}
      />

      <FlatList
        numColumns={2}
        data={ProductList}
        renderItem={renderItems}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistStyle}
        ListEmptyComponent={() => (
          <ListEmptyComponent text={['No products to show!']} />
        )}
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
