import { useEffect, useState } from 'react';
import Head from 'next/head'
import { root } from '../config';
import DragAndDropInput from '@components/DragAndDrop'
import ErrorMsg from '@components/ErrorMsg'
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
  const [errorMsg, setErrorMsg] = useState(null);

  const [imagePreviewSrc, setImagePreviewSrc] = useState('');

  useEffect(() => {
    if (imagePreviewSrc) {
      setShowLoadingDialog(false);
      setShowPreview(true);
      setShowFileUpload(false);
      setErrorMsg(null);
    }
  }, [imagePreviewSrc]);

  useEffect(() => {
    if (errorMsg) {
      setShowLoadingDialog(false);
      setShowPreview(false);
      setShowFileUpload(true);
    }
  }, [errorMsg]);

  // TODO is it better to move in component action logic to their own file?
  // Should the POST action be a custom hook for POST-ing data? like useFetch??

  // I think try/catch is better here because you could render something
  // else to tell the user it failed, so you can handle it in a
  // meaningful way
  // Is try/catch better for async / await ?

  const onUploadFile = async (fileObj) => {
    const body = new FormData();
    body.append('file', fileObj);

    setErrorMsg(null);
    setImagePreviewSrc('');
    try {
      const response = await fetch(`${root}/api/image`, {
        method: "POST",
        body
      });

      const data = await response.json();

      if (response.ok) {
        // does this need to return into a callback or state change?
        // setImagePreviewSrc(data.files.file.path);
        setImagePreviewSrc(data.files.file.path);
      } else {
        setErrorMsg(data.message);
        // Do I want to throw a new error here or just setState?
        // Does it matter much?
      }

      return data;
    } catch(e) {
      console.log('error in fetch catch?', e);
      // and then you catch any other kind of error here? is this redundant?
      // or would this catch an internet not working type of error?
      // whats best error handling pattern?

      return null;
    }
  }

  const onFileSelected = (fileObj) => {
    setShowLoadingDialog(true);
    setShowFileUpload(false);
    // onPreviewFile(fileObj);

    try {
      if (fileObj.type === 'image/jpeg' || fileObj.type === 'image/png') {
        onUploadFile(fileObj);
      } else {
        throw new Error("Your file is not the correct file format");
      }
    } catch(e) {
      setErrorMsg(e.message);
    }
  }

  // TODO if we wanted to unit test this would we have to mock FileReader too?
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
        {errorMsg && <ErrorMsg errorMsg={errorMsg}/>}
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
