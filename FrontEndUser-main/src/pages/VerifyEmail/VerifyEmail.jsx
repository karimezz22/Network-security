import axios from "axios";
import Verify from './verifyEmail.module.css'
import { useFormik } from "formik";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import {  useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { encrypt } from "../../encryption"; 


export default function VerifyEmail() {

    const [errorMeg, setErorrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    async function sendingData(values) {
        setIsLoading(true)
        try {
            const encryptedcode = encrypt(values.code);
            values.code = encryptedcode;

            let { data } = await axios.post("http://localhost:5000/auth/verify-email", values)
            console.log(data);
            // https://printing-sys-fojo.vercel.app/auth/register
            //https://ecommerce.routemisr.com/api/v1/auth/signup
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


    let validationSchema = Yup.object({
        code:Yup.string(),

    })
    let formikObj = useFormik({
        initialValues: {
            code: ""

        }, validationSchema,
        validate: function () {
            setErorrMsg(null)
        },
        onSubmit: sendingData


    })
    return <div className={Verify.container}>
        <div className={Verify.section}>
            {errorMeg ? <div className={Verify.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center'}>{errorMeg}</div> : ""}
            {successMsg ? <div className={Verify.alert + ' text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center'}>{successMsg}</div> : ""}
            <h2 className={Verify.header}>Verify Email</h2>
            <form onSubmit={formikObj.handleSubmit}>





                <input type="text" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.code} name='code' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={Verify.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf023; Code' />
                {(formikObj.errors.code && formikObj.touched.code) ? <div className={Verify.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.code}</div> : ""}



                <div className={Verify.containerbtns}>
                    <button className={Verify.signupbtn} type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
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

}


