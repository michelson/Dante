
const config = {
  publicUrl: process.env.PUBLIC_URL ? '/dante2/' : '/',
  uploadUrl: process.env.NODE_ENV === 'production' ? 'https://dante-uploader.herokuapp.com/upload' : 'http://localhost:4000/upload'
}


export default config