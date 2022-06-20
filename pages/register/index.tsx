import React, { useEffect, useState } from "react";
import type { NextPage} from "next";
import auth from '../../services/Authentification/Authentication';
import { useRouter } from 'next/router'
import AuthLayout from "../../layouts/authLayout";
import { useSelector } from "react-redux";
import { storeDetails } from "../../store";


interface FormSubmit  {
  email: string;
  password: string;
  firstName:string
}

const Register: NextPage<any> = () => {
  const router = useRouter()
  const REDIRECT_ON_REGISTER = "/login";
  const REDIRECT_ON_LOGGED_IN='/'
  const {isAuthetificated}=useSelector((state:storeDetails)=>state)

  useEffect(() => {
    // if user already logged in, redirect
    if (isAuthetificated) {
        router.push(REDIRECT_ON_LOGGED_IN);
    } // eslint-disable-next-line
  }, []);


  
  const onSubmit = (userLoginForm:FormSubmit) => {
    auth.register(userLoginForm)
      .then((o) => {
        router.replace(REDIRECT_ON_REGISTER)
        })
      .catch((err: Error) => {
        //in case just of email exists ( can be server down or smth else)
        alert('Error: Possible Email exist')
        return console.error(err)
      })
  }


  return (
    <AuthLayout
      inputs={[
        {
          type: "text",
          placeholder: "First Name",
          id: "firstName",
        },
        {
          type: "email",
          placeholder: "Email",
          id: "email",
        },
        {
          type: "password",
          placeholder: "Password",
          id: "password",
        }
      ]}
      submitBtnText={"Sign Up"}
      onSubmit={(user: FormSubmit) => onSubmit(user)}
      redirect={{url:'/login',text:'Login'}}
    />
  )
}

export default Register;



