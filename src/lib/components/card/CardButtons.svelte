<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children: Snippet } = $props();
</script>

<div class="card-buttons">
    {@render children?.()}
</div>

<style>
    .card-buttons {
        display: flex;
        gap: 8px;
    }
</style>
