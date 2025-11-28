import {Add} from '@mui/icons-material';
import {Box, IconButton, Typography} from '@mui/material';
import {ConversationList} from "@/components/chat/ConversationList/ConversationList";
import {Conversation} from "@/components/chat/Conversation";
import {useState} from "react";
import {getConversations, getMessagesForConversation} from "@/components/groups/GroupDetailPage/mocks";

const MessagesPage = () => {
  const conversations = getConversations();

  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const messages = getMessagesForConversation(selectedConversation);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending group message:', messageText);
      setMessageText('');
    }
  };

  return (
    <Box sx={{
      maxHeight: {xs: 'calc(100vh - 180px)', md: 'calc(100vh - 110px)'}, // Fix desktop height
      width: '100%',
      maxWidth: {xs: '100vw', md: '100%'},
      overflow: 'hidden',
      overflowY: 'hidden',
      boxSizing: 'border-box',
      p: 0,
      pb: 0, // Explicitly remove bottom padding
      mx: {xs: 0, md: 'auto'},
      backgroundColor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: {xs: '10px 10px 0 10px', md: '0 !important'}, // Remove desktop padding
        mb: {xs: 1, md: 1},
        width: '100%',
        overflow: 'hidden',
        minWidth: 0,
        flexShrink: 0
      }}>
        <Box sx={{flex: 1, minWidth: 0, overflow: 'hidden'}}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: {xs: 0, md: 0},
              fontSize: {xs: '1.5rem', md: '2.125rem'},
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            Messages
          </Typography>
        </Box>
        <IconButton size="large" sx={{color: 'primary.main'}}>
          <Add/>
        </IconButton>
      </Box>
      <Box sx={{
        display: 'flex',
        flex: 1,
        gap: 0,
        overflow: 'hidden',
        minHeight: 0,
        height: '100%' // Ensure this matches parent height
      }}>
        <Box sx={{
          display: 'flex',
          flex: 1,
          gap: 0,
          overflow: 'hidden',
          minHeight: 0,
          height: {md: "calc(100vh - 160px)", xs: "calc(100vh - 190px)"},
        }}>
          <ConversationList conversations={conversations} selectConversation={setSelectedConversation}
                            selectedConversation={selectedConversation}/>

          <Conversation chatName={selectedConv?.name} members={selectedConv?.members} messages={messages}
                        lastActivity={selectedConv?.lastActivity} isGroup={selectedConv?.isGroup}
                        currentMessage={''} onMessageChange={setMessageText} onSendMessage={handleSendMessage}
                        compensationHeight={352} onBack={() => setSelectedConversation("")}/>
        </Box>
      </Box>
    </Box>
  );
};

export default MessagesPage;