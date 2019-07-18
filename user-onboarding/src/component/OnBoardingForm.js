import React from 'react';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";

const  OnBoardingForm = ({ errors, touched, values }) => { // Default props from Formik that allow for error reporting and to see if an input field has been touched previously and allow the user not to see validation errors if they are typing in that field for the first time.
    return (

        <Form className="login-form">
            <h2>Add a User</h2>
            <div>
                <div >
                   {touched.name && errors.name && <p className="red">{errors.name}</p>}
                    <Field 
                        type="text"
                        name="name"
                        placeholder="Name" 
                        value={values.name}
                    />
                </div>
                <div >
                    {touched.email && errors.email && <p className="red">{errors.email}</p>}
                    <Field 
                        type="email"
                        name="email"
                        placeholder="E-mail" 
                        value={values.email}
                    />
                </div>
                <div >
                {touched.password && errors.password && <p className="red">{errors.password}</p>}
                    <Field 
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="tos">Terms of Service</label>
                    <Field 
                        type="checkbox" 
                        id="tos" 
                        name="tos" 
                        checked={values.tos}

                    />
                <button
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
            .min(8)
            .max(10)
            .required('A password is required!!'),
        email: Yup.string()
            .email()
            .required('Required')
   }),

   // ALTHOUGH FORMIK HANDLES THIS WE STILL NEED TO TELL THE FORM WHAT TO DO WITH handleChanges
   handleSubmit(values, formikBag) {
       const end =' https://reqres.in/api/users';
       formikBag.setSubmitting(true);
       //THIS IS WHERE I WILL ADD CODE FOR AXIOS
       axios.post(end, values) 
        .then(res => {
            alert('This is the email you submitted ' + res.data.email);
            formikBag.setSubmitting(false);
        })

        .catch(err => console.log(err))

   },

})(OnBoardingForm);

export default FormikOnboardingForm;