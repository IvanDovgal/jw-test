<template>
    <div class="wrapper">
        <ul class="list">
            <li class="item" :key="id" v-for="{id, name} in shelves">
                <router-link :to="{ name: 'user-bookshelf-shelf', params: { shelf: id, user }}">
                    {{name}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: ['shelves', 'user', 'current-shelf'],
  name: 'ShelvesList',
};
</script>


<style scoped>
    .item >>> .router-link-active {
        color: red
    }

    .wrapper {
        text-align: center;
    }

    .list {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .item {
        display: inline;
        padding: 1em;
    }
</style>
