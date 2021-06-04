import fs from 'fs'
import path from 'path'
import { downloader } from './support'

describe('local', () => {
    let rootDir: string

    beforeEach(() => {
        rootDir = path.resolve(__dirname, 'tmp')
        if (!fs.existsSync(rootDir)) {
            fs.mkdirSync(rootDir)
        }
    })

    afterEach(() => {
        if (fs.existsSync(rootDir)) {
            fs.rmSync(path.resolve(rootDir, 'test.json'))
        }
    })

    test('simple', async () => {
        const absolute = path.resolve(__dirname, 'fixtures', 'test.json')
        await expect(downloader(rootDir)(absolute)).resolves.toStrictEqual({
            filename: 'test.json',
        })
    })

    test('side effect', async () => {
        const absolute = path.resolve(__dirname, 'fixtures', 'test.json')
        await downloader(rootDir)(absolute)
        expect(() => fs.statSync(rootDir)).not.toThrow()
    })
})
