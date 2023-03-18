import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styles from "./Popup.module.css";

let setTitleFn;
let setContentsFn;

function updatePopup(title, contents) {
    setTitleFn(title);
    setContentsFn(contents);
}

export default function Popup() {
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");

    useEffect(() => {
        setTitleFn = setTitle;
        setContentsFn = setContents;
    }, [setTitle, setContents]);

    return (
        <>
            <dialog id='popup'>
                <div id='popup-wrapper' className={styles.wrapper}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {typeof contents === "string" && <p className={styles.paragraph}>{contents}</p>}
                    {Array.isArray(contents) &&
                        contents.map((paragraph, index) => (
                            <p className={styles.paragraph} key={index}>
                                {paragraph}
                            </p>
                        ))}
                </div>
            </dialog>
        </>
    );
}

export function usePopup(title, contents) {
    const popupRef = useRef();
    const popupWrapperRef = useRef();

    useEffect(() => {
        popupRef.current = document.getElementById("popup");
        popupWrapperRef.current = document.getElementById("popup-wrapper");
        updatePopup(title, contents);
    }, []);

    function eventHandler(e) {
        if (!popupWrapperRef.current.contains(e.target)) {
            hide();
        }
    }

    function show() {
        popupRef.current.showModal();
        popupRef.current.addEventListener("click", eventHandler);
    }

    function hide() {
        popupRef.current.close();
        popupRef.current.removeEventListener("click", eventHandler);
    }

    return { show, hide };
}
