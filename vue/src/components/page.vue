<template>
    <Page :total="totalPage" :page-size="1" @on-change="onChangePage" class="page"/>
</template>

<script>
    export default {
        name: 'page',
        props:[
            'totalPage'
        ],
        methods: {
            onChangePage (index) {
                this.$emit('changePageFn', index)
            }
        }
    }
</script>

<style scoped>
    .page {
        margin-top: 20px;
        text-align: right;
    }
</style>
