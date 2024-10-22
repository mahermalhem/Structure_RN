import { SET_USER } from "./actions";

const initialState = {
  user: {
    email:"maher.malhem@gmail.com"
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
