interface _Source {
	ready: true
	type: string
	tokenCount: string
	text: string
}

export type Source = (_Source | (Partial<Omit<_Source, "ready">> & { ready: false })) & { id: string }
