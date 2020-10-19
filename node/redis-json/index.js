const redis = require("redis");
const client = redis.createClient({
  host: '',
  port: 6381
});

client.on("error", function(error) {
  console.error(error);
});

// client.set("key", "value", redis.print);
// client.get("key", redis.print);

const users = [
  { name: 'tom', sex: 1, tel: '18953136372' },
  { name: 'tom2', sex: 0, tel: '18953136372' },
  { name: 'tom3', sex: 1, tel: '18953136372' },
]

// const userStr = users.map(v => JSON.stringify(v))
const userStr = []
users.forEach(v => {
  userStr.push(v.name, JSON.stringify(v))
})

console.log(userStr)

client.hmset('hmusers', userStr, (log) => {
  client.expire('hmusers', 30)
  redis.print(log)
})