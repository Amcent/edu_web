class MyStorage {
  constructor() {
    this.prefix = 'pro_'
    this.storage = window.localStorage
  }

  set(key, value, exp = 60 * 60 * 24) {
    const timeStamp = Date.now()
    const data = JSON.stringify({ value, exp, timeStamp })
    const prefixKey = this.prefix + key
    this.storage.setItem(prefixKey, data)
  }

  get(key) {
    const prefixKey = this.prefix + key
    let data = this.storage.getItem(prefixKey)

    if (!data) {
      return false
    }

    data = JSON.parse(data)
    const exp = data.exp * 1000
    const timeStamp = data.timeStamp
    const value = data.value
    const dataNow = Date.now()

    if (dataNow > timeStamp + exp) {
      this.delete(data)
      return false
    }

    return value
  }

  delete(key) {
    const prefixKey = this.prefix + key
    this.storage.removeItem(prefixKey)
  }
}

export default MyStorage