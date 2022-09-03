import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS, SCREENS, SIZES, STYLES} from '../../constants';
import {
  ProductComp,
  CustomHeader,
  MyTouchableOpacity,
  ListEmptyComponent,
} from '../../components';

export default function FavoriteProducts(props) {
  const {navigation} = props;
  const {favoriteProducts} = useSelector(state => state.product);

  const renderItems = ({item, index}) => (
    <MyTouchableOpacity
      key={index}
      style={{flex: 1, alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end'}}
      onPress={() =>
        navigation.navigate(SCREENS.ProductDetail, {item: item.productId})
      }>
      <ProductComp item={item.productId} />
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Favorite Products" />

      <FlatList
        numColumns={2}
        data={favoriteProducts}
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
