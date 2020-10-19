function setName(name: string) {
  return function(target, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log(propertyKey)
    console.log(target)
    console.log(descriptor)

    // descriptor.name = 
  }
}

class Person {
  private name: string

  constructor(name) {
    this.name = name
  }

  @setName('newTom')
  sayName() {
    console.log(this.name)
  }
}

const xtom = new Person('tom')
xtom.sayName()