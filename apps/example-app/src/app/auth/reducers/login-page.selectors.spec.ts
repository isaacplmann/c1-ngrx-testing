import {
  State,
  authFeatureKey,
  selectAuthStatusState,
  selectLoggedIn,
  selectUser
} from './';

function createLoggedInState(): State {
  return <any>{
    [authFeatureKey]: {
      loginPage: {
        error: undefined,
        pending: false
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
    const state = createLoggedInState();
    expect(selectAuthStatusState(state)).toBe(state[authFeatureKey].status);
    expect(selectUser(createLoggedInState())).toMatchSnapshot();
    expect(selectLoggedIn(createLoggedInState())).toBe(true);
  });

  const testCases = [
    {
      name: 'selectAuthStatusState',
      selector: selectAuthStatusState,
      state: createLoggedInState()
    },
    {
      name: 'selectUser',
      selector: selectUser,
      state: createLoggedInState()
    },
    {
      name: 'selectLoggedIn',
      selector: selectLoggedIn,
      state: createLoggedInState()
    }
  ];

  testCases.forEach(({ name, selector, state }) => {
    it(`${name} tested with state ${JSON.stringify(state)}`, () => {
      expect(selector(state)).toMatchSnapshot();
    });
  });

  it('should test selectLoggedIn', () => {
    expect(selectLoggedIn.projector({ name: 'someone' })).toBe(true);
    expect(selectLoggedIn.projector(null)).toBe(false);
    expect(selectLoggedIn.projector(undefined)).toBe(false);
  });
});
