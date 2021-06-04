import https from 'https'
import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import { isLocal } from './url/urlHelpers'
import { assertFileExists } from './files/fileAssertions'
import { Download } from './downloadTypes'
import { DownloadError } from './downloadErrors'

export type Https = Pick<typeof https, 'get'>
export type FileSystem = Pick<
    typeof fs,
    'createReadStream' | 'createWriteStream' | 'statSync'
>

export const download =
    (https: Https, fs: FileSystem) =>
    (url: string): Download => {
        const filename = path.basename(url)
        return new Promise(async (resolve, reject) => {
            try {
                if (isLocal(url)) {
                    assertFileExists(fs, url)
                    const stream = fs.createReadStream(url)
                    return stream
                        .pipe(fs.createWriteStream(filename))
                        .on('finish', () =>
                            resolve({
                                name: filename,
                                key: filename,
                            })
                        )
                        .on('error', resolve)
                } else {
                    const urlobject = new URL(url)
                    return https.get(urlobject, (response) =>
                        response
                            .pipe(fs.createWriteStream(filename))
                            .on('finish', () =>
                                resolve({
                                    name: filename,
                                    key: filename,
                                })
                            )
                            .on('error', resolve)
                    )
                }
            } catch (error) {
                if (error instanceof DownloadError) {
                    return resolve(error)
                }
                reject(error)
            }
        })
    }
