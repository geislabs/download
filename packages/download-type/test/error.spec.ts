import path from 'path'
import { FileNotFoundError } from '../lib'
import { downloader } from './support'

describe('error', () => {
    let rootDir: string

    test('not found', async () => {
        const absolute = path.resolve(__dirname, 'fixtures', 'not-found.json')
        const file = (await downloader(rootDir)(absolute)) as Error
        expect(file).toBeInstanceOf(FileNotFoundError)
    })
})
