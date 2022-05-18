import { comments } from "../../../data/comments";

export default function handler(req, res) {

    const {commentId}=req.query
    const comment=comments.find((comment)=>comment.id===parseInt(commentId))
    res.status(200).json(comment)

//   if (req.method==='GET') {
//     console.log(comments);
//     res.status(200).json(comments )

//   }else if (req.method==='POST') {
 
//     const comment = req.body.comment
//     const newcomment={

//       id:Date.now(),
//       text:comment
//     }
//     comments.push(newcomment)
//     console.log(comments);
//     res.status(201).json(newcomment)
//   }else if(req.method==='DELETE'){

//     const deletedComment= comments.find((comment)=>comment.id===parseInt(commentId))
//     const index = comment.findindex((comment)=>comment.id===parseInt(commentId))
//     comments.splice(index,1)
//     req.res.json(deletedComment)


//   }

  }
  
  