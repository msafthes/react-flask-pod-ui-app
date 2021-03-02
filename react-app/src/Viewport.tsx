import React, { createContext, useContext, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';


const ViewportContext: any = createContext({});

export const ViewportProvider = ({ children }) => {
    // breakpoints 600px, 900px, 1200px will be reflect in CSS as well
    const isPhone = () => window.innerWidth < 600;
    const isTabletPortrait = () => window.innerWidth >= 600 && window.innerWidth < 900;
    const isTabletLandscape = () => window.innerWidth >= 900 && window.innerWidth && window.innerWidth < 1200;
    const isDesktop = () => window.innerWidth >= 1200;

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [phone, setPhone] = useState(isPhone());
    const [tabletPortrait, setTabletPortrait] = useState(isTabletPortrait());
    const [tabletLandscape, setTabletLandscape] = useState(isTabletLandscape());
    const [desktop, setDesktop] = useState(isDesktop());
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        setPhone(isPhone());
        setTabletPortrait(isTabletPortrait());
        setTabletLandscape(isTabletLandscape());
        setDesktop(isDesktop());
    };

    useEffect(() => {
        window.addEventListener(
            "resize",
            throttle(() => {
                handleWindowResize();
            }, 200)
        );
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    return (
        <ViewportContext.Provider value={{ width, height, phone, tabletPortrait, tabletLandscape, desktop }}>
            {children}
        </ViewportContext.Provider>
    );
};

export const useViewport = () => {
    const { width, height, phone, tabletPortrait, tabletLandscape, desktop } = useContext(ViewportContext);
    return { width, height, phone, tabletPortrait, tabletLandscape, desktop };
};
