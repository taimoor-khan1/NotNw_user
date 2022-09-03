import React, {useState} from 'react';
import {Platform, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {CreditCardInput} from '../../components/StripeCardComponent';
import {CustomButton, CustomHeader} from '../../components';
import {COLORS, SIZES, STYLES} from '../../constants';
import {showSimpleMessage} from '../../utils/flashMessage';
import {Testing_Publishable_Key} from '../../../Keys';
import {useDispatch} from 'react-redux';
import {createCard, hideLoader, showLoader} from '../../redux/slices';

export default function AddCard(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const [CardInput, setCardInput] = useState({});

  const _onChange = data => {
    setCardInput(data);
  };

  const onSubmit = async () => {
    if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
      showSimpleMessage('warning', {
        message: 'Invalid Credit Card Detail!',
      });
      return false;
    }

    dispatcher(showLoader());

    let creditCardToken;

    try {
      creditCardToken = await getCreditCardToken(CardInput);
      console.log('creditCardToken response: ', creditCardToken);

      if (creditCardToken.error) {
        dispatcher(hideLoader());
        return;
      }
    } catch (e) {
      console.log('creditCardToken error: ', e);
      dispatcher(hideLoader());
      return;
    }

    saveCardOnServer(creditCardToken);
  };

  const getCreditCardToken = creditCardData => {
    const card = {
      'card[number]': creditCardData.values.number.replace(/ /g, ''),
      'card[exp_month]': creditCardData.values.expiry.split('/')[0],
      'card[exp_year]': creditCardData.values.expiry.split('/')[1],
      'card[cvc]': creditCardData.values.cvc,
      'card[name]': creditCardData.values.name,
    };

    return fetch('https://api.stripe.com/v1/tokens', {
      headers: {
        // Use the correct MIME type for your server
        Accept: 'application/json',
        // Use the correct Content Type to send data to Stripe
        'Content-Type': 'application/x-www-form-urlencoded',
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${Testing_Publishable_Key}`,
      },

      // Use a proper HTTP method
      method: 'post',

      // Format the credit card data to a string of key-value pairs
      // divided by &

      body: Object.keys(card)
        .map(key => key + '=' + card[key])
        .join('&'),
    })
      .then(response => response.json())
      .then(res => {
        console.log('getCreditCardToken response: ', res);
        return {res, mcard: card};
      })
      .catch(error => {
        console.log('getCreditCardToken error: ', error);
        dispatcher(hideLoader());
      });
  };

  const saveCardOnServer = card => {
    let data = {
      cardholder_name: card.mcard['card[name]'],
      card_number: card.mcard['card[number]'],
      expiry_date: `${card.mcard['card[exp_month]']}/${card.mcard['card[exp_year]']}`,
      cvv: card.mcard['card[cvc]'],
      stripe_token: card.res.id,
    };

    dispatcher(createCard(data))
      .unwrap()
      .then(response => {
        // console.log('createCard response: ', response);

        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Card added successfully.',
        });
        navigation.goBack();
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('createCard error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Add Card" />

      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <CreditCardInput
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={[
            styles.inputStyle,
            {
              backgroundColor: COLORS.grey,
            },
          ]}
          labelStyle={[
            styles.labelStyle,
            {
              color: COLORS.black,
            },
          ]}
          validColor={COLORS.black}
          placeholderColor={COLORS.gray}
          requiresName={true}
          onChange={_onChange}
        />
      </ScrollView>

      <CustomButton title="Add" onPress={onSubmit} btnStyle={styles.btnStyle} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: 5,
  },
  inputStyle: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.twentyFive,
    marginHorizontal: SIZES.five / 2,
    paddingHorizontal: SIZES.five / 2,
    marginVertical: SIZES.five * 1.3,
    color: COLORS.black,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: Platform.OS === 'ios' ? SIZES.fifteen : 0,
    paddingTop: Platform.OS === 'ios' ? SIZES.fifteen : 0,
    backgroundColor: 'red',
  },
  labelStyle: {
    // marginBottom: 5,
    fontSize: SIZES.h16 - 2,
    color: COLORS.black,
  },
  btnStyle: {
    marginVertical: SIZES.twentyFive,
    marginHorizontal: SIZES.twenty,
  },
});
