<script lang="ts">
    import DeletablePost from "#lib/components/post/DeletablePost.svelte";
    import Button from "#lib/components/button/Button.svelte";
    import { db } from "#lib/db.js";
    import type { Post, Poll } from "#lib/database.types.js";
    import type { PageProps } from "./$types";
    import { onMount } from "svelte";
    import { flip } from "svelte/animate";
    import { Ban, Check, ListSortDescending, X } from "@lucide/svelte";

    import { sorting } from "#lib/storage.ts";
    import PollModal from "#lib/components/modal/PollModal.svelte";
    import Card from "#lib/components/card/Card.svelte";
    import CardContent from "#lib/components/card/CardContent.svelte";
    import CardFooter from "#lib/components/card/CardFooter.svelte";
    import { endPoll } from "#lib/remote/poll.remote.ts";

    const { data }: PageProps = $props();
    let listType = $state("posts");

    // svelte-ignore state_referenced_locally
    let posts = $state(data.posts);
    sortPosts();

    // svelte-ignore state_referenced_locally
    let polls = $state(data.polls);

    onMount(() => {
        const channel = db
            .channel("schema-db-changes")
            // posts
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
                    polls = [payload.new as Poll, ...polls];
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
                    let idx = polls.findIndex(
                        (poll) => poll.id === payload.old.id,
                    );
                    polls[idx] = payload.new as Poll;
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "polls",
                },
                (payload) => {
                    polls = polls.filter((polls) => polls.id != payload.old.id);
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
    {#if data.isAdmin}
        <select
            class="select"
            bind:value={listType}
            style="position: absolute;"
        >
            <option value="posts">Posts</option>
            <option value="polls">Polls</option>
        </select>
        <span class="sorting">
            <Button onclick={reverse}>
                <ListSortDescending
                    class="sort-arrow"
                    data-reversed={$sorting.reversed}
                />
            </Button>
            <select
                class="select"
                bind:value={$sorting.criteria}
                onchange={sortPosts}
            >
                <option value="time">Zeit</option>
                <option value="relevance">Relevanz</option>
            </select>
        </span>
        <div class="list">
            {#if listType === "posts"}
                {#each posts as post (post.id)}
                    <div class="post-wrapper" animate:flip={{ duration: 300 }}>
                        <DeletablePost {post} />
                    </div>
                {/each}
            {:else if listType === "polls"}
                {#each polls as poll (poll.id)}
                    <div class="post-wrapper" animate:flip={{ duration: 300 }}>
                        <Card>
                            <CardContent>
                                <a href={"/poll/" + poll.id}>
                                    <h1 class="poll-text">{poll.text}</h1>
                                </a>
                            </CardContent>
                            <CardFooter>
                                <span
                                    class="response-indicator"
                                    style="color: var(--col-good);"
                                >
                                    <Check />
                                    {poll.ja}
                                </span>
                                <span
                                    class="response-indicator bad"
                                    style="color: var(--col-bad);"
                                >
                                    <X />
                                    {poll.nein}
                                </span>
                                {#if poll.active}
                                    <Button
                                        style="background-color: var(--col-bad);"
                                        onclick={(_) => {
                                            endPoll({ id: poll.id });
                                        }}
                                    >
                                        <Ban />
                                    </Button>
                                {/if}
                            </CardFooter>
                        </Card>
                    </div>
                {/each}
            {/if}
        </div>
    {/if}
    <PollModal />
</section>

<style>
    .list {
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

    .select {
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

    .poll-text {
        line-height: 0.92;
        hyphens: auto;
        hyphenate-limit-chars: 14 5 5;
        overflow-wrap: break-word;
    }

    .response-indicator {
        display: flex;
    }
</style>
