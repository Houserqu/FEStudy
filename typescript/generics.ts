// 范型接口
interface User<T> {
  info: T
  name: string
}

interface info {
  age: number
}

// 范型函数
function identity<T, K>(user: T, book: K): T {
  return user
}

const tom: User<info> = {
  info: { age: 18 }, 
  name: 'name'
}

identity(tom, 'book')

// 范型类
class Book<T> {
  user: T

  getInfo: () => T
}

const book = new Book<User<info>>()
book.getInfo()

// 范型约束
function compare<T extends Function>(cb: T): any {
  cb()
}

function getProperty<T extends Object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
