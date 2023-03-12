import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATION_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user: user, authError: null, loading: false };

    case AuthActions.LOGOUT:
      return { ...state, user: null };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGN_UP_START:
      return { ...state, authError: null, loading: true };

    case AuthActions.AUTHENTICATION_FAIL:
      return { ...state, user: null, authError: action.payload, loading: false };
    
    case AuthActions.RESET_ERROR:       // For when an error occurs we need to reset error when modal is closed
      return {...state, authError: null}  

    default:
      return state;
  }
}
