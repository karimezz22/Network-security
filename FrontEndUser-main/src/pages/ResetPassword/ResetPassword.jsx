import {  useNavigate } from 'react-router-dom'
import Reset from './resetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { ThreeCircles } from 'react-loader-spinner'
import { useState } from 'react'
import { encrypt } from "../../encryption"; 


export default function ResetPassword() {

    const [errorMeg, setErorrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    async function sendingData(values) {
        setIsLoading(true)
        try {
            const encryptedEmail = encrypt(values.email);
            values.email = encryptedEmail;
            const encryptedCode = encrypt(values.resetCode);
            values.resetCode = encryptedCode;

            let { data } = await axios.post("http://localhost:5000/auth/reset-password", values)
            console.log(data);

            if (data.message) {
                setSuccessMsg(data.message);
                setTimeout(function () {
                    navigate('/LogIn');
                }, 5000);
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
        resetCode:Yup.string().required("Code is required"),
        newPassword: Yup.string().matches(passwordRegex, "Password at least containt Minimum 8 characters, at least one uppercase letter and one lowercase letter .").required("Password is required"),

    })
    let formikObj = useFormik({
        initialValues: {
            email: "",
            resetCode:"",
            newPassword: "",
        }, validationSchema,
        validate: function () {
            setErorrMsg(null)
        },
        onSubmit: sendingData


    })
    return <div className="">
        <div className={Reset.section}>
            {errorMeg ? <div className={Reset.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center'}>{errorMeg}</div> : ""}
            {successMsg ? <div className={Reset.alert + ' text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center'}>{successMsg}</div> : ""}
            <h2 className={Reset.header}>Reset Password</h2>
            <form onSubmit={formikObj.handleSubmit}>




                <input type="email" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} name='email' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={Reset.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf0e0; E-mail' />
                {(formikObj.errors.email && formikObj.touched.email) ? <div className={Reset.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.email}</div> : ""}

                <input type="text" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.resetCode} name='resetCode' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={Reset.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf023; Code' />
                {(formikObj.errors.resetCode && formikObj.touched.resetCode) ? <div className={Reset.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.resetCode}</div> : ""}

                <input type="password" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.newPassword} name='newPassword' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={Reset.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf023; Password' />
                {(formikObj.errors.newPassword && formikObj.touched.newPassword) ? <div className={Reset.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.newPassword}</div> : ""}





                <div className={Reset.containerbtns}>
                    <button className={Reset.signupbtn} type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
                        {isLoading ? <ThreeCircles
                            visible={true}
                            height="30"
                            width="60"
                            color="#fff"
                            ariaLabel="three-circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : "Submit"}
                    </button>

                </div>
            </form>
        </div>
    </div>
    // http://localhost:4000/auth/register
    // https://printing-sys-fojo.vercel.app/auth/register
    // https://ecommerce.routemisr.com/api/v1/auth/signup
}