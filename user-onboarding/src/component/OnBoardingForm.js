import React from 'react';
import { withFormik, Form, Field } from 'formik';

const  OnBoardingForm = () => {
    return (
        <form className="login-form">
            <h2>Add User</h2>
            <div >
                <label htmlFor="name">Name</label>
                <input 
                    autoComplete="off"
                    type="text"
                    id="name"
                 />
            </div>
            <div >
                <label htmlFor="email">Email</label>
                <input 
                    autoComplete="off"
                    type="email"
                    id="email"
                 />
            </div>
             <div >
                <label htmlFor="password">Password</label>
                <input 
                    autoComplete="off"
                    type="text"
                    id="password"
                 />
            </div>
        
                <label for="tos">Terms of Service</label>
                <input type="checkbox" id="tos" name="tos">
                
            
            

            
        </form>
    )
}
export default OnBoardingForm;