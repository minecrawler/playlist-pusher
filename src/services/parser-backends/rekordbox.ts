import type {IParserOptions, ITrackInfo, TParser} from "../file-parser.decl";
import {EFormatError, EMissingField, EMissingFieldId} from "../file-parser.decl";

const rowIdFieldId = '#';

export const formats: Record<string, TParser> = {
    // note: maybe we can create a generic CSV parser which just has to be fed certain information...?
    csv: function ({artistFieldId, fieldSeparator, file, trackNameFieldId}: IParserOptions): Promise<ITrackInfo[]> {
        // we need them, because they are localized urghhhh :(
        if (!artistFieldId || !trackNameFieldId) {
            throw EMissingFieldId;
        }

        // the CSV usually is TAB-SEPARATED... who had that "brilliant" idea?
        fieldSeparator ||= '\t';

        const reader = new FileReader();

        return new Promise(res => {
            reader.addEventListener('load', event => {
                const content = event.target!.result! as string;
                const lines = content.split(/\r?\n/);
                const headerFields = lines.shift()?.split(fieldSeparator!);

                if (!headerFields) {
                    throw EFormatError;
                }

                const trackInfos: ITrackInfo[] = [];

                {
                    const artistColIndex = headerFields.indexOf(artistFieldId);
                    const rowColIndex = headerFields.indexOf(rowIdFieldId);
                    const trackNameColIndex = headerFields.indexOf(trackNameFieldId);
                    let lineTokens;

                    if (artistColIndex < 0 || trackNameColIndex < 0) {
                        throw EMissingField;
                    }

                    for (const line of lines) {
                        // skip empty lines
                        if (!line.trim()) {
                            continue;
                        }

                        lineTokens = line.split(fieldSeparator!);
                        trackInfos.push({
                            artist: lineTokens[artistColIndex],
                            name: lineTokens[trackNameColIndex],
                            row: parseInt(lineTokens[rowColIndex].trim()),
                        });
                    }
                }

                res(trackInfos);
            });

            reader.readAsText(file, 'utf-16-le');
        });
    },
    txt: function (options: IParserOptions): Promise<ITrackInfo[]> {
        return formats.csv(options);
    },
};
