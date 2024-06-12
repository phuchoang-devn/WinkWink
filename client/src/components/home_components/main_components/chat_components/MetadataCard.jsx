import { useMemo, useState } from "react";
import { ReactComponent as FakePic } from "../../../../static/image/profile/default-user-image.svg"
import MetadataDropdown from "./MetadataDropdown";
import { ChatAction, useChatDispatch, useChatStore } from "../../../../store/chat/chatStore";

const MetadataCard = (props) => {
    const { metadata, isOnlyAvatar, openChat } = props;

    const chatStore = useChatStore();
    const dispatch = useChatDispatch();
    const [isFocus, setIsFocus] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const displayTime = getDisplayTime(metadata.updatedAt);

    const dropdownOptions = useMemo(() => ([
        {
            name: metadata.isSeen ? "Mark as unread" : "Mark as read",
            action: async () => await dispatch({
                type: ChatAction.IS_SEEN,
                payload: metadata.matchedUserId
            })
        },
        {
            name: "Unmatch user",
            action: () => console.log("unmatched")
        }
    ]), [metadata, dispatch])

    const handleOpenChat = async () => {
        const partner = metadata.matchedUserId;

        if (!chatStore.chats[partner])
            await dispatch({
                type: ChatAction.LOAD_CHAT,
                payload: partner
            })

        openChat(partner);

        if (!chatStore.metadatas[partner].isSeen)
            dispatch({
                type: ChatAction.IS_SEEN,
                payload: partner
            })
    }

    return (
        <div className="metadata-card"
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
            onClick={handleOpenChat}
            style={
                isFocus && !isOnlyAvatar ? {
                    backgroundColor: "rgb(0, 0, 0, 0.15)",
                    cursor: "pointer"
                } : null
            }
        >
            <div className="metadata-right">
                <div className="metadata-pic">
                    <FakePic className="metadata-svg" />
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