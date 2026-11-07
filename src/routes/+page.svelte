<script lang="ts">
    import PostComponent from "#lib/components/post/Post2.svelte";
    import PostModal from "#lib/components/modal/PostModal.svelte";
    import Button from "#lib/components/button/Button.svelte";
    import type { PageProps } from "./$types";
    import type { Poll, Post } from "#lib/database.types.js";
    import { db } from "#lib/db.js";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { ListSortDescending } from "@lucide/svelte";

    import { votedPosts, sorting, takenPolls } from "#lib/storage.ts";
    import Alert from "#lib/components/alert/Alert.svelte";

    const { data }: PageProps = $props();

    // svelte-ignore state_referenced_locally
    let posts: Post[] = $state(data.posts);
    sortPosts();

    // svelte-ignore state_referenced_locally
    let activePoll: Poll | null = $state(data.poll);

    $effect(() => {
        if (activePoll && $takenPolls.includes(activePoll.id)) {
            activePoll = null;
        }
    });

    onMount(() => {
        const channel = db
            .channel("schema-db-changes")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    posts = [payload.new as Post, ...posts];
                    sortPosts();
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    let idx = posts.findIndex(
                        (post) => post.id === payload.old.id,
                    );
                    posts[idx] = payload.new as Post;
                    sortPosts();
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "posts",
                },
                (payload) => {
                    posts = posts.filter((post) => post.id != payload.old.id);
                    // sortPosts();
                },
            )
            // polls
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "polls",
                },
                (payload) => {
                    activePoll = payload.new as Poll;
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "polls",
                },
                (payload) => {
                    if (
                        activePoll &&
                        activePoll.id === payload.new.id &&
                        payload.new.active === false
                    )
                        activePoll = null;
                },
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    });

    const reverse = () => {
        $sorting.reversed = !$sorting.reversed;
        posts.reverse();
    };

    function sortPosts() {
        if ($sorting.criteria === "time")
            posts.sort((a, b) => {
                return Date.parse(b.time) - Date.parse(a.time);
            });
        else if ($sorting.criteria === "relevance")
            posts.sort((a, b) => b.relevance - a.relevance);

        if ($sorting.reversed) posts.reverse();
    }
</script>

<svelte:head>
    <title>DenkMal</title>
    <meta name="description" content="DenkMal Mit Seite" />
</svelte:head>

<section>
        <Alert poll={activePoll} visible={!!activePoll} />
    <span class="sorting">
        <Button onclick={reverse}>
            <ListSortDescending
                class="sort-arrow"
                data-reversed={$sorting.reversed}
            />
        </Button>
        <select
            class="sort-select"
            bind:value={$sorting.criteria}
            onchange={sortPosts}
        >
            <option value="time">Zeit</option>
            <option value="relevance">Relevanz</option>
        </select>
    </span>
    <div class="posts">
        {#each posts as post (post.id)}
            <div class="post-wrapper" animate:flip={{ duration: 300 }}>
                <PostComponent {post} vote={$votedPosts[post.id]} />
            </div>
        {/each}
    </div>
    <PostModal />
</section>

<style>
    .posts {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 0.6;
        gap: 16px;
    }

    .post-wrapper {
        width: 100%;
    }

    .sorting {
        display: flex;
        justify-content: end;
        gap: 8px;
        margin-bottom: 12px;
    }

    .sort-select {
        border: var(--border);
        border-radius: var(--rounded-md);
        box-shadow: var(--shadow);
        background-color: var(--col-bg);
        padding: 0.25rem 0.5rem;

        &:focus-visible {
            outline: none;
        }
    }

    :global(.sort-arrow) {
        transition: transform 0.2s ease-out;

        &[data-reversed="true"] {
            /* rotate: 0.5turn; */
            transform: scaleY(-1);
        }
    }
</style>
