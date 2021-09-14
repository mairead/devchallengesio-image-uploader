import { useState } from "react";
import PropTypes from 'prop-types';

export default function DragAndDropInput({ onFileSelected }) {
  const [dragActive, setDragActive] = useState(false);

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

  const draggableClasses = ['draggable-area'];
  if (dragActive) {
    draggableClasses.push('draggable-area--active');
  }

  return (
    <div className={draggableClasses.join(' ')}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <img src="/image.svg" alt="placeholder image showing scenic view" />
      <p>Drag and Drop your image here</p>
    </div>
  );
}

DragAndDropInput.propTypes = {
  onFileSelected: PropTypes.func.isRequired
}
