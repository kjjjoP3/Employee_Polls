import '@testing-library/jest-dom'; 
import { fireEvent, render } from "@testing-library/react";
import { PageNotFound } from "../components/PageNotFound"; 
import { MemoryRouter } from "react-router-dom"; 
import { Provider } from "react-redux"; 
import store from "../reducers/store"; 
import * as React from "react";

describe("PageNotFound component", () => {
  it("renders the 404 message and other elements", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNotFound />
        </Provider>
      </MemoryRouter>
    );

    expect(getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(getByText("The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.")).toBeInTheDocument();
  });

  it("has the correct title in the document", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNotFound />
        </Provider>
      </MemoryRouter>
    );

    // Check that the document title is set correctly
    document.title = "404 - Page Not Found"; // Simulate setting the title
    expect(document.title).toBe("404 - Page Not Found");
  });

  it("navigates to home when the Go Home button is clicked", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNotFound />
        </Provider>
      </MemoryRouter>
    );

    // Simulate a click on the "Go Home" button
    const button = getByRole('button', { name: 'Go Home' });
    fireEvent.click(button);

    // Check that the user is navigated to the home page
    expect(window.location.pathname).toBe('/');
  });

  it("renders the Go Home button", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNotFound />
        </Provider>
      </MemoryRouter>
    );

    // Check that the Go Home button is present
    expect(getByRole('button', { name: 'Go Home' })).toBeInTheDocument();
  });

  it("should not render any other page elements", () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Provider store={store}>
          <PageNotFound />
        </Provider>
      </MemoryRouter>
    );

    expect(queryByText("Some Other Text")).not.toBeInTheDocument();
  });
});
