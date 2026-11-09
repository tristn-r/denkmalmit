<script lang="ts">
    import Card from "#lib/components/card/Card.svelte";
    import { onMount } from "svelte";
    import type { PageProps } from "./$types";
    import { db } from "#lib/db.ts";
    import type { Poll } from "#lib/database.types.ts";

    let { data }: PageProps = $props();

    // svelte-ignore state_referenced_locally
    let poll = $state(data.poll);

    onMount(() => {
        if (!poll) return;
        const channel = db
            .channel("schema-db-changes")
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "polls",
                    filter: "id=eq." + poll.id,
                },
                (payload) => {
                    poll = payload.new as Poll;
                    console.log("update");
                },
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    });
</script>

<Card id="poll-card">
    {#if poll}
        <h1 style="line-height: 1.1;">{poll.text}</h1>
        <div class="response-wrapper">
            <span class="response-count">{poll.nein}</span>
            <span class="response-count">{poll.ja}</span>
        </div>
        <div
            class="response-bar"
            data-progress={poll.nein / (poll.ja + poll.nein)}
        ></div>
    {/if}
</Card>

<style>
    :global(#poll-card) {
        margin: auto auto;
        padding: 1rem;
    }

    .response-wrapper {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .response-count {
        font-size: 8rem;
        font-weight: 600;
        line-height: 1.2;

        text-shadow: 0 0 5px #000;

        &:first-child {
            color: var(--col-bad);
        }
        &:last-child {
            color: var(--col-good);
        }
    }

    .response-bar {
        width: 100%;
        height: 20px;
        background-color: var(--col-good);
        border: var(--border);
        box-shadow: var(--shadow-sm);

        &::after {
            content: "";
            display: block;
            width: calc(100% * attr(data-progress number));
            height: 100%;
            background-color: var(--col-bad);
            transition: width 0.4s ease-out;
        }
    }
</style>
