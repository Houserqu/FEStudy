const _ = require('lodash')

const obj = [
  {
    name: '1',
    children: [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
    ]
  },
  {
    name: '2',
    children: [
      { name: 'd' },
      { name: 'e' },
      { name: 'f' },
    ]
  }
]

const res = _.find(obj, { name: '1' })
res.children.push({name: 'x'})
res.children[0] = {name: 'h'}
_.remove(res.children, {name: 'b'})

console.log(obj[0])