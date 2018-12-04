<template>
    <div class="box">
        <!-- 头部 -->
       <headerPg></headerPg>
        <!-- content -->
        <div class="content">
            <mu-breadcrumbs class="item_box">
                <mu-breadcrumbs-item v-for="item in items" :key="item.text" :disabled="item.disabled" class="item">{{item.text}}</mu-breadcrumbs-item>
            </mu-breadcrumbs>
            <div class="main_content">
                <div class="left_nav">
                    <mu-expansion-panel class="panel_box">
                        <div slot="header">用户管理</div>
                        <ul>
                            <li>用户列表</li>
                            <li>用户注册</li>
                        </ul>    
                    </mu-expansion-panel>
                    <mu-expansion-panel class="panel_box">
                        <div slot="header">文章管理</div>
                        <ul>
                            <li>文章刘表</li>
                            <li>编辑文章</li>
                        </ul>
                    </mu-expansion-panel>
                    <mu-expansion-panel class="panel_box">
                        <div slot="header">评论管理</div>
                        <ul>
                            <li>评论列表</li>
                        </ul>
                    </mu-expansion-panel>
                    <mu-expansion-panel class="panel_box">
                        <div slot="header">网站管理</div>
                        <ul>
                            <li>导航</li>
                            <li>标签</li>
                            <li>文章类型</li>
                        </ul>
                    </mu-expansion-panel>
                </div>
                <div class="right_item">
                    <mu-container>
                        <mu-paper :z-depth="1">
                            <mu-data-table border :columns="columns" :sort.sync="sort" @sort-change="handleSortChange" :data="list.slice(0,6)">
                            <template slot-scope="scope" class="tb_item">
                                <td>{{scope.row.userNickname}}</td>
                                <td class="is-right">{{scope.row.userName}}</td>
                                <td class="is-right">{{scope.row.userEmail}}</td>
                                <td class="is-right">{{scope.row.userRegisterTime}}</td>
                                <td class="is-right">{{scope.row.userLastLoginTime}}</td>
                                <td class="is-right">{{scope.row.userStatus}}</td>
                            </template>
                            </mu-data-table>
                        </mu-paper>
                    </mu-container> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerPg from './commons/headerPg';
export default {
    name:'index',
    components:{
        headerPg
    },
    data(){
        return{
            items: [
                {
                text: '菜单',
                disabled: false
                }
            ],
            sort: {
        name: '',
        order: 'asc'
      },
      columns: [
          { title: '用户名', width:200, name: 'name' },
          { title: '手机号', name: 'calories', width: 126, align: 'center', sortable: true },
          { title: '邮箱', name: 'fat', width:126, align: 'center', sortable: true },
          { title: '注册时间', name: 'carbs', width: 126, align: 'center', sortable: true },
          { title: '最后登录时间', name: 'protein', width: 126, align: 'center', sortable: true },
          { title: '用户状态', name: 'iron', width: 126, align: 'center', sortable: true }
      ],
      list: []
        }
    },
    methods:{
       handleSortChange ({name, order}) {
        this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
        }
    },
    mounted(){
        var data={};
        this.getData('/selectAllUser',data,'post',(res)=>{
            console.log(res);
            if(res.data.code==0){
                this.list=res.data.data.userInfo;
            }
        },(err)=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>
    @import url(../../static/css/index.css);
</style>
