<template>
    <div class="box">
        <!-- 头部 -->
        <headerPg></headerPg>
        <!-- content -->
        <div class="content">
           

            <leftNav :active_item="active_item"></leftNav>
          
            
            <div class="right_content">
                <el-table class="table_box"
                    :data="list"
                    border
                >
                 <el-table-column
                    prop="userId"
                    label="用户Id"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userNickname"
                    label="昵称"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="userName"
                    label="手机号"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="userEmail"
                    label="邮箱" width="180">
                    </el-table-column>
                    <el-table-column
                    prop="userStatus"
                    label="用户状态" width="80">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            
                            <el-button
                            size="mini"
                            @click="handleDelete(scope.$index, scope.row)">详情</el-button>
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
  name: "index",
  components: {
    headerPg,
    leftNav
  },
  data() {
    return {
        active_item:'1-1',
        list: [],
    };
  },
  methods: {
      handleDelete(){

      },
   handleEdit(){

   },
    add_menu() {
      var data = {
        menuName: "首页",
        menuStatus: 1,
        menuOrder: 1
      };
      this.getData(
        "/insertMenu",
        data,
        "post",
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  },
  mounted() {
    var data = {};
    this.getData(
      "/selectAllUser",
      data,
      "post",
      res => {
        console.log(res);
        if (res.data.code == 0) {
          this.list = res.data.data;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
};
</script>

<style scoped>
@import url(../../static/css/index.css);
</style>
