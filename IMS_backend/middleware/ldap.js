const { authenticate } = require('ldap-authentication')


async function auth(userName, password) {
  let options = {
    ldapOpts: {
      url: 'ldap://10.3.108.11:389',
      // tlsOptions: { rejectUnauthorized: false }
    },
    adminDn: 'CN=IT Inventory,OU=Service Accounts,OU=Domain Users,DC=safaricomet,DC=net',
    adminPassword: 'M!%T^vZBJD89WA2W',
    userPassword: password,
    userSearchBase: 'DC=safaricomet,DC=net',
    usernameAttribute: 'sAMAccountName',
    username: userName,
    // starttls: false
  }

  return await authenticate(options);
}

module.exports ={
    auth
}