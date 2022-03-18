<script lang="ts">
    export let big = false;
    export let label = '';
    export let onClick = (element: HTMLButtonElement) => {};
    export let primary = true;
</script>

<style lang="scss">
  @use "src/style/colors";

  .button {
    background: none;
    border: 1px solid colors.$highlight-color;
    border-radius: 10px;
    color: colors.$primary-font-color;
    padding: .5rem 1rem;

    &.big {
      font-size: 200%;
      padding: 1rem 2rem;
    }

    &:hover {
      border-color: colors.$highlight-color-2;
    }

    &.primary {
      background-color: colors.$highlight-color;
      color: colors.$background-color;

      &:hover {
        background-color: colors.$highlight-color-2;
      }
    }
  }
</style>
<button
        class="button"
        class:big={big}
        class:primary={primary}
        on:click={() => onClick(this)}
>{label}</button>
