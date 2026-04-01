import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import StatusCard from '../../components/StatusCard/StatusCard';
import { setApiStatus } from '../../features/app/appSlice';
import { getHealthcheck, getProjects } from '../../services/projectService';
import './home-page.styles.scss';

function HomePage() {
  const dispatch = useDispatch();
  const { appName, apiStatus } = useSelector((state) => state.app);

  const healthQuery = useQuery({
    queryKey: ['healthcheck'],
    queryFn: getHealthcheck,
  });

  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const databaseStatus = healthQuery.data?.data?.database;

  useEffect(() => {
    if (healthQuery.isSuccess && databaseStatus) {
      dispatch(setApiStatus(databaseStatus));
    }

    if (healthQuery.isError) {
      dispatch(setApiStatus('unavailable'));
    }
  }, [databaseStatus, dispatch, healthQuery.isError, healthQuery.isSuccess]);

  const projects = projectsQuery.data?.data?.projects ?? [];

  return (
    <Layout
      title={appName}
      subtitle="A MERN starter with opinionated state, routing, SCSS, and API conventions baked in from day one."
    >
      <section className="home-page">
        <div className="home-page__grid">
          <StatusCard
            title="API status"
            value={healthQuery.data?.data?.status ?? 'Starting'}
            description={`Database: ${apiStatus}`}
          />
          <StatusCard
            title="Projects"
            value={`${projects.length}`}
            description="Example route wired through the service layer and ready for real data."
          />
        </div>

        <div className="home-page__panel-grid">
          <section className="home-page__panel">
            <h2 className="home-page__panel-title">What ships in this starter</h2>
            <ul className="home-page__checklist">
              <li className="home-page__checklist-item">Redux Toolkit store for app-level state.</li>
              <li className="home-page__checklist-item">React Query wired for server state.</li>
              <li className="home-page__checklist-item">A normalized API client using `VITE_API_URL`.</li>
              <li className="home-page__checklist-item">Express routes with validation and central error handling.</li>
            </ul>
          </section>

          <section className="home-page__panel">
            <h2 className="home-page__panel-title">Example project data</h2>
            {projectsQuery.isLoading ? (
              <p className="home-page__empty-state">Loading projects from the API.</p>
            ) : projects.length === 0 ? (
              <p className="home-page__empty-state">
                No projects yet. Connect MongoDB, then `POST /api/projects` to seed data.
              </p>
            ) : (
              <ul className="home-page__project-list">
                {projects.map((project) => (
                  <li className="home-page__project-item" key={project._id}>
                    <span className="home-page__project-name">{project.name}</span>
                    <span className="home-page__project-status">{project.status}</span>
                  </li>
                ))}
              </ul>
            )}

            {projectsQuery.isError ? (
              <p className="home-page__error">{projectsQuery.error.message}</p>
            ) : null}
          </section>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
