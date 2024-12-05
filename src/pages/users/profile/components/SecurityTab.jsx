import { Link } from 'react-router-dom';

const SecurityTab = ({ handleDelete }) => {
  return (
    <section className="space-y-6">
      {/* Título de la sección */}
      <h2 className="text-h2 font-title font-bold">Eliminar cuenta</h2>

      {/* Descripción de la sección */}
      <p className="text-p text-gray-700">
        <strong className="text-destructive">Advertencia:</strong> Esta acción es irreversible. Todos tus datos serán eliminados permanentemente.
      </p>

      {/* Enlace a las subscripciones */}
      <Link
        onClick={handleDelete}
        to="/subscriptions"
        className="inline-block px-6 py-3 bg-primary text-white hover:text-white rounded-lg hover:bg-secondary transition-colors"
        aria-label="Eliminar permanentemente la cuenta"
      >
        Eliminar cuenta
      </Link>
    </section>
  );
};

export default SecurityTab;