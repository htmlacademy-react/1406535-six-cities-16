import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

export default function NotFoundPage() {
  return (
    <div className="page">
      <Header />

      <main className="page__main">
        <div className="cities__status-wrapper tabs__content">
          <h1 className="cities__status">404. <small>Page not found.</small></h1>
          <br/>
          <Link to={AppRoute.Root}>Return to the main page</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
