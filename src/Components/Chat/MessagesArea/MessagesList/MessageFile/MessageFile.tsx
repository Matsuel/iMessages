import React, { useState } from 'react'
import styles from './MessageFile.module.css'
import { FileIcon, defaultStyles } from 'react-file-icon'
import Download from '../../../../../assets/Download.svg'
import { ContextMenuMessage, ContextMenuMessageButton } from '../ContextMenuMessage/ContextMenuMessage'
import { handleContextMenu, downloadFile  } from '../../../../../Functions/Message/Message'
import Image from 'next/image'

const MessageFile = ({ message, userId, i, scrollBottomRef, bottomRounded, topRounded, messagesCount, deleteMessage, showSearchConv }: MessageFileProps) => {

    const [rightClick, setRightClick] = useState<boolean>(false)

    const isReceived = message.sender_id !== userId

    // const fileClass = isReceived ? 'filereceived' : 'filesent'
    const fileClass = isReceived ? styles.filereceived : styles.filesent
    const firstPlan = rightClick ? styles.messagefirstplan : ''
    // const firstPlan = rightClick ? 'messagefirstplan' : ''
    const topClass = isReceived ? (topRounded ? styles.filereceivedtop : styles.filereceivedmiddle) : (topRounded ? styles.filesenttop : styles.filesentmiddle)
    // const topClass = isReceived ? (topRounded ? 'filereceivedtop' : 'filereceivedmiddle') : (topRounded ? 'filesenttop' : 'filesentmiddle');
    const bottomClass = isReceived ? (bottomRounded ? styles.filereceivedbottom : '') : (bottomRounded ? styles.filesentbottom : '');
    // const bottomClass = isReceived ? (bottomRounded ? 'filereceivedbottom' : '') : (bottomRounded ? 'filesentbottom' : '');

    return (
        <>
        {/* Voir si je peux pas gérer la condition directement dans le composant */}
            {rightClick &&
                <ContextMenuMessage setRightClick={setRightClick} showSearchConv={showSearchConv} />
            }

            {/* Composant message file */}
            <div className={styles.fileelement + " " + firstPlan} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)}>
            {/* <div className={`fileelement ${firstPlan}`} ref={i === messagesCount - 1 ? scrollBottomRef : null} onContextMenu={(e) => handleContextMenu(e, setRightClick)}> */}

                {/* <div className={`${fileClass} ${topClass} ${bottomClass}`} key={message._id}> */}
                <div className={fileClass + " " + topClass + " " + bottomClass} key={message._id}>
                    <Image src={Download} alt="Download" className={styles.download} onClick={() => downloadFile(message)} />
                    <p className={styles.filename}>{message.fileName}</p>
                    <div className={styles.fileicon}>
                        <FileIcon extension={message.fileExtension} {...defaultStyles[message.fileExtension as keyof typeof defaultStyles]} />
                    </div>

                </div>

                {/* Voir si je peux pas gérer la condition directement dans le composant */}
                {rightClick &&
                    <ContextMenuMessageButton message={message} userId={userId} deleteMessage={deleteMessage} isReceived={isReceived} />
                }

            </div>
        </>
    )
}

export default MessageFile