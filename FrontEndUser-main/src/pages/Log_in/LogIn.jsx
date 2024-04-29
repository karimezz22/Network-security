
import { Link, useNavigate } from 'react-router-dom'
import LOGIN from './login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ThreeCircles } from 'react-loader-spinner'
import { useState } from 'react'
import { encrypt } from "../../encryption"; 

export function LogIn() {

  const [errorMeg, setErorrMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  async function sendingData(values) {
    setIsLoading(true)
    try {
      const encryptedEmail = encrypt(values.email);
      values.email = encryptedEmail;
      
      let { data } = await axios.post("http://localhost:5000/auth/login", values)
      console.log(data);
      //http://localhost:4000/auth/login
      // https://printing-sys-fojo.vercel.app/auth/register

      if (data.message) {
        setSuccessMsg(data.message);
        setTimeout(function () {
          navigate('/');
        }, 3000);
      }
    }
    catch (error) {
      console.log(error)
      console.log(error.response.data.message);
      setErorrMsg(error.response.data.message);
    }
    setIsLoading(false)
  }

  let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  let validationSchema = Yup.object({
    email: Yup.string().required("E-mail is required"),

    password: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),

  })
  let formikObj = useFormik({
    initialValues: {
      email: "",
      password: "",

    }, validationSchema,
    validate: function () {
      setErorrMsg(null)
    },
    onSubmit: sendingData


  })
  return <div className="">
    <div className={LOGIN.section}>
      {errorMeg ? <div className={LOGIN.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center'}>{errorMeg}</div> : ""}
      {successMsg ? <div className={LOGIN.alert + ' text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center'}>{successMsg}</div> : ""}
      <h2 className={LOGIN.header}>Login</h2>
      <form onSubmit={formikObj.handleSubmit}>




        <input type="email" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} name='email' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={LOGIN.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf0e0; E-mail' />
        {(formikObj.errors.email && formikObj.touched.email) ? <div className={LOGIN.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.email}</div> : ""}



        <input type="password" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.password} name='password' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={LOGIN.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf023; Password' />
        {(formikObj.errors.password && formikObj.touched.password) ? <div className={LOGIN.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.password}</div> : ""}



        <div className={LOGIN.containerbtns}>
          <button className={LOGIN.signupbtn} type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
            {isLoading ? <ThreeCircles
              visible={true}
              height="30"
              width="60"
              color="#fff"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            /> : "Login"}
          </button>

            <Link className={LOGIN.fancy} to={"/Registeration"}>
              <span className={LOGIN.topKey}></span>
              <span className={LOGIN.text}>Sign up</span>
              <span className={LOGIN.bottomKey1}></span>
              <span className={LOGIN.bottomKey2}></span>
            </Link>

        </div>
        <div className={LOGIN.forget}>
          <Link to={"/ForgetPassword"} className={LOGIN.forgettext}>Forget Password?
          </Link>

        </div>
      </form>
    </div>
  </div>

}


