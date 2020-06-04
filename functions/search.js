const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const res = await cloudinary.search
    .expression(body.expression)
    .execute().then(result => result);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(res)
  }
}