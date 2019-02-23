// Build a reacitvity system

let data = { price: 5, quantity: 2 };
let target, total, salePrice;

class Dep {
  constructor() {
    this.subscribers = [];
    console.log(this.subscribers);
  }

  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }

}

Object.keys(data).forEach(key => {
  console.log("key: ", key);
  let internalValue = data[key]
  console.log("internalValue: ", internalValue);
  const dep = new Dep()

  Object.defineProperty(data, key, {
    get() {
      dep.depend()
      return internalValue;
    },
    set(newVal) {
      internalValue = newVal
      dep.notify()
    }
  })
})

function watcher (myFunc) {
  console.log("target", target);
  target = myFunc;
  console.log("myFunc", myFunc);
  target()
  console.log(target());
  target = null;
}

watcher( () => {
  total = data.price * data.quantity
})

watcher( () => {
  salePrice = data.price * 0.9
})
