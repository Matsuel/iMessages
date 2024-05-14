import React, { useState } from 'react'
import styles from './Conversation.module.scss'
import DoubleChevrons from '@/assets/DoubleChevrons.svg'
import Image from 'next/image'
import { socket } from '@/pages/_app'


interface ConversationInfosProps {
    _id: string,
    name: string,
    last_message_sender: string,
    last_message_content: string,
    userId: string,
    handleConversationActive: Function
}

const ConversationInfos = ({
    _id,
    name,
    last_message_sender,
    last_message_content,
    userId,
    handleConversationActive
}: ConversationInfosProps) => {

    const [typingStatus, setTypingStatus] = useState({})

    socket.on('typing', (data) => {
        const prev = typingStatus
        setTypingStatus(() => {
            return {
                ...prev,
                [data.conversationId]: data.typing
            }
        })
    })
    
    return (
        <div
            className={styles.conversationinfos}
            onClick={() => handleConversationActive(_id)}
        >
            {/* Voir si j'ai pas besoin de créer un composant pour afficher le nom ailleurs */}
            <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
            {/* Composant pour afficher le dernier message ou le statut de la conversation */}
            <div>
                {
                    typingStatus[_id as keyof typeof typingStatus] ?
                        "Est en train d'écrire" :
                        <>
                            {
                                last_message_sender !== userId &&
                                <Image src={DoubleChevrons} alt="doublechevrons" />
                            }
                            {
                                last_message_content && last_message_content.length > 20 ?
                                    last_message_content.slice(0, 20) + "..." :
                                    last_message_content
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default ConversationInfos