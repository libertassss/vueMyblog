<template>
  <div class="box">
       <!-- 头部 -->
        <headerPg></headerPg>
    <div class="content"> 
      <div class="left_nav">
        <leftNav :active_item="active_item"></leftNav>
      </div>
      <div :span="24" class="right_content">
        <div class="content_top">
          <el-tag @close="deleteTag(tag)" @click="go_tag(tag.urlName)"
            v-for="tag in Newtags"
            :key="tag.name"
            closable
            type="success">
            {{tag.name}}
          </el-tag>
        </div>
        <p class="article_top">
          文章类别:
          <el-select v-model="inputValue" placeholder="请选择" @change="getValue" value-key="categoryId">
            <el-option v-for="optionOne in options" :key="optionOne.categoryName" :label="optionOne.categoryName" :value="optionOne">
            </el-option>
          </el-select>
          文章标签：
           <el-select v-model="articleTagIds" multiple placeholder="请选择" @change="getValue">
            <el-option
              v-for="item in tagData"
              :key="item.tagName"
              :label="item.tagName"
              :value="item.tagId">
            </el-option>
          </el-select>
        </p>
        <p>
          文章标题
          <el-input placeholder="请输入标题" v-model="input1"></el-input>
        </p>
          正文
        <div class="edit_container">
          <mavonEditor class="editer" v-model="content" ref="md" @imgAdd="$imgAdd"  @change="changeMavon"/>
        </div>
        <p><el-button type="primary" class="submit_btn" @click="onSubmit">确认提交</el-button></p>
      </div>
     
    </div>
     </div> 

</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import headerPg from "./commons/headerPg"
  import leftNav from "./commons/leftNav"
  export default {
    name:'editeArticle',
    data() {
      return {
        articleTagIds:'',
        inputValue:null,
        options:[],
        input1:'',
        articleContent:'',
        content:'',
        configs:{
 
        },       
        active_item:'2-1',
        tagData:[],
        tags: []
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      },
      Newtags(){
        this.tags= this.$store.state.Tags;
        return this.tags;
      }
    },
    mounted() {
      // 文章类别
      this.getData("/selectAll",'','post',res=>{
        console.log(res)
        if(res.data.code==0){
          this.options=res.data.data;
          this.inputValue=(res.data.data)[0];
        }
      },err=>{

      });
      // 文章标签
      this.getData('/selectAllTags','','post',res=>{
        console.log(res);
        if(res.data.code==0){
          this.tagData=res.data.data;
        }
      },err=>{})
    },
    methods: {
       deleteTag(tag){
        this.$store.state.Tags.splice(this.$store.state.Tags.indexOf(tag),1);
      },
      go_tag(urlName){
        alert(1)
        this.$router.push({
          name:'urlName'
        })
      },
      getValue(){
        console.log(this.articleTagIds);
      },
        changeMavon(value,html){
          console.log(html);
          this.articleContent=html;
        },
        $imgAdd(pos, $file){
          console.log($file);
            // 第一步.将图片上传到服务器.
          var data = new FormData();
          data.append('file', $file);
          this.getData('/uploadImg',data,'post',res=>{
            console.log(res);
            if(res.data.code==0){
              // this.$refs.md.$img2Url(pos,"http://127.0.0.1/"+res.data.url);
            }
          },err=>{})
        },
      onSubmit() {

          var data={
            articleContentMd:this.content,
            articleContent:this.articleContent,
            articleTitle:this.input1,
            articleUserId:localStorage.getItem("userId"),
            articleParentCategoryId:this.inputValue.categoryPid,
            articleChildCategoryId:this.inputValue.categoryId,
            articleTagIds:this.articleTagIds.join(',')
          };
          console.log(data);
          this.getData("/insertSelectev",data,'post',res=>{console.log(res)},err=>{});
      }
    },
    components: {
      mavonEditor,
       headerPg,
        leftNav
    }
  }
</script>
<style scoped>
    .content{
      display: flex;
      flex-direction: row;
    }
   .content_bottom{
        display: flex;
        flex-direction: row;
    }
    .left_nav{
      width: 12%;
      margin-right: 1.25rem;
      height: 50rem;
    }
    .right_content{
        width: 80%;
    }
    .edit_container{
      margin-top: .625rem;
    }
    .editer{
        height: 35rem;
    }
    .right_content .article_top{
      text-align: left;
    }
   .content_top{
      margin-top: 1.25rem;
   }
 
</style>
