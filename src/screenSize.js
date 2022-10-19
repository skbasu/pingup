import { useState, useEffect } from "react";

const WindowSize = () => {
    const [size, setSize] = useState([window.innerHeight, window.innerWidth]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setSize([window.innerHeight, window.innerWidth])
        })

        return () => {
            window.removeEventListener("resize", () => {
                setSize([window.innerHeight, window.innerWidth])
            })
        }
    }, []);

    return size;
}

export default WindowSize;