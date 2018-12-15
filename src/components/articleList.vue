<template>
    <div class="box">
         <!-- 头部 -->
        <headerPg></headerPg>
        <div class="content">
            <div class="left_nav">
                <leftNav :active_item="active_item"></leftNav>
            </div>
            <div class="right_content">
              <div class="content_top">
                <el-tag class="tag_list" @close="deleteTag(tag)" @click="go_tag(tag.urlName)"
                  v-for="(tag,index) in Newtags"
                  :key="index"
                  closable
                  type="success">
                  {{tag.name}}
                </el-tag>
              </div>
               <p class="add_btn"><el-button @click="editeArticle">新增</el-button></p>    
                <el-table class="table_box"
    :data="articleData"
    style="width: 100%">
    <el-table-column
      label="文章序号"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.articleId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章类别"
      width="180">
      <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.articleCategory }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章标题"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.articleTitle }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="发布者"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.articleTitle }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="文章标签"
      width="180">
      <template slot-scope="scope">
         <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="提交时间"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.articlePostTime }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
            </div>
        </div>
    </div>
</template>

<script>
import headerPg from "./commons/headerPg";
import leftNav from "./commons/leftNav";
export default {
    name:'articleList',
    components:{
        headerPg,
        leftNav
    },
    data(){
        return{
            active_item:'2-1',
            articleData:[],
            tags:[]
        }
    },
    computed:{
      Newtags(){
        this.tags= this.$store.state.Tags;
        return this.tags;
      }
    },
    mounted(){
      
    },
    methods:{
      editeArticle(){
        this.$router.push({
          name:'editeArticle'
        });
        this.$store.state.Tags.push({name:'新增文章',type:'info',urlName:'editeArticle'});
      },
      deleteTag(tag){
        this.$store.state.Tags.splice(this.$store.state.Tags.indexOf(tag),1);
      }
    }
}
</script>

<style scoped>
    .content{
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .right_content{
      width: 70%;
    }
    .left_nav{
      width: 12%;
      margin-right: 1.25rem;
    }
    .table_box{
        width: 80%;
        font-weight: lighter;
    }
    .add_btn{
        width: 80%;
        text-align: left;
    }
    .content_top{
      display: flex;
      flex-direction: row;
      justify-content: left;
      margin-top: 1.25rem;
    }
    .tag_list{
      text-align: left;
    }
    
</style>
