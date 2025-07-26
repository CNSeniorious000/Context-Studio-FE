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

<div class={["rounded-lg bg-white p-3 transition-all duration-300 shadow-sm", source.ready && "bg-green-50"]}>
	<div class="flex items-center gap-2 text-sm">
		<span class="flex-shrink-0 text-lg">{getTypeIcon(source.type ?? "file")}</span>
		<div class="min-w-0 flex-1">
			<div class="truncate text-gray-700 font-medium">
				{#if source.ready && source.title}
					{source.title}
				{:else}
					{getDisplayName()}
				{/if}
			</div>
			{#if source.title && source.text && source.tokenCount}
				<div class="mt-0.5 truncate text-xs text-gray-500">
					{(source.text || "").slice(0, 100)}{(source.text || "").length > 100 ? "..." : ""}
				</div>
			{:else}
				<div class="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
					<div>
						{#if !source.text}
							正在处理文件...
						{:else if !source.title}
							正在分析文件...
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<span class={["rounded-full transition-opacity px-2 py-1 text-xs font-medium flex-shrink-0", source.tokenCount ? getTokenColorClass(source.tokenCount) : "opacity-0"]}>
			<TokenCount value={source.tokenCount ?? 0} />
		</span>
	</div>
</div>
