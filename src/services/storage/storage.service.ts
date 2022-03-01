const storage = window.localStorage

export class StorageService {
  public static getValue(key = 'pushups.key', defaultVal = ''): string {
    return storage.getItem(key) || defaultVal
  }

  public static setValue(key = 'pushups.key', value = ''): void {
    return storage.setItem(key, value)
  }

  public static getAllValues(keyStartWith?: string): [string, string][] {
    const keys = Object.entries(storage)

    if (keyStartWith) {
      return keys.filter(([key]) => key.startsWith(keyStartWith))
    }

    return keys
  }
}
