import React from "react";
import { render, screen } from "../test-utils";
import Home from "@pages/index";

describe("Home", () => {
  it("should render the heading", () => {
    render(<Home />);

    const heading = screen.getByText(
      /Upload your image/i
    );
    expect(heading).toBeInTheDocument();
  });
});