import fs from 'fs'
import path from 'path'
import { downloader } from './support'

describe('remote', () => {
    let rootDir: string

    beforeEach(() => {
        rootDir = path.resolve(__dirname, 'tmp')
        if (!fs.existsSync(rootDir)) {
            fs.mkdirSync(rootDir)
        }
    })

    afterEach(() => {
        if (fs.existsSync(rootDir)) {
            fs.rmSync(path.resolve(rootDir, 'somefile.json'))
        }
    })

    test('simple', async () => {
        await expect(
            downloader(rootDir)('https://google.com/somefile.json')
        ).resolves.toStrictEqual({
            name: 'somefile.json',
            key: 'somefile.json',
        })
    })

    test('side effect', async () => {
        await downloader(rootDir)('https://google.com/somefile.json')
        expect(
            fs
                .readFileSync(path.resolve(rootDir, 'somefile.json'), 'utf-8')
                .toString()
        ).toContain('DOCTYPE')
    })
})
