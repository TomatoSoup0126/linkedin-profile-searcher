import { Client } from 'linkedin-private-api';
import writeXlsxFile from 'write-excel-file/node';
import dotenv from 'dotenv';
import columnSchema  from './constant/columnSchema.js';

dotenv.config();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const keyword = 'cell therapy';

(async () => {
  // Login
  const client = new Client();
  await client.login.userPass({ username, password });
  
  // Search for profiles 
  const peopleScroller = await client.search.searchPeople({
    keywords: keyword,
    limit: 30
  });
  const list = await peopleScroller.scrollNext();

  Promise.all(list.map((item, index) => {
    return new Promise(async (resolve, reject) => {
      const encodedPublicIdentifier = encodeURIComponent(item.profile.publicIdentifier);
      const fullProfile = await client.profile.getProfile({ publicIdentifier: encodedPublicIdentifier });
      const contactInfo = await client.profile.getContactInfo({ publicIdentifier: encodedPublicIdentifier });
      resolve({
        location: fullProfile?.location?.countryCode || '',
        firstName: fullProfile?.firstName || '',
        lastName: fullProfile?.lastName || '',
        language: fullProfile?.supportedLocales?.language || '',
        headline: fullProfile?.headline || '',
        publicUrl: `https://www.linkedin.com/in/${fullProfile?.publicIdentifier}` || '',
        company: fullProfile?.company?.name || '',
        email: contactInfo?.email || '',
        phoneNumbers: contactInfo?.phoneNumbers || '',
        address: contactInfo?.address || '',
        weChatContactInfo: contactInfo?.weChatContactInfo || '',
        primaryTwitterHandle: contactInfo?.primaryTwitterHandle || ''
      })
    })
  })).then(data => {
    writeXlsxFile(data, {
      schema: columnSchema,
      filePath: `./file/${keyword}.xlsx`
    }).then(() => {
      console.log('Excel file written successfully!');
    });
  })
})();