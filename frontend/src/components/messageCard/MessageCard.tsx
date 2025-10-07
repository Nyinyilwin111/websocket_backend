import { MessageDTO } from "../../redux/message/MessageModel";
import { UserDTO } from "../../redux/auth/AuthModel";
import styles from './MessageCard.module.scss';
import { Chip, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDateFormat } from "../utils/Utils";

interface MessageCardProps {
    message: MessageDTO;
    reqUser: UserDTO | null;
    isNewDate: boolean;
    isGroup: boolean;
}

const MessageCard = (props: MessageCardProps) => {
    const isOwnMessage = props.message.user.id === props.reqUser?.id;
    const date = new Date(props.message.timeStamp);
    const [timeString, setTimeString] = useState("");

    const getRelativeTime = (date: Date): string => {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return "Just now";
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
        return getDateFormat(date);
    };

    useEffect(() => {
        const update = () => setTimeString(getRelativeTime(date));
        update();
        const interval = setInterval(update, 30 * 1000);
        return () => clearInterval(interval);
    }, [date]);

    const user = props.message.user;
    const avatarLetter = user.fullName ? user.fullName.charAt(0).toUpperCase() : "?";

    const label = (
        <div className={styles.bubbleContainer}>
            {props.isGroup && !isOwnMessage && (
                <h4 className={styles.senderName}>{user.fullName}</h4>
            )}
            <p className={styles.contentContainer}>{props.message.content}</p>
            <p className={styles.timeContainer}>{timeString}</p>
        </div>
    );

    const dateLabel = <p>{getDateFormat(date)}</p>;

    return (
        <div className={styles.messageCardInnerContainer}>
            {props.isNewDate && (
                <div className={styles.date}>
                    <Chip
                        label={dateLabel}
                        sx={{
                            height: "auto",
                            width: "auto",
                            backgroundColor: "#faebd7"
                        }}
                    />
                </div>
            )}

            <div
                className={`${styles.messageRow} ${
                    isOwnMessage ? styles.ownRow : styles.otherRow
                }`}
            >
                {/* Avatar Left for Others */}
                {!isOwnMessage && (
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            mr: 1,
                            bgcolor: "#90caf9",
                            color: "#fff",
                            fontWeight: 600,
                        }}
                    >
                        {avatarLetter}
                    </Avatar>
                )}

                <div className={isOwnMessage ? styles.ownMessage : styles.othersMessage}>
                    <Chip
                        label={label}
                        sx={{
                            height: "auto",
                            width: "auto",
                            backgroundColor: isOwnMessage ? "#d3fdd3" : "white",
                            ml: "0.75rem"
                        }}
                    />
                </div>

                {/* Avatar Right for Own Messages */}
                {isOwnMessage && (
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            ml: 1,
                            bgcolor: "#81c784",
                            color: "#fff",
                            fontWeight: 600,
                        }}
                    >
                        {avatarLetter}
                    </Avatar>
                )}
            </div>
        </div>
    );
};

export default MessageCard;
