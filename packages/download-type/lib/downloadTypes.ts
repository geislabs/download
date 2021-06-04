import { ResolvedFile } from '@geislabs/file'

export interface Download extends Promise<ResolvedFile | Error> {}
