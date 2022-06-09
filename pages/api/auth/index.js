// import { doLogin, checkLogedIn } from "../../../controllers/user/auth";

// export default async function handler(req, res) {
//     const { method } = req.method;

//     try {
//         switch (method) {
//             case "GET":
//                 {
//                     const { error, status, payload } = await checkLogedIn(req, res);
//                     if (error) {
//                         res.status(status).json({ error })
//                     } else {
//                         res.status(status).json(payload);
//                     }

//                     break;
//                 }
//             case "POST":
//                 {
//                     const {error, status, payload}=await doLogin(req, res);

//                     if(error){
//                         res.status(status).json({error})
//                     }else{
//                         res.status(status).json(payload);
//                     }

//                     break;
//                 }
//             default:
//                 res.end();
//         }
//     } catch (e) {
//         res.status(500).json({ error: e?.error });
//     }
// }

import { people } from '../../../data/comments'

export default function handler(req, res) {
  res.status(200).json(comments)
}