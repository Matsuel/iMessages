import React from 'react'
import "./ConversationsTypes.css"

interface ConversationsTypesProps {
    setTypeConv: Function,
    typeConv: number
}

interface ConversationsTypeProps {
    setTypeConv: Function,
    typeConv: number,
    name: string,
    type: number
}

const ConversationsTypes = ({ setTypeConv, typeConv }: ConversationsTypesProps) => {

    const conversationsTypes = [
        { name: 'Conversations', type: 1 },
        { name: 'Groupes', type: 2 },
        { name: 'Contacts', type: 3 }
    ]

    return (
        <div className="convstype">
            {conversationsTypes.map((convType, index) => (
                <ConversationsType key={index} setTypeConv={setTypeConv} typeConv={typeConv} name={convType.name} type={convType.type} />
            ))}
        </div>
    )
}

const ConversationsType = ({ setTypeConv, typeConv, name, type }: ConversationsTypeProps) => {
    return (
        <div className={`convtype ${typeConv === type ? 'convtypeActive' : ''}`} onClick={() => setTypeConv(type)}>
            {name}
        </div>
    )
}

export default ConversationsTypes