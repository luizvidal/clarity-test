import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { initializeClarity } from "./services/clarity";
import viteLogo from "/vite.svg";

function App() {
	const [clarityProjectId, setClarityProjectId] = useState<string | null>(null);
	const [clarityStatus, setClarityStatus] = useState<
		"idle" | "loading" | "ready" | "error"
	>("loading");
	const [clarityError, setClarityError] = useState<string | null>(null);

	const [count, setCount] = useState(0);

	useEffect(() => {
		let isActive = true;

		initializeClarity()
			.then((projectId) => {
				if (!isActive) {
					return;
				}

				setClarityProjectId(projectId);
				setClarityStatus("ready");
			})
			.catch((error: unknown) => {
				if (!isActive) {
					return;
				}

				setClarityError(
					error instanceof Error
						? error.message
						: "Failed to initialize Clarity.",
				);
				setClarityStatus("error");
			});

		return () => {
			isActive = false;
		};
	}, []);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>Clarity status: {clarityStatus}</p>
				{clarityProjectId ? <p>Loaded project ID: {clarityProjectId}</p> : null}
				{clarityError ? <p>Clarity error: {clarityError}</p> : null}
				<p>
					This app simulates an API call, then initializes Clarity with the
					returned project ID.
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
