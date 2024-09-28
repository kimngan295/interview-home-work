export const signupRequest = (formData) => ({
    type: 'SIGNUP_REQUEST',
    payload: formData,
  });
  
  export const resetSignupMessage = () => ({
    type: 'RESET_SIGNUP_MESSAGE',
  });