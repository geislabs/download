import { FileNotFoundError } from '../downloadErrors'
import { FileSystem } from '../downloadProvider'

export function assertFileExists(fs: FileSystem, path: string) {
    try {
        fs.statSync(path)
    } catch (error) {
        throw new FileNotFoundError(path)
    }
}
