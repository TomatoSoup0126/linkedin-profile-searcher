import { Client } from 'linkedin-private-api';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({ username, password });
  
  // Search for profiles 
  const peopleScroller = await client.search.searchPeople({
    keywords: 'Nick Lin'
  });
  const list = await peopleScroller.scrollNext();

  list.forEach(async (item, index) => {
    const fullProfile = await client.profile.getProfile({ publicIdentifier: item.profile.publicIdentifier });
    const contactInfo = await client.profile.getContactInfo({ publicIdentifier: item.profile.publicIdentifier });

    const exportProfile = {
      location: fullProfile.location.countryCode,
      firstName: fullProfile.firstName,
      lastName: fullProfile.lastName,
      language: fullProfile.supportedLocales.language,
      headline: fullProfile.headline,
      publicUrl: `https://www.linkedin.com/in/${fullProfile.publicIdentifier}`,
      company: fullProfile.company?.name,
      email: contactInfo.email,
      phoneNumbers: contactInfo.phoneNumbers,
      address: contactInfo.address,
      weChatContactInfo: contactInfo.weChatContactInfo,
      primaryTwitterHandle: contactInfo.primaryTwitterHandle
    }
    console.log(`${index} contactInfo:`, exportProfile)
  })

})();