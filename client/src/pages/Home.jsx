import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import Process from '../components/home/Process';
import Testimonials from '../components/home/Testimonials';

import FeaturedProducts from '../components/home/FeaturedProducts';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Essenté | L'Essentiel, Redéfini</title>
      </Helmet>
      <Hero />
      <FeaturedProducts />
      <Process />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
