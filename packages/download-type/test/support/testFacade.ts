import https from 'https'
import fs from 'fs'
import path from 'path'
import { download } from '../../lib'

export const downloader = (baseUrl: string) =>
    download(https, {
        statSync: fs.statSync,
        createWriteStream: (filename, options) =>
            fs.createWriteStream(
                path.resolve(baseUrl, filename.toString()),
                options
            ),
        createReadStream: (filename, options) =>
            fs.createReadStream(
                path.resolve(baseUrl, filename.toString()),
                options
            ),
    })
