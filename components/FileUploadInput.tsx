// TODO form action and submit as no-js fallback
import React, { useRef } from "react";

type Props = {
  onFileSelected: (fileObj: File) => void
}

export default function FileUploadInput({ onFileSelected }: Props) {
  const inputFile = useRef<HTMLInputElement>(null);

  const onOpenFileInput = (e: React.MouseEvent) => {
    inputFile.current?.click();
    e.preventDefault();
  }

  const onHandleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      inputFile.current?.click();
    }
  }

  const onFileChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = (e.target as HTMLFormElement)
    const fileObj = target.files[0];
    onFileSelected(fileObj);

    e.preventDefault();
  }

  return (
    <form>
      <label
        tabIndex="0"
        aria-role="button"
        htmlFor="fileInput"
        onClick={onOpenFileInput}
        onKeyPress={onHandleKeyPress}
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
