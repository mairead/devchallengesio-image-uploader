import PropTypes from 'prop-types';

export default function ImagePreview({ showPreview, imagePreviewSrc }) {

  const previewClasses = ['panel', 'preview'];
  if (showPreview) {
    previewClasses.push('preview--active');
  }

  console.log("SHOW PREVIEW", showPreview);

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

ImagePreview.propTypes = {
  showPreview: PropTypes.bool.isRequired,
  imagePreviewSrc: PropTypes.string.isRequired
}
