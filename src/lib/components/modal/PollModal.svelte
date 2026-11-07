<script>
    import { enhance } from "$app/forms";
    import Button from "#lib/components/button/Button.svelte";
    import Modal from "./Modal.svelte";
    import ModalContentX from "./ModalContentX.svelte";
    import ModalTrigger from "./ModalTrigger.svelte";

    let modalContent = $state();
</script>

<Modal>
    <ModalTrigger id="form-trigger">Poll starten</ModalTrigger>
    <ModalContentX bind:this={modalContent}>
        <form
            id="modal-form"
            method="POST"
            action="/poll?/create"
            use:enhance={() =>
                async ({ update }) => {
                    if (modalContent) modalContent.closeModal();
                    await update({ navigate: false });
                }}
        >
            <h1 style="line-height: 1;">Poll formulieren</h1>
            <label class="form-label">
                <p>Frage</p>
                <textarea
                    required
                    name="text"
                    id="modal-textarea"
                    class="form-input"
                    style="font-size: 2rem;"
                ></textarea>
            </label>
            <!-- <label class="form-label"> -->
            <!--     Poll Typ -->
            <!--     <select class="form-input form-select"> -->
            <!--         <option>Ja/Nein</option> -->
            <!--         <option>ölkjadsf</option> -->
            <!--     </select> -->
            <!-- </label> -->
            <span class="form-buttons">
                <Button
                    type="reset"
                    onclick={(_) => {
                        if (modalContent) modalContent.closeModal();
                    }}
                >
                    Abbrechen
                </Button>
                <Button type="submit">Poll erstellen</Button>
            </span>
        </form>
    </ModalContentX>
</Modal>

<style>
    :global(#form-trigger) {
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
        font-weight: 600;
        padding: 4px 8px;

        &:focus-visible {
            outline: none;
        }
    }

    .form-select {
        padding: 8px 12px;
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
            background-color: var(--col-bad);
            flex: 1;
        }
        & button:nth-child(2) {
            background-color: var(--col-good);
            flex: 1;
        }
    }
</style>
