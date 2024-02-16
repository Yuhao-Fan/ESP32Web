import { useLocation } from 'preact-iso';

export function Header() {
	const { url } = useLocation();

	return (
		<header>
			<nav>
				<a href="/" class={url == '/' && 'active'}>
					Home
				</a>
				<a href="/404" class={url == '/404' && 'active'}>
					404
				</a>
				{/* <a href="/rechart" class={url == '/rechart' && 'active'}>
					Rechart
				</a> */}
				<a href="/pchart" class={url == '/pchart' && 'active'}>
					Pchart
				</a>
			</nav>
		</header>
	);
}
