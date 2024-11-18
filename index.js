// for connecting with mysql via ssh

const express = require('express')
const app = express()
const port = 8080
// const { Database } = require('./connect')
const { Database } = require('./local-connect')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', async (req, res) => {
  try {
    let db = new Database();
    console.log("establishing connection...")
    db.runQuery("select * from tbl_login");
    setTimeout(() => {
      console.log("timeout finished");
      console.log("db", db.queryResult);
      let result = {
        username: db.queryResult[0].login_username,
        password: db.queryResult[0].login_password
      }
      res.send(JSON.stringify(result));
    }, 5000);


    // let timeoutPromise = new Promise((resolve, reject) => {
    //   let wait = setTimeout(() => {
    //     // clearTimeout(wait);
    //     // if (result === null) {
    //       console.log('Query Timeout');
    //       reject("ERROR.INTERNAL_SERVER_ERROR");
    //     // }
    //   }, 5000)
    // })

    // let result = await Promise.race([
    //   db.runQuery("select * from tbl_login"),
    //   timeoutPromise
    // ])

    // console.log("queryResult", result);
    // res.send(JSON.stringify(result));
  } catch (e) {
    console.log(e);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})