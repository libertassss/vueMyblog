<template>
    <div class="box">
         <!-- 头部 -->
        <headerPg></headerPg>
        <div class="content">
            <div class="left_nav">
                <leftNav :active_item="active_item"></leftNav>
            </div>
            <div class="right_content">
                
            </div>
        </div>
        
    </div>
</template>

<script>
import headerPg from "./commons/headerPg";
import leftNav from "./commons/leftNav";
export default {
    name:'category',
    components: {
        headerPg,
        leftNav
    },
    data(){
        return{
            active_item:'2-2'
        }
    },
    methods:
    {

    }
}
</script>

<style scoped>
    @import "../../static/css/category.css";
</style>
