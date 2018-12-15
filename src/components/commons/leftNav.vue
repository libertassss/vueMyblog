<template>
    <div class="box">
        <el-col :span="3" class="left_nav">
            <el-menu
            :default-active="active_item"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
             background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
            <el-submenu index="1" class="submenu">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
                </template>
                <el-menu-item-group>
                <el-menu-item class="menu_group" index="1-1" @click="userList">用户列表</el-menu-item>
                <el-menu-item class="menu_group" index="1-2" @click="userRegister">用户注册</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item class="menu_group" index="2-1" @click="articleList">文章列表</el-menu-item>
                    <el-menu-item class="menu_group" index="2-2" @click="category">文章类别</el-menu-item>
                    <el-menu-item class="menu_group" index="2-3" @click="tagList">文章标签</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>评论管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item class="menu_group" index="3-1">评论列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>网站管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item class="menu_group" index="4-1">导航</el-menu-item>
                    
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>



    </div>
</template>

<script>
export default {
    name:'leftNav',
    props:{ 
        active_item:String,
        required: true
    },
    data(){
        return{
            
        }
    },
    methods:{
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        userRegister(){
            console.log(this.active_item);
        },
        userList(){
            console.log(this.active_item);
            this.$router.push({
                name:'index'
            })
        },
        category(){
            this.$router.push({
                name:'category'
            })
        },
        tagList(){
            this.$router.push({
                name:'tagList'
            })
        },
        articleList(){
            this.$router.push({
                name:'articleList'
            });
            this.$store.state.Tags=[];
            this.$store.state.Tags.push({name:'文章列表',type:'info',urlName:'articleList'});
        }
    },
   
}
</script>

<style scoped>
    .box{
        width: 100%;
        left: 0;
    }
    .left_nav{
       width: 12%;
       position: absolute;
       height: 100%;
    }
    .el-menu-vertical-demo{
        height: 100%;
    }
    .menu_group{
        min-width: 0;
    }
</style>
