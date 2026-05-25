import { Navigate, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { lazy, Suspense } from "react";
import styles from "../../src/pages/MainContent/MoviesContent.module.scss";

const MoviesContent = lazy(() => import("../pages/MainContent/Index"));

const SuspendedMoviesContent = () => (
	<Suspense fallback={<div className={styles.moviesContent}></div>}>
		<MoviesContent />
	</Suspense>
);

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Navigate to='/movie' replace />} />

				<Route path='/movie'>
					<Route index element={<SuspendedMoviesContent />} />
					<Route path='now-playing' element={<SuspendedMoviesContent />} />
					<Route path='upcoming' element={<SuspendedMoviesContent />} />
					<Route path='top-rated' element={<SuspendedMoviesContent />} />
				</Route>

				<Route path='/tv'>
					<Route index element={<SuspendedMoviesContent />} />
					<Route path='airing-today' element={<SuspendedMoviesContent />} />
					<Route path='on-the-air' element={<SuspendedMoviesContent />} />
					<Route path='top-rated' element={<SuspendedMoviesContent />} />
				</Route>

				<Route path='*' element={<Navigate to='/movie' replace />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
