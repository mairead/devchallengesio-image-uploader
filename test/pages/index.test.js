// TODO more unit tests
// TODO integration tests which test return value from API
// TODO fix issue in CSS Module wrapper - can't run tests

import React from "react";
import { render, screen } from "../test-utils";
import { findByText, fireEvent, waitFor } from '@testing-library/react'
import { createImgHandlerException } from '../../api-mocks/handlers';
import { mswServer } from '../../api-mocks/msw-server';
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

  // src is empty when it should be string
  // in preview we base64 the src, when returned from server we want to show the actual file path

  // TODO Do we want to test both the preview when it hasn't returned from server and after response?
  it('should display the uploaded image once successful', async () => {
    render(<Home />);
    const fileInputField = screen.getByLabelText(/Choose a file/i);

    var fileObj = new File(['Blob-Attack'], 'Blob-Attack.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: [
          fileObj
        ],
      },
    }

    fireEvent.change(fileInputField, event);

    const image = await screen.findByRole('img');
    await waitFor(() => expect(image).toHaveAttribute('src', 'data:image/jpeg;base64,QmxvYi1BdHRhY2s='));
  });

  // TODO what are the different types of error here? wrong file type? file target is null?
  // it('should show an error message if the image upload failed', async () => {
  //   mswServer.use(createImgHandlerException);

  //   render(<Home />);
  //   const fileInputField = screen.getByLabelText(/Choose a file/i);

  //   const event = {
  //     target: {
  //       files: [
  //         'not an image'
  //       ],
  //     },
  //   }

  //   fireEvent.change(fileInputField, event);

  //   const errorMsg = await findByText(/Image not recognised/i)

  //   await waitFor(() => expect(errorMsg).toBeInDocument);
  // });
});
