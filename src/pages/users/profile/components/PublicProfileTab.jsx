import { Link } from 'react-router-dom'

const PublicProfileTab = ({ userId }) => {
  return (
    <section className="space-y-6">
      {/* Título de la sección */}
      <h2 className="text-h2 font-title font-bold">Perfil Publico</h2>

      {/* Descripción de la sección */}
      <p className="text-p text-gray-700">
        Aqui podras revisar tu perfil publico
      </p>

      {/* Enlace a las subscripciones */}
      <Link
        to={`/profile/public/${userId}`}
        className="inline-block px-6 py-3 bg-primary text-white hover:text-white rounded-lg hover:bg-secondary transition-colors"
        aria-label="Revisar perfil de la cuenta"
      >
        Ver perfil público
      </Link>
    </section>
  );
};

export default PublicProfileTab;