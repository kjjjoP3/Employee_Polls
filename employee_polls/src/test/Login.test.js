import { fireEvent, render, screen } from "@testing-library/react";
import { Login } from "../components/Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../reducers/store";

import * as React from "react";
describe("Login page", () => {
  it("will match to snapshot", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(component).toMatchSnapshot();
  });

  it("will show a success message if the username and password are correct", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const username = component.getByTestId("username-input");
    const password = component.getByTestId("password-input");
    const submit = component.getByTestId("submit");
    fireEvent.change(username, { target: { value: "mtsamis" } });
    fireEvent.change(password, { target: { value: "xyz123" } });
    fireEvent.click(submit);
    expect(component.getByTestId("success-id")).toBeInTheDocument();
  });

  it("will show an error message if the username or password is incorrect", () => {
    const component = render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );
    const submit = component.getByTestId("submit");
    fireEvent.click(submit);
    expect(component.getByTestId("fail-id")).toBeInTheDocument();
  });
});
