// USING PROXIES

let data = { price: 5, quantity: 2 };
let target = null;

// Our Dep class
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

let deps = new Map();

// Go through each of our data properties.
Object.keys(data).forEach(key => {
  dep.set(key, new Dep())
})

let dataWithoutProxy = data;

data = new Proxy(dataWithoutProxy, {
  get(obj, key) {
    deps.get(key).depend();
    return obj[key];
  },
  set(obj,key, newVal) {
    obj[key] = newVal;
    deps.get(key).notify();
    return true;
  }
});

// The code to watch to listen for reactive properties
function watcher (myFunc) {
  target = myFunc;
  target()
  target = null;
}

let total = 0;

watcher( () => {
  total = data.price * data.quantity
})

console.log("total = " + total);
data.price = 20
console.log("total = " + total);
data.price = 10
console.log("total = " + total);
