import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Adds logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the jate database');

  // Create a connection to the database and version to use
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .put() method on the store and pass in the content
  const request = store.put({ id:1 , value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// Adds logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Alex GET from the jate database');

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // console.log('A1')
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // console.log('A')

  // Open up the desired object store.
  const store = tx.objectStore('jate');
// console.log('B')
  // Use the .getAll() method to get all data in the database.
  const request = store.get(1);
  // console.log('C')
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  // if (result.length === 0) {
  //   // result.push({content:'hello', id:1})
  //   console.log(result, 'inside if statement')
  //}
  // console.log(result.length)
  return result?.value;
};

initdb();
