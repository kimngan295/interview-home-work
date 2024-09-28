// src/redux/actions/dialogActions.js
export const openDialog = (post) => ({
    type: 'OPEN_DIALOG',
    payload: post,
  });
  
  export const closeDialog = () => ({
    type: 'CLOSE_DIALOG',
  });
  