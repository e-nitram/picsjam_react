import { Link } from 'react-router-dom'

const LogInButton = () => {
  return (
    <Link
      style={{
        color: 'white',
        textTransform: 'capitalize',
        fontSize: 14,
        fontWeight: 700,
        borderRadius: '30px'
      }}
      to="/signin"
    >
      Sign In
    </Link>
  )
}

export default LogInButton;