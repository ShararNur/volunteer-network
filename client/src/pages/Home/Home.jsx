import HeroSection from '../../components/HeroSection';
import MainContent from '../../components/MainContent';
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="absolute inset-0 z-0 bg-[url('/volunteerBg.png')] bg-no-repeat opacity-20"></div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <MainContent />
      </div>
    </div>
  );
};

export default Home;
