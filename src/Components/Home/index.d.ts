
interface ConversationInfos {
    _id: string,
    users_id: string[],
    name: string,
    pic: string,
    status:boolean,
    pinnedBy: Array<string>,
    topRounded: boolean,
    bottomRounded: boolean,
    last_message_date: string,
    last_message_content: string,
    last_message_sender: string
}

interface UserInfos {
    pic: string,
    username: string,
    _id: string,
}

interface message {
    _id: string,
    conversation_id: string,
    content: string,
    sender_id: string,
    date: string,
    type: string,
    fileName: string,
    fileExtension: string,
    fileContent: Buffer | ArrayBuffer,
    fileType: string,
    reactions: Array<{ 
        user_id: string,
        reaction: string
    }>
}

interface conversation {
    conversationInfos: ConversationInfos,
    messages: message[]
}

interface User {
    pic:string,
    userId: string,
    username: string,
    email: string,
    password: string
}

interface BottomBarProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    typingStatus: Object,
    name: string,
    filesEmpty: boolean,
    setFilesEmpty: Function,
    files: FileInfos[],
    setFiles: Function,
}

interface TopBarProps {
    name: string,
    pic: string,
    status: boolean,
    handleSearchConv: Function,
    showSearchConv: boolean,
}

interface MessagesAreaProps {
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean,
    messagesCount: number,
    messages: message[],
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
}

interface MessageProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
    handleReaction: Function,
}

interface MessageDateProps {
    message: message
}

interface FileInfos {
    name: string,
    content: string | ArrayBuffer | null,
    type: string,
    lastModified: number,
    extension: string
}

interface MessageFileProps {
    message: message,
    userId: string,
    i: number,
    scrollBottomRef: any,
    topRounded: boolean,
    bottomRounded: boolean,
    messagesCount: number,
    deleteMessage: Function,
    showSearchConv: boolean,
}

interface EmojiPickerProps {
    unified: string,
}

interface IsTypingProps {
    conversationActive: string,
    typingStatus: Object,
    name: string,
}

interface FilesListProps {
    files: FileInfos[],
    setFiles: Function,
    setFilesEmpty: Function,
}

interface FileProps {
    file: FileInfos,
    index: number,
    setFiles: Function,
    files: FileInfos[],
    setFilesEmpty: Function,
}

interface BottombarProps {
    conversationActive: string,
    message: string,
    handleMessageChange: Function,
    sendMessage: Function,
    files: FileInfos[],
    setFiles: Function,
    setFilesEmpty: Function,
}

interface MessagesListProps {
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean,
    messages: message[],
    messagesCount: number,
    deleteMessage: Function,
    handleReaction: Function,
}

interface ChatProps {
    conversationActive: string,
    conversationInfos: {
        name: string,
        pic: string,
        status: boolean
    },
    messages: any[],
    userId: string,
    scrollBottomRef: any,
    showSearchConv: boolean,
    handleSearchConv: (e: React.ChangeEvent<HTMLInputElement>) => void,
    message: string,
    handleMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    sendMessage: Function,
    typingStatus: {},
    filesEmpty: boolean,
    deleteMessage: Function,
    handleReaction: Function,
    files: any[],
    setFiles: (files: any[]) => void,
    setFilesEmpty: (filesEmpty: boolean) => void,
    showFullSidebar: boolean,
}

interface ConversationListProps {
    conversations: ConversationInfos[],
    conversationActive: string,
    handleConversationActive: Function,
    handleHoverConv: Function,
    handleHoverConvReset: MouseEventHandler<HTMLDivElement>,
    search: string,
    typingStatus: {},
    handlePinnedConversation: Function,
    userId: string,
    typeConv: number,
    hasMatchingConversations: boolean,
    showFullSidebar: boolean,
    setShowFullSidebar: Function,
    handleNewConv: Function,
    setSearch: Function,
    setHasMatchingConversations: Function,
    showNewConv: boolean
}

interface ConversationProps {
    conversation: ConversationInfos,
    handleConversationActive: Function,
    handleHoverConv: Function,
    handleHoverConvReset: MouseEventHandler<HTMLDivElement>,
    typingStatus: {},
    handlePinnedConversation: Function,
    userId: string
    classActive: string,
    noConvActiveClass: string,
    showFullSidebar: boolean
}

interface ConversationStatusProps {
    _id: string,
    pic: string,
    status: boolean,
    handleConversationActive: Function
}

interface ConversationInfosProps {
    _id: string,
    name: string,
    last_message_sender: string,
    last_message_content: string,
    typingStatus: {},
    userId: string,
    handleConversationActive: Function
}

interface NewConversationProps {
    canRotate: boolean,
    handleNewConv: Function,
    showNewConv: boolean,
    setShowNewConv: Function,
    users: UserInfos[],
    searchUsers: string,
    handleSearchUsers: ChangeEventHandler<HTMLInputElement>,
    createConversation: Function,
    clickAwayEffect: boolean,
    setClickAwayEffect: Function
}

interface NewConversationModalProps {
    showNewConv: boolean,
    setShowNewConv: Function,
    users: UserInfos[],
    searchUsers: string,
    handleSearchUsers: ChangeEventHandler<HTMLInputElement>,
    createConversation: Function,
    clickAwayEffect: boolean,
    setClickAwayEffect: Function
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.gif' {
    const content: any;
    export default content;
}