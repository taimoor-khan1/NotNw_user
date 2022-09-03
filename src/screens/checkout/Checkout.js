import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  MyTouchableOpacity,
  ThankyouModal,
} from '../../components';
import {hideLoader, showLoader, submitOrder} from '../../redux/slices';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  COLORS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';

export default function Checkout(props) {
  const {navigation, route} = props;
  const {product} = route?.params;

  const dispatcher = useDispatch();
  const {cardList} = useSelector(state => state.card);
  const user = useSelector(state => state.profile.profile);
  const {deliveryAddress} = useSelector(state => state.address);
  const [selectedAddress, setSelectedAddress] = useState(deliveryAddress);
  const [selectedCard, setSelectedCard] = useState(null);
  const [thankModal, setThankModal] = useState(false);

  useEffect(() => {
    setSelectedAddress(deliveryAddress);
  }, [deliveryAddress]);

  useEffect(() => {
    const card = cardList.find(i => i.isDefault == 1);
    setSelectedCard(card);
  }, [cardList]);

  const onSubmitOrder = () => {
    const data = {
      remarks: '',
      delivery_cost: 15,
      customerId: user._id,
      productId: product._id,
      addressId: selectedAddress._id,
    };

    dispatcher(showLoader());

    dispatcher(submitOrder(data))
      .unwrap()
      .then(response => {
        // console.log('submitOrder response: ', response);

        setThankModal(true);
        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Order placed successfully.',
        });
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('submitOrder error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const RenderHeading = ({heading, onPress, style}) => (
    <View style={styles.flexRow}>
      <Text style={[FONTS.boldFont16, {color: COLORS.black}, style]}>
        {heading}
      </Text>

      <MyTouchableOpacity onPress={onPress}>
        <Text style={[FONTS.mediumFont10, {color: COLORS.primary}]}>
          Change
        </Text>
      </MyTouchableOpacity>
    </View>
  );

  const RenderRow = ({title, value}) => (
    <View style={[styles.flexRow, {marginTop: SIZES.twenty}]}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.gray}]}>{title}:</Text>
      <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>{value}</Text>
    </View>
  );

  const RenderAddressCard = () => (
    <View style={[styles.addressContainer]}>
      <Text style={[FONTS.boldFont16]}>{selectedAddress?.address_name}</Text>

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.gray}]}>
          {selectedAddress?.address}
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.gray, marginTop: SIZES.five},
          ]}>
          {selectedAddress?.city}, {selectedAddress?.state},{' '}
          {selectedAddress?.country}
        </Text>
      </View>
    </View>
  );

  const RenderPaymentCard = () => (
    <ImageBackground
      resizeMode="stretch"
      source={IMAGES.cardFront}
      style={styles.cardBgImgStyle}>
      <Text
        style={[
          FONTS.mediumFont16,
          {color: COLORS.white, marginTop: SIZES.twenty},
        ]}>
        **** **** **** {selectedCard?.card_number.slice(12, 16)}
      </Text>

      <View style={[styles.flexRow, {marginTop: SIZES.twentyFive * 1.5}]}>
        <View>
          <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
            User Name
          </Text>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.white, textTransform: 'capitalize'},
            ]}>
            {selectedCard?.cardholder_name}
          </Text>
        </View>

        <View>
          <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
            Exp Date
          </Text>
          <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
            {selectedCard?.expiry_date}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Checkout" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <RenderHeading
          heading="Shipping Address"
          onPress={() => navigation.navigate(SCREENS.ShippingAddress)}
        />

        {selectedAddress ? (
          <RenderAddressCard />
        ) : (
          <View style={{marginTop: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.primary}]}>
              Please select an address!
            </Text>
          </View>
        )}

        <RenderHeading
          heading="Payment"
          style={{marginTop: SIZES.twenty}}
          onPress={() => navigation.navigate(SCREENS.PaymentMethod)}
        />

        {selectedCard ? (
          <RenderPaymentCard />
        ) : (
          <View style={{marginTop: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont12, {color: COLORS.primary}]}>
              Please select payment method!
            </Text>
          </View>
        )}

        <View style={{marginTop: SIZES.twenty}}>
          <RenderRow title="Order" value={`$${product?.price}`} />
          <RenderRow title="Delivery" value={'$15'} />
          <RenderRow title="Summary" value={`$${product?.price + 15}`} />
        </View>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            title="Submit Order"
            onPress={onSubmitOrder}
            btnStyle={{marginVertical: SIZES.twentyFive}}
            disabled={utils.isBtnDisable([selectedAddress, selectedCard])}
          />
        </View>
      </ScrollView>

      <ThankyouModal
        visible={thankModal}
        setVisible={setThankModal}
        title="Your order is soon to be delivered."
        onDone={() => {
          setThankModal(false);
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: SCREENS.Home}],
            });
          }, 500);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.fifteen,
    paddingHorizontal: SIZES.twenty,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressContainer: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    padding: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
    marginTop: SIZES.twenty,
  },
  cardBgImgStyle: {
    padding: 20,
    width: width * 0.8,
    height: SIZES.fifty * 3,
    alignSelf: 'center',
    marginTop: SIZES.twenty,
  },
});
