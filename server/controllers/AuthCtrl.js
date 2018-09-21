const axios = require('axios')

module.exports = {
  auth: async (req, res) => {
    console.log('getting here yooooo')
    let { code } = req.query

    try {

    let payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    console.log(req.headers.host)

    let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`

    let accessTokenResponse = await axios.post(`${auth0domain}/oauth/token`, payload)
    let accessToken = accessTokenResponse.data.access_token
    let userInfoResponse = await axios.get(`${auth0domain}/userinfo?access_token=${accessToken}`)
    let userInfo = userInfoResponse.data

    let db = req.app.get('db')
    let users = await db.find_healthworker_by_auth_id(userInfo.sub)
    console.log('users',users)
    console.log('sub', userInfo.sub)

    if(users.length){
      console.log(1111111111)
      req.session.user = users[0]
      res.redirect('http://localhost:3000/#dashboard')
    } else {
      console.log(12233234324)
      let users = await db.create_admin(userInfo)
      req.session.user = users[0]
      res.redirect('/')
    }

    //check to see if they already exist on database and put them on session
    } catch(error) {
      console.log('we have a problem', error)
      res.redirect('/error')
    }
  }
}