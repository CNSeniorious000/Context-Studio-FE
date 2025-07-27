<script lang="ts">
	import TokenCount from "$lib/TokenCount.svelte"
	import type { Source } from "$lib/types"

	let { source }: { source: Source } = $props()

	function getTypeIcon(filename: string) {
		switch (filename.split(".").pop()?.toLowerCase()) {
			case "md":
			case "txt":
			case "pdf":
			case "doc":
			case "docx":
				return "i-fluent-emoji-flat-closed-book"
			case "xls":
			case "xlsx":
			case "ppt":
			case "pptx":
				return "i-fluent-emoji-flat-package"
			case "jpg":
			case "jpeg":
			case "png":
			case "gif":
				return "i-fluent-emoji-flat-framed-picture"
			default:
				return "i-fluent-emoji-flat-paperclip"
		}
	}

	function getTokenColorClass(tokenCount: number) {
		if (tokenCount < 1000) {
			return "text-green-6 bg-green-50"
		} else if (tokenCount < 10000) {
			return "text-cyan-6 bg-cyan-50"
		} else if (tokenCount <= 50000) {
			return "text-yellow-6 bg-yellow-50"
		} else {
			return "text-pink-6 bg-pink-50"
		}
	}
</script>

<div class={["rounded-lg bg-white p-3 gap-2 transition-all duration-300 shadow-sm", source.ready && "bg-green-50"]}>
	<div class="flex items-center gap-2">
		<div class="grid size-9 place-items-center rounded-md text-lg" class:bg-gray-50={source.text && source.summary && source.title && source.tokenCount}>
			{#if source.text && source.summary && source.title && source.tokenCount}
				<div class={getTypeIcon(source.fileName ?? ".txt")}></div>
			{:else}
				<div class="i-svg-spinners-90-ring-with-bg text-gray-5"></div>
			{/if}
		</div>

		<div class="min-w-0 flex-1">
			<div class="truncate text-gray-700 font-medium">
				{#if source.ready && source.title}
					{source.title}
				{:else}
					{source.fileName ?? source.id.slice(0, 8)}
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
							Extracting...
						{:else if !source.title}
							Analysing...
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
