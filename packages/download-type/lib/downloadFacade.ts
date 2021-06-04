import autobind from 'autobind-decorator'
import { Download } from './downloadTypes'

@autobind
// @ts-expect-error
export class DownloadImpl implements Download {}
