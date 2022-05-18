import React from 'react'
import { useState } from 'react'
import axios from 'axios'


export default function comments() {

    
const [comments, setcomments] = useState([])
const [comment, setComment] = useState('')

const fetchdata= async() => {
    const response = await fetch('/api/comments')
    //console.log(response);
    const data = await response.json()
    console.log(data);
    setcomments(data)


}

const postData= async()=>{

  const response=await axios({
    method: 'POST',
    url: '/api/comments',
    data: {
      comment
    }
  });
  console.log(response);

  setComment(response)
  
}

const deleteData=async(commentid)=>{

  const response=await axios({
    method: 'DELETE',
    url: `/api/comments/${commentid}`,
    data: {
      comments
    }
  });

}

  return (
    <>
    <input type='text' value={comment} onChange={e=> setComment(e.target.value)}/>
    <button onClick={postData}>submit button</button>
    <button onClick={fetchdata}>comments buttun</button>
    { comments && comments.map((comment)=>{
            return(
               <div key = {comment.id}> {comment.id}{comment.text}
               <button onClick={()=>deleteData(comment.id)}>Delete comment</button></div>
            )
        })
    }
    
    
    </>

  
    
  
  )
}
