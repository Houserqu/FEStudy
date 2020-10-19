const { sqlProxy } = require('./sqlProxy')

async function main() {
  const res = await sqlProxy({
    request: { 
      body: {
        sql: 'select * from t_offer_rp where fofferid = ?',
        values: '1450016120',
        db: 'jfrpProduct'
      },
    },
    response: {
      status: 200
    }
  })

  console.log(res)
}

main()

// nginx 会拦截 sql 语句，防止注入
//routerObj.post('/sqlProxy', async function(ctx, next){
//  if(ipList.indexOf(ctx.request.headers['x-real-ip']) == -1){
//    ctx.response.status = 403
//    ctx.body = 'ip Forbidden'
//    return
//  }
//  ctx.body = await sqlProxy(ctx)
//})