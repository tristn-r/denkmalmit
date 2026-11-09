<script lang="ts">
    import Logo from "#lib/components/logo/Logo.svelte";
    import "./layout.css";
    import { type Snippet } from "svelte";
    let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
    <title>DenkMal</title>
    <meta name="description" content="DenkMal Mit Seite" />
</svelte:head>

<!-- <Logo /> -->
<div class="app">
    <main>
        {@render children()}
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
