import "./styles/dropdown.scss"
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Option } from "../../../../static/image/chat/option-circle.svg"
import useDropdownStatus from '../../../../hooks/useDropdown';
import { useEffect } from "react";


const MetadataDropdown = ({ options, setOpen }) => {
    const [isOpen, toggleDropdown, dropdownContentRef] = useDropdownStatus();

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen, setOpen])

    const handleOptionClick = (action) => async () => {
        toggleDropdown();
        await action();
    }

    return (
        <div className="dropdown__container" onClick={e => e.stopPropagation()}>
            <button type="button" className="dropdown__button"
                onClick={toggleDropdown}
            >
                <Option className="dropdown__icon" />
            </button>

            {isOpen &&
                <div className="dropdown__content"
                    ref={dropdownContentRef}>
                    {
                        options.map(option => (
                            <div key={uuidv4()}
                                className="dropdown__option"
                                onMouseDown={handleOptionClick(option.action)}
                            >
                                {option.name}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )

}

export default MetadataDropdown;