import { useRef, useState } from "react";
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [fileSelected, setFileSelected] = useState();
  const [showLoadingDialog, setShowLoadingDialog] = useState();

  const inputFile = useRef(null);

  const onOpenFileInput = () => {
    inputFile.current.click();
  }

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
    setShowLoadingDialog(true);

    const body = new FormData();
    body.append('file', fileSelected);
    fetch("/api/upload", {
      method: "POST",
      body
    });

    setFileSelected(null);
  }

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Upload your image" />
        <p className="description">
          Files should be Jpeg, Png...
        </p>
        <div className="draggable-area"
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <img src="/image.svg" alt="placeholder image showing scenic view"/>
          <p>Drag and Drop your image here</p>
        </div>
        <p>Or</p>
        <input
          type="file"
          ref={inputFile}
          className="file-input hidden"
          onChange={onFileChange}
        />
        <button onClick={onOpenFileInput}>Choose a file</button>
        {showLoadingDialog && (
          <div className="loading-dialog">
            <p>Uploading....</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
