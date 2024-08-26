import HeaderLogo from './header-logo';

type HeaderProps = {
  children?: JSX.Element;
}

export default function Header({children}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo />
          {children}
        </div>
      </div>
    </header>
  );
}
