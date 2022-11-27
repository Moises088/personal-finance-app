export interface Services<T, Dto> {
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
    create(createDto: Dto): Promise<T>;

    /**
     * Update item.
     * @param id id to identify a item.
     * @param updateDto Body needed to update item.
     * @returns Entity updated or void
    */
    update(id: number, updateDto: Dto): Promise<T | undefined>;

    /**
     * Delete item.
     * @param id id to identify a item.
     * @returns Entity[] without deleted item
    */
    delete(id: number): Promise<T[]>;
}