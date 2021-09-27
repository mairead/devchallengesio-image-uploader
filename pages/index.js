import { useState } from 'react';
import Head from 'next/head'
// import onUploadFile from 'actions/onUploadFile'
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

  // const [uploadedFile, setUploadedFile] = useState(null);

  const [imagePreviewSrc, setImagePreviewSrc] = useState('');

  // useEffect(() => {
  //   if (uploadedFile) {
  //     setShowLoadingDialog(false);
  //     setShowPreview(true);
  //     setShowFileUpload(false);
  //   }
  // }, [uploadedFile]);

  const onUploadFile = async (fileObj) => {
    const body = new FormData();
    body.append('file', fileObj);

    try {
      const response = await fetch('/api/image', {
        method: "POST",
        body
      });

      const data = await response.json();

      return data.file;
    } catch(e) {
      return null;
      // whats best error handling pattern?
      // how can I fake an error happening to test?
    }
  }

  const onFileSelected = (fileObj) => {
    setShowLoadingDialog(true);
    setShowFileUpload(false);
    onPreviewFile(fileObj);

    // const { data: files, error } = useSWR([fileObj, onUploadFile])

    // if (error) return;
    // if (!files) return 'loading';

    // if (files) {
    //   setUploadedFile(files[0]);
    // }
  }

  const onPreviewFile = (fileObj) => {
    console.log('fileObj', fileObj);
    let reader = new FileReader();
    reader.readAsDataURL(fileObj);
    reader.onloadend = () => {
      setImagePreviewSrc(reader.result);
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
