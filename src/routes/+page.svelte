<script lang="ts">
	import type { Source } from "$lib/types"
	import SourceItem from "./SourceItem.svelte"
	import MiniMap from "./MiniMap.svelte"
	import { markitdown, generateTitle, summarize } from "$lib/client"
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

			// 立即计算 token count，不等待 title 和 summary
			source.tokenCount = await countToken(source.text)

			// 异步生成 title，不阻塞 token 显示
			generateTitle(source.text)
				.then((title) => {
					source.title = title
				})
				.catch((error) => {
					console.error("Failed to generate title:", error)
				})

			// 异步生成 summary，不阻塞其他操作
			summarize(source.text)
				.then((summary) => {
					source.summary = summary
					console.log({ ...source })
				})
				.catch((error) => {
					console.error("Failed to generate summary:", error)
				})
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

{#if sources.length}
	<h3 class="text-right text-xl">
		<TokenCount fancy value={sources.reduce((acc, source) => acc + (source.tokenCount ?? 0), 0)} />
	</h3>
	<MiniMap {sources} />
{/if}

<div class="mx-auto max-w-4xl px-4">
	<div class="mt-4 flex flex-col gap-4">
		<div class="flex gap-2">
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="w-full border-(2 gray-2 dashed) rounded-lg transition duration-300 {dragOver ? 'scale-102 !border-blue-500 bg-blue-50/50 text-blue-5' : 'text-gray bg-gray-50/50'}" {ondragover} {ondragleave} {ondrop}>
				<div class="min-h-20 flex flex-col items-center justify-center gap-1 text-2xl transition duration-300" class:op-60={!dragOver}>
					<div class="i-tabler-upload" class:animate-pulse={!dragOver}></div>
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
