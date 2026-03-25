import { Fragment, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { getPortalSnapshot, subscribePortalStore } from './portalStore';

const PortalHost = () => {
    const portals = useSyncExternalStore(subscribePortalStore, getPortalSnapshot, getPortalSnapshot);

    return <Fragment>{portals.map((portal) => createPortal(portal.element, portal.container, portal.key))}</Fragment>;
};

export default PortalHost;
