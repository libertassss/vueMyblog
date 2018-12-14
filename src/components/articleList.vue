<template>
    <div class="box">
         <!-- 头部 -->
        <headerPg></headerPg>
        <div class="content">
            <div class="left_nav">
                <leftNav :active_item="active_item"></leftNav>
            </div>
            <div class="right_content">
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
            articleData:[]
        }
    },
    mounted(){

    },
    methods:{

    }
}
</script>

<style scoped>
    .content{
        width: 100%;
        margin-top: 2.5rem;
    }

    .table_box{
        width: 80%;
        margin-left: 15%;
        font-weight: lighter;
    }
</style>
