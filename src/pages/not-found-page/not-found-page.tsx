import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import HeaderAuth from '../../components/header/header-auth';

export default function NotFoundPage() {
  return (
    <div className="page page--favorites-empty">
      <Header>
        <HeaderAuth />
      </Header>

      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <div className="cities__status-wrapper">
              <h1 className="cities__status">404. <small>Page not found.</small></h1>
              <br/>
              <Link to={AppRoute.Root}>Return to the main page</Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
