// TODO more unit tests
// TODO integration tests which test return value from API
// TODO fix issue in CSS Module wrapper - can't run tests

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

  it("should render the drag and drop UI", () => {
    render(<Home />);

    const dragAndDrop = screen.getByText(
      /drag and drop your image here/i
    );
    expect(dragAndDrop).toBeInTheDocument();
  });

  it("should render the file button", () => {
    render(<Home />);

    const fileButton = screen.getByText(
      /choose a file/i
    );
    expect(fileButton).toBeInTheDocument();
  });

  it("should call server route to upload when image dropped into draggable area", () => {
    // ??
  });

  it('should display the uploaded image once successful', () => {
    // ??
  });
});
