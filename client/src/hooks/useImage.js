import { useEffect, useRef, useState } from "react";
import defauftImage from "../static/image/profile/default-user-image.svg"
import { useUser } from "../context_providers/auth_provider";

const useImage = () => {
    const { user, setUser } = useUser();
    const [image, setImage] = useState(user?.image);
    const profileImageDiv = useRef();

    useEffect(() => {
        if(!user) return

        fetch(`/api/image/profile`, {
            credentials: "include",
        })
            .then(res => {
                if (res.ok) return res.blob();
                else throw Error("Failed to fetch profile image")
            }).then(blob => {
                setUser(state => ({
                    ...state,
                    image: blob
                }))
                setImage(blob)
            }).catch(error => {
                console.log(error)
            });
    }, [])

    useEffect(() => {
        if (!image) {
            profileImageDiv.current.style.backgroundImage = `url(${defauftImage})`;
            return
        }

        console.log(image)

        const fileReader = new FileReader();

        fileReader.onload = () => {
            profileImageDiv.current.style.backgroundImage = `url(${fileReader.result})`;
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    const isImageChanged = image !== user?.image;

    return [image, setImage, profileImageDiv, isImageChanged];
}

export default useImage;