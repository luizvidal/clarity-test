import Clarity from "@microsoft/clarity";

type ClarityConfigResponse = {
	projectId: string;
};

const MOCK_API_DELAY_MS = 3000;

let clarityInitPromise: Promise<string> | null = null;

function sleep(ms: number) {
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export async function fetchClarityConfig(): Promise<ClarityConfigResponse> {
	await sleep(MOCK_API_DELAY_MS);

	const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

	if (!projectId) {
		throw new Error(
			"Missing VITE_CLARITY_PROJECT_ID. Set it in your .env file to simulate the API response."
		);
	}

	return { projectId };
}

export function initializeClarity(): Promise<string> {
	if (clarityInitPromise) {
		return clarityInitPromise;
	}

	clarityInitPromise = (async () => {
		const { projectId } = await fetchClarityConfig();
		Clarity.init(projectId);
		return projectId;
	})().catch((error) => {
		clarityInitPromise = null;
		throw error;
	});

	return clarityInitPromise;
}