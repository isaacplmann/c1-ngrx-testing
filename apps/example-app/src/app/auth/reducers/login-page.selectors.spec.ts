import {
  authFeatureKey,
  AuthState,
  selectAuthState,
  State,
  selectUser,
  selectLoggedIn
} from './';

function createAuthState(): State {
  return <any>{
    [authFeatureKey]: {
      loginPage: {
        pending: false,
        error: undefined
      },
      status: {
        user: {
          name: 'someone'
        }
      }
    }
  };
}

describe('LoginPageSelectors', () => {
  it('should test selectors', () => {
    const state = createAuthState();
    expect(selectAuthState(state)).toBe(state[authFeatureKey]);
    expect(selectUser(state)).toBe(state[authFeatureKey].status.user);
    expect(selectLoggedIn(state)).toBe(true);
  });

  const testCases = [
    {
      name: 'selectAuthState',
      selector: selectAuthState,
      state: createAuthState()
    },
    {
      name: 'selectUser',
      selector: selectUser,
      state: createAuthState()
    },
    {
      name: 'selectLoggedIn',
      selector: selectLoggedIn,
      state: createAuthState()
    }
  ];
  testCases.forEach(({ name, state, selector }) => {
    it(`should test ${name} with input ${JSON.stringify(state)}`, () => {
      expect(selector(state)).toMatchSnapshot();
    });
  });

  // using projector
  it('should test just the selectLoggedIn logic', () => {
    expect(selectLoggedIn.projector({ name: 'something' })).toBe(true);
    expect(selectLoggedIn.projector(undefined)).toBe(false);
  });
});
