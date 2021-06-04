const fileprefix = 'file://'

export function isLocal(url: string) {
    return url.startsWith(fileprefix) || url.startsWith('/')
}

export function getLocalPath(url: string) {
    return url.replace(fileprefix, '')
}
