import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../constants';
import {
  AnimatedCheckbox,
  CustomButton,
  CustomTextInput,
  IconType,
  PhoneTextInput,
} from '../../components';
import {useDispatch} from 'react-redux';
import utils from '../../utils';
import {showSimpleMessage} from '../../utils/flashMessage';
import {hideLoader, showLoader, signup} from '../../redux/slices';

export default function SignUp(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [address, setAddress] = useState('');
  const [checked, setChecked] = useState(false);

  const signUpUser = async () => {
    if (utils.isEmptyOrSpaces(name)) {
      showSimpleMessage('warning', {
        message: 'Invalid name',
      });
      return;
    }
    if (!utils.validateEmail(email)) {
      showSimpleMessage('warning', {
        message: 'Invalid email',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(phoneNumber)) {
      showSimpleMessage('warning', {
        message: 'Phone number is required',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(password)) {
      showSimpleMessage('warning', {
        message: 'Invalid password',
      });
      return;
    }
    if (password.length < 6) {
      showSimpleMessage('warning', {
        message: 'Password should not be less than 6 digits',
      });
      return;
    }
    if (confirmPass !== password) {
      showSimpleMessage('warning', {
        message: 'Passwords did not match',
      });
      return;
    }
    if (utils.isEmptyOrSpaces(address)) {
      showSimpleMessage('warning', {
        message: 'Invalid address',
      });
      return;
    }
    if (!checked) {
      showSimpleMessage('warning', {
        message: 'Please mark check to our Terms & Conditions',
      });
      return;
    }

    const data = {
      name: name,
      email: email,
      address: address,
      phone: phoneNumber,
      password: password,
      verified_by: email,
      country_code: countryCode,
      password_confirmation: confirmPass,
    };

    dispatcher(showLoader());

    dispatcher(signup(data))
      .unwrap()
      .then(response => {
        console.log('signup response: ', response);

        navigation.navigate(SCREENS.Verification, {
          from: CONSTANTS.DESTINATIONS.SIGN_UP,
          email: email,
        });

        dispatcher(hideLoader());
      })
      .catch(error => {
        dispatcher(hideLoader());
        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  return (
    <SafeAreaView style={STYLES.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={[FONTS.boldFont24, styles.headingStyle]}>Sign Up</Text>

        <Text style={[FONTS.mediumFont16, {marginTop: SIZES.ten}]}>
          If you don't have an account fill out the input fields below
        </Text>

        <View style={{marginTop: SIZES.twentyFive}}>
          <CustomTextInput
            hasIcon
            iconName="user-o"
            iconType={IconType.FontAwesome}
            value={name}
            placeholder="Name"
            onChangeText={setName}
          />

          <CustomTextInput
            email
            hasIcon
            iconName="mail"
            iconType={IconType.Feather}
            value={email}
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <PhoneTextInput
            phone={phoneNumber}
            setPhone={setPhoneNumber}
            setCountryCode={setCountryCode}
          />

          <CustomTextInput
            hasIcon
            iconName="location-pin"
            iconType={IconType.SimpleLineIcons}
            value={address}
            placeholder="Address"
            onChangeText={setAddress}
          />

          <CustomTextInput
            hasIcon
            password
            iconName="lock"
            iconType={IconType.SimpleLineIcons}
            value={password}
            placeholder="Password"
            onChangeText={setPassword}
          />

          <CustomTextInput
            hasIcon
            password
            iconName="lock"
            iconType={IconType.SimpleLineIcons}
            value={confirmPass}
            placeholder="Confirm Password"
            onChangeText={setConfirmPass}
          />
        </View>

        <AnimatedCheckbox
          checked={checked}
          rippleEffect={false}
          touchableLabel={false}
          checkMarkColor={COLORS.white}
          onValueChange={val => setChecked(val)}
          checkedBackgroundColor={COLORS.primary}
          containerStyle={{marginTop: SIZES.fifteen}}
          labelStyle={{color: COLORS.black}}
          label={
            <Text style={FONTS.mediumFont12}>
              I agree to the{' '}
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary}]}
                onPress={() => {}}>
                Terms & Conditions{' '}
              </Text>
              and{' '}
              <Text
                style={[FONTS.mediumFont12, {color: COLORS.primary}]}
                onPress={() => {}}>
                Privacy Policy
              </Text>
            </Text>
          }
        />

        <CustomButton
          title="Sign Up"
          onPress={signUpUser}
          btnStyle={{marginTop: SIZES.twentyFive}}
          disabled={utils.isBtnDisable([
            name,
            email,
            phoneNumber,
            address,
            password,
            confirmPass,
          ])}
        />

        <View style={styles.signupTextView}>
          <Text style={FONTS.mediumFont14}>
            Already have an account?{' '}
            <Text
              style={[FONTS.mediumFont14, styles.signupTextStyle]}
              onPress={() => navigation.navigate(SCREENS.Login)}>
              Log In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: SIZES.twentyFive,
    paddingHorizontal: SIZES.fifteen,
  },
  headingStyle: {
    fontWeight: 'bold',
    fontSize: SIZES.h24,
  },
  signupTextView: {
    alignSelf: 'center',
    marginTop: SIZES.twentyFive,
  },
  signupTextStyle: {
    fontWeight: 'bold',
    color: COLORS.seaGreen,
  },
  checkMarkView: {
    flexDirection: 'row',
    marginTop: SIZES.fifteen,
  },
});
