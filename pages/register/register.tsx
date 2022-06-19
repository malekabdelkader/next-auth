import React, { useEffect, useState } from "react";
import type { NextPage} from "next";
import styles from "./register.module.scss";
import auth from '../../services/Authentification/Authentication';
import { useRouter } from 'next/router'
interface FormSubmit  {
  email: string;
  password: string;
}

const Register: NextPage<any> = () => {
    const [userLoginForm,setUserLoginForm]=useState<FormSubmit>({
        email:'',
        password:''
    })
  const [isLoading, setisLoading] = useState<boolean>(false)
  const router = useRouter()
  const REDIRECT_ON_LOGGED_IN = "/profile";


  const handleInputChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      setUserLoginForm((prev)=>({
          ...prev,
          [event.target.name]:event.target.value
      }))
  }

  useEffect(() => {
    // if user already logged in, redirect
    if (auth.getCurrentUser()) {
      router.push(REDIRECT_ON_LOGGED_IN);
    } // eslint-disable-next-line
  }, []);


  
  const onSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
    setisLoading(true)
    auth.login(userLoginForm)
      .then((localStorageObj) => {
          alert('you in')
        router.replace(REDIRECT_ON_LOGGED_IN)
        })
      .catch((err: Error) => {
        setisLoading(false)
        return console.error(err)
      })
  }


  return (
    <div className={`${styles.Login}`}>
      <h1 className={`${styles.heading}`}>Sign In</h1>
      <div  className={`${styles.Form}`}>
        <input onChange={handleInputChange} className='form-control input' value={userLoginForm.email} name='email' type={'email'} placeholder='Email' />
        <input onChange={handleInputChange} className='form-control input' value={userLoginForm.password} type={'password'} name='password' placeholder='Password' />
        <button  onClick={onSubmit} disabled={isLoading} >Submit</button>
      </div>
        
    </div>
  )
}

export default Register;



