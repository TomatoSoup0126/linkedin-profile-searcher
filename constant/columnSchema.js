const columnSchema = [
  {
    column: 'First Name',
    type: String,
    value: profile => profile.firstName
  },
  {
    column: 'Last Name',
    type: String,
    value: profile => profile.lastName
  },
  {
    column: 'Company',
    type: String,
    value: profile => profile.company
  },
  {
    column: 'Headline',
    type: String,
    value: profile => profile.headline
  },
  {
    column: 'Location',
    type: String,
    value: profile => profile.location
  },
  {
    column: 'Language',
    type: String,
    value: profile => profile.language
  },
  {
    column: 'Public Link',
    type: String,
    value: profile => profile.publicUrl
  },
  {
    column: 'Email',
    type: String,
    value: profile => profile.email
  },
  {
    column: 'PhoneNumbers',
    type: String,
    value: profile => profile.phoneNumbers
  },
  {
    column: 'Address',
    type: String,
    value: profile => profile.address
  },
  {
    column: 'WeChat',
    type: String,
    value: profile => profile.weChatContactIn
  },
  {
    column: 'Twitter',
    type: String,
    value: profile => profile.primaryTwitterH
  }
]

export default columnSchema