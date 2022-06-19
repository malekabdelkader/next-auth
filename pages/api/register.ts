// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
const jwt = require('jsonwebtoken');

type Data = {
  name: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const {method}=req
  const token=jwt.sign({ foo: 'bar' }, 'shhhhh');
  switch(method){
    case 'POST':res.status(200).json({ token, id:15, firstName:req.body.firstName, email:req.body.email})
    case 'GET':res.status(200).json({ name: 'John Doe' })
    default :res.status(200).json({ name: 'John Doe' })
  }
  
}
