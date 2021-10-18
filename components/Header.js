import PropTypes from 'prop-types';

export default function Header({ title }) {
  return <h1 className="title">{title}</h1>
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}