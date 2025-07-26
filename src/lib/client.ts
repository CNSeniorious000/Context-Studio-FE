import { createFetch } from "xsfetch"

const fetch = createFetch({ debug: true })

export async function markitdown(body: File) {
	const res = await fetch("https://context-extractors.zeabur.app/markitdown", { method: "POST", body, headers: { "content-type": "application/octet-stream" } })
	if (res.ok) {
		return await res.text()
	}
	throw new Error(`Failed to markitdown: ${res.status} ${res.statusText}`)
}

export async function generateTitle(text: string) {
	const res = await fetch("https://context-extractors.zeabur.app/generate_title", {
		method: "POST",
		body: text,
		headers: { "content-type": "text/plain" }
	})
	if (res.ok) {
		return await res.text()
	}
	throw new Error(`Failed to generate title: ${res.status} ${res.statusText}`)
}
