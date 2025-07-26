<script lang="ts">
	import type { Source } from "$lib/types"
	import SourceItem from "./SourceItem.svelte"
	import { markitdown } from "$lib/client"
	import { countToken } from "$lib/count"
	import TokenCount from "$lib/TokenCount.svelte"

	let sources = $state<Source[]>([])
	let dragOver = $state(false)
	let processing = $state(false)
	let processedCount = $state(0)
	let totalCount = $state(0)

	function isValidFileType(file: File): boolean {
		const validExtensions = /\.(txt|md|pdf|docx?|pptx?|xlsx?|jpe?g|png|gif|bmp|webp|tiff?|mp3|wav|ogg|m4a|flac|html?|csv|json|xml|zip|epub)$/i
		return validExtensions.test(file.name)
	}

	function isValidFileSize(file: File, maxSizeMB: number = 10): boolean {
		return file.size <= maxSizeMB * 1024 * 1024
	}

	async function processFile(source: Source, file: File) {
		try {
			source.text = await markitdown(file)
			source.tokenCount = await countToken(source.text)
		} catch (error) {
			console.error("Failed to process file:", error)
			source.text = `Error processing file: ${file.name}`
		} finally {
			source.ready = true
			processedCount++
		}
	}

	async function handleFiles(files: FileList) {
		const validFiles: File[] = []
		const invalidMessages: string[] = []

		for (const file of files) {
			if (!isValidFileType(file)) {
				invalidMessages.push(`${file.name}: 不支持的文件类型`)
			} else if (!isValidFileSize(file)) {
				invalidMessages.push(`${file.name}: 文件过大 (最大 10MB)`)
			} else {
				validFiles.push(file)
			}
		}

		if (invalidMessages.length > 0) {
			invalidMessages.forEach((error) => console.warn(error))
		}

		if (validFiles.length === 0) return

		processing = true
		processedCount = 0
		totalCount = validFiles.length

		const processingPromises = validFiles.map((file) => {
			const newSource: Source = $state({
				id: crypto.randomUUID(),
				type: "file",
				ready: false,
				fileName: file.name
			})
			sources.push(newSource)
			return processFile(newSource, file)
		})

		try {
			await Promise.all(processingPromises)
			console.log(`处理完成: ${processedCount} 个成功`)
		} catch (error) {
			console.error("文件处理过程中发生错误:", error)
		} finally {
			processing = false
			processedCount = 0
			totalCount = 0
		}
	}

	function ondragover(event: DragEvent) {
		event.preventDefault()
		dragOver = true
	}

	function ondragleave(event: DragEvent) {
		event.preventDefault()
		dragOver = false
	}

	async function ondrop(event: DragEvent) {
		event.preventDefault()
		dragOver = false
		const files = event.dataTransfer?.files
		if (!files) return
		await handleFiles(files)
	}
</script>

<h3 class="text-right text-xl">
	<TokenCount fancy value={sources.reduce((acc, source) => acc + (source.tokenCount ?? 0), 0)} />
</h3>

<div class="mx-auto max-w-4xl p-4">
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex gap-2">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="mb-3 border-2 border-gray-300 rounded-lg border-dashed bg-gray-50 p-6 text-center transition-all duration-300 {dragOver ? 'scale-105 border-blue-500 bg-blue-50' : ''}" {ondragover} {ondragleave} {ondrop}>
				<div class="flex flex-col items-center gap-1">
					<div class="text-2xl opacity-70">📁</div>
					<div class="text-base text-gray-700 font-medium">
						{processing ? "正在处理文件..." : dragOver ? "释放文件以上传" : "拖拽文件到这里"}
					</div>
					<div class="text-xs text-gray-500">
						{processing ? `已处理 ${processedCount}/${totalCount} 个文件` : "支持的文件格式: .txt, .md, .pdf, .docx 等 (最大 10MB)"}
					</div>
					{#if processing}
						<div class="mt-1 h-4 w-4 animate-spin border border-gray-200 border-t-blue-500 rounded-full"></div>
					{/if}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			{#each sources as source (source.id)}
				<SourceItem {source} />
			{/each}
		</div>
	</div>
</div>
