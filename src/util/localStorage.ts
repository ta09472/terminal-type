export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key: string) {
  if (localStorage.getItem(key))
    return JSON.parse(localStorage.getItem(key) as string);
  return null;
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}
