import '@testing-library/jest-dom';  // Add this import
import { fireEvent, render } from "@testing-library/react";
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

  it("will show an error message if the username or password is incorrect", () => {
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

    fireEvent.change(username, { target: { value: "wrongUser" } });
    fireEvent.change(password, { target: { value: "wrongPass" } });
    fireEvent.click(submit);

    // Check that the error message is displayed
    expect(component.getByText("Incorrect Username or Password")).toBeInTheDocument();
  });
});
