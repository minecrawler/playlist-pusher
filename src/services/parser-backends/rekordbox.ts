import type {IParserOptions, ITrackInfo, TParser} from "../file-parser.decl";
import {EFormatError, EMissingField, EMissingFieldId} from "../file-parser.decl";

export const formats: Record<string, TParser> = {
    // note: maybe we can create a generic CSV parser which just has to be fed certain information...?
    csv: function({artistFieldId, fieldSeparator, file, trackNameFieldId}: IParserOptions): Promise<ITrackInfo[]> {
        // we need them, because they are localized urghhhh :(
        if (!artistFieldId || !trackNameFieldId) {
            throw EMissingFieldId;
        }

        // the CSV usually is TAB-SEPARATED... who had that "brilliant" idea?
        fieldSeparator ||= '\t';

        const reader = new FileReader();

        return new Promise((res, rej) => {
            reader.addEventListener('load', event => {
                const content = event.target!.result! as string;
                const lines = content.split(/\r?\n/);
                const headerFields = lines.shift()?.split('\t');
                const trackInfos: ITrackInfo[] = [];

                if (!headerFields) {
                    throw EFormatError;
                }

                {
                    const artistColIndex = headerFields.indexOf(artistFieldId);
                    const trackNameColIndex = headerFields.indexOf(trackNameFieldId);
                    let lineTokens;

                    console.log(headerFields, artistColIndex, trackNameColIndex)

                    if (artistColIndex < 0 || trackNameColIndex < 0) {
                        throw EMissingField;
                    }

                    for (const line of lines) {
                        lineTokens = line.split(fieldSeparator);

                        trackInfos.push({
                            artist: lineTokens[artistColIndex],
                            name: lineTokens[trackNameColIndex],
                        });
                    }
                }

                res(trackInfos);
            });

            reader.readAsText(file, 'utf-16-le');
        });
    },
    txt: function(options: IParserOptions): Promise<ITrackInfo[]> {
        return formats.csv(options);
    }
}
