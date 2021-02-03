import { Fragment } from 'react';
import About from '../Components/Web/About';
import Contact from '../Components/Web/Contact';
import Cta from '../Components/Web/Cta';
import Hero from '../Components/Web/Hero';
import Questions from '../Components/Web/Questions';
import Services from '../Components/Web/Services';
import Top from '../Components/Web/Top';
import WhyUs from '../Components/Web/WhyUs';

const Home = () => {
	return (
		<Fragment>
			<Hero />
			<main id='main'>
				<About />
				<WhyUs />
				<Services />
				<Cta />
				<Questions />
				<Contact />
			</main>
			<Top />
		</Fragment>
	);
};

export default Home;
