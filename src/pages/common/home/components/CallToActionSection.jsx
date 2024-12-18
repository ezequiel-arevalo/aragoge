import { Link } from "react-router-dom";

export const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-h2 font-title font-bold mb-4">
          ¿Listo para Elevar tu Carrera Fitness?
        </h2>
        <p className="text-xl mb-8">
          Únete a nuestra comunidad de profesionales y conecta con atletas de
          todo el mundo.
        </p>
        <Link
          to={"/register"}
          className="bg-white text-primary hover:text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          Comienza como Entrenador
        </Link>
      </div>
    </section>
  );
};
