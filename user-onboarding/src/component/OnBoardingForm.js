import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import './onboarding.css';



const  OnBoardingForm = ({ errors, touched, values, isSubmitting }) => { // Default props from Formik that allow for error reporting and to see if an input field has been touched previously and allow the user not to see validation errors if they are typing in that field for the first time.
    return (
        <Form className="onboarding-form">
            <h2>Add a User</h2>
            <div>
            
                <div className="onboarding-group" >
                   {touched.name && errors.name && <p className="red">{errors.name}</p>}
                    <Field 
                        type="text"
                        name="name"
                        placeholder="Name" 
                        value={values.name}
                    />
                </div>
                
                <div  className="onboarding-group">
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field 
                        autoComplete="off"
                        type="email"
                        name="email"
                        placeholder="E-mail" 
                        value={values.email}
                    />
                </div>
                <div className="onboarding-group">
                {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field 
                        autoComplete="off"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                    />
                </div>
            </div>
            <div>
                
                    <Field 
                        type="checkbox" 
                        id="tos" 
                        name="tos" 
                        checked={values.tos}
                    />
                    <label htmlFor="tos">Terms of Service</label>
                    {isSubmitting && <p>Loading...</p>}
                <button
                    disabled={isSubmitting}
                    className="submit-button"
                    type="submit"
                >
                    Submit &rarr;
                </button>
            </div>
            <div>
                <Field component="select" name="userType">
                    <option value="Contract">Contract</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Full-Time">Full-Time</option>
                </Field>

            </div>
        </Form>
    
    )
}
// THIS MAKES THE FORM WORK IN FORMIK
const FormikOnboardingForm = withFormik({  // withFormik is acts like a HOC and must be exported

    //THIS CONNECTS THE DATA IN THE FORM TO THE HANDLERS AND THE KEY:VALUES ALLOW FOR PASSING IN DEFAULT OR CUSTOM DATA TO THE FORM INITIALLY
   mapPropsToValues ( {name,  password, email, tos, userType}) {
        return {
        name: name || "",
        password: password || "",
        email:email || "",
        tos: tos,
        userType: userType || "Full-Time"
        };
    },

   // Validation Schema, it describes to Formik what each named field is supposed to look like
   validationSchema: Yup.object().shape({
       name: Yup.string()
            .required('A name is required!!'),
        password: Yup.string()
            .min(8, 'Password must be 8-10 characters')
            .max(10)
            .required('A password is required!!'),
        email: Yup.string()
            .email()
            .required('Required')
   }),

   // ALTHOUGH FORMIK HANDLES THIS WE STILL NEED TO TELL THE FORM WHAT TO DO WITH handleChanges
   handleSubmit(values, {  resetForm, setErrors, setSubmitting}) {
       if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
        } else {
                //THIS IS WHERE I WILL ADD CODE FOR AXIOS
                axios
                    .post(' https://reqres.in/api/users', values) 
                    .then(response => {
                        console.log("API", response)
                        alert('This is the email you submitted ' + response.data.email);
                        resetForm();
                        setSubmitting(false);
        })

        .catch(err => console.log(err))
        }
   },

})(OnBoardingForm);

export default FormikOnboardingForm;