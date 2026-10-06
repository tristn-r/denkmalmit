<script lang="ts">
    import type { Post } from "$lib/database.types";
    import { ThumbsDown, ThumbsUp } from "@lucide/svelte";

    let { post }: {post: Post} = $props();
</script>

<div class="post">
    {#if post.author}
        <span class="author">{post.author}</span>
    {/if}
    {#if post.time}
        {@const date = new Date(post.time)}
        <span class="time">
            {String(date.getHours()).padStart(2, "0")}:{String(date.getMinutes()).padStart(2, "0")}
        </span>
    {/if}
    <h1>{post.text}</h1>
    <span class="voting">
        <ThumbsUp />
        <ThumbsDown />
    </span>
</div>

<style>
    .post {
        min-width: 250px;
        display: flex;
        flex-direction: column;
        padding: 5px;
        border: 1px solid #2525252f;
    }

    .time {
        align-self: end;
    }
</style>
