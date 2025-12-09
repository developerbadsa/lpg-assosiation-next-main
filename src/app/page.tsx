
import Footer from './../components/layout/Footer';
import HeroSection from './../components/home/sections/HeroSection';
import SponsorsSection from '../components/home/sections/SponsorsSection/index';
import OurPartnersSection from './../components/home/sections/OurPartnersSection';
import AboutUsSection from './../components/home/sections/AboutUs';
import CentralCommitteeSection from './../components/home/sections/CentralCommitteeSection/index';
import WhyChooseUsSection from './../components/home/WhyChooseUsSection';
import JoinWithUsSection from './../components/home/sections/JoinWithUsSection';
import ServicesSection from './../components/home/sections/ServicesSection/index';

export default function Home() {
   return (
      <div className=''>
         <HeroSection />
         <SponsorsSection/>
         <OurPartnersSection/>
         <AboutUsSection/>
         <WhyChooseUsSection/>
         <JoinWithUsSection/>
         <ServicesSection/>
         <CentralCommitteeSection/>
         <Footer/>
      </div>
   );
}
