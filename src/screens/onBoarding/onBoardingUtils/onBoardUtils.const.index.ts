export const SPATIKKA_TEXT = 'SPATIKAA!';
export const GET_STARTED_TEXT =
  'To get you started continue to fill in\n your personal details, availability &\nrequirements.';
export const GET_STARTED_BUTTON_TEXT = 'Get Started';
export const SKIP_BUTTON_TEXT = 'Skip';
export const TOTAL_ONBOARDING_SCREENS = 5;
export const SAVE_BUTTON_TEXT = 'Save & Next';
export const PERSONAL_DETAILS_INPUT_BOX = {
  name: {
    title: 'Name',
    placeHolder: 'Enter your name',
  },
  mailId: {
    title: 'Email id',
    placeHolder: 'Enter your email address',
  },
  mobile: {
    title: 'Mobile No.',
    placeHolder: 'Enter your mobile number',
  },

  dob: {
    title: 'Date of Birth',
    placeHolder: 'DD/MM/YYYY',
  },
  weddingDate: {
    title: 'Wedding Anniversary',
    placeHolder: 'DD/MM/YYYY',
  },
  webSite: {
    title: 'Website',
    placeHolder: 'eg. www.example.com',
  },
  aadhar: {
    title: 'Add Aadhar Card No.',
    placeHolder: 'ABGHXXXXXXXXXXX',
  },
  gender: {
    title: 'Gender',
    placeHolder: 'Select Gender',
  },
  branch: {
    title: 'Add Branch',
    placeHolder: 'Please add your operating branches',
  },
  branchName: {
    title: 'Branch Name',
    placeHolder: 'Please add your branch name',
  },
  branchDescription: {
    title: 'Address',
    placeHolder: 'Please add description',
  },
  bio: {
    title: 'Bio',
    placeHolder: 'Please add you bio here',
  },
  experience: {
    title: 'Experience',
    placeHolder: 'Please add you experience',
  },
  language: {
    title: 'Languages preferred for consultation',
    placeHolder: 'Select language',
  },
  expertise: {
    title: 'Expertise',
    placeHolder: 'Select expertise',
  },
  certificate: {
    title: 'Add Certificate(Optional)',
    placeHolder: 'Upload certificate/qualifications',
  },
};
export const AVAILABLE_GENDER = {
  male: 0,
  female: 1,
  others: 2,
};
export const GENDER_ARRAY = [
  {title: 'female'},
  {title: 'male'},
  {title: 'other'},
];
export const VOTER_CATEGORY = [
  {title: 'red'},
  {title: 'green'},
  {title: 'yellow'},
];
export interface branchDetailsType {
  branchName?: string;
  branchAddress?: string;
  form?: any;
  length?: any;
  push?: any;
  onChangeBranchName?: any;
  onChangeBranchAddress?: any;
}
export const PERSONAL_DETAILS_FORM_TITLE = 'Personal Details';
export const SKILL_DETAILS_FORM_TITLE = 'Add Skills';
export const BIO_MAX_LENGTH = 200;
export const LANGUAGE_PICKER = 'languagePicker';
export const EXPERTISE_PICKER = 'expertisePicker';
export const TEMP_AVAILABLE_LANGUAGES = [
  {name: 'English'},
  {name: 'Hindi'},
  {name: 'Tamil'},
  {name: 'Gujarati'},
  {name: 'Marathi'},
  {name: 'Kanadda'},
];

export const TEMP_AVAILABLE_EXPERTISE = [
  {name: 'Horoscope Reading'},
  {name: 'Palmestry'},
  {name: 'Numerology'},
  {name: 'Gemology'},
  {name: 'Husband'},
  {name: 'Face Reading'},
  {name: 'Tarot Card Reading'},
];
