class LocalStorageService {
  private constructor() {}

  public static setItem(key: string, value: any) {
    return localStorage.setItem(key, value);
  }

  public static getItem(key: string) {
    return localStorage.getItem(key);
  }

  public static remove(key: string) {
    return localStorage.removeItem(key);
  }
}

export default LocalStorageService;
