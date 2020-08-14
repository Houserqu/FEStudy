const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

app.use(async function(ctx){
  const url = 'http://9.134.50.131:8083' + ctx.url
  
  console.log(url)
  fs.writeFileSync('./pileServer.log', url, { flag: 'a' }) // 写入到日志文件中去

  ctx.body = {
    ret: 0
  }
})

app.listen(8089, '10.241.133.94', () => {
  console.log(`App listening`)
})