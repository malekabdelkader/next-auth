// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import { users } from './login';

import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken');
type Data = {
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {method}=req
  const handleCreateUser=async(user:User)=>{
    const exitUser=users.find(u=>u.email===user.email)
    if(exitUser){
      res.status(409).json({ messsage:'Email already exist'})
      return; 
    }
    const password=await hashIt(user.password)
    users.push({...user,password,id:(Math.random()*1000).toString()})
    console.log({email:user.email,password:user.password});
    res.status(200).json({ messsage:'success!'} )

}

  switch(method){
    case 'POST':{ 
      const {firstName,email,password}:User=req.body
     handleCreateUser({firstName,email,password})
      break; 
   } 
    default :res.status(404).json({message:'Not Found' })
  }

  
}

export async function hashIt(password:string){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed
}
export async function compareIt(password:string,hashedPassword:string){
  const validPassword = await bcrypt.compare(password, hashedPassword);
  console.log('password is valid=',validPassword);
  
  return validPassword;
}