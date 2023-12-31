import { useEffect, useState } from 'react';
import { ValidationErrors, ValidationFields, ValidationHookResult } from '../types/Types';
import axios from 'axios';

const useAuthenticationValidation = (mode: string, setValidUsername: any, setValidPassword: any, validationFields: any, setValidationErrors: any): void => {

  if (mode === 'login') {

  }
  if (mode === 'signup') {
    if (validationFields.username.length < 4) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username must be 4 characters minimum',
      }));
      setValidUsername(false)
    } else {
      setValidUsername(true)
    }
    if (validationFields.password.length < 10) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be 10 characters minimum',
      }));
      setValidPassword(false)
    } else {
      setValidPassword(true)
    }
  }

};

export default useAuthenticationValidation;