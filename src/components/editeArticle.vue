<template>
  <div class="box">
       <!-- 头部 -->
        <headerPg></headerPg>
    <div class="content">
      <div class="content_top"></div>
      <div class="content_bottom">
      <div class="left_nav">
            <leftNav :active_item="active_item"></leftNav>
      </div>
      <div :span="24" class="right_content">
        <el-form ref="infoForm" :rules="rules">
          <el-form-item prop="a_detail">
            <div class="edit_container">
              <mavonEditor class="editer" v-model="content" ref="md" @imgAdd="$imgAdd"  @change="changeMavon"/>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确认提交</el-button>
          </el-form-item>
        </el-form>
      </div>
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
        content:'',
        configs:{
 
        },       
        active_item:'2-1',
        infoForm: {
          a_title: '',
          a_source: '',
          a_content:'',
        },
        
        //表单验证
        rules: {
          a_title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          a_content: [
            {required: true, message: '请输入详细内容', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      //初始化
    },
    methods: {
        changeMavon(){
          console.log(this.content);
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

      onEditorReady(editor) {
      },
      onSubmit() {
          var data={
            articleContentMd:this.content
          };
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
      margin-top: 2.5rem;
    }
   .content_bottom{
        display: flex;
        flex-direction: row;
    }
    .left_nav{
        width: 15%;
        z-index: 999;
    }
    .right_content{
        width: 70%;
    }
    .edit_container{
      margin-top: .625rem;
    }
    .editer{
        height: 30rem;
    }
 
</style>
