import { AuthIdentifier } from '@/enums';
import { validateEmail, validatePhone } from './regex.util';

export const determineIdentityName = (identity: string): string => {
  if (validateEmail(identity)) return '邮箱';
  if (validatePhone(identity)) return '手机号';
  return '';
};

export const determineIdentityEnum = (identity: string): AuthIdentifier => {
  if (validateEmail(identity)) return AuthIdentifier.EMAIL;
  if (validatePhone(identity)) return AuthIdentifier.PHONE;
  return '' as AuthIdentifier;
};
