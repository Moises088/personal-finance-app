export interface Services<T> {
    find(): Promise<T[]>;
    findOne(id: number): Promise<T | undefined>;
    create(createDto: T): Promise<T>;
    update(updateDto: T): Promise<void>;
}