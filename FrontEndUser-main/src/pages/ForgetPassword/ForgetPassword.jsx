import axios from "axios";
import Forget from './forgetPassword.module.css'
import { useFormik } from "formik";
import { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { encrypt } from "../../encryption"; 


export default function ForgetPassword() {

    const [errorMeg, setErorrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    async function sendingData(values) {
        setIsLoading(true)
        try {
            const encryptedEmail = encrypt(values.email);
            values.email = encryptedEmail;
            
            let { data } = await axios.post("http://localhost:5000/auth/forgot-password", values)
            console.log(data);
            // https://printing-sys-fojo.vercel.app/auth/register
            //https://ecommerce.routemisr.com/api/v1/auth/signup
            if (data.message) {
                setSuccessMsg(data.message);
                setTimeout(function () {
                    navigate('/ResetPassword');
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
        email: Yup.string().email("E-mail should include '@' to be valid").required("E-mail is required")

    })
    let formikObj = useFormik({
        initialValues: {
            email: ""

        }, validationSchema,
        validate: function () {
            setErorrMsg(null)
        },
        onSubmit: sendingData


    })
    return <div className={Forget.container}>
        <div className={Forget.section}>
            {errorMeg ? <div className={Forget.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 text-center'}>{errorMeg}</div> : ""}
            {successMsg ? <div className={Forget.alert + ' text-red-200 shadow-inner rounded p-3 bg-green-300 mt-2 text-center'}>{successMsg}</div> : ""}
            <h2 className={Forget.header}>Forget Password</h2>
            <form onSubmit={formikObj.handleSubmit}>





                <input type="email" onChange={formikObj.handleChange} onBlur={formikObj.handleBlur} value={formikObj.values.email} name='email' style={{ fontFamily: " Segoe UI ,fontawesome  " }} className={Forget.input + ' mt-5 border w-full text-base px-2 py-2 focus:outline-5 focus:ring-3 focus:border-white-600 '} placeholder=' &#xf0e0; E-mail' />
                {(formikObj.errors.email && formikObj.touched.email) ? <div className={Forget.alert + ' text-red-200 shadow-inner rounded p-3 bg-red-300 mt-2 '}>{formikObj.errors.email}</div> : ""}




                <div className={Forget.containerbtns}>
                    <button className={Forget.signupbtn} type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false}>
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

