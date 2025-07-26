interface _Source {
	ready: true
	type: string
	tokenCount: number
	text: string
	fileName?: string
}

export type Source = (_Source | (Partial<Omit<_Source, "ready">> & { ready: false })) & { id: string }
