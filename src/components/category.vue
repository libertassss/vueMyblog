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
      categoryName:''

    };
  },
  methods: {

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
           var _this=this;
           var htmlString="<div><input type='text' id='categoryName' placeholder='请输入类别名称'/><input id='categoryIcon' type='text' id='categoryIcon' placeholder='请输入类别icon名称'/></div>";
            this.$alert(htmlString, '添加类别', {
                dangerouslyUseHTMLString: true
            }).then(()=>{
                _this.append(data);
            });

        // this.$prompt('请输入类别名称', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        // }).then(({ value }) => {
        //     this.append(data,value);
        // //   this.$message({
        // //     type: 'success',
        // //     message: '你的邮箱是: ' + value
        // //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });       
        // });
      },
    append(data) {
       console.log(data);
        var _this=this;
        var datas={
            categoryName:document.getElementById("categoryName").value,
            categoryPid:data.id,
            categoryIcon:document.getElementById("categoryIcon").value,
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
