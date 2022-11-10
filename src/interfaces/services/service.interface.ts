export interface Services<T> {
    /**
     * Find all itens.
     * @returns A Promise for itens array.
    */
    find(): Promise<T[]>;

    /**
     * Find specific item.
     * @param id To find specific item by id.
     * @returns A Promise for specific item.
    */
    findOne(id: number): Promise<T | undefined>;

    /**
     * Create a new item.
     * @param createDto Body needed to create a new item.
     * @returns A Promise for new item.
    */
    create(createDto: T): Promise<T>;

    /**
     * Update item.
     * @param updateDto Body needed to update item.
    */
    update(updateDto: T): Promise<void>;
}