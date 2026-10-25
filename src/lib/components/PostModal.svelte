<script>
    import { enhance } from "$app/forms";
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";
    import ModalContentX from "./ModalContentX.svelte";
    import ModalTrigger from "./ModalTrigger.svelte";

    let modalContent = $state();
</script>

<Modal>
    <ModalTrigger id="post-form-trigger">Frage stellen</ModalTrigger>
    <ModalContentX bind:this={modalContent}>
        <form
            id="modal-form"
            method="POST"
            action="/post?/create"
            use:enhance={() =>
                async ({ update }) => {
                    if (modalContent) modalContent.closeModal();
                    await update({ navigate: false });
                }}
        >
            <h1 style="line-height: 1;">Frage formulieren</h1>
            <label class="form-label">
                <p>Name <span class="optional">optional</span></p>
                <input
                    type="text"
                    name="author"
                    id="modal-input"
                    class="form-input"
                />
            </label>
            <label class="form-label">
                <p>Frage</p>
                <textarea name="text" id="modal-textarea" class="form-input"
                ></textarea>
            </label>
            <span class="form-buttons">
                <Button
                    type="reset"
                    onclick={(_) => {
                        if (modalContent) modalContent.closeModal();
                    }}
                >
                    Abbrechen
                </Button>
                <Button type="submit">Frage absenden</Button>
            </span>
        </form>
    </ModalContentX>
</Modal>

<style>
    :global(#post-form-trigger) {
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        transition:
            translate 0.2s ease,
            box-shadow 0.2s ease;

        &:active {
            translate: 2px 2px;
            box-shadow: 0px 0px #000;
        }
    }

    #modal-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-label {
        display: flex;
        flex-direction: column;
        font-size: 1.2rem;
        font-weight: 500;
    }

    .form-input {
        border: var(--border);
        box-shadow: var(--shadow);
        border-radius: var(--rounded-md);
        font-size: 2rem;
        font-weight: 600;
        padding: 4px 8px;

        &:focus-visible {
            outline: none;
        }
    }

    #modal-textarea {
        height: 12rem;
        resize: none;
    }

    :global(.form-buttons) {
        display: flex;
        justify-content: space-around;
        gap: 12px;

        & button:nth-child(1) {
            background-color: color(from var(--col-bad) srgb r g b / 0.6);
            flex: 1;
        }
        & button:nth-child(2) {
            background-color: color(from var(--col-good) srgb r g b / 0.8);
            flex: 1;
        }
    }

    .optional {
        color: var(--col-secondary);
    }
</style>
