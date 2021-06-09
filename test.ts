const mapActions = function<T extends string>(arr: T[]): { [key in T]: Function } {
  return null;
}

// 
const cantInfer = function <Methods>(arr: Methods): Methods {
  return arr;
}

// interface cantInfer {
//   ()
// }

const canInfer = function <Methods>(arr: { [ key in keyof Methods ]: Methods[key] }): Methods {
  return null;
}

const testRes1 = {
  ...mapActions(['aaa', 'bbb'])
}
const testRes2 = cantInfer({
  ...mapActions(['aaa', 'bbb'])
})
const testRes3 = canInfer({
  ...mapActions(['aaa', 'bbb'])
})