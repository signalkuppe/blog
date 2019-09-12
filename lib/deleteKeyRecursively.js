const deleteKeyRecursively = (obj, keyToDelete) => {
  for (key in obj) {
    if (key === keyToDelete) {
      delete obj[key]
    } else if (typeof obj[key] === 'object') {
      deleteKeyRecursively(obj[key], keyToDelete)
    }
  }
}

module.exports = deleteKeyRecursively