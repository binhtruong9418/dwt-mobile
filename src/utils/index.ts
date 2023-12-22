import Toast from 'react-native-simple-toast';

export const validateEmail = (email: string) => {
  return String(email.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePhone = (phone: string): boolean => {
  const phoneNumberRegex = /^(0|84)\d{9,10}$/;
  return phoneNumberRegex.test(phone);
};

export const showToast = (message: string) => {
  return Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
};
