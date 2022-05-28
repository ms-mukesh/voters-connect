import { isStringNotEmpty } from "@/src/utils/utilityMethods/stringMethod.index";
import { MONTH_INITIALS_NAME } from "@/src/constant/generalConst";


const getYearsArray = () => {
  let arr = [];
  const initialYear = new Date().getFullYear();
  for (let i = initialYear; i >= 1950; i--) {
    arr.push({name: String(i)});
  }
  return arr;
};

const getFormatedDateWithMonthAndYear = (date = '') => {
  try {
    if (isStringNotEmpty(date)) {
      const dateString = new Date(date);
      let dateFormat =
        dateString.getFullYear() +
        '-' +
        (dateString.getMonth() + 1) +
        '-' +
        dateString.getDate();
      return dateFormat;
    } else {
      return '';
    }
  } catch (ex) {
    return '';
  }
};
const getFormatedLastUpdatedDate = (date: any) => {
  try {
    if (isStringNotEmpty(date)) {
      const dateString = new Date(date);
      let dateFormat =
        dateString.getDate() +
        ' ' +
        MONTH_INITIALS_NAME[dateString.getMonth()] +
        ' ' +
        dateString.getFullYear();
      return dateFormat;
    } else {
      return '';
    }
  } catch (ex) {
    return '';
  }
};

const getDateFromTodaysDate = (daysDiff = 1) => {
  try {
    const today = new Date();
    const priorDate = new Date(new Date().setDate(today.getDate() - daysDiff));
    return priorDate;
  } catch (ex) {
    return new Date();
  }
};
const getFormattedTime = (timeString = '') => {
  try {
    if (!isStringNotEmpty(timeString)) {
      return '';
    }
    let hours = new Date(timeString).getHours();
    let minutes: any = new Date(timeString).getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
  } catch (ex) {
    return '';
  }
};
const getFormattedDate = (date: any) => {
  try {
    if (isStringNotEmpty(date)) {
      const dateString = new Date(date);
      let dateFormat =
        dateString.getDate() +
        '-' +
        (dateString.getMonth() + 1) +
        '-' +
        dateString.getFullYear();
      return dateFormat.includes('NaN') ? date : dateFormat;
    } else {
      return '';
    }
  } catch (ex) {
    return '';
  }
};
export {
  getFormattedTime,
  getFormatedDateWithMonthAndYear,
  getYearsArray,
  getFormatedLastUpdatedDate,
  getDateFromTodaysDate,
  getFormattedDate
};
