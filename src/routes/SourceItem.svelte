<script lang="ts">
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
</script>

<div class="border border-gray-200 rounded-lg bg-white p-3 transition-all duration-300 {source.ready ? 'border-green-500 bg-green-50' : ''}">
	<div class="mb-2 flex items-center gap-2 text-sm">
		<span class="text-lg">{getTypeIcon(source.type ?? "file")}</span>
		<span class="flex-1 truncate text-gray-700 font-medium">{getDisplayName()}</span>
		<span class="rounded px-2 py-0.5 text-xs font-medium {source.ready ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}">
			{source.ready ? "✓ 已完成" : "⏳ 处理中"}
		</span>
	</div>

	<div class="mt-1">
		{#if source.ready}
			<div class="mb-1 text-sm text-gray-700 leading-relaxed">
				{(source.text || "").length > 80 ? (source.text || "").slice(0, 80) + "..." : source.text || ""}
			</div>
			<div class="flex justify-end">
				<span class="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 font-medium">
					{source.tokenCount} tokens
				</span>
			</div>
		{:else}
			<div class="flex items-center gap-2 text-sm text-gray-500">
				<div>正在处理...</div>
				<div class="h-3 w-3 animate-spin border border-gray-200 border-t-blue-500 rounded-full"></div>
			</div>
		{/if}
	</div>
</div>
