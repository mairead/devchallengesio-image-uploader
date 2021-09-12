import { useRef, useState } from "react";
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

// TODO form action and submit as no-js fallback
// TODO move separate views and logic into separate components
// TODO Create separate module CSS  - what is .module?
// TODO unit tests
// TODO add eslint
// TODO is it worth adding a fake progress bar or something which counts files uploaded?
// TODO fix issue in CSS Module wrapper - can't run tests

export default function Home() {
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const inputFile = useRef(null);
  const imagePreview = useRef(null);

  const onOpenFileInput = (e) => {
    inputFile.current.click();
    e.preventDefault();
  }

  const onFileChange = (e) => {
    const fileObj = e.target.files[0];
    onFileSelected(fileObj);

    e.preventDefault();
  }

  const onDragOver = (e) => {
    setDragActive(true);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDragEnter = (e) => {
    setDragActive(true);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDragLeave = (e) => {
    setDragActive(false);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDrop = (e) => {
    setDragActive(false);

    const fileObj = e.dataTransfer.files[0];
    onFileSelected(fileObj);

    e.preventDefault();
    e.stopPropagation();
  }

  const onUploadFile = (fileObj) => {
    const body = new FormData();
    body.append('file', fileObj);
    fetch("/api/image", {
      method: "POST",
      body
    })
    .then(() => {
      setShowLoadingDialog(false);
      setShowPreview(true);
      setShowFileUpload(false);
    })
    .catch(() => {
      // whats best error handling pattern?
      // how can I fake an error happening to test?
    });
    // is this .then()/.catch() out of date?
    // should I be using async/await instead?
  }

  const onFileSelected = (fileObj) => {
    setShowLoadingDialog(true);
    setShowFileUpload(false);
    onPreviewFile(fileObj);
    onUploadFile(fileObj)
    console.log(fileObj);
  }

  const draggableClasses = ['draggable-area'];
  if (dragActive) {
    draggableClasses.push('draggable-area--active');
  }

  const previewClasses = ['panel', 'preview'];
  if (showPreview) {
    previewClasses.push('preview--active');
  }

  const onPreviewFile = (fileObj) => {
    let reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onloadend = () => {
      imagePreview.current.src = reader.result;
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {showFileUpload && (
          <div className="panel">
            <Header title="Upload your image" />
            <p className="description">
              Files should be Jpeg, Png...
            </p>
            <div className={draggableClasses.join(' ')}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <img src="/image.svg" alt="placeholder image showing scenic view" />
              <p>Drag and Drop your image here</p>
            </div>
            <p>Or</p>
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
          </div>
        )}
        {showLoadingDialog && (
          <div className="panel loading-dialog">
            <p>Uploading....</p>
            <progress id="progress-bar" max="100" value="0" />
          </div>
        )}
        <div className={previewClasses.join(' ')}>
          <p>Uploaded successfully!</p>
          <img
            className="preview__image"
            src=""
            alt="uploaded image"
            ref={imagePreview} 
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
