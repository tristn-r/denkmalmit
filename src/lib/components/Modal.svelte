<script lang="ts">
    import { type Snippet } from "svelte";
    import { setModalContext } from "$lib/context/modalContext";

    let { children }: { children: Snippet } = $props();
    let isOpen = $state(false);

    setModalContext({
        get isOpen() {
            return isOpen;
        },
        open: () => (isOpen = true),
        close: () => (isOpen = false),
        toggle: () => (isOpen = !isOpen),
    });
</script>

{@render children?.()}
