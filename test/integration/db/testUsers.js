const users = new Map()

function reloadTestDB () {
  users.clear()

  users.set('6d5a13ca-f689-4529-8c58-be927821a068', {
    'id': '6d5a13ca-f689-4529-8c58-be927821a068',
    'login': 'helloWorld',
    'password': '123456qwerty',
    'age': 25,
    'isDeleted': false
  })

  users.set('c3455a71-417a-4fdb-a33a-52f68d7dd31a', {
    'id': 'c3455a71-417a-4fdb-a33a-52f68d7dd31a',
    'login': 'John',
    'password': '123456qwerty',
    'age': 40,
    'isDeleted': false
  })
}

export default users

export {
  reloadTestDB
}
