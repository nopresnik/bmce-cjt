export default interface Service<T> {
  create(item: T): Promise<T>;

  findAll(): Promise<T[]>;

  findOne(id: string): Promise<T | null>;

  patch(id: string, item: Partial<T>): Promise<T | null>;

  delete(id: string): Promise<T | null>;
}
