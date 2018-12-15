<template>
    <div class="container">
        <div class="login_form">
            <div class="demo-input-suffix">
            <span class="txt">用户名：</span>
            <el-input
           
                placeholder="请输入手机号"
                prefix-icon="el-icon-phone"
                v-model="userName">
                </el-input>
            </div>
            <div class="demo-input-suffix">
            <span class="txt">密码：</span>
            <el-input
            
                placeholder="请输入密码"
                prefix-icon="el-icon-phone"
                v-model="userPass"
                >
            </el-input>
            </div>

            <el-button class="login_btn"  @click="login">登录</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'login',
    data(){
        return{
            userName:'',
            userPass:'',
        }
    },
    mounted(){
        
    },
    methods:{
        login(){
            var data={
                userName:this.userName,
                userPass:this.userPass
            };
            this.getData('/Dologin',data,'post',(res)=>{
                console.log(res);
                // this.$toast.message(res.data.msg);
                if(res.data.code==0){
                    localStorage.setItem("userId",res.data.data.userId);
                   
                    this.$router.push({
                        name:'index'
                    });
                }else{

                }
            },(err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
    @import "../../static/css/login.css";
</style>
