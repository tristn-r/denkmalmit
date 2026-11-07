<script lang="ts">
    import Button from "#lib/components/button/Button.svelte";
    import type { Post } from "#lib/database.types.js";
    import { deletePost } from "#lib/remote/post.remote.ts";
    import { Trash } from "@lucide/svelte";
    import Card from "../card/Card.svelte";
    import CardHeader from "../card/CardHeader.svelte";
    import CardContent from "../card/CardContent.svelte";
    import CardFooter from "../card/CardFooter.svelte";

    let { post }: { post: Post } = $props();

    let time = $derived(
        String(new Date(post.time).getHours()).padStart(2, "0") +
            ":" +
            String(new Date(post.time).getMinutes()).padStart(2, "0"),
    );
</script>

<Card>
    <CardHeader>
        <span class="author">{post.author}</span>
        <span class="time">{time}</span>
    </CardHeader>
    <CardContent><h1 class="text">{post.text}</h1></CardContent>
    <CardFooter>
        <Button
            id="delete-button"
            onclick={() => {
                deletePost({ id: post.id });
            }}
        >
            <Trash />
        </Button>
    </CardFooter>
</Card>

<style>
    .text {
        line-height: 0.92;
        hyphens: auto;
        hyphenate-limit-chars: 14 5 5;
        overflow-wrap: break-word;
    }

    .author {
        font-size: 1.2rem;
        font-weight: 500;
    }

    .time {
        font-size: 1.2rem;
    }

    :global(#delete-button) {
        transition: background-color 0.2s ease;
        background-color: var(--col-bad);
    }
</style>
