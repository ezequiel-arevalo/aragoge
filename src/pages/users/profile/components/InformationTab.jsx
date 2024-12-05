import { Link } from "react-router-dom";

const InformationTab = () => {
  return (
    <section className="space-y-6">
      {/* Título de la sección */}
      <h2 className="text-h2 font-title font-bold">Información General</h2>

      {/* Descripción de la sección */}
      <p className="text-p text-gray-700">
        Gestiona y consulta tus suscripciones directamente desde aquí.
      </p>

      {/* Enlace a las subscripciones */}
      <Link
        to="/subscriptions"
        className="inline-block px-6 py-3 bg-primary text-white hover:text-white rounded-lg hover:bg-secondary transition-colors"
      >
        Ver mis subscripciones
      </Link>
    </section>
  );
};

export default InformationTab;