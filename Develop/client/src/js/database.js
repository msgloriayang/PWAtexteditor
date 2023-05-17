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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');
try {
  const db = await dbPromise;
  const tx = db.transaction('content', 'readwrite');
  const store = tx.objectStore('content');
  await store.put(content);
  await tx.done;
  console.log('Good job! Content added to the database:', content);
} catch (error) {
  console.error('Content failed to add to the database:', error);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');
try {
  const db = await initdb();
  if (!db) {
    console.error('Database is not initialized.');
    return [];
  }
  
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allContent = await store.getAll();
  await tx.done;
  console.log('All content:', allContent);
  return allContent;
} catch (error) {
  console.error('Failed to get content:', error);
  return [];
};

// (async () => {
// await initdb();
// })();
// initdb();
