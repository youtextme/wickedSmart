import { Link, useLocation } from 'react-router-dom';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isParent = location.pathname.startsWith('/parent');

  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/" className="brand" aria-label="Powerful Kids home">
          <span className="brand-mark" aria-hidden="true">PK</span>
          <span className="brand-text">Powerful Kids</span>
        </Link>
        <nav className="app-nav" aria-label="Main">
          <Link
            to="/"
            className={!isParent ? 'nav-link active' : 'nav-link'}
            aria-current={!isParent ? 'page' : undefined}
          >
            Practice
          </Link>
          <Link
            to="/feedback"
            className={
              location.pathname === '/feedback' ? 'nav-link active' : 'nav-link'
            }
            aria-current={location.pathname === '/feedback' ? 'page' : undefined}
          >
            Feedback
          </Link>
          <Link
            to="/parent"
            className={isParent ? 'nav-link active' : 'nav-link'}
            aria-current={isParent ? 'page' : undefined}
          >
            Parent
          </Link>
        </nav>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <p>Exercise-based learning. Your feedback shapes what comes next.</p>
      </footer>
    </div>
  );
}
