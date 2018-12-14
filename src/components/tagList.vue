<template>
    <div class="box">

        <!-- 头部 -->
        <headerPg></headerPg>
        <div class="content">
            
            <leftNav :active_item="active_item"></leftNav>
            <div class="right_content">
        <p class="add_btn"><el-button @click="open">新增</el-button></p>    
        <el-table class="table_box" border
    :data="tagData"
    style="width: 100%">
    <el-table-column
      label="标签id"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.tagId }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标签名称"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tagName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标签描述"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tagDescription }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标签状态"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.tagStatus }}</span>
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
 
   <p v-if="tagData.length==0"> <el-button @click="open">新增</el-button></p>
     <el-dialog
        title="添加标签"
        :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input class="txt_input" v-model="tagName" placeholder="请输入标签名称"></el-input>
                    <el-input class="txt_input" v-model="tagDescription" placeholder="请输入标签描述"></el-input>
                    <el-input class="txt_input" v-model="tagStatus" placeholder="请输入标签状态"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="dialogVisible=false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="append">确 定</el-button>
                    </span>
                </el-dialog>
    </div>
   
   

  </div>
   
    </div>
</template>

<script>
import headerPg from "./commons/headerPg";
import leftNav from "./commons/leftNav";
export default {
    name:'tagList',
    components:{
       headerPg,
        leftNav
    },
    data(){
        return{
            tagData:[],
            active_item:'2-3',
            dialogVisible:false,
            tagName:'',
            tagDescription:'',
            tagStatus:'',
        }
    },
    mounted(){
        this.getData("/selectAllTags",'','post',res=>{
            console.log(res);
            if(res.data.code==0){
                this.tagData=res.data.data;
            }
        },err=>{})
    },
    methods:{
        open(){
            this.dialogVisible=true;
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        append(){
            var data={
                tagName:this.tagName,
                tagDescription:this.tagDescription,
                tagStatus:this.tagStatus
            };
            this.getData('/insertTag',data,'post',res=>{
                console.log(res);
                if(res.data.code==0){
                   alert('新增成功')
                }else{
                    alert('新增失败');
                }
            },err=>{})
        },
        handleClose(done){
            done()
        }
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
    .txt_input{
        margin-bottom: .375rem;
    }
    .add_btn{
        margin-left: 15%;
        width: 80%;
        text-align: left;
    }
</style>
