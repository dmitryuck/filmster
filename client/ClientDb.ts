export default class ClientDb {
  private static _inst: ClientDb;

  private db: any;

  static get inst(): ClientDb {
    if (!ClientDb._inst) {
      ClientDb._inst = new ClientDb();
    }

    return ClientDb._inst;
  }

  constructor() {}

  async openDb(name: string, version: number, collections: string[]) {
    return new Promise((resolve, reject) => {
      const openRequest = window.indexedDB.open(name, version);

      openRequest.onerror = (event) => {
        console.error('Database failed to open');
        reject('Error opening database');
      };

      openRequest.onsuccess = (event: any) => {
        console.log('Database opened successfully');

        const db = event.target.result;
        this.db = db;

        resolve(db);
      };

      openRequest.onupgradeneeded = (event: any) => {
        console.log('Database upgraded successfully');

        const db = event.target.result;
        this.db = db;

        for (let i in collections) {
          if (!db.objectStoreNames.contains[collections[i]]) {
            db.createObjectStore(collections[i], { keyPath: "key" });
          }
        }
      };
    });
  }

  async addData(column: string, data: any) {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([column], "readwrite");

        transaction.oncomplete = (event) => {
        };

        transaction.onerror = (event) => {
          console.error(event.target.error);
          reject(event.target.error);
        };

        const objectStore = transaction.objectStore(column);

        const addRequest = objectStore.add(data);

        addRequest.onsuccess = (event) => {
          // event.target.result == customerData[i].ssn;
          resolve(event.target.result);
        };
      } catch(e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  async getData(collection: string, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([collection], "readwrite");

        transaction.oncomplete = (event) => {
        };

        transaction.onerror = (event) => {
          console.error(event.target.error);
          resolve(null);
        };

        const objectStore = transaction.objectStore(collection);

        const getRequest = objectStore.get(key);

        getRequest.onerror = (event) => {
          console.error(event.target.error);
          resolve(null);
        };

        getRequest.onsuccess = (event) => {
          resolve(getRequest.result);
        };
      } catch(e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  async deleteData(collection: string, key: string) {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([collection], "readwrite");

        transaction.oncomplete = (event) => {
        };

        transaction.onerror = (event) => {
          console.error(event.target.error);
          reject(event.target.error);
        };

        const objectStore = transaction.objectStore(collection);

        const deleteRequest = objectStore.delete(key);

        deleteRequest.onsuccess = (event) => {
          resolve(event.target.result);
        };
      } catch(e) {
        console.log(e);
        resolve(null);
      }
    });
  }

  async clearCollection(collection: string) {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.db.transaction([collection], "readwrite");

        transaction.oncomplete = (event) =>{
        };

        transaction.onerror = (event) => {
          console.error(event.target.error);
          reject(event.target.error);
        };

        const objectStore = transaction.objectStore(collection);

        var clearRequest = objectStore.clear();

        clearRequest.onsuccess = (event) => {
          resolve(event.target.result);
        };
      } catch(e) {
        console.log(e);
        resolve(null);
      }
    });
  }
}