import localforage from 'localforage';

export default localforage.createInstance({
  driver: localforage.LOCALSTORAGE,
});
