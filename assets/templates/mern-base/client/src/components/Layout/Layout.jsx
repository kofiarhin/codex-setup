import './layout.styles.scss';

function Layout({ title, subtitle, children }) {
  return (
    <div className="layout">
      <header className="layout__hero">
        <div className="layout__eyebrow">repo-bootstrap-mern</div>
        <h1 className="layout__title">{title}</h1>
        <p className="layout__subtitle">{subtitle}</p>
      </header>
      <main className="layout__content">{children}</main>
    </div>
  );
}

export default Layout;
