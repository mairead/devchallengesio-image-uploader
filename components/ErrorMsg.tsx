type Props = {
  errorMsg: string
}

// TODO complete error component Flash message with fade timeout
export default function ErrorMsg({ errorMsg }: Props) {

  return(
    <p className="error">
      {`Sorry, Image not uploaded, ${errorMsg}`}
    </p>
  )
}
