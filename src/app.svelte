<script lang="ts">
    import Login from './components/login/Login.svelte';
    import {onMount} from 'svelte';
    import {downloadTranslations} from "./services/i18n";
    import * as Spotify from "./services/spotify";
    import MenuBar from "./components/menu-bar/MenuBar.svelte";
    import Trackinfo from "./components/track-info/track-info.svelte";
    import {name} from './config';

    let canRender = false;
    let isLoggedIn = false;

    if (Spotify.isLoggedIn()) {
        isLoggedIn = true;
    }

    onMount(async () => {
        await downloadTranslations();
        canRender = true;
        // check if logged in
        //   display main app
        // else
        //   display login
    });
</script>

<style lang="scss">
  @use "style/colors";

  .app {
    background-color: colors.$background;
    color: colors.$primary-font-color;
    display: flex;
    height: 100%;
    justify-content: center;
    justify-items: center;
    width: 100%;

    > .login {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      justify-items: center;
    }

    > .uploader {
      align-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      width: 100%;

      > .title {
        font-size: 6rem;
        margin-bottom: 2rem;
        margin-top: 2rem;
        width: fit-content;
      }
    }
  }
</style>
<div class="app">
    {#if canRender}
        {#if isLoggedIn}
            <div class="uploader">
                <MenuBar/>
                <h1 class="title">{name}</h1>
                <Trackinfo/>
            </div>
        {:else}
            <div class="login">
                <Login/>
            </div>
        {/if}
    {/if}
</div>
