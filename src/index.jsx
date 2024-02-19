import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import './style.css';
import { Rechart } from './pages/Recharts/index.jsx';
// import { Pchart } from './pages/BarChart/index.jsx';
export function App() {
	return (
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path="/rechart" component={Rechart} />
					{/* <Route path="/pchart" component={Pchart} /> */}
					<Route path="/404" component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
	);
}

render(<App />, document.getElementById('app'));
