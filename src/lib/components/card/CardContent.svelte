<script lang="ts">
    import type { Snippet } from "svelte";

    let { children }: { children?: Snippet } = $props();
</script>

<div class="card-content">
    {@render children?.()}
</div>

<style>
    .card-content {
        margin: 15px;
        margin-top: 10px;
    }
</style>
