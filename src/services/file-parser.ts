import type {IParserOptions, ITrackInfo} from "./file-parser.decl";
import {EFileExporter, EParserUnsupported} from "./file-parser.decl";
import * as Rekordbox from "./parser-backends/rekordbox";

export class FileParser {
    static async parse(parserOptions: IParserOptions, fileExt: string, exporter: EFileExporter): Promise<ITrackInfo[]> {
        let trackInfos: ITrackInfo[] = [];

        switch (exporter) {
            case EFileExporter.Rekordbox: {
                if (fileExt in Rekordbox.formats) {
                    trackInfos = await Rekordbox.formats[fileExt](parserOptions);
                } else {
                    throw new Error(`The Rekordbox parser does not support the "${fileExt}" format!`)
                }

                break;
            }
            default: throw EParserUnsupported;
        }

        return trackInfos;
    }
}
