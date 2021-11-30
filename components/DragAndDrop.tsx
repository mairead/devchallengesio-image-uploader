import { useState } from "react";

type Props = {
  onFileSelected: (fileObj: File) => void
}

export default function DragAndDropInput({ onFileSelected }: Props) {
  const [dragActive, setDragActive] = useState(false);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    setDragActive(true);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    setDragActive(true);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setDragActive(false);

    e.preventDefault();
    e.stopPropagation();
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
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
    <div className={draggableClasses.join(' ')} aria-labelledby="drag-label"
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <img src="/image.svg" alt="placeholder image showing scenic view" />
      <p id="drag-label">Drag and Drop your image here</p>
    </div>
  );
}
