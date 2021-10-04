// TODO form action and submit as no-js fallback
import { useRef } from "react";
import PropTypes from 'prop-types';

export default function FileUploadInput({ onFileSelected }) {
  const inputFile = useRef(null);

  const onOpenFileInput = (e) => {
    inputFile.current.click();
    e.preventDefault();
  }

  // Should this be using useCallback?? what is the benefit?
  const onFileChange = (e) => {
    const fileObj = e.target.files[0];
    onFileSelected(fileObj);

    e.preventDefault();
  }

  return (
    <form>
      <label
        htmlFor="fileInput"
        onClick={onOpenFileInput}
        className="button"
      >
        Choose a file
      </label>
      <input
        id="fileInput"
        type="file"
        ref={inputFile}
        className="file-input hidden"
        onChange={onFileChange}
      />
    </form>
  );
}

FileUploadInput.propTypes = {
  onFileSelected: PropTypes.func.isRequired
}
