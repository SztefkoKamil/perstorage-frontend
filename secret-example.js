// eslint-disable-next-line no-undef
module.exports = {
  mainRoute: '',

  loginRoute: '',
  signupRoute: '',
  deleteUser: '',

  getFiles: '',
  postFiles: '',
  downloadFile: '',
  putFile: '',
  deleteFile: '',

  fileTypes: [
    // image - jpeg, jpg, png
    'image/jpeg', 'image/jpg', 'image/png', 

    // compressed - zip, 7z, rar
    'application/zip', 'application/x-zip-compressed', 'application/x-7z-compressed', 'application/x-rar-compressed', 

    // document - pdf, txt, doc, docx
    'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};