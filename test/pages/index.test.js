// TODO more unit tests - what would these look like?
// TODO fix issue in CSS Module wrapper - can't run tests

import React from "react";
import { render, screen } from "../test-utils";
import { fireEvent, waitFor } from '@testing-library/react'
import { createImgHandlerException } from '../../api-mocks/handlers';
import { mswServer } from '../../api-mocks/msw-server';
import Home from "@pages/index";

describe("Home", () => {
  it('should render a label and a file input field', async () => {
    render(<Home />);

    const input = screen.getByLabelText('Choose a file');
    await waitFor(() => expect(input).toHaveAttribute('type', 'file'));
  });

  it('should not show preview if no image has been selected', async () => {
    render(<Home />);

    const image = screen.getByAltText('uploaded image');

    await waitFor(() => expect(image).toHaveAttribute('src', ''));
  });

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

  it('should not show success message if image upload failed', async () => {
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

    await waitFor(() => screen.queryByText(/sorry/i));

    const successPanel = screen.queryByText(/Uploaded successfully!/i).closest("div");

    await waitFor(() => expect(successPanel).not.toHaveClass('preview--active'));
  });

  it('should show an error if you try to upload the wrong kind of file', async () => {
    render(<Home />);
    const fileInputField = screen.getByLabelText(/Choose a file/i);

    const file = new File();
    const fileObj = file.create('wrong-file.pdf', 0, 'application/pdf');

    const event = {
      target: {
        files: [
          fileObj,
        ],
      },
    }

    fireEvent.change(fileInputField, event);

    await waitFor(() => screen.queryByText(/sorry/i));

    const errorMsg = await screen.findByText(/Your file is not the correct file format/i)
    expect(errorMsg).toBeInTheDocument()
  });
});

// TODO Next steps???
  // Do we want to test both the preview when it hasn't returned from server and after response?
  // this line tests the imagePreview function pushes a b64 encoded obj into the page
  // await waitFor(() => expect(image).toHaveAttribute('src', 'data:image/jpeg;base64,QmxvYi1BdHRhY2s='));

  // TODO what are the different types of error here?
    // file target is null?
    // 404 API path is wrong?

// jest.advanceTimersByTime if we want to test fade out

// intermittent act warning in tests :(
