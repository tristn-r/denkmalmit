<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children?: Snippet } = $props();
</script>

<div class="card-footer">
    {@render children?.()}
</div>

<style>
    .card-footer {
        display: flex;
        align-items: center;
        gap: 8px;
    }
</style>
