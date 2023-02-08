import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup" //a library that is for validation data inserting into the Form

function CreatePost() {

    const initialValues = {
        title: "",
        postText: "",
        userNAme: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        userNAme: Yup.string().min(3).max(15).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("It worked")
      
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

                <label>UserName: </label>
                <ErrorMessage name="userNAme" component="span"/> {/*name="userNAme", "userNAme" the same spelling as on db */}
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="userNAme" 
                    placeholder="ex.John123..."
                />
                <button type="submit">Create Post</button>
            </Form>

        </Formik>
    </div>
  )
}

export default CreatePost
