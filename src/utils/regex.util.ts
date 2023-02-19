export const validateEmail = (email: string): boolean =>
  /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/i.test(email);

export const validatePhone = (phone: string): boolean =>
  /(13\d|14[579]|15[^4\D]|17[^49\D]|18\d)\d{8}/.test(phone);
