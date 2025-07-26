<script lang="ts">
	import TokenCount from "$lib/TokenCount.svelte"
	import type { Source } from "$lib/types"

	let { source }: { source: Source } = $props()

	function getTypeIcon(type: string) {
		switch (type) {
			case "file":
				return "📄"
			case "text":
				return "📝"
			default:
				return "📄"
		}
	}

	function getDisplayName() {
		if (source.fileName) {
			return source.fileName
		}
		return source.id.slice(0, 8)
	}

	function getTokenColorClass(tokenCount: number) {
		if (tokenCount < 1000) {
			return "text-green-600 bg-green-50"
		} else if (tokenCount < 10000) {
			return "text-cyan-600 bg-cyan-50"
		} else if (tokenCount <= 50000) {
			return "text-yellow-600 bg-yellow-50"
		} else {
			return "text-pink-600 bg-pink-50"
		}
	}
</script>

<div class="rounded-lg bg-white p-3 transition-all duration-300 {source.ready ? 'bg-green-50' : ''} shadow-sm">
	<div class="mb-2 flex items-center gap-2 text-sm">
		<span class="text-lg">{getTypeIcon(source.type ?? "file")}</span>
		<div class="flex-1">
			<div class="truncate text-gray-700 font-medium">{getDisplayName()}</div>
			{#if source.ready && source.title}
				<div class="mt-0.5 truncate text-xs text-gray-500">{source.title}</div>
			{/if}
		</div>
		<div class="i-svg-spinners-180-ring-with-bg text-gray-4 transition-opacity duration-500" class:op-0={source.ready}></div>
	</div>

	<div class="mt-1">
		<div class="mb-1 text-sm text-gray-700 leading-relaxed">
			{#if source.ready}
				{(source.text || "").length > 80 ? (source.text || "").slice(0, 80) + "..." : source.text || ""}
			{:else}
				<div class="flex items-center gap-2 text-sm text-gray-500">
					<div>正在处理...</div>
					<div class="h-3 w-3 animate-spin border border-gray-200 border-t-blue-500 rounded-full"></div>
				</div>
			{/if}
		</div>
		<div class="flex justify-end">
			<span class="rounded-full px-2 py-1 text-xs font-medium {getTokenColorClass(source.tokenCount ?? 0)}">
				<TokenCount value={source.tokenCount ?? 0} />
			</span>
		</div>
	</div>
</div>
