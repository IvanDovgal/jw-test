<template>
    <div class="wrapper">
        <ul class="list">
            <li :class="{'item': true, active: isActive({ id }) }"
                :key="id"
                v-for="{id, name} in fields"
                role="menuitemcheckbox"
                v-on:click="handleClick({ id })"
            >
                {{ name }}
                <template v-if="isActive({ id })">
                    <template v-if="isAsc()">
                        &uarr;
                    </template>
                    <template v-else>
                        &darr;
                    </template>
                </template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['fields', 'current'],
  methods: {
    handleClick({ id }) {
      let value;
      if (this.isActive({ id })) {
        if (this.isAsc()) value = `-${id}`;
        else value = id;
      } else value = id;
      this.$emit('change', value);
    },
    isAsc() {
      return this.current[0] !== '-';
    },
    isActive({ id }) {
      return this.current.endsWith(id) && (this.current.length - id.length) < 2;
    },
  },
};
</script>


<style scoped>
    .item >>> .router-link-active {
        color: red
    }

    .wrapper {
        text-align: center;
        padding: 1em;
    }

    .list {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .item {
        border: 1px solid black;
        display: inline;
        padding: 0.5em;
    }

    .active {
        color: red;
    }
</style>
