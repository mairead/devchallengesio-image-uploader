import PropTypes from 'prop-types';

// TODO complete error component Flash message with fade timeout
export default function ErrorMsg({ errorMsg }) {

  return(
    <p className="error">
      {`Sorry, Image not uploaded, ${errorMsg}`}
    </p>
  )
}

ErrorMsg.propTypes = {
  errorMsg: PropTypes.string.isRequired
}
