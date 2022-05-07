export const FIELD_TYPE = {
    text: 'text',
    dropDown: 'dropDown',
    location: 'location',
    uploadDoc: 'uploadDoc',
    date: 'date',
    radio: 'radio',
};
export interface formFieldType {
    pickerKeyValue?: string;
    pickerValue?: any;
    fieldType?: string;
    headerTitle?: string;
    placeHolder?: string;
    mandatory?: boolean;
    keyboardType?: string;
    value?: string;
    onChangeStateMethod?: any;
    editable?: boolean;
    maxLength?: number;
    autoCapitalize?: string;
    minimumDate?: any;
    maximumDate?: any;
    rightComponent?: any;
    radioButtonData?: any;
    selectedRadioIndex?: number;
    onClickRadioButton?: any;
    customTextInputMainView?: any;
    multiline?: boolean;
    pickerTitle?: string;
}
