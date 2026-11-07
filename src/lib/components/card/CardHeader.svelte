<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children?: Snippet } = $props();
</script>

<div class="card-header">
    {@render children?.()}
</div>

<style>
    .card-header {
        display: flex;
        justify-content: space-between;
    }
</style>
