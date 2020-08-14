import {User} from './types/index'

// some thing
const user: User = {
  name: '1',
}
console.log(user)

// function good(x: number): number {
//   return 1
// }

// function good(x: string, y: number): string {
//   return 'a'
// }

const book: any = {
  info: {
    title: '123',
    age: 0
  },
  data: 0
}

console.log(book.data?.age.name)