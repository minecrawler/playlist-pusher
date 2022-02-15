<script lang="ts">
    import {t} from "../../services/i18n";
    import {FileParser} from "../../services/file-parser";
    import {EFileExporter} from "../../services/file-parser.decl";

    let tracks = [];

    async function changeFile(file?: File) {
        if (!file) {
            return;
        }

        // todo: improve
        tracks = await FileParser.parse({
            file,
            artistFieldId: 'Interpret',
            trackNameFieldId: 'Trackname',
        }, file.name.split('.').pop(), EFileExporter.Rekordbox);
    }
</script>

<style lang="scss">
  @use "../../style/colors";

  .info {
    width: 50%;

    > .tracks {
      border: 1px solid colors.$secondary-font-color;
      margin-top: .5rem;
      max-height: 50%;
      overflow-y: scroll;
      padding: .25rem .5rem;
      width: 100%;

      td:first-child {
        border-right: 1px solid colors.$secondary-font-color;
      }

      th {
        font-weight: bold;
        border-bottom: 2px solid colors.$highlight-color;
      }

      td, th {
        box-sizing: border-box;
        padding: .5rem 1rem;
      }

      tr {
        border-bottom: 1px solid colors.$secondary-font-color;
        box-sizing: border-box;
      }
    }
  }
</style>
<section class="info">
    {t('upload_label')} <input type="file" on:change={event => changeFile(event.target.files[0])}>
    <table class="tracks">
        <tbody>
        <tr>
            <th>{t('track_name')}</th>
            <th>{t('track_artist')}</th>
        </tr>
        {#each tracks as track}
            <tr>
                <td>{track.name}</td>
                <td>{track.artist}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</section>
