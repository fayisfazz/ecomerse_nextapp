//import React from 'react'
import { Head } from "next/head"
import {useState, useContext, useEffect} from 'react'
import {DataContext} from '../../store/Globelstate'

function admin() {

  const initialState = { title: '', price:'', description: ''}
  const [checked, setChecked] = useState(false);
  const[files,setFiles] =useState({})
  const [userData, setUserData] = useState(initialState)
  const { title, price, description, isstock } = userData
  const { state,dispatch} = useContext(DataContext);
   const { auth } = state 
  //const router = useRouter()


  const handleChangeInput = e => {
  
    
    const {name, value} = e.target
   // console.log('aaa',name);
    setUserData({...userData, [name]:value})
    console.log('aaa',userData);
    dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleChange = (e) => {
   
    setChecked(e.target.checked);
  
   
  }; 
  const handleFiles = (e) => {
    setFiles(e.target.files[0])
    
   
  }; 



  const handleSubmit=e=>{
    //console.log(e);
   
  e.preventDefault()
  //const errMsg = valid(title, price, description, isstock)
  //if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg} })

  //dispatch({ type: 'NOTIFY', payload: {loading: true} })

  const isstocks={isstock:checked}
  const userDatas={...userData,...isstocks}

console.log(files);
  console.log(userDatas);

  //const res = await postData('admin/', userDatas)
  
 // if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

 // return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
}




  return (
    <div>
        <div class ="justify-content-center">ADD PRODUCT DETAILS</div>

        <form onSubmit={handleSubmit}>
  
            <div><label for="title">title</label></div>
            <div><input type="text" name="title" value={title} onChange={handleChangeInput}></input></div>

            <div><label for="text">price</label></div>
            <div><input type="number" name="price" value={price} onChange={handleChangeInput}></input></div>
            <div><label for="title">description</label></div>
            <div><input type="text" name="description" value={description} onChange={handleChangeInput}></input></div>

            <div >
  <input type="checkbox"  onChange={handleChange} ></input>
  <label for="flexCheckChecked">
    isStock
  </label>
</div>
            
            <label for="exampleFormControlFile1">product Image</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={handleFiles}></input>
           

       
   <div><button type="submit" class="btn btn-dark">Button</button></div> <div/> 
</form>

  
 


</div>
  )


}

export default admin