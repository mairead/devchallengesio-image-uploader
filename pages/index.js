import { useState } from 'react';
import Head from 'next/head'
import DragAndDropInput from '@components/DragAndDrop'
import FileUploadInput from '@components/FileUploadInput'
import Header from '@components/Header'
import ImagePreview from "@components/ImagePreview"
import LoadingDialog from '@components/LoadingDialog'
import Footer from '@components/Footer'

// TODO Create separate module CSS  - what is .module?
// TODO Convert to Typescript
export default function Home() {
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const [imagePreviewSrc, setImagePreviewSrc] = useState('');

  // TODO is it better to move in component action logic to their own file?
  // const onUploadFile = (fileObj) => {
  //   const body = new FormData();
  //   body.append('file', fileObj);
  //   fetch("/api/image", {
  //     method: "POST",
  //     body
  //   })
  //   .then(() => {
  //     setShowLoadingDialog(false);
  //     setShowPreview(true);
  //     setShowFileUpload(false);
  //   })
  //   .catch(() => {
  //     // whats best error handling pattern?
  //     // how can I fake an error happening to test?
  //   });
  //   // is this .then()/.catch() out of date?
  //   // should I be using async/await instead?
  // }

  // msw didn't work without the async?
  const onUploadFile = async (fileObj) => {
    const body = new FormData();
    body.append('file', fileObj);

    try {
      const response = await fetch('/api/image', {
        method: "POST",
        body
      });

      const data = await response.json();

      // does this need to return into a callback or state change?
      if (data) {
        setShowLoadingDialog(false);
        setShowPreview(true);
        setShowFileUpload(false);
        console.log('whats in data?', data);
        setImagePreviewSrc(data.files.file.path)
      }
      // setState({ data: json });
      // return data.file; // this isn't going anywhere
      //??
    } catch(e) {

      return null;

      // whats best error handling pattern?
      // what do we want to see here when an error happens?
      // how can I fake an error happening to test?
    }
  }

  const onFileSelected = (fileObj) => {
    setShowLoadingDialog(true);
    setShowFileUpload(false);
    // onPreviewFile(fileObj);
    onUploadFile(fileObj);
  }

  // this isn't actually what's returned from the server? is this the local object?
  // const onPreviewFile = (fileObj) => {
  //   console.log('fileObj', fileObj);
  //   let reader = new FileReader();
  //   reader.readAsDataURL(fileObj);
  //   reader.onloadend = () => {
  //     setImagePreviewSrc(reader.result);
  //   }
  // }

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
            <DragAndDropInput onFileSelected={onFileSelected} />
            <p>Or</p>
            <FileUploadInput onFileSelected={onFileSelected} />
          </div>
        )}
        {showLoadingDialog && (
          <LoadingDialog />
        )}
        <ImagePreview imagePreviewSrc={imagePreviewSrc} showPreview={showPreview} />
      </main>
      <Footer />
    </div>
  )
}
