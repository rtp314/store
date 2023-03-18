import React from "react";
import { useRef, useEffect } from "react";
import "./Toast.css";

export default function Toast({ message, delay = 4000 }) {
    const toast = useRef();
    const savedMessages = {
        success: "Thank you for your purchase. An email will be sent to you shortly to confirm.",
        cancel: "We are sorry that you were unable to complete your purchase. Please try again or contact us at the links below.",
    };

    function hideToast() {
        toast.current.classList.add("toast-inner-hide");
        toast.current.classList.remove("toast-inner-show");
    }

    function showToast() {
        toast.current.classList.remove("toast-inner-hide");
        toast.current.classList.add("toast-inner-show");
    }

    useEffect(() => {
        if (savedMessages.hasOwnProperty(message)) {
            showToast();
            const options = { once: true };
            toast.current.addEventListener("click", hideToast, options);
            setTimeout(() => {
                hideToast();
            }, delay);
            return toast.current.removeEventListener("click", hideToast, options);
        }
    }, [message]);

    return (
        <div className='toast'>
            <div ref={toast} className='toast-inner toast-inner-hide'>
                {savedMessages.hasOwnProperty(message) && savedMessages[message]}
            </div>
        </div>
    );
}

function useToast(message) {}
