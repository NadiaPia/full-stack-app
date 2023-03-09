import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup" //a library that is for validation data inserting into the Form
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';


function CreatePost() {

    const {authState} = useContext(AuthContext);

    useEffect(() => {
        if (!localStorage.getItem("accessTokenn")) //{ if(!authState) needs time to get the response about status after refresh this page => it will redirect to the login page in this case even though the user is logged in
            navigate("/login")
          } 

    }, [])

    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",       
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),       
    })

    //data is collected in Formik
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data, {headers: {accessToken: localStorage.getItem("accessTokenn")}}).then((response) => {
        navigate("/")
      
    }) 
    }

 
    return (
    <div className='createPostPage'>
        <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >        
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>  {/* component="span" from what html element we want to create an error message*/}
                <Field 
                    autoComplete="off"                
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="ex.title..."
                />                                               {/* name mast be the same as in database*/}
            
                <label>Post: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="text..."
                />
                
                <button type="submit">Create Post</button>
            </Form>

        </Formik>
    </div>
  )
}

export default CreatePost
