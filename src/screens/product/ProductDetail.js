import React, {useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Carousel from 'react-native-reanimated-carousel';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {CustomButton, CustomHeader} from '../../components';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import {
  getProductDetail,
  hideLoader,
  onMarkFavorite,
  showLoader,
} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';

const baseOptions = {
  vertical: false,
  width: width,
  height: height * 0.3,
};

export default function ProductDetail(props) {
  const {navigation, route} = props;
  const {item} = route.params;

  const dispatcher = useDispatch();
  const [product, setProduct] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    onGetDetail(item._id);
  }, [item]);

  const onGetDetail = _id => {
    const params = {
      productId: _id,
    };

    dispatcher(showLoader());

    dispatcher(getProductDetail(params))
      .unwrap()
      .then(response => {
        // console.log('getProductDetail response: ', JSON.stringify(response));

        setProduct(response.data[0]);
        setIsFavourite(response.data[0].is_favourite.length);
        dispatcher(hideLoader());
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('getProductDetail error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const onHeartHandler = () => {
    setIsFavourite(!isFavourite);

    const data = {
      productId: item._id,
    };

    dispatcher(onMarkFavorite(data))
      .unwrap()
      .then(response => {
        // console.log('onMarkFavorite response: ', response);
      })
      .catch(error => {
        console.log('onMarkFavorite error: ', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <View style={STYLES.container}>
      <View style={styles.headerView}>
        <CustomHeader
          showBackButton
          showHeartIcon
          heartFilled={isFavourite}
          onPressHeart={onHeartHandler}
          backArrowColor={COLORS.primary}
          backArrowStyle={{borderColor: COLORS.primary}}
        />
      </View>

      <Carousel
        {...baseOptions}
        data={product?.image}
        autoPlay={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        style={[
          STYLES.shadow,
          {
            width: '100%',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.gray + 40,
          },
        ]}
        renderItem={({item, index}) => (
          <Image
            key={index}
            resizeMode="contain"
            style={styles.imgStyle}
            source={{uri: CONSTANTS.API_URLS.IMAGE_URL + item}}
          />
        )}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.flexRow}>
            <Text style={[FONTS.boldFont22, styles.itemNameStyle]}>
              {product?.name}
            </Text>
            <Text style={[FONTS.boldFont24, styles.itemPriceStyle]}>
              ${product?.price}
            </Text>
          </View>

          <View style={styles.tagsView}>
            {product?.tags?.map((item, index) => (
              <Text
                key={index}
                style={[
                  FONTS.mediumFont12,
                  {color: COLORS.primary, marginRight: SIZES.ten},
                ]}>
                #{item}
              </Text>
            ))}
          </View>

          {/* <View style={[styles.flexRow, {marginTop: SIZES.ten}]}>
            <StarRatingComp
              rating={4}
              disabled={true}
              starSize={SIZES.twenty}
            />
            <Text style={[FONTS.mediumFont14, styles.ratingTextStyle]}>
              4.0 (17.8k)
            </Text>
          </View> */}

          <Text style={[FONTS.boldFont20, {marginTop: SIZES.twentyFive}]}>
            Brand
          </Text>

          <Text style={[FONTS.mediumFont14, styles.itemDespStyle]}>
            {product?.brandId}
          </Text>

          <Text style={[FONTS.boldFont20, {marginTop: SIZES.twentyFive}]}>
            Description
          </Text>

          <Text style={[FONTS.mediumFont14, styles.itemDespStyle]}>
            {product?.description}
          </Text>
        </View>

        <CustomButton
          title="Buy Now"
          btnStyle={styles.btnStyle}
          onPress={() => navigation.navigate(SCREENS.Checkout, {product: item})}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.fifteen,
    paddingHorizontal: SIZES.fifteen,
    paddingBottom: SIZES.twentyFive,
  },
  headerView: {
    left: 0,
    right: 0,
    zIndex: 10,
    top: getStatusBarHeight(true),
    position: 'absolute',
  },
  imgStyle: {
    width: '100%',
    height: height * 0.3,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemNameStyle: {
    flex: 1,
    color: COLORS.black,
  },
  itemPriceStyle: {
    color: COLORS.primary,
  },
  itemDespStyle: {
    marginTop: SIZES.fifteen,
    textAlign: 'justify',
  },
  btnStyle: {
    marginTop: SIZES.twentyFive,
  },
  ratingTextStyle: {
    marginLeft: SIZES.fifteen,
    color: COLORS.gray,
  },
  tagsView: {
    width: '60%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.five,
  },
});

const imagesData = [
  {id: 0, image: IMAGES.olivesBanner},
  {id: 1, image: IMAGES.watches},
  {id: 2, image: IMAGES.menTshirt},
];
