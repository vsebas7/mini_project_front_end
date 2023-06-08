import * as Yup from "yup"
import YupPassword from 'yup-password';
YupPassword(Yup);

// @define register validation schema
export const signUpSchema = Yup.object({
  username : Yup.string().required(),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, 'password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minSymbols(1, 'password must contain at least 1 special character'),
  phone: Yup.string()
    .required('')
    .matches(/[0-9]/,'phone must be a number')
    .matches(/0[0-9]/,'phone must start with 0')
    .min(10,'phone must contain 10 or more digits')
});

export const signInSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
  .required("Password is required")
  .min(6, 'password must contain 6 or more characters with at least one of each: uppercase, special character')
  .minUppercase(1, 'password must contain at least 1 upper case letter')
  .minSymbols(1, 'password must contain at least 1 special character'),
});


export const changePasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(6, 'password must contain 6 or more characters with at least one of each: uppercase, special character')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minSymbols(1, 'password must contain at least 1 special character'),
  confirm: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Must match "password" field value'),
});