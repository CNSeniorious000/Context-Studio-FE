<script lang="ts">
	import type { Source } from "$lib/types"

	interface Props {
		sources: Source[]
	}

	let { sources }: Props = $props()

	function calculateWidths(sources: Source[]): string[] {
		if (sources.length === 0) return []

		const indices = sources.map((_, i) => i) // 1-based indexing
		const logValues = indices.map((i) => (sources[i].tokenCount ?? 1) ** 0.6)
		const totalLog = logValues.reduce((sum, val) => sum + val, 0)

		// 计算比例宽度
		const proportions = logValues.map((log) => log / totalLog)

		// 转换为flex-grow值，让flexbox处理实际宽度
		return proportions.map((p) => p.toString())
	}

	const flexValues = $derived(calculateWidths(sources))
</script>

<div class="w-full px-4 py-2">
	<div class="h-4 w-full flex gap-1 overflow-hidden">
		{#each sources as source, i (source.id)}
			<div
				class={[
					"h-full   rounded font-mono text-xs transition-all duration-300  flex items-center justify-center",
					(() => {
						const count = source.tokenCount
						if (!count) return "bg-gray-50 text-gray-3"
						if (count < 1000) return "text-green-6 bg-green-100"
						if (count < 10000) return "text-cyan-6 bg-cyan-100"
						if (count <= 50000) return "text-yellow-6 bg-yellow-100"
						return "text-pink-6 bg-pink-100"
					})()
				]}
				style:flex-grow={flexValues[i]}
				style:min-width="25px"
				title={source.fileName || `Source ${i + 1}`}
			>
				<span class="select-none text-xs font-medium">
					{i + 1}
				</span>
			</div>
		{/each}
	</div>
</div>
