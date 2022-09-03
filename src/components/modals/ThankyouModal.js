import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import {COLORS, FONTS, height, IMAGES, SIZES} from '../../constants';
import CustomButton from '../CustomButton';

export default function ThankyouModal(props) {
  const {visible, setVisible, title, onDone} = props;

  return (
    <Modal
      statusBarTranslucent
      isVisible={visible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      deviceHeight={height * height}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.mainView}>
        <LottieView
          loop
          autoPlay
          source={IMAGES.checkmarkGif}
          style={styles.checkmarkStyle}
        />

        <Text style={[FONTS.boldFont22, styles.headingStyle]}>Thank You!</Text>

        <Text style={[FONTS.mediumFont14, styles.titleStyle]}>{title}</Text>

        <CustomButton
          title="Continue Shopping"
          onPress={onDone}
          btnStyle={styles.btnStyle}
          titleStyle={{fontSize: SIZES.h20}}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainView: {
    padding: SIZES.ten * 2.5,
    borderRadius: SIZES.twenty,
    backgroundColor: COLORS.white,
  },
  headingStyle: {
    color: COLORS.black,
    marginTop: SIZES.five,
    textAlign: 'center',
  },
  titleStyle: {
    color: COLORS.gray,
    textAlign: 'center',
    marginTop: SIZES.five,
  },
  btnStyle: {
    height: 50,
    marginBottom: SIZES.five,
    marginTop: SIZES.twentyFive * 1.1,
  },
  iconStyle: {
    alignSelf: 'center',
    color: COLORS.primary,
    fontSize: SIZES.fifty * 1.5,
    marginBottom: SIZES.twenty,
  },
  checkmarkStyle: {
    alignSelf: 'center',
    width: SIZES.fifty * 2,
    height: SIZES.fifty * 2,
  },
});
