<!--  -->
<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2>硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登陆</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登陆</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computeTime > 0
                    ? "已发送(" + computeTime + ")s"
                    : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section class="login_message">
              <input
                type="text"
                maxlength="11"
                placeholder="手机/邮箱/用户名"
                v-model="name"
              />
            </section>
            <section class="login_verification">
              <input
                type="password"
                maxlength="8"
                placeholder="密码"
                v-if="!showPwd"
                v-model="pwd"
              />
              <input
                type="text"
                maxlength="8"
                placeholder="密码"
                v-else
                v-model="pwd"
              />
              <div
                class="switch_button"
                :class="showPwd ? 'on' : 'off'"
                @click="showPwd = !showPwd"
              >
                <div class="switch_circle" :class="{ right: showPwd }"></div>
                <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
              </div>
            </section>
            <section class="login_message">
              <input
                type="text"
                maxlength="11"
                placeholder="验证码"
                v-model="captcha"
              />
              <img
                src="http://localhost:4000/captcha"
                class="get_verification"
                alt="captcha"
                @click="getCaptcha"
                ref="captcha"
              />
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:;" class="go_back" @click="$router.back()">
        <i class="iconfont icon-houtui"></i>
      </span>
    </div>
    <AlertTip
      :alertText="alertText"
      @closeTip="closeTip"
      v-show="showAlert"
    ></AlertTip>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import { reqSendCode, reqSmsLogin, reqPwdLogin } from "../../api";
export default {
  data() {
    return {
      loginWay: true, //true代表短信登錄，false代表密码登陆
      computeTime: 0, //计时的时间
      phone: "",
      showPwd: false, //是否显示密码
      pwd: "",
      name: "",
      code: "",
      captcha: "",
      showAlert: false, //是否显示提示框
      alertText: "",
    };
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  methods: {
    alertShow(alertText) {
      this.alertText = alertText;
      this.showAlert = true;
    },
    async getCode() {
      //如果没有计时
      if (!this.computeTime) {
        //启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) clearInterval(this.intervalId);
        }, 1000);

        //发送ajax请求
        const result = await reqSendCode(this.phone);
        if (result.code == 1) {
          //显示信息
          this.alertShow(result.msg);
          //停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },
    //异步登陆
    async login() {
      const { alertShow } = this;
      if (this.loginWay) {
        const { phone, rightPhone, code } = this;
        if (!rightPhone) {
          //手机号码不正确
          alertShow("手机号码不正确");
          return;
        } else if (!/^\d{6}$/gi.test(this.code)) {
          //验证码必须是6位数字
          alertShow("验证码必须是6位数字");
          return;
        }
        //短信验证码登录
        const result = await reqSmsLogin({ phone, code });
        if (result.code == 0) {
          const user = result.data;
          this.$store.dispatch("recordUserInfo", user);
          this.$router.replace("/profile");
        } else {
          alertShow(result.msg);
        }
      } else {
        const { name, pwd, captcha } = this;
        if (!name) {
          //用户名不能为空
          alertShow("用户名不能为空");
          this.getCaptcha();
          return;
        } else if (!pwd) {
          //密码不能为空
          alertShow("密码不能为空");
          return;
        } else if (!captcha) {
          //验证码不能为空
          alertShow("验证码不能为空");
          return;
        } else {
          //密码登录
          const result = await reqPwdLogin({ name, pwd, captcha });
          if (result.code == 0) {
            const user = result.data;
            console.log(user);
            this.$store.dispatch("recordUserInfo", user);
            this.$router.replace("/profile");
          } else {
            alertShow(result.msg);
            this.getCaptcha();
          }
        }
      }
    },
    closeTip() {
      this.showAlert = false;
    },
    getCaptcha() {
      //每次指定的src值不一样
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
  },
  components: {
    AlertTip,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.loginContainer
  width 100%
  height 100%
  background-color #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      width 100%
      text-align center
      h2
        font-size 40px
        font-weight 700
        color #02a774
      .login_header_title
        padding-top 40px
        >a
          color #333
          font-weight 400
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login_content
      form
        >div
          display none
          &.on
            display block
          input
            box-sizing content-box
            width 100%
            height 100%
            padding-left 10px
            border 1px solid #dddddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50% + 2px)
              font-size 14px
              background transparent
              border 0
              background-color #fff
              color #cccccc
              &.right_phone
                color black
            img
              height 48px
          .login_verification
            position relative
            height 48px
            margin-top 16px
            .switch_button
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              font-size 12px
              border 1px solid #ddd
              border-radius 8px
              transition all 0.3s
              padding 0 6px
              width 30px
              height 16px
              &.off
                background-color #fff
                .switch_text
                  float right
                  color #ddd
              &.on
                background-color #02a774
              >.switch_circle
                position absolute
                top -1px
                left -1px
                width 16px
                height 16px
                border 1px solid #dddddd
                border-radius 50%
                background-color #fff
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                transition transform 0.3s
                &.right
                  transform translateX(30px)
          .login_hint
            margin-top 20px
            color #999
            font-size 14px
            line-height 20px
            a
              color #02a774
        .login_submit
          width 100%
          height 42px
          margin-top 30px
          border 0
          border-radius 4px
          color #ffffff
          background-color #4cd96f
          font-size 16px
      .about_us
        display block
        margin-top 20px
        font-size 12px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      .iconfont
        font-size 20px
        color #999
</style>
