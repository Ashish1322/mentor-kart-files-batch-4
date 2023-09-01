const url = require("url")


const data = url.parse("https://mail.google.com/mail?name=ashis&age=20")

console.log(data)


// Url {
//     protocol: 'https:',
//     slashes: true,
//     auth: null,
//     host: 'mail.google.com',
//     port: null,
//     hostname: 'mail.google.com',
//     hash: null,
//     search: '?name=ashis&age=20',
//     query: 'name=ashis&age=20',
//     pathname: '/mail',
//     path: '/mail?name=ashis&age=20',
//     href: 'https://mail.google.com/mail?name=ashis&age=20'
//   }