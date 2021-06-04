export class DownloadError extends Error {
    constructor(message?: string) {
        super(message)
        Object.setPrototypeOf(this, DownloadError.prototype)
    }
}

export class FileNotFoundError extends DownloadError {
    constructor(public filepath: string) {
        super(`file '${filepath}' not found`)
        Object.setPrototypeOf(this, FileNotFoundError.prototype)
    }
}
