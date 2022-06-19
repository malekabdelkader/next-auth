// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import { compareIt } from './register';
const jwt = require('jsonwebtoken');

type Data = {
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {method}=req
  const handleAuthetificateUser=async(email:string,password:string)=>{
   const user= users.find(u=>u.email==email)
   console.log({email,password});
   console.log(users.length)
   console.log(users.map(e=>(e.email+","+e.password)));
   console.log(user);
   

   if( !user || !(await compareIt(password,user.password))){
     res.status(403).json({ messsage:'Wrong Email or Password '} )
     return;
   }
   const token=jwt.sign({ email,id:user.id,firstName:user.firstName }, 'shhhhh');
   res.status(200).json({ messsage:'Success !',token} )

  }
  switch(method){
    case 'POST':{ 
      const {email,password}=req.body
      await handleAuthetificateUser(email,password)
      break; 
   } 
    default :res.status(404).json({message:'Not Found' })
  }

  
}

export var users:User[]=[]