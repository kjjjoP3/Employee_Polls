import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../reducers/store";
import * as React from 'react';
import { AnswerQuestion } from "../components/AnswerQuestion";

describe('AnswerQuestion Component', () => {
  beforeEach(() => {
    // Set up session storage before each test
    const mockUser = {
      name: "Test User",
      avatarURL: "https://example.com/avatar.png",
    };
    sessionStorage.setItem('currentUser', JSON.stringify([mockUser.name, mockUser]));
  });

  afterEach(() => {
    sessionStorage.removeItem('currentUser');
  });

  it('will match snapshot', () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <AnswerQuestion />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });
});
