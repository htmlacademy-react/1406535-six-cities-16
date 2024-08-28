import { useRef, FormEvent } from 'react';
import { redirectToRoute } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-action';
import Header from '../../components/header/header';
import { CITIES, AppRoute } from '../../const';
import { setCity } from '../../store/data/data-slice';

export default function LoginPage() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction({
        email: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const randomCity = CITIES[Math.round(Math.random() * CITIES.length)];
  const handleCityClick = () => {
    setCity(randomCity);
    redirectToRoute(AppRoute.Root);
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" pattern="[A-Za-z]{1,}[0-9]{1,}|[0-9]{1,}[A-Za-z]" required/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current" onClick={handleCityClick}>
            <div className="locations__item">
              <a className="locations__item-link">
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
