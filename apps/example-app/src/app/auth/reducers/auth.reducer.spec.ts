import { reducer } from '@example-app/auth/reducers/auth.reducer';
import * as fromAuth from '@example-app/auth/reducers/auth.reducer';
import { AuthApiActions, AuthActions } from '@example-app/auth/actions';

import { User } from '@example-app/auth/models';

describe('AuthReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      /**
       * Snapshot tests are a quick way to validate
       * the state produced by a reducer since
       * its plain JavaScript object. These snapshots
       * are used to validate against the current state
       * if the functionality of the reducer ever changes.
       */
      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should add a user set loggedIn to true in auth state', () => {
      const user = { name: 'test' };
      const action = AuthApiActions.loginSuccess({ user });

      const result = reducer(fromAuth.initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('LOGOUT', () => {
    it('should logout a user', () => {
      const action = AuthActions.logout();

      const result = reducer(
        {
          user: {
            name: 'Jeff Goldblum'
          }
        },
        action
      );

      expect(result).toMatchSnapshot();
    });
  });
});
