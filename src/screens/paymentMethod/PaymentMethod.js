import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {showSimpleMessage} from '../../utils/flashMessage';
import utils from '../../utils';
import {
  Icon,
  IconType,
  CustomButton,
  CustomHeader,
  PermissionModal,
  AnimatedCheckbox,
  MyTouchableOpacity,
  ListEmptyComponent,
} from '../../components';
import {
  COLORS,
  FONTS,
  IMAGES,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../constants';
import {
  deleteCard,
  hideLoader,
  showLoader,
  updateCardStatus,
} from '../../redux/slices';

export default function PaymentMethod(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();

  const {cardList} = useSelector(state => state.card);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const card = cardList.find(i => i.isDefault == 1);
    setSelectedCard(card);
  }, [cardList]);

  const onPressContinue = () => {
    if (selectedCard === null) {
      showSimpleMessage('warning', {
        message: 'Please select any card to continue!',
      });
      return;
    }

    dispatcher(showLoader());

    const data = {
      cardId: selectedCard._id,
    };

    dispatcher(updateCardStatus(data))
      .unwrap()
      .then(response => {
        // console.log('updateCardStatus response: ', response);

        dispatcher(hideLoader());
        showSimpleMessage('success', {
          message: 'Card saved successfully.',
        });
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('updateCardStatus error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const onRemoveCard = async () => {
    const params = {
      cardId: deleteCardId,
    };

    dispatcher(showLoader());

    dispatcher(deleteCard(params))
      .unwrap()
      .then(response => {
        // console.log('onRemoveCard response: ', response);

        dispatcher(hideLoader());
        setDeleteCardId('');
        showSimpleMessage('success', {
          message: 'Card removed successfully.',
        });
      })
      .catch(error => {
        dispatcher(hideLoader());
        console.log('onRemoveCard error', error);

        showSimpleMessage('danger', {
          message: error.message,
        });
      });
  };

  const RenderCards = ({item}) => (
    <MyTouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => setSelectedCard(item)}>
      <ImageBackground
        resizeMode="stretch"
        source={IMAGES.cardFront}
        style={styles.cardBgImgStyle}>
        <MyTouchableOpacity
          activeOpacity={0.8}
          style={styles.deleteIconView}
          onPress={() => {
            setDeleteCardId(item._id);
            setDeleteModal(true);
          }}>
          <Icon
            name="trash-2"
            type={IconType.Feather}
            style={{
              color: COLORS.white,
              fontSize: SIZES.twentyFive,
            }}
          />
        </MyTouchableOpacity>

        <Text
          style={[
            FONTS.mediumFont16,
            {color: COLORS.white, marginTop: SIZES.twenty},
          ]}>
          **** **** **** {item.card_number.slice(12, 16)}
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
              {item.cardholder_name}
            </Text>
          </View>

          <View>
            <Text style={[FONTS.mediumFont10, {color: COLORS.white}]}>
              Exp Date
            </Text>
            <Text style={[FONTS.mediumFont14, {color: COLORS.white}]}>
              {item.expiry_date}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <AnimatedCheckbox
        checked={selectedCard?._id === item._id}
        rippleEffect={false}
        touchableLabel={false}
        checkMarkColor={COLORS.white}
        onValueChange={val => {
          if (val) setSelectedCard(item);
          else setSelectedCard(null);
        }}
        checkedBackgroundColor={COLORS.primary}
        containerStyle={{marginTop: SIZES.five}}
        labelStyle={{color: COLORS.black}}
        label={
          <Text style={[FONTS.mediumFont12, {color: COLORS.gray}]}>
            Use as default payment method
          </Text>
        }
      />
    </MyTouchableOpacity>
  );

  return (
    <SafeAreaView style={STYLES.container}>
      <CustomHeader showBackButton title="Payment Method" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.black}]}>
          Your Payment Cards
        </Text>

        {cardList.length ? (
          cardList?.map((item, index) => (
            <View index={index}>
              <RenderCards item={item} />
            </View>
          ))
        ) : (
          <ListEmptyComponent
            text={[
              'No payment cards added yet!',
              'Please add your payment card details.',
            ]}
          />
        )}
      </ScrollView>

      <View style={styles.btnContainer}>
        <CustomButton
          title="Continue"
          onPress={onPressContinue}
          disabled={utils.isBtnDisable([selectedCard])}
          btnStyle={{flex: 1, marginRight: SIZES.fifteen}}
        />

        <MyTouchableOpacity
          style={styles.addIconBtn}
          onPress={() => navigation.navigate(SCREENS.AddCard)}>
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

      <PermissionModal
        visible={deleteModal}
        setVisible={setDeleteModal}
        title="Are you sure you want to remove card?"
        onDone={onRemoveCard}
        onCancel={() => {}}
      />
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
  cardContainer: {
    width: width * 0.8,
    marginTop: SIZES.twentyFive,
    marginBottom: SIZES.ten,
    alignSelf: 'center',
  },
  cardBgImgStyle: {
    padding: 20,
    width: width * 0.8,
    height: SIZES.fifty * 3,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deleteIconView: {
    padding: SIZES.five,
    top: -SIZES.ten * 1.3,
    right: SIZES.twenty,
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.five,
  },
});
