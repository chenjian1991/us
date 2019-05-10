<template>
    <div class="error">
        404 Not Found Page,
        </br>
        <router-link to="/home">return home page <Icon type="md-arrow-round-forward" /></router-link>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .error{
        display: flex;
        justify-content: center;
        padding-top:200px;
    }
</style>