<script>
    import Button from "./Button.svelte";
    import Modal from "./Modal.svelte";
    import ModalContentX from "./ModalContentX.svelte";
    import ModalTrigger from "./ModalTrigger.svelte";
</script>

<Modal>
    <ModalTrigger id="post-form-trigger">Frage stellen</ModalTrigger>
    <ModalContentX>
        <h1>Frage formulieren</h1>
        <label class="form-label">
            <p>Name <span class="optional">optional</span></p>
            <input type="text" class="form-input" />
        </label>
        <span class="form-buttons">
            <Button type="button">Abbrechen</Button>
            <Button type="submit">Frage absenden</Button>
        </span>
    </ModalContentX>
</Modal>

<style>
    :global(#post-form-trigger) {
        position: fixed;
        bottom: 30px;
        transition: scale 0.15s ease-out;

        &:active {
            scale: 0.97;
            outline: none;
        }
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

    :global(.form-buttons) {
        display: flex;
        gap: 6px;

        & button:nth-child(1) {
            background-color: color(from var(--col-bad) srgb r g b / 0.6);
        }
        & button:nth-child(2) {
            background-color: color(from var(--col-good) srgb r g b / 0.8);
        }
    }

    .optional {
        color: var(--col-secondary);
    }
</style>
