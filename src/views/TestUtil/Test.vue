<template>
    <div>
        我的测试页面
        
    </div>
</template>

<script>
    import Loading from "@/components/Loading"
    import {subNumberPoint,scientificToNumber} from '@/lib/utils'
    export default {
        data() {
            return {
                
            }
        },
        components:{
            Loading
        },
        methods: {
            
        },
        mounted(){
            const map  = new Map()
            map.set('aaa',{name:121,age:12})
            map.set('bbb',{name:121,age:12})
            map.set('ccc',{name:121,age:12})
            console.log([...map.entries()])
        },
        computed: {
           
        }
    }
</script>

<style scoped>
.myTestBox{
    width: 300px;
    height:600px;
    background: #27a781;
    /* display: flex;
    align-items: center;
    justify-content: center; */
}
.teset{
    background: #ccc;
    width:20px;
    height: 100px;
}
</style>