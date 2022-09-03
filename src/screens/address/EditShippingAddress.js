import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  CustomButton,
  CustomHeader,
  CustomTextInput,
  Icon,
  IconType,
  MyTouchableOpacity,
  PermissionModal,
} from '../../components';
import {COLORS, SIZES, STYLES} from '../../constants';
import {
  deleteAddress,
  hideLoader,
  showLoader,
  updateAddress,
} from '../../redux/slices';
import utils from '../../utils';
import {showSimpleMessage} from '../../utils/flashMessage';

export default function EditShippingAddress(props) {
  const {navigation, route} = props;
  const {item} = route?.params;
  const dispatcher = useDispatch();

  const [label, setLabel] = useState(item.address_name);
  const [address, setAddress] = useState(item.address);
  const [city, setCity] = useState(item.city);
  const [province, setProvince] = useState(item.state);
  const [zipCode, setZipCode] = useState(item.zip_code);
  const [country, setCountry] = useState(item.country);
  const [deleteModal, setDeleteModal] = useState(false);

  const onEditAddress = async () => {
    const data = {
      addressId: item._id,
      address_name: label,
      address: address,
      city: city,
      zip_code: zipCode,
      country: country,
      state: province,
    };

    dispatcher(showLoader());

    dispatcher(updateAddress(data))
      .unwrap()
      .then(response => {
        // console.log('updateAddress response: ', response);

        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Address updated successfully.',
        });
        navigation.goBack();
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('updateAddress error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const onRemoveAddress = async () => {
    const params = {
      addressId: item._id,
    };

    dispatcher(showLoader());

    dispatcher(deleteAddress(params))
      .unwrap()
      .then(response => {
        // console.log('deleteAddress response: ', response);

        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Address removed successfully.',
        });
        navigation.goBack();
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('deleteAddress error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Edit Shipping Address" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={{flex: 1}}>
          <CustomTextInput
            value={label}
            placeholder="Label (home/office)"
            onChangeText={setLabel}
          />

          <CustomTextInput
            value={address}
            placeholder="Address"
            onChangeText={setAddress}
          />

          <CustomTextInput
            value={city}
            placeholder="City"
            onChangeText={setCity}
          />

          <CustomTextInput
            value={province}
            placeholder="State/Province/Region"
            onChangeText={setProvince}
          />

          <CustomTextInput
            value={zipCode}
            placeholder="Postal Code/Zip Code"
            onChangeText={setZipCode}
          />

          <CustomTextInput
            value={country}
            placeholder="Country"
            onChangeText={setCountry}
          />
        </View>

        <View style={styles.btnContainer}>
          <CustomButton
            title="Save Address"
            onPress={onEditAddress}
            btnStyle={{flex: 1, marginRight: SIZES.fifteen}}
            disabled={utils.isBtnDisable([
              label,
              address,
              city,
              province,
              zipCode,
              country,
            ])}
          />

          <MyTouchableOpacity
            style={styles.deleteIconBtn}
            onPress={() => setDeleteModal(true)}>
            <Icon
              name="trash-2"
              type={IconType.Feather}
              style={{
                color: COLORS.white,
                fontSize: SIZES.twentyFive * 1.4,
              }}
            />
          </MyTouchableOpacity>
        </View>
      </ScrollView>

      <PermissionModal
        visible={deleteModal}
        setVisible={setDeleteModal}
        title="Are you sure you want to remove the address?"
        onDone={onRemoveAddress}
        onCancel={() => {}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SIZES.twentyFive,
  },
  deleteIconBtn: {
    width: 65,
    height: 65,
    borderRadius: SIZES.fifteen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
