import { useEffect, useRef, useState } from "react"

const useDropdownStatus = () => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null); 

    const toggleDropdown = () => {
        setIsOpen(io => !io);
    };

    useEffect(() => {
        if(!isOpen) return;

        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleDropdown();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, ref])

    return [isOpen, toggleDropdown, ref];
}

export default useDropdownStatus;