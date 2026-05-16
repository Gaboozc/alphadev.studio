import { AnimatedLogo } from '../../components/AnimatedLogo/AnimatedLogo';
import alphadevLogoUrl from '../../assets/img/alphadev-logo.png';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero__background"></div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <div className="hero__content" style={{ width: '100%' }}>
            <AnimatedLogo logo={alphadevLogoUrl} size={350} clickable={true} />
          </div>
        </div>
      </section>
    </div>
  );
};
