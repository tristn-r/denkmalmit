import { createContext } from "svelte";

interface Modal {
    get isOpen(): boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export const [getModalContext, setModalContext] = createContext<Modal>();
