import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import TextWritingSection from '../components/TextWritingSection';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <TextWritingSection />
      <Categories />
      <Footer />
    </div>
  );
}

export default Home;