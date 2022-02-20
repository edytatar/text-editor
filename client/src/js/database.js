import { openDB } from 'idb';
const initdb = async () =>
  openDB('text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('text-editor')) {
        console.log('Text Editor database already exists');
        return;
      }
      db.createObjectStore('text-editor', { keyPath: 'id', autoIncrement: true });
      console.log('Text Editor database created');
    },
  });

  // Method that takes some content and adds it to the IndexedDB database using the idb module
export const putDb = async (content) => {
  console.log('PUT to the database');
  const textEditorDb = await openDB('text-editor', 1);
  const tx = textEditorDb.transaction('text-editor', 'readwrite');
  const store = tx.objectStore('text-editor');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(':rocket: - data saved to the database', result.value);
};
// Method that gets content from the IndexedDB database using the idb module
export const getDb = async () => {
  console.log('GET from the database');
  const textEditorDb = await openDB('text-editor', 1);
  const tx = textEditorDb.transaction('text-editor', 'readonly');
  const store = tx.objectStore('text-editor');
  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  
    // Check if a variable is defined and if it is, return it
  return result?.value;
};
initdb();