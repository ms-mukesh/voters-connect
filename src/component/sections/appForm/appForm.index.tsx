import React, {useMemo, useState} from 'react';
import {
  AppButton,
  AppScrollView,
  CustomKeyboardAwareScrollView,
  CustomTextInput,
  RadioButtonRow,
} from '@/src/component/common';
import {Pressable, StyleSheet, View} from 'react-native';
import {color} from '@/src/utils/color';
import {navigate} from '@/src/navigation/rootNavigation';
import {hp, isIOS} from '@/src/utils/screenRatio';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {SCREEN_NAME} from '@/src/constant/screenConfig.const';
import {KEYBOARD_TYPE} from '@/src/constant/generalConst';
import {
  FIELD_TYPE,
  formFieldType,
} from '@/src/component/sections/appForm/appForm.const.index';
import {
  CALENDER_ICON,
  DOWN_ARROW_BLACK,
} from '@/src/assets/images/svgIcons/generalIcons/generalIcon.index';
import StyleSheetSelection from '@/src/screens/styleSheet/styleSheet.index';
import {SAVE_BUTTON_TEXT} from '@/src/screens/onBoarding/onBoardingUtils/onBoardUtils.const.index';
import AppList from '@/src/component/common/appListBox/appList.index';
import {isStringNotEmpty} from '@/src/utils/utilityMethods/stringMethod.index';
interface AppFormType {
  fields?: any[];
  customStyle?: any;
  enableAutomaticScroll?: boolean;
  scrollEnable?: boolean;
  requireAppButton?: boolean;
  buttonText?: string;
  additionalField?: any;
  onPressButton?: any;
  buttonDisableState?: boolean;
  buttonInActiveState?: boolean;
}
const AppForm = (props: AppFormType) => {
  const {
    fields = [],
    customStyle = null,
    enableAutomaticScroll = isIOS,
    scrollEnable = true,
    requireAppButton = true,
    additionalField = null,
    buttonText = SAVE_BUTTON_TEXT,
    onPressButton = null,
    buttonDisableState = false,
    buttonInActiveState = false,
  } = props;
  const styleSheet = StyleSheetSelection();
  const [currentPickerValue, setCurrentPickerValue] = useState([]);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [currentPickerKeyValue, setCurrentPickerKeyValue] = useState('');
  const [openPicker, setOpenPicker] = useState(false);
  const [currentPickerTitle, setCurrentPickerTitle] = useState('');
  const calculatedCurrentFieldIndex = useMemo(() => {
    return currentFieldIndex;
  }, [currentFieldIndex]);

  const calculatedCurrentPickerTitle = useMemo(() => {
    return currentPickerTitle;
  }, [currentPickerTitle]);

  const calculatedOpenDatePicker = useMemo(() => {
    return openDatePicker;
  }, [openDatePicker]);
  const calculatedOpenPicker = useMemo(() => {
    return openPicker;
  }, [openPicker]);

  const calculatedCurrentPickerKeyValue = useMemo(() => {
    return currentPickerKeyValue;
  }, [currentPickerKeyValue]);
  const calculatedCurrentPickerValue = useMemo(() => {
    return currentPickerValue;
  }, [currentPickerValue]);

  const _openLocationSearchValue = async (index = 0) => {
    setCurrentFieldIndex(index);
    navigate(SCREEN_NAME.indexScreen, {
      onChangeLocation: _onChangeLocationValue,
      index,
    });
  };

  const _onChangeLocationValue = (location = '', index = -1) => {
    if (fields?.length > 0 && index > -1) {
      fields[index]?.onChangeStateMethod !== null &&
        fields[index]?.onChangeStateMethod(location);
    }
  };

  const _onChangFeedValue = (text: any, onChangeStateMethod: any) => {
    onChangeStateMethod !== null && onChangeStateMethod(text.nativeEvent.text);
  };

  const _closeDatePicker = () => {
    setOpenDatePicker(false);
  };
  const _setDatePickerCurrentValue = async (
    data = [],
    pickerKeyValue: string,
    index = 0,
  ) => {
    console.log(data, pickerKeyValue);
    await setCurrentFieldIndex(index);
    await setOpenDatePicker(true);
  };
  const _onGetValueFromDatePicker = (date: any) => {
    _closeDatePicker();
    if (fields?.length > 0 && calculatedCurrentFieldIndex < fields?.length) {
      fields[calculatedCurrentFieldIndex]?.onChangeStateMethod !== null &&
        fields[calculatedCurrentFieldIndex]?.onChangeStateMethod(date);
    }
  };
  const _renderDividerView = () => {
    return (
      <View>
        <View style={styleSheet.dividerViewRegular} />
        <View style={styleSheet.dividerView} />
      </View>
    );
  };
  const _renderDatePicker = (
    minimumDate = new Date(),
    // maximumDate = new Date(),
  ) => {
    return (
      <DateTimePickerModal
        isVisible={calculatedOpenDatePicker}
        mode="date"
        onConfirm={date => _onGetValueFromDatePicker(date)}
        onCancel={_closeDatePicker}
        minimumDate={minimumDate}
        // maximumDate={maximumDate}
      />
    );
  };
  const _updatePickerFieldValue = (
    value: any,
    key = '',
    onChange: any = null,
  ) => {
    setOpenPicker(false);
    if (isStringNotEmpty(key) && onChange !== null) {
      onChange(value[key]);
    }
  };
  const _setPickerCurrentValue = async (
    data = [],
    pickerKeyValue: string,
    index = 0,
    pickerTitle = '',
  ) => {
    console.log(
      'data--',
      data,
      pickerKeyValue,
      index,
      pickerTitle,
      calculatedCurrentPickerKeyValue,
      calculatedCurrentPickerValue,
    );
    await setCurrentFieldIndex(index);
    await setCurrentPickerKeyValue(pickerKeyValue);
    await setCurrentPickerValue(data);
    await setOpenPicker(!calculatedOpenPicker);
    await setCurrentPickerTitle(pickerTitle);
  };
  const _renderForm = () => {
    return (
      fields &&
      fields?.length > 0 &&
      fields.map((item: formFieldType, index: number) => {
        const {
          pickerKeyValue = 'name',
          pickerValue = [],
          fieldType = '',
          headerTitle = '',
          placeHolder = '',
          mandatory = false,
          keyboardType = KEYBOARD_TYPE.default,
          value = '',
          onChangeStateMethod = null,
          editable = true,
          maxLength = 100,
          autoCapitalize = 'none',
          minimumDate = new Date(),
          // maximumDate = new Date(),
          rightComponent = null,
          radioButtonData = [],
          selectedRadioIndex = 0,
          onClickRadioButton = null,
          customTextInputMainView = null,
          multiline = false,
          pickerTitle = '',
        } = item;

        switch (fieldType) {
          case FIELD_TYPE.text:
            return (
              <View>
                <CustomTextInput
                  multiline={multiline}
                  customTextInputMainView={customTextInputMainView}
                  autoCapitalize={autoCapitalize}
                  maxLength={maxLength}
                  editable={editable}
                  value={value}
                  header={headerTitle}
                  placeholder={placeHolder}
                  isMandetory={mandatory}
                  keyboardType={keyboardType}
                  onChange={(text: any) =>
                    _onChangFeedValue(text, onChangeStateMethod)
                  }
                  rightComponent={rightComponent}
                />
                {_renderDividerView()}
              </View>
            );
          case FIELD_TYPE.radio:
            return (
              <View>
                <RadioButtonRow
                  onChangeSelectedIndex={onClickRadioButton}
                  selectedIndex={selectedRadioIndex}
                  title={headerTitle}
                  data={radioButtonData}
                />
                {_renderDividerView()}
              </View>
            );
          case FIELD_TYPE.dropDown:
            return (
              <View>
                <Pressable
                  onPress={() =>
                    _setPickerCurrentValue(
                      pickerValue,
                      pickerKeyValue,
                      index,
                      pickerTitle,
                    )
                  }>
                  <CustomTextInput
                    rightIcon={DOWN_ARROW_BLACK}
                    rightIconPress={() =>
                      _setPickerCurrentValue(
                        pickerValue,
                        pickerKeyValue,
                        index,
                        pickerTitle,
                      )
                    }
                    editable={false}
                    value={value}
                    header={headerTitle}
                    placeholder={placeHolder}
                    isMandetory={mandatory}
                    keyboardType={keyboardType}
                    onChange={(text: any) =>
                      _onChangFeedValue(text, onChangeStateMethod)
                    }
                  />
                </Pressable>
                {calculatedOpenPicker &&
                  calculatedCurrentPickerTitle === pickerTitle && (
                    <AppList
                      onPress={(selectedPickerValue: any) =>
                        _updatePickerFieldValue(
                          selectedPickerValue,
                          pickerKeyValue,
                          onChangeStateMethod,
                        )
                      }
                      data={pickerValue}
                      keyName={pickerKeyValue}
                    />
                  )}
                {_renderDividerView()}
              </View>
            );
          case FIELD_TYPE.location:
            return (
              <View>
                <Pressable
                  onPress={
                    editable ? () => _openLocationSearchValue(index) : null
                  }>
                  <CustomTextInput
                    multiline={multiline}
                    customTextInputMainView={customTextInputMainView}
                    editable={isIOS}
                    value={value}
                    header={headerTitle}
                    placeholder={placeHolder}
                    keyboardType={keyboardType}
                    onChange={(text: any) =>
                      _onChangFeedValue(text, onChangeStateMethod)
                    }
                    onFocus={() => _openLocationSearchValue(index)}
                    rightComponent={rightComponent}
                  />
                </Pressable>
                {_renderDividerView()}
              </View>
            );
          case FIELD_TYPE.date:
            return (
              <View>
                <Pressable
                  onPress={
                    editable
                      ? () =>
                          _setDatePickerCurrentValue(
                            pickerValue,
                            pickerKeyValue,
                            index,
                          )
                      : null
                  }>
                  <CustomTextInput
                    multiline={multiline}
                    customTextInputMainView={customTextInputMainView}
                    isMandetory={mandatory}
                    editable={false}
                    leftIcon={CALENDER_ICON}
                    leftIconPress={() =>
                      editable
                        ? _setDatePickerCurrentValue(
                            pickerValue,
                            pickerKeyValue,
                            index,
                          )
                        : null
                    }
                    value={value}
                    header={headerTitle}
                    placeholder={placeHolder}
                    keyboardType={keyboardType}
                    onChange={() =>
                      editable
                        ? _setDatePickerCurrentValue(
                            pickerValue,
                            pickerKeyValue,
                            index,
                          )
                        : null
                    }
                    onFocus={
                      editable
                        ? () =>
                            _setDatePickerCurrentValue(
                              pickerValue,
                              pickerKeyValue,
                              index,
                            )
                        : null
                    }
                  />
                </Pressable>
                {calculatedOpenDatePicker && _renderDatePicker(minimumDate)}
                {_renderDividerView()}
              </View>
            );

          default:
            return null;
        }
      })
    );
  };
  return (
    <CustomKeyboardAwareScrollView
      customStyle={{flex: 0}}
      scrollEnable={scrollEnable}
      enableAutomaticScroll={enableAutomaticScroll}>
      <AppScrollView contentContainerStyle={{flex: 1}}>
        <View style={[styles.mainView, customStyle]}>
          <View style={styleSheet.dividerView} />
          {_renderForm()}
          {additionalField !== null && additionalField()}
          {requireAppButton && (
            <View>
              <View style={styleSheet.dividerViewRegular} />
              <AppButton
                onPress={onPressButton}
                disabled={buttonDisableState}
                title={buttonText}
                inActive={buttonInActiveState}
              />
              <View style={styleSheet.dividerViewRegular} />
            </View>
          )}
        </View>
      </AppScrollView>
    </CustomKeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: color.app_background_color,
    flex: 1,
    width: '100%',
  },
  uploadContainerView: {
    marginVertical: hp(1),
  },
});
export default AppForm;
