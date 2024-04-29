import { Link, useNavigate } from 'react-router-dom';
import SignUp from './registeration.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ThreeCircles } from 'react-loader-spinner';
import { useState } from 'react';
import { encrypt } from "../../encryption"; 

export default function Registeration() {
  const [errorMeg, setErorrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function sendingData(values) {
    setIsLoading(true);
    try {
      const encryptedEmail = encrypt(values.email);
      const encryptedPhoneNumber = encrypt(values.phoneNumber);

      values.email = encryptedEmail;
      values.phoneNumber = encryptedPhoneNumber;

      let { data } = await axios.post('http://localhost:5000/auth/register', values);
      console.log(data);

      if (data.message) {
        setSuccessMsg(data.message);
        setTimeout(function () {
          navigate('/VerifyEmail');
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.ValidationError[0]);
      setErorrMsg(error.response.data.ValidationError[0]);
    }
    setIsLoading(false);
  }

  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let validationSchema = Yup.object({
    username: Yup.string()
      .min(6, 'Name must be between 6 to 20 characters .')
      .max(20, 'Name must be between 6 to 20 characters .')
      .required('Name is required'),
    password: Yup.string()
      .matches(passwordRegex, 'Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .')
      .required('Password is required'),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Password and repassword does not match ^_^').required('Re-password is required'),
  });

  let formikObj = useFormik({
    initialValues: {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    validate: function () {
      setErorrMsg(null);
    },
    onSubmit: sendingData,
  });

  return (
    <div className="">
      <div className={SignUp.section}>
        {errorMeg ? <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center'}>{errorMeg}</div> : ''}
        {successMsg ? <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center'}>{successMsg}</div> : ''}
        <h2 className={SignUp.header}>Sign up</h2>
        <form onSubmit={formikObj.handleSubmit}>
          <input
            type="text"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.username}
            name="username"
            style={{ fontFamily: ' Segoe UI ,fontawesome  ' }}
            className={SignUp.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '}
            placeholder="&#xf007; Username"
          />
          {formikObj.errors.username && formikObj.touched.username ? (
            <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.username}</div>
          ) : (
            ''
          )}
          <input
            type="email"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.email}
            name="email"
            style={{ fontFamily: ' Segoe UI ,fontawesome  ' }}
            className={SignUp.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '}
            placeholder=" &#xf0e0; E-mail"
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.email}</div>
          ) : (
            ''
          )}
          <input
            type="password"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.password}
            name="password"
            style={{ fontFamily: ' Segoe UI ,fontawesome  ' }}
            className={SignUp.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '}
            placeholder=" &#xf023; Password"
          />
          {formikObj.errors.password && formikObj.touched.password ? (
            <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.password}</div>
          ) : (
            ''
          )}
          <input
            type="password"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.passwordConfirm}
            style={{ fontFamily: ' Segoe UI ,fontawesome  ' }}
            className={SignUp.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '}
            name="passwordConfirm"
            placeholder=" &#xf023; Re-Password"
          />
          {formikObj.errors.passwordConfirm && formikObj.touched.passwordConfirm ? (
            <div className={SignUp.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.passwordConfirm}</div>
          ) : (
            ''
          )}
          <input
            type="tel"
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            value={formikObj.values.phoneNumber}
            name="phoneNumber"
            style={{ fontFamily: ' Segoe UI ,fontawesome  ' }}
            className={SignUp.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '}
            placeholder=" &#xf095; Phonenumber "
          />
          <div className={SignUp.containerbtns}>
            <button className={SignUp.signupbtn} type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false}>
              {isLoading ? (
                <ThreeCircles visible={true} height="30" width="60" color="#fff" ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass="" />
              ) : (
                'Sign up'
              )}
            </button>
            <Link className={SignUp.fancy} to={'/LogIn'}>
              <span className={SignUp.topKey}></span>
              <span className={SignUp.text}>Log in</span>
              <span className={SignUp.bottomKey1}></span>
              <span className={SignUp.bottomKey2}></span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
