import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import './not-found-page.styles.scss';

function NotFoundPage() {
  return (
    <Layout
      title="Page not found"
      subtitle="The route does not exist yet. Use this page as the default fallback while the app grows."
    >
      <section className="not-found-page">
        <Link className="not-found-page__link" to="/">
          Return to the starter dashboard
        </Link>
      </section>
    </Layout>
  );
}

export default NotFoundPage;
