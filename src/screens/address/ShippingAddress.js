import React, {useState} from 'react';
import {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showSimpleMessage} from '../../utils/flashMessage';
import {COLORS, FONTS, SCREENS, SIZES, STYLES} from '../../constants';
import {saveDeliveryAddress} from '../../redux/slices';
import utils from '../../utils';
import {
  Icon,
  IconType,
  CustomButton,
  CustomHeader,
  AnimatedCheckbox,
  MyTouchableOpacity,
  ListEmptyComponent,
} from '../../components';

export default function ShippingAddress(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const {addressList, deliveryAddress} = useSelector(state => state.address);
  const [selectedAddress, setSelectedAddress] = useState(deliveryAddress);

  useEffect(() => {
    setSelectedAddress(deliveryAddress);
  }, [deliveryAddress]);

  const onPressContinue = () => {
    if (selectedAddress === null) {
      showSimpleMessage('warning', {
        message: 'Please select an address to continue!',
      });
      return;
    }

    dispatcher(saveDeliveryAddress(selectedAddress));

    showSimpleMessage('success', {
      message: 'Shipping address saved successfully.',
    });
  };

  const RenderAddress = ({item}) => (
    <MyTouchableOpacity
      activeOpacity={0.9}
      onPress={() => setSelectedAddress(item)}
      style={[
        styles.itemContainer,
        {
          borderColor:
            selectedAddress?._id === item._id ? COLORS.primary : COLORS.gray,
        },
      ]}>
      <View style={styles.flexRow}>
        <Text style={[FONTS.boldFont18]}>{item.address_name}</Text>
        <MyTouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.EditShippingAddress, {item})
          }>
          <Text style={[FONTS.mediumFont12, {color: COLORS.primary}]}>
            Change
          </Text>
        </MyTouchableOpacity>
      </View>

      <View style={{marginTop: SIZES.twenty}}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.gray}]}>
          {item.address}
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.gray, marginTop: SIZES.five},
          ]}>
          {item.city}, {item.state}, {item.country}
        </Text>
      </View>

      <AnimatedCheckbox
        checked={selectedAddress?._id === item._id}
        rippleEffect={false}
        touchableLabel={false}
        checkMarkColor={COLORS.white}
        onValueChange={val => {
          if (val) setSelectedAddress(item);
          else setSelectedAddress(null);
        }}
        checkedBackgroundColor={COLORS.primary}
        containerStyle={{marginTop: SIZES.fifteen}}
        labelStyle={{color: COLORS.black}}
        label={
          <Text style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
            Use as the shipping address
          </Text>
        }
      />
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Shipping Address" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {addressList.length ? (
          addressList.map((item, index) => (
            <View key={index}>
              <RenderAddress item={item} />
            </View>
          ))
        ) : (
          <ListEmptyComponent
            text={[
              'No shipping address added yet!',
              'Please add your shipping address details.',
            ]}
          />
        )}
      </ScrollView>

      <View style={styles.btnContainer}>
        <CustomButton
          title="Continue"
          onPress={onPressContinue}
          disabled={utils.isBtnDisable([selectedAddress])}
          btnStyle={{flex: 1, marginRight: SIZES.fifteen}}
        />

        <MyTouchableOpacity
          style={styles.addIconBtn}
          onPress={() => navigation.navigate(SCREENS.AddShippingAddress)}>
          <Icon
            name="plus"
            type={IconType.Feather}
            style={{
              color: COLORS.white,
              fontSize: SIZES.twentyFive * 1.4,
            }}
          />
        </MyTouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: SIZES.ten,
    paddingBottom: SIZES.fifteen,
    paddingHorizontal: SIZES.fifteen,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
    marginTop: SIZES.fifteen,
  },
  addIconBtn: {
    width: 65,
    height: 65,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  itemContainer: {
    borderWidth: 1.5,
    padding: SIZES.fifteen,
    borderRadius: SIZES.fifteen,
    marginBottom: SIZES.twentyFive,
  },
});
