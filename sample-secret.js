module.exports = {
  mainRoute: 'host',

  // user routes
  loginRoute: 'route',
  signupRoute: 'route',
  deleteUser: 'route',

  // files routes
  getFiles: 'route',
  postFiles: 'route',
  putFile: 'route',
  deleteFile: 'route',

  // file types
  fileTypes: [
    // image - jpeg, jpg, png
    'image/jpeg', 'image/jpg', 'image/png', 

    // compressed - zip, 7z, rar
    'application/zip', 'application/x-7z-compressed', 'application/x-rar-compressed', 

    // document - pdf, txt, doc, docx
    'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
}