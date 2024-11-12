import { HeroSection } from '@/components/ui/HeroSection';
import {
  CategoriesSection,
  FeaturedTrainersSection,
  HowItWorksSection,
  PlatformFeaturesSection,
  TestimonialsSection,
  SuccessStoriesSection,
  CallToActionSection
} from './components/index';

export const HomePage = () => {
  return (
    <section className="mx-auto text-center p-4">
      <HeroSection
        title="Encuentra tu entrenador perfecto"
        description="Descubre los mejores entrenadores para alcanzar tu máximo potencial"
        showInput={false}
      />
      <CategoriesSection />
      <FeaturedTrainersSection />
      <HowItWorksSection />
      <PlatformFeaturesSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <CallToActionSection />
    </section>
  );
};
