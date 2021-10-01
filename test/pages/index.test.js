// TODO more unit tests
// TODO fix issue in CSS Module wrapper - can't run tests

import React from "react";
import { render, screen } from "../test-utils";
import { fireEvent, waitFor } from '@testing-library/react'
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

  it('should display the uploaded image once successful', async () => {
    render(<Home />);

    const fileInputField = screen.getByLabelText(/Choose a file/i);

    const file = new File();
    const fileObj = file.create('Blob-attack.jpg', 0, 'image/jpeg');

    const event = {
      target: {
        files: [
          fileObj,
        ],
      },
    }

    fireEvent.change(fileInputField, event);

    const image = await screen.findByRole('img');

    await waitFor(() => expect(image).toHaveAttribute('src', 'upload/Blob-Attack.jpg'));
  });

  // TODO Do we want to test both the preview when it hasn't returned from server and after response?
  // this line tests the imagePreview function pushes a b64 encoded obj into the page
  // await waitFor(() => expect(image).toHaveAttribute('src', 'data:image/jpeg;base64,QmxvYi1BdHRhY2s='));

  // TODO what are the different types of error here? wrong file type? file target is null?
  it('should show an error message if the image upload failed', async () => {
    mswServer.use(createImgHandlerException);

    render(<Home />);
    const fileInputField = screen.getByLabelText(/Choose a file/i);

    const file = new File();
    const fileObj = file.create('Blob-attack.jpg', 0, 'image/jpeg');

    const event = {
      target: {
        files: [
          fileObj,
        ],
      },
    }

    fireEvent.change(fileInputField, event);

    const errorMsg = await screen.findByText(/Image not uploaded/i)

    expect(errorMsg).toBeInTheDocument()
  });
});
