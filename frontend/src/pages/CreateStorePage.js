import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { createStore } from '../actions/storeActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';


function CreateStore(props) {
  const [name, setName ] = useState('')
    const [address, setAddress ] = useState('')
    const [city, setCity ] = useState('')
    const [description, setDescription ] = useState('')
    const [imageUrl, setImageUrl] = useState('');



    const redirect = props.location.search? props.location.search.split('=')[1] : '/stores';
    //get access to createStore from redux store
    const createdStore = useSelector((state) => state.createdStore)
    const { userInfo, loading, error } = createdStore;
  
//   const handleFile = (e) =>{
//       //{shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
//     const image = e.target.files[0];
//     if(image === '' || image === undefined) {
//       alert("Not an image")
//     }
//     setImage(image)
//   }

  // const storeInfo = useSelector((state) => state.storeInfo);
  // const { loading, error, stores } = storeInfo;
  const dispatch = useDispatch();
  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(createStore(name, address, city, description, imageUrl));
  
  }


  //keep track of changes to storeInfo
  useEffect(()=>{
      if(userInfo) {
          props.history.push(redirect)
      }
  },[props.history, redirect, userInfo])
    return (
        <div>
          <Link to ="/stores">Stores Page</Link>
         
          <form className = "form" onSubmit={submitHandler}>

           <div>
           {/*<pre>{JSON.stringify(imageUrl, null, '\t')}</pre> */}
           <h1>Create Store</h1>
           </div>
           {loading && <LoadingBox></LoadingBox>}
           { error && <MessageBox variant="danger">{error}</MessageBox> }
            <div>
                <lable htmlFor="name">Store Name</lable>
                <input type ="text" id ="name" placeholder="Enter store name"
                 onChange = {(e) =>setName( e.target.value)} >   
                </input>
           </div>
                    <div>
                        <lable htmlFor="address">Address</lable>
                        <input type ="text" id ="address" placeholder="Enter address"
                         onChange = {(e) =>setAddress( e.target.value)}>
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="city">City/Towm</lable>
                        <input type ="text" id ="city" placeholder="Enter city/towm"
                        onChange = {(e) =>setCity( e.target.value)}
                        >
                        </input>
                    </div>
                    <div>
                        <lable htmlFor="description">Description</lable>
                        <input type ="text" id ="description" placeholder="Enter store description"
                        onChange = {(e) =>setDescription( e.target.value)}
                        >
                        </input>
                    </div>
                    
                    <div>
                        
                        <FileBase64 type ="file" multiple={false}  
                        onDone = {({base64}) => setImageUrl(base64)}
                        />
                    </div>
                
                    
            <div>
                        <label />
                        <button className ="primary" type ="submit">Create</button>
                    </div>
            </form>
      </div>  
    )
}

export default CreateStore