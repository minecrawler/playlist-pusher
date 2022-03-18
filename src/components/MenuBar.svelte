<script lang="ts">
    import * as Spotify from '../services/spotify';
    import Button from "./Button.svelte";
    import {t} from "../services/i18n";
    import {logout} from "../services/spotify";
</script>

<style lang="scss">
  @use "src/style/colors";

  .header {
    align-self: flex-start;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 1rem 2rem;
    width: 100%;

    > .name {
      font-weight: bold;
      margin-right: 1rem;
    }
  }
</style>
<header class="header">
    {#await Spotify.api.getMe()}
    {:then data}
        <span class="name">{data.body.display_name}</span>
        <Button
                class="logout"
                label={t('logout')}
                primary={false}
                onClick={() => logout()}
        />
    {:catch error}
        ERROR: {error}
    {/await}
</header>
