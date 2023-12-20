import { useEffect, useState } from 'react';
import { ValidationErrors, ValidationFields, ValidationHookResult } from '../types/Types';
import axios from 'axios';

const useAuthenticationValidation = (validUsername: any, setValidUsername: any, validPassword: any, setValidPassword: any, validationFields: any, setValidationFields: any, validationErrors: any, setValidationErrors: any): void => {

  if (validationFields.username.length < 4) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      username: 'Username must be 4 characters minimum'  /* Add your "taken" check here */,
    }));
    setValidUsername(false)
  } else {
    setValidUsername(true)
  }
  if (validationFields.password.length < 10) {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      password: 'Password must be 10 characters minimum'  /* Add your "taken" check here */,
    }));
    setValidPassword(false)
  } else {
    setValidPassword(true)
  }

};

export default useAuthenticationValidation;