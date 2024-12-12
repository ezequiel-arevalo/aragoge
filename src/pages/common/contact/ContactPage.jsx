import { HeroSection } from '@/components/ui/HeroSection.jsx';
import { ContactSection } from "./components/ContactSection.jsx";

export const ContactPage = () => {
  return (
    <section className="mx-auto text-center p-4">
      <HeroSection 
        title="Contáctanos" 
        description="¿Tienes alguna pregunta o comentario? Estamos aquí para ayudarte." 
        showInput={false} 
      />
      <ContactSection />
    </section>
  );
};