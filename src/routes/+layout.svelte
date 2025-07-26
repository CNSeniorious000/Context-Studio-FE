<script>
	import "uno.css"
	import "@unocss/reset/tailwind.css"

	let { children } = $props()
</script>

<div class="m-3vmax mx-auto max-w-full w-lg flex flex-col gap-2 p-3">
	<header>
		<h1>Context Manager</h1>
		<h2>— a system message composer</h2>
	</header>
	<main class="b-1 p-3">
		{@render children()}
	</main>
</div>
