import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup" //a library that is for validation data inserting into the Form
import axios from "axios";

function Registration() {

    const initialValues = {       
        userNAme: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({        
        userNAme: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {    //here we just "data" as we use Formik and it take it from the inputs
            console.log(data)
        })    
    };

  return (
    <div>
      <Formik 
            initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}
        >        
            <Form className='formContainer'>
                
                <label>UserName: </label>
                <ErrorMessage name="userNAme" component="span"/> {/*name="userNAme", "userNAme" the same spelling as on db */}
                <Field 
                    autoComplete="off"
                    id="inputCreatePost" 
                    name="userNAme" 
                    placeholder="ex.John123..."
                />

                <label>Password: </label>
                <ErrorMessage name="password" component="span"/> {/*name="userNAme", "userNAme" the same spelling as on db */}
                <Field 
                    autoComplete="off"
                    type="password"              //makes password to look like dots during typing
                    id="inputCreatePost" 
                    name="password" 
                    placeholder="Your password..."
                />
                <button type="submit">Register</button>
            </Form>

        </Formik>
    </div>
  )
}

export default Registration
