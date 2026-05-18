import { Navigate, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import { lazy } from "react";

const MoviesContent = lazy(() => import("../pages/MainContent/Index"));

const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<Navigate to='/movie' replace />} />
				<Route path='/movie'>
					<Route index element={<MoviesContent />} />
					<Route path='now-playing' element={<MoviesContent />} />
					<Route path='upcoming' element={<MoviesContent />} />
					<Route path='top-rated' element={<MoviesContent />} />
				</Route>
				<Route path='/tv'>
					<Route index element={<MoviesContent />} />
					<Route path='airing-today' element={<MoviesContent />} />
					<Route path='on-the-air' element={<MoviesContent />} />
					<Route path='top-rated' element={<MoviesContent />} />
				</Route>
				<Route path='*' element={<Navigate to='/movie' replace />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
