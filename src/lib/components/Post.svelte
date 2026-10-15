<script lang="ts">
    import type { Post } from "$lib/database.types";
    import { ThumbsDown, ThumbsUp } from "@lucide/svelte";
    import { likePost } from "./post.remote";

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
        <button
            style="--anim-direciton: -1"
            class="vote-button"
            class:like={likeness === 1}
            onclick={() => {
                likeness = likeness > 0 ? 0 : 1;
                likePost({ id: post.id, likeness: likeness === 0 ? -1 : 1 });
            }}
        >
            <ThumbsUp fill={likeness > 0 ? "var(--col-fill)" : "#0000"} />
        </button>
        <button
            style="--anim-direciton: 1"
            class="vote-button"
            class:unlike={likeness === -1}
            onclick={() => {
                likeness = likeness < 0 ? 0 : -1;
                likePost({ id: post.id, likeness: likeness === 0 ? 1 : -1 });
            }}
        >
            <ThumbsDown fill={likeness < 0 ? "var(--col-fill)" : "#0000"} />
        </button>
    </span>
</div>

<style>
    .post {
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: var(--border);
        border-radius: var(--rounded-md);

        & h1 {
            margin: 15px;
            line-height: 0.92;
        }
    }

    .time {
        position: absolute;
        align-self: end;
    }

    .voting {
        display: flex;
        gap: 4px;
    }
    .vote-button {
        cursor: pointer;
    }
    .like {
        animation: like 0.5s ease-in-out;
    }
    .unlike {
        animation: unlike 0.5s ease-in-out;
    }

    @keyframes like {
        50% {
            transform: translateY(-1rem);
        }
    }
    @keyframes unlike {
        50% {
            transform: translateY(1rem);
        }
    }
</style>
