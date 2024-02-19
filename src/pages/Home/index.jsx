import preactLogo from '../../assets/preact.svg';
import './style.css';

export function Home() {
	return (
		<div class="home">
			<a href="" target="_blank">
				<img src={preactLogo} alt="Preact logo" height="160" width="160" />
			</a>
			<h1>Get Started building Vite-powered Preact Apps </h1>
			<section>
				<Resource
					title="Deep Clean"
					description="If you're new to Preact, try the interactive tutorial to learn important concepts"
					href="/DP"
				/>
				<Resource
					title="BTEX"
					description="If you're coming from React, you may want to check out our docs to see where Preact differs"
					href="/BTEX"
				/>
				<Resource
					title="BTEX Calibration"
					description="To learn more about Vite and how you can customize it to fit your needs, take a look at their excellent documentation"
					href="/BTEXC"
				/>
			</section>
			
		</div>
	);
}

function Resource(props) {
	return (
		<a href={props.href} target="_blank" class="resource">
			<h2>{props.title}</h2>
			<p>{props.description}</p>
		</a>
	);
}
