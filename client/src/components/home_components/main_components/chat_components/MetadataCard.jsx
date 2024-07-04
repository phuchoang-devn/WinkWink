import { useMemo, useState } from "react";
import { ReactComponent as FakePic } from "../../../../static/image/profile/default-user-image.svg"
import MetadataDropdown from "./MetadataDropdown";
import { ChatAction } from "../../../../store/chat/chatSlice";
import { useAppDispatch, useAppStore } from "../../../../store";

const MetadataCard = (props) => {
    const { metadata, isOnlyAvatar, openChat } = props;

    const { chatStore } = useAppStore();
    const { chatDispatch } = useAppDispatch();
    const [isFocus, setIsFocus] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const displayTime = getDisplayTime(metadata.updatedAt);

    const dropdownOptions = useMemo(() => ([
        {
            name: metadata.isSeen ? "Mark as unread" : "Mark as read",
            action: async () => await chatDispatch({
                type: ChatAction.IS_SEEN,
                payload: metadata.matchedUserId
            })
        },
        !metadata.isUnmatched && {
            name: "Unmatch",
            action: async () => await chatDispatch({
                type: ChatAction.UNMATCH,
                payload: metadata.matchedUserId
            })
        }
    ]), [metadata, chatDispatch])

    const handleOpenChat = async () => {
        const partner = metadata.matchedUserId;

        if (metadata.total !== 0 && !metadata.firstFetch)
            await chatDispatch({
                type: ChatAction.LOAD_CHAT,
                payload: partner
            })

        openChat(partner);

        if (!metadata.isSeen)
            chatDispatch({
                type: ChatAction.IS_SEEN,
                payload: partner
            })
    }

    return (
        <div className="metadata-card noselect"
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
            onClick={isOnlyAvatar ? () => null : handleOpenChat}
            style={
                isFocus && !isOnlyAvatar ? {
                    backgroundColor: "rgba(200, 71, 79, 0.60)",
                    cursor: "pointer"
                } : null
            }
        >
            <div className="metadata-left">
                <div className="metadata-pic"
                    onClick={isOnlyAvatar ? handleOpenChat : () => null}
                >
                    <div className="notify-ring"
                        style={{
                            border: metadata.isSeen ? "unset" : "2px solid var(--colorPink)"
                        }}
                    ></div>
                    {
                        metadata.image ?
                            <img src={metadata.image} alt={metadata.matchedUserName} />
                            : <FakePic className="metadata-svg" />
                    }
                </div>

                <div className="metadata-middle">
                    <div className="metadata-name"
                        style={{
                            fontWeight: metadata.isSeen ? "unset" : "bolder"
                        }}
                    >
                        {metadata.matchedUserName}
                    </div>
                    <div className="metadata-message"
                        style={{
                            fontWeight: metadata.isSeen ? "unset" : "bolder"
                        }}
                    >
                        {metadata.lastMessage}
                    </div>
                </div>
            </div>

            {
                (isDropdownOpen || isFocus) && !isOnlyAvatar ?
                    <MetadataDropdown options={dropdownOptions} setOpen={setIsDropdownOpen} />
                    : <div className="metadata-time"
                        style={{
                            fontWeight: metadata.isSeen ? "unset" : "bolder"
                        }}
                    >
                        {displayTime}
                    </div>
            }
        </div>
    )
}

const getDisplayTime = (time) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pastTime = new Date(time);
    const currentTime = new Date();

    const isToday = pastTime.getFullYear() === currentTime.getFullYear()
        && pastTime.getMonth() === currentTime.getMonth()
        && pastTime.getDate() === currentTime.getDate();

    const modifyNum = (number) => {
        return number < 10 ? `0${number}` : number;
    }

    if (isToday)
        return `${modifyNum(pastTime.getUTCHours())}:${modifyNum(pastTime.getUTCMinutes())}`
    else return `${months[pastTime.getUTCMonth()]} ${pastTime.getUTCDate()}\n${pastTime.getUTCFullYear()}`
}

export default MetadataCard