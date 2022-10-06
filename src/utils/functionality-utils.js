function createIdCounter() {
  let count = 0
  return function generateId(reset) {
    if (reset) count = 0
    return ++count
  }
}

export { createIdCounter }
