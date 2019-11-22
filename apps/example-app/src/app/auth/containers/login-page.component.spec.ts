import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatInputModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { LoginPageComponent } from '@example-app/auth/containers';
import { LoginFormComponent } from '@example-app/auth/components';
import * as fromAuth from '@example-app/auth/reducers';
import { LoginPageActions } from '@example-app/auth/actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('Login Page', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let store: MockStore<fromAuth.State>;
  let instance: LoginPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule
      ],
      declarations: [LoginPageComponent, LoginFormComponent],
      providers: [provideMockStore()]
    });
    fixture = TestBed.createComponent(LoginPageComponent);
    store = TestBed.get(Store);
    instance = fixture.componentInstance;

    spyOn(store, 'dispatch');
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analogous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  it('should test the pending selector', () => {
    store.overrideSelector(fromAuth.selectLoginPagePending, true);
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should test the error selector', () => {
    store.overrideSelector(
      fromAuth.selectLoginPageError,
      'Danger, Will Robinson!'
    );
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();

    store.overrideSelector(fromAuth.selectLoginPageError, 'Does not compute!');
    store.refreshState();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a login event on submit', () => {
    const credentials = { username: 'someone', password: 'somepass' };
    instance.onSubmit(credentials);
    const action = LoginPageActions.login({ credentials });

    expect(store.dispatch).toBeCalledWith(action);
  });
});
