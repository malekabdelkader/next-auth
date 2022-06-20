import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import auth from "../../services/Authentification/Authentication";
import { useRouter } from "next/router";
import Link from "next/link";
import AuthLayout from "../../layouts/authLayout";
import  { storeDetails, UserAction } from '../../store/index'
import { useDispatch,useSelector } from "react-redux";

interface FormSubmit {
  email: string;
  password: string;
}

const Signin: NextPage<any> = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const {isAuthetificated}=useSelector((state:storeDetails)=>state)

  const REDIRECT_ON_LOGGED_IN = "/";
  useEffect(() => {
    // if user already logged in, redirect
    if (isAuthetificated) {
       router.push(REDIRECT_ON_LOGGED_IN);
    } // eslint-disable-next-line
  }, []);

  const onSubmit = (userLoginForm: FormSubmit) => {
    auth
      .login(userLoginForm)
      .then((localStorageObj) => {
        dispatch(UserAction.signin(localStorageObj))
        router.replace(REDIRECT_ON_LOGGED_IN);
      })
      .catch((err: Error) => {
        alert('Wrong Email or Password!')
        return console.error(err);
      });
  };

  return (
    <AuthLayout
      inputs={[
        {
          type: "email",
          placeholder: "Email",
          id: "email",
        },
        {
          type: "password",
          placeholder: "Password",
          id: "password",
        },
      ]}
      submitBtnText={"Log In"}
      onSubmit={(user: FormSubmit) => onSubmit(user)}
      redirect={{url:'/register',text:'Register'}}
    />
  );
};

export default Signin;
