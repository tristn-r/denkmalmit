<script lang="ts">
    import { X } from "@lucide/svelte";
    import { type Snippet } from "svelte";
    import { getModalContext } from "#lib/context/modalContext.js";
    import Button from "./Button.svelte";

    let {
        children,
    }: {
        children: Snippet;
    } = $props();

    const context = getModalContext();
    let modal: HTMLDialogElement | undefined = $state();
    let screenHeight = $state(0);

    $effect(() => {
        if (!modal) return;
        modal.addEventListener("close", () => {
            context.close();
        });
    });

    $effect(() => {
        if (!context.isOpen || !modal) return;
        modal.showModal();
    });

    function closeModal() {
        context.close();
        if (modal) modal.close();
    }

    function handleClick(e: MouseEvent) {
        // close modal when backdrop is clicked
        if (context.isOpen && (e.target as HTMLElement).nodeName === "HTML")
            closeModal();
    }
</script>

<svelte:window onclick={handleClick} bind:innerHeight={screenHeight} />

<div class="modal-backdrop"></div>
<dialog bind:this={modal} class="modal">
    <Button id="close" onclick={(_) => closeModal()} type="button">
        <X size="2rem" color="var(--col-text)" />
    </Button>
    <form id="modal-form" method="dialog">
        {@render children?.()}
    </form>
</dialog>

<style>
    .modal {
        max-width: none;
        max-height: none;

        position: fixed;
        top: auto;
        bottom: -100%;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0.4rem 0.8rem 0.8rem 0.8rem;
        z-index: 1001;
        background-color: var(--col-bg);
        box-shadow: 0 -6px #000;
        display: flex;
        flex-direction: column;
        transition: bottom 0.2s ease;
        margin: 0;

        &[open] {
            bottom: 0;
        }
        &::backdrop {
            visibility: hidden;
            height: 0;
            width: 0;
        }
    }
    .modal-backdrop {
        opacity: 0;
        visibility: hidden;
        position: fixed;
        inset: 0;
        z-index: 1000;
        background-color: #0004;
        backdrop-filter: blur(1px);
        transition:
            opacity 0.2s ease,
            visibility 0.2s;

        &:has(~ .modal[open]) {
            visibility: visible;
            opacity: 1;
        }
    }

    :global(#close) {
        position: absolute;
        top: 0.6rem;
        right: 0.8rem;
    }

    #modal-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    @media (min-width: 750px) {
        .modal {
            box-shadow: var(--shadow);
            border: var(--border);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -45%) scale(0.95);
            width: 750px;
            /* height: 80%; */
            padding: 0.8rem;
            opacity: 0;
            visibility: hidden;
            transition:
                opacity 0.2s ease,
                transform 0.2s ease-out,
                visibility 0.2s;

            &[open] {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
                visibility: visible;
            }
        }

        :global(#close) {
            top: 1rem;
        }
    }
</style>
