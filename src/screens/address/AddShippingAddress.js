import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {CustomButton, CustomHeader, CustomTextInput} from '../../components';
import {SIZES, STYLES} from '../../constants';
import {createAddress, hideLoader, showLoader} from '../../redux/slices';
import utils from '../../utils';
import {showSimpleMessage} from '../../utils/flashMessage';

export default function AddShippingAddress(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');

  const onCreateAddress = async () => {
    const data = {
      address_name: label,
      address: address,
      city: city,
      zip_code: zipCode,
      country: country,
      state: province,
    };

    dispatcher(showLoader());

    dispatcher(createAddress(data))
      .unwrap()
      .then(response => {
        // console.log('createAddress response: ', response);

        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Address saved successfully.',
        });
        navigation.goBack();
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('createAddress error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Add Shipping Address" />

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

        <CustomButton
          title="Add Address"
          onPress={onCreateAddress}
          btnStyle={{marginTop: SIZES.twentyFive}}
          disabled={utils.isBtnDisable([
            label,
            address,
            city,
            province,
            zipCode,
            country,
          ])}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
});
