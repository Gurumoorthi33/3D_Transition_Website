"use client";

import { useEffect } from "react";

export const ScrollLocker = ({ locked }: { locked: boolean }) => {
    useEffect(() => {
        if (locked) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [locked]);

    return null;
};
