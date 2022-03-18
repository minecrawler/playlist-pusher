<script lang="ts">
    import {name} from '../config';
    import {t} from '../services/i18n';
    import Button from "./Button.svelte";
    import {login} from "../services/spotify";
</script>

<style lang="scss">
  @use "src/style/colors";

  .container {
    align-items: center;
    border: 1px solid colors.$secondary-font-color;
    border-radius: 10px;
    box-shadow: 0 0 1rem 0.5rem rgba(0,0,0,1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-items: center;
    padding: 2rem;
  }

  .title {
    font-size: 6rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }
</style>
<div class="container">
    <h1 class="title">{name}</h1>
    <Button
            big={true}
            label={t('login')}
            onClick={() => login()}
            primary={true}
    />
</div>
