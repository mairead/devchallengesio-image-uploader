// TODO is it worth adding a fake progress bar or something which counts files uploaded?
export default function LoadingDialog() {
  return (
    <div className="panel loading-dialog">
      <p>Uploading....</p>
      <progress id="progress-bar" max="100" value="0" />
    </div>
  )
}
