// Simple test to verify me contact creation
import { dataService } from './src/services/dataService.ts';

async function testContacts() {
  try {
    console.log('🧪 Testing contact creation...');
    const contacts = await dataService.getContacts();
    console.log(`📊 Total contacts: ${contacts.length}`);
    console.log(`👤 Me contacts: ${contacts.filter(c => c.isMe).length}`);
    
    const meContact = contacts.find(c => c.isMe);
    if (meContact) {
      console.log('✅ Me contact found:', {
        id: meContact['@id'],
        isMe: meContact.isMe,
        name: meContact.name?.[0]?.value
      });
    } else {
      console.log('❌ No me contact found!');
    }
    
    console.log('🆔 All contact IDs:', contacts.map(c => c['@id']));
  } catch (error) {
    console.error('❌ Error testing contacts:', error);
  }
}

testContacts();