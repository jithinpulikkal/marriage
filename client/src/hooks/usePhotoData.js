import { useEffect, useState } from "react";
import { fetchPhotos, hasAnyImages } from "../utils/photos.js";

export default function usePhotoData() {
    const [state, setState] = useState({
        status: "loading",
        groups: [],
        message: ""
    });

    useEffect(() => {
        let isActive = true;

        async function loadPhotos() {
            try {
                const groups = await fetchPhotos();
                if (isActive) {
                    setState({
                        status: hasAnyImages(groups) ? "ready" : "empty",
                        groups,
                        message: ""
                    });
                }
            } catch (error) {
                if (isActive) {
                    setState({
                        status: "error",
                        groups: [],
                        message: error.message
                    });
                }
            }
        }

        loadPhotos();

        return () => {
            isActive = false;
        };
    }, []);

    return state;
}
