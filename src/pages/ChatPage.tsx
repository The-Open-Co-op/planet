import { useParams } from 'react-router-dom';
import { ConversationList } from '@/components/chat/ConversationList';
import { ChatView } from '@/components/chat/ChatView';

const ChatPage = () => {
  const { contactId } = useParams<{ contactId: string }>();

  if (contactId) {
    return <ChatView contactId={contactId} />;
  }

  return <ConversationList />;
};

export default ChatPage;
