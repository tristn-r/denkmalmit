<script lang="ts">
    import type { Poll } from "#lib/database.types.ts";
    import { Check, X } from "@lucide/svelte";
    import Button from "../button/Button.svelte";
    import Modal from "../modal/Modal.svelte";
    import ModalContentX from "../modal/ModalContentX.svelte";
    import ModalTrigger from "../modal/ModalTrigger.svelte";
    import { submitPoll } from "#lib/remote/poll.remote.ts";

    let { poll }: { poll: Poll } = $props();

    let modalContent = $state();

    function handleSubmit(e: MouseEvent, response: boolean) {
        e.preventDefault();
        if (modalContent) modalContent.closeModal();
        submitPoll({ id: poll.id, response });
    }
</script>

<div class="alert">
    Neue Umfrage verfügbar
    <Modal>
        <ModalTrigger>Teilnehmen</ModalTrigger>
        <ModalContentX bind:this={modalContent}>
            <h1 class="text">{poll.text}</h1>
            <div id="modal-form">
                <!-- method="POST" -->
                <!-- use:enhance={() => -->
                <!--     async ({ update }) => { -->
                <!--         if (modalContent) modalContent.closeModal(); -->
                <!--         await update({ navigate: false }); -->
                <!--     }} -->
                <Button
                    onclick={(e) => {
                        handleSubmit(e, false);
                    }}
                    id="poll-button"
                    style="background-color: var(--col-bad)"
                >
                    <X size={96} />
                </Button>
                <Button
                    onclick={(e) => {
                        handleSubmit(e, true);
                    }}
                    id="poll-button"
                    style="background-color: var(--col-good);"
                >
                    <Check size={96} />
                </Button>
            </div>
        </ModalContentX>
    </Modal>
</div>

<style>
    .alert {
        border: var(--border);
        background-color: var(--col-bg);
        box-shadow: var(--shadow);
        position: fixed;
        left: 0;
        right: 0;
        margin: 0 auto;
        top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        width: min(90%, 500px);
        padding: 8px 12px;
        font-size: 1.2rem;
    }

    .text {
        width: 85%;
        line-height: 1;
        margin-bottom: 20px;
    }

    #modal-form {
        display: flex;
        flex-direction: row;
        gap: 16px;
        justify-content: center;
    }

    :global(#poll-button) {
        width: 40%;
        height: 100%;
        color: #fff;
        display: grid;
        place-items: center;
    }
</style>
