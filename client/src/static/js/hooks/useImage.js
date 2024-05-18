import { useEffect, useRef, useState } from "react";
import defauftImage from "../../image/profile/default-user-image.svg"

const useImage = (imageData) => {
    const [image, setImage] = useState(imageData);
    const profileImageDiv = useRef();

    useEffect(() => {
        if(!image) {
            profileImageDiv.current.style.backgroundImage = `url(${defauftImage})`;
            return
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            profileImageDiv.current.style.backgroundImage = `url(${fileReader.result})`;
        };
        fileReader.readAsDataURL(image);
    }, [image]);

    const isImageChanged = image !== imageData;

    return [image, setImage, profileImageDiv, isImageChanged];
}

export default useImage;