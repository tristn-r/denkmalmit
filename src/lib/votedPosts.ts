import { writable } from "svelte/store";
import { browser } from "$app/env";

type VoteMap = {
    [key: number]: number;
};

let initial: VoteMap = browser ? JSON.parse(localStorage.getItem("votes") ?? "{}") : {};

export const votedPosts = writable(initial);

if (browser)
    votedPosts.subscribe((value) => {
        localStorage.setItem("votes", JSON.stringify(value));
    });
