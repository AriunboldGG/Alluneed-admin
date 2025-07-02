// Named
import { requiredMsg, phoneRegex, phoneRegexMsg } from 'src/utils/regex';
// default
import * as Yup from 'yup';

export function userUpdateSchema() {
  const Value = Yup.object().shape({
    username: Yup.string().required(requiredMsg),
    position: Yup.string().required(requiredMsg),
    phoneNumber: Yup.string()
      .required(requiredMsg)
      .matches(phoneRegex, phoneRegexMsg),
  });
  return Value;
}

export function passwordSchema() {
  const Value = Yup.object().shape({
    oldPassword: Yup.string().required(requiredMsg),
    newPassword: Yup.string().required(requiredMsg),
    confirmPassword: Yup.string().required(requiredMsg),
  });
  return Value;
}

export const defaultValues = {
  firstname: '',
  lastname: '',
  username: '',
  phoneNumber: '',
  position: '',
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
