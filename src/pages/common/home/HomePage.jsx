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
  const handleSearchSubmit = (searchValue) => {
    console.log("Buscar:", searchValue);
  };

  return (
    <>
      <HeroSection 
        title="Encuentra tu entrenador perfecto" 
        description="Descubre los mejores entrenadores para alcanzar tu máximo potencial"
        showInput={false} 
        onSearchSubmit={handleSearchSubmit} 
      />
      <CategoriesSection />
      <FeaturedTrainersSection />
      <HowItWorksSection />
      <PlatformFeaturesSection />
      <TestimonialsSection />
      <SuccessStoriesSection />
      <CallToActionSection />
    </>
  );
};
