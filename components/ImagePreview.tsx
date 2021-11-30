type Props = {
  showPreview: boolean,
  imagePreviewSrc: string
}

export default function ImagePreview({ showPreview, imagePreviewSrc }: Props) {

  const previewClasses = ['panel', 'preview'];
  if (showPreview) {
    previewClasses.push('preview--active');
  }

  return (
    <div className={previewClasses.join(' ')}>
      <p>Uploaded successfully!</p>
      <img
        className="preview__image"
        src={imagePreviewSrc}
        alt="uploaded image"
      />
    </div>
  );
}
