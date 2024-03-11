/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../redux/store";
import {BrowserRouter } from 'react-router-dom';
 // Replace with your path to the Login component

describe("Home component", () => {
  test("renders login form labels and button text", () => {
    render(<BrowserRouter><Provider store={store}><Home /></Provider></BrowserRouter>);

    // Check for login title
    expect(screen.getByText( /Why Choose America?/i )).toBeInTheDocument();

    // Check for username label
    // expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();

    // // Check for password label
    // expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // // Check for submit button text
    // expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });
});

