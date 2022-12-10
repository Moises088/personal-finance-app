export const decontextualize = <T>(data: T): T => {
    return JSON.parse(JSON.stringify(data))
}