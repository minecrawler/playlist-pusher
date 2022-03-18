export enum EFileExporter {
    Rekordbox,
}

export interface IParserOptions {
    artistFieldId?: string
    file: File
    fieldSeparator?: string
    trackNameFieldId?: string
}

export interface ITrackInfo {
    artist: string
    name: string
    row: number
}

export type TParser = (options: IParserOptions) => Promise<ITrackInfo[]>;


const E = (msg: string) => new Error(msg);
export const EFormatError = E('The input file is malformed!');
export const EMissingField = E('The parser could not find all required fields in the input!');
export const EMissingFieldId = E('The parser is missing a field ID!');
export const EParserUnsupported = E('This exporter is not supported!');
