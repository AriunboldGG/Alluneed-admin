const reducer = (state, action) => {
   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            userToken: action.payload.token,
         };

      case 'IS_LOGGED_IN':
         return {
            ...state,
            userToken: action.payload.token,
            isLoggedIn: action.payload.isLoggedIn,
            user: action.payload.user,
         };

      case 'SIGN_OUT':
         return {
            ...state,
            userToken: null,
            isLoggedIn: false,
         };

      case 'DYNAMIC_UPDATE':
         return {
            ...state,
            [action.payload.type]: action.payload.value,
         };

      default:
         return state;
   }
};

export default reducer;
