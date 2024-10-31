import { Link } from 'react-router-dom'

const PublicProfileTab = ({ userId }) => {
  return (
    <div className="space-y-6">
      <Link
        to={`/profile/public/${userId}`}
        className="inline-block px-6 py-3 bg-primary text-white hover:text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Ver perfil público
      </Link>
    </div>
  )
}

export default PublicProfileTab