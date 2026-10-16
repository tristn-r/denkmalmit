<script lang="ts">
    import { getModalContext } from "#lib/context/modalContext.js";
    import { type Snippet } from "svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const modal = getModalContext();
</script>

<div class:hidden={!modal.isOpen} class="modal">
    {@render children?.()}
</div>

<style>
    .modal {
        position: absolute;
        top: 10%;
        animation: 0.2s fly ease-out;
        width: 100%;
        height: 90%;
        background-color: #fff;
        border-radius: var(--rounded-xl) var(--rounded-xl) 0 0;
        display: flex;
        padding: 20px;
    }
    .modal::after {
        content: "";
        width: 40%;
        height: 5px;
        border-radius: 10px;
        background-color: #0005;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .hidden {
        display: none;
    }

    @keyframes fly {
        0% {
            top: 100%;
        }
    }
</style>
