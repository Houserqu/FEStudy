const mysql = require('mysql');

const jfrpProductPool = mysql.createPool({
  host: 'localhost',
  database: 'jfrp',
  user: 'root',
  password: 'root',
  port: 3306
});

const query = function(pool, queryOptions, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);

      if(!connection) {
        reject('获取数据库连接失败')
      }

      connection.query(queryOptions, values, function (error, results) {
        connection.release();

        if (error) reject(error)

        resolve(results)
      });
    });
  })
}

const sqlProxy = async function(ctx) {
  const pool = {
    jfrpProduct: jfrpProductPool
  }

  const body = ctx.request.body

  if(Object.keys(pool).indexOf(body.db) === -1) {
    ctx.response.status = 400;
    return '缺少数据库参数'
  }

  if(!body.sql) {
    ctx.response.status = 400;
    return 'sql 不能为空'
  }

  let values = body.values ? body.values.split(',') : []
  
  try {
    return await query(pool[body.db], body.sql, values)
  } catch (error) {
    return error
  } 
}

module.exports = {
  sqlProxy
}