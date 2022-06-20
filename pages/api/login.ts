// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import { compareIt } from './register';
import jwt  from 'jsonwebtoken';
import fs from 'fs';
import usersFile from '../../users.json'
import UserSessionsFile from '../../sessions.json'
import Session from '../../models/Session';
const UserSessionsFileName='./sessions.json'
type Data = {
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {method}=req
  const handleAuthetificateUser=async(email:string,password:string)=>{
   let users:User[]=usersFile
   let UserSessions:Session[]=UserSessionsFile
   const user= users.find(u=>u.email==email)
   if( !user || !(await compareIt(password,user.password))){
     res.status(403).json({ messsage:'Wrong Email or Password '} )
     return;
   }
   const token=jwt.sign({ email,id:user.id,firstName:user.firstName }, 'shhhhh');
   UserSessions.push({token,LoginTime:new Date().toJSON()})
   fs.writeFileSync(UserSessionsFileName, JSON.stringify(UserSessions));
   res.status(200).json({...user, token} )

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

