<script lang="ts">
    import {t} from "../services/i18n";
    import {FileParser} from "../services/file-parser";
    import {EFileExporter, type ITrackInfo} from "../services/file-parser.decl";
    import Button from "./Button.svelte";
    import Track from "./Track.svelte";

    const fileInput = document.createElement<HTMLInputElement>('input');
    let fileName: string | undefined;
    let tracks: ITrackInfo[] = [];

    fileInput.type = 'file';
    fileInput.addEventListener('change', () => {
        changeFile(fileInput.files[0]);
    });

    const browseForFile = function () {
        fileInput.click();
    };

    const changeFile = async function (file?: File) {
        if (!file) {
            fileName = undefined;
            return;
        }

        fileName = file.name;

        // todo: improve localization
        tracks = await FileParser.parse({
            file,
            artistFieldId: 'Interpret',
            trackNameFieldId: 'Trackname',
        }, fileName.split('.').pop(), EFileExporter.Rekordbox);
    };
</script>

<style lang="scss">
  @use "src/style/colors";
  @import "../style/track-list";

  input[type="file"] {
    color: colors.$primary-font-color;
  }

  .info {
    width: 50%;

    > .tracks {
      border: 1px solid colors.$secondary-font-color;
      margin-top: .5rem;
      max-height: 50%;
      overflow-y: scroll;
      padding: .25rem .5rem;
      width: 100%;
    }
  }
</style>
<section class="info">
    {t('upload_label')}
    <Button
            label={fileName ?? t('hint_select_file')}
            onClick={() => browseForFile()}
    />
    <table class="tracks">
        <tbody>
        <tr>
            <th></th>
            <th>{t('track_name')}</th>
            <th>{t('track_artist')}</th>
        </tr>
        {#if !tracks.length}
            <tr>
                <td>{t('hint_no_file_selected')}</td>
            </tr>
        {:else}
            {#each tracks as track}
                <Track
                        fileName={fileName}
                        track={track}
                />
            {/each}
        {/if}
        </tbody>
    </table>
</section>
