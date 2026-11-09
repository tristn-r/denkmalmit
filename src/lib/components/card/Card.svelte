<script lang="ts">
    import type { Snippet } from "svelte";

    let { children, id }: { children?: Snippet; id?: string } = $props();
</script>

<div class="card" lang="de" {id}>
    {@render children?.()}
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: var(--border);
        border-radius: var(--rounding);
        background-color: var(--col-bg);
        box-shadow: 4px 4px #000;
        width: 100%;

        hyphens: auto;
        hyphenate-limit-chars: 14 5 5;
        overflow-wrap: break-word;
    }
</style>
