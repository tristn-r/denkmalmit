<script lang="ts">
    import type { Post } from "#lib/database.types.js";
    import { ChevronDown, ChevronUp } from "@lucide/svelte";
    import { likePost } from "#lib/remote/post.remote.js";
    import Button from "./Button.svelte";

    let { post }: { post: Post } = $props();
    let time = $state("");
    let likeness = $state(0);

    $effect(() => {
        const date = new Date(post.time);
        time =
            String(date.getHours()).padStart(2, "0") +
            ":" +
            String(date.getMinutes()).padStart(2, "0");
    });
</script>

<div class="post">
    {#if post.author}
        <span class="author">{post.author}</span>
    {/if}
    <span class="time">
        {time}
    </span>
    <h1>{post.text}</h1>
    <span class="voting">
        <Button
            id="vote-button"
            data-active={likeness === 1}
            onclick={() => {
                likeness = likeness > 0 ? 0 : 1;
                likePost({ id: post.id, likeness: likeness === 0 ? -1 : 1 });
            }}
        >
            <ChevronUp />
            <!-- <ThumbsUp fill="#0000" /> -->
        </Button>
        <Button
            id="vote-button"
            data-active={likeness === -1}
            onclick={() => {
                likeness = likeness < 0 ? 0 : -1;
                likePost({ id: post.id, likeness: likeness === 0 ? 1 : -1 });
            }}
        >
            <ChevronDown />
            <!-- <ThumbsDown fill="#0000" /> -->
        </Button>
    </span>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        padding: 8px;
        border: var(--border);
        border-radius: var(--rounding);
        background-color: var(--col-bg);
        box-shadow: 4px 4px #000;

        & h1 {
            margin: 15px;
            line-height: 0.92;
        }

        /* & span { */
        /*     border: var(--border); */
        /*     box-shadow: var(--shadow-sm); */
        /*     width: fit-content; */
        /*     padding: 2px 4px; */
        /* } */
        /* &:hover h1 { */
        /*     text-decoration: underline; */
        /* } */
    }

    .time {
        position: absolute;
        align-self: end;
    }

    .voting {
        display: flex;
        gap: 8px;
    }
    :global(#vote-button[data-active="false"]) {
        transition:
            translate 0.2s ease-out,
            box-shadow 0.2s ease-out,
            background-color 0.2s ease;
    }
    :global(#vote-button[data-active="true"]) {
        box-shadow: 0px 0px #000;
        translate: 2px 2px;
        transition:
            translate 0.2s ease-out,
            box-shadow 0.2s ease-out,
            background-color 0.2s ease;

        &:nth-child(1) {
            background-color: var(--col-good);
        }
        &:nth-child(2) {
            background-color: var(--col-bad);
        }
    }

    /* @keyframes like { */
    /*     50% { */
    /*         transform: translateY(-1rem); */
    /*     } */
    /* } */
    /* @keyframes unlike { */
    /*     50% { */
    /*         transform: translateY(1rem); */
    /*     } */
    /* } */
</style>
