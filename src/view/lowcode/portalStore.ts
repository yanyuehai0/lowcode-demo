import type { ReactElement } from 'react';

type PortalEntry = {
    container: Element | DocumentFragment;
    element: ReactElement;
    key: string;
};

const portalMap = new Map<Element | DocumentFragment, PortalEntry>();
const listeners = new Set<() => void>();
let notifyScheduled = false;
let snapshot: PortalEntry[] = [];

function updateSnapshot() {
    snapshot = Array.from(portalMap.values());
}

function emitChange() {
    if (notifyScheduled) {
        return;
    }

    notifyScheduled = true;

    queueMicrotask(() => {
        notifyScheduled = false;
        listeners.forEach((listener) => listener());
    });
}

export function renderPortal(element: ReactElement, container: Element | DocumentFragment) {
    const existing = portalMap.get(container);

    portalMap.set(container, {
        container,
        element,
        key: existing?.key ?? `portal-${portalMap.size + 1}`,
    });
    updateSnapshot();
    emitChange();
}

export function unmountPortal(container: Element | DocumentFragment) {
    if (!portalMap.has(container)) {
        return false;
    }

    portalMap.delete(container);
    updateSnapshot();
    emitChange();
    return true;
}

export function subscribePortalStore(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function getPortalSnapshot() {
    return snapshot;
}
