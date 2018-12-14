<template>
    <div class="box">
         <!-- 头部 -->
        <headerPg></headerPg>
        <div class="content">
            <div class="left_nav">
                <leftNav :active_item="active_item"></leftNav>
            </div>
            <div class="right_content">
                <div class="block">
                    
                    <div class="add_btn">
                        <el-input v-model="input" placeholder="请输入类别名称"></el-input>
                        <el-input v-model="categoryIcon" placeholder="请输入类别名称"></el-input>
                        <el-button @click="add_category">增加</el-button>
                    </div>

                    <el-tree
                    :data="data4"
                    node-key="categoryPid"
                    :expand-on-click-node="false"
                    :render-content="renderContent">
                    </el-tree>
                </div>

                <el-dialog
                    title="添加类别"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <el-input size="mini" v-model="categoryName" placeholder="请输入类别名称"></el-input>
                    <el-input class="txt_input" size="mini" v-model="categoryDescription" placeholder="请输入类别描述"></el-input>
                    <el-input size="mini" v-model="categoryIcon" placeholder="请输入类别图标"></el-input>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="close">取 消</el-button>
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
let categoryPid = 1000;
export default {
  name: "category",
  components: {
    headerPg,
    leftNav
  },
  data() {
    
    return {
      data4: [],
    //   data5: JSON.parse(JSON.stringify(data)),
      active_item: "2-2",
      input:'',
      categoryIcon:'',
      categoryName:'',
      dialogVisible:false,
      categoryDescription:""

    };
  },
  methods: {
      close(){
          this.dialogVisible=false;
      },
      
      handleClose(done){
          done();
      },    
      loadData(){
          var data={};
            this.getData('/selectAllCategory',data,"post",(res)=>{
                console.log(res);
                if(res.data.code==0){
                    var len=res.data.data.length;
                    for(var i=0;i<len;i++){
                        res.data.data[i].categoryPid+1;
                        this.data4.push(res.data.data[i]);
                    }
                    console.log(this.data4);
                }
            },(err)=>{})
      },
      add_category(){
          var data={
              categoryPid:0,
              categoryName:this.input,
              categoryDescription:"记叙文",
              categoryOrder:1,
              categoryIcon:this.categoryIcon,
              categoryStatus:1
          };
          console.log(data);
          this.getData('/insertCategory',data,"post",(res)=>{console.log(res)},(err)=>{})
      },
       open3(data) {
          this.dialogVisible=true;
          this.append(data);
      },
    append(data) {
       console.log(data);
        var _this=this;
        var datas={
            categoryName:this.categoryName,
            categoryDescription:this.categoryDescription,
            categoryPid:data.id,
            categoryIcon:this.categoryIcon
        };
        console.log(datas);
        this.getData('/insertCategory',datas,"post",(res)=>{
           console.log(res);
            if(res.data.code==0){
                const newChild = { categoryPid: categoryPid++, categoryName:document.getElementById("categoryName").value, children: [] };
                if (!data.children) {
                    this.$set(data, "children", []);
                }
                data.children.push(newChild);
                this.dialogVisible=false;
            }
        },(err)=>{})
     
    },

    remove(node, data) {
        var arr=[];
        arr.push(data.id);
        var len= data.children.length;
        for(var i=0;i<len;i++){
            arr.push(data.children[i].id);
        }
        console.log(data);
        var datas={
            item:arr
        };
        console.log(datas);
        this.getData("/deleteCategoryMall",datas,"post",(res)=>{
            if(res.data.code==0){
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            }
        },(err)=>{})
     
    },

    renderContent(h, { node, data, store }) {
        console.log(node);
      return (
        <span class="custom-tree-node">
          <span>{node.data.categoryName}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.open3(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    }
  },
  mounted(){
      this.loadData();
  }
};
</script>

<style scoped>
@import "../../static/css/category.css";
</style>
