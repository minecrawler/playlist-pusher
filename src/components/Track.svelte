<script lang="ts">
    import * as Spotify from '../services/spotify';
    import type {ITrackInfo} from "../services/file-parser.decl";
    import {t} from "../services/i18n";

    export let fileName: string;
    export let track: ITrackInfo;
</script>

<style lang="scss">
  @use "src/style/colors";
  @import "../style/track-list";

  audio {
    width: 100%;
    margin-top: .5rem;
  }

  .-additional-info {
    color: colors.$secondary-font-color;

    &.-warning > .-spotify-info {
      color: colors.$contrast-secondary-font-color;
    }
  }

  .-block {
    display: block;
  }

  .-file-info {
    color: colors.$primary-font-color;
  }
</style>
{#if track.artist || track.name}
    <tr>
        {#await Spotify.api.search(
            `${track.name ?? ''}${track.name && track.artist && ' - '}${track.artist ?? ''}`,
            ['track'],
            {limit: 1}, // todo: add drop-down if more than one track was found
        )}
            <td class="-icon">🔃</td>

            {#if track.name}
                <td>{track.name}</td>
            {:else}
                <td class="-warning">{t('warning_field_missing', fileName, track.row)}</td>
            {/if}

            {#if track.artist}
                <td>{track.artist}</td>
            {:else}
                <td class="-warning">{t('warning_field_missing', fileName, track.row)}</td>
            {/if}
        {:then data}
            {#if data.body.tracks.total === 0}
                <td class="-icon" title={t('error_track_not_found')}>⚠</td>

                {#if track.name}
                    <td>{track.name}</td>
                {:else}
                    <td class="-warning">{t('warning_field_missing', fileName, track.row)}</td>
                {/if}

                {#if track.artist}
                    <td>{track.artist}</td>
                {:else}
                    <td class="-warning">{t('warning_field_missing', fileName, track.row)}</td>
                {/if}
            {:else}
                <td><input type="checkbox" checked></td>

                {#if track.name}
                    <td>
                        {track.name}
                        <span class="-additional-info -block">{data.body.tracks.items[0].name}
                            ({data.body.tracks.items[0].album.name})</span>
                        <audio controls>
                            <source src={data.body.tracks.items[0].preview_url} type="audio/mpeg">
                        </audio>
                    </td>
                {:else}
                    <td class="-warning -additional-info">
                        <span class="-file-info -block">{t('warning_field_missing', fileName, track.row)}</span>
                        <span class="-block">{data.body.tracks.items[0].name} ({data.body.tracks.items[0].album.name}
                            )</span>
                    </td>
                {/if}

                {#if track.artist}
                    <td>
                        {track.artist}
                        <span class="-additional-info -block">{data.body.tracks.items[0].artists.map(a => a.name).join(', ')}</span>
                    </td>
                {:else}
                    <td class="-warning -additional-info">
                        <span class="-file-info -block">{t('warning_field_missing', fileName, track.row)}</span>
                        <span class="-spotify-info -block">{data.body.tracks.items[0].artists.map(a => a.name).join(', ')}</span>
                    </td>
                {/if}
            {/if}
        {:catch error}
            <td class="-error -icon">⚠</td>
            {#if track.name}
                <td>
                    {track.name}
                    <br>
                    <span class="-additional-info">{error.toString()}</span>
                </td>
            {:else}
                <td class="-warning">
                    {t('warning_field_missing', fileName, track.row)}
                    <br>
                    <span class="-additional-info">{error.toString()}</span>
                </td>
            {/if}
        {/await}
    </tr>
{:else}
    <tr>
        <td class="-error">{t('error_row_missing', track.row)}</td>
        <td class="-error">{`${fileName}:${track.row}`}</td>
    </tr>
{/if}
