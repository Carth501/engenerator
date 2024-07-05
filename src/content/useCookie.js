import { useEffect, useState } from "react";

export const useCookie = (cookieName) => {
    const [cookieValue, setCookieValue] = useState("");

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${cookieName}=`));

        setCookieValue(cookie ? cookie.split("=")[1] : "");
    }, [cookieName]);

    const setCookie = (value) => {
        document.cookie = `${cookieName}=${value}; path=/`;
    };

    return [cookieValue, setCookie];
};
