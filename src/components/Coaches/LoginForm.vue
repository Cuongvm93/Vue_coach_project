<template>
    <!-- bg svg -->
    <Fragment>
      <SvgTypeLogin />
      <!-- close -->
      <a  
        :href="$route.query.to ? decodeRedirectUrl() : htaccessRedirect('home')"
        class="contentsClose"
      >
        <img
          src="~assets//common/images/icon/icon_close_black.svg"
          alt="close"
          width="19"
          height="19"
        />
      </a>
  
      <!-- contents body start -->
      <div class="contentsBody typeHeightAuto elSlideUp">
        <div class="contentsBodyLeft">
          <h2 class="headingLarge">
            <span class="colorOrange">{{ $t("trans.login.login") }}</span>
            {{ $t("trans.login.to_account") }}
          </h2>
  
          <div class="contentsInner typeWebkit">
            <form class="unitFormCommon contentsLayout">
              <div
                :class="[
                  'item',
                  $v.email.$dirty &&
                    !isEmailError &&
                    !errorMessagePassword.msg &&
                    'is-valid',
                ]"
                data-input="form"
              >
                <input
                  type="text"
                  :placeholder="$t('trans.login.email_placeholder')"
                  :class="[
                    'inputCommon',
                    'inputData',
                    !$v.email.$dirty
                      ? ''
                      : isEmailError || errorMessagePassword.msg
                      ? 'is-error'
                      : 'is-valid',
                  ]"
                  v-model.trim="email"
                  @blur="onBlurEmail"
                  @input="inputEmail"
                  autocomplete="off"
                />
              </div>
              <ErrorMessageInput
                :validation="validationEmail()"
                :idName="'c-message'"
              />
  
              <div class="item" data-input="form">
                <input
                  :type="isShowPassword ? 'text' : 'password'"
                  :placeholder="$t('trans.login.password_placeholder')"
                  :class="[
                    'inputCommon',
                    'inputData',
                    !$v.password.$dirty
                      ? ''
                      : isPasswordError || errorMessagePassword.msg
                      ? 'is-error'
                      : 'is-valid',
                  ]"
                  v-model.trim="password"
                  @blur="getErrorsPassword($v.password)"
                  @input="inputPassword"
                  autocomplete="off"
                /><span
                  @click="isShowPassword = !isShowPassword"
                  class="triggerPassText"
                  :class="isShowPassword ? 'is-text' : 'is-pass'"
                ></span>
              </div>
              <div class="blockMessage typeCommon">
                <div
                  v-if="errorsPassword.length || errorMessagePassword.msg"
                  class="contentsMessage typeRed elSlideUp is-view"
                >
                  {{ $t(errorsPassword[0]) || $t(errorMessagePassword.msg) }}
                </div>
                <div v-else class="contentsMessage"></div>
              </div>
            </form>
          </div>
  
          <div
            v-if="!isEnabledLogin || vuelidateExternalResultsEmail.length > 0"
            tabindex="0"
            class="buttonBgFill mTop typeDisable touchBlockAfter"
          >
            {{ $t("trans.login.please_enter") }}
          </div>
  
          <div
            v-else
            @click="onLocalLogin"
            tabindex="0"
            class="buttonBgFill mTop typeOrange touchBlockAfter"
          >
            {{ $t("trans.login.login_btn") }}
          </div>
  
          <div class="contentsText contentsLayout flex flexWrap mTop">
            <div class="flex checkboxCommonWrap">
              <p>
                <input
                  type="checkbox"
                  id="agreement"
                  class="checkboxCommon mRightNarrow"
                  v-model.trim="staySignIn"
                />
              </p>
              <label for="agreement" class="pointer">{{
                $t("trans.login.keep_logged_in")
              }}</label>
            </div>
  
            <p class="mLeftAuto">
              <nuxt-link to="/passre/"
                ><span class="tUl colorLinkNavy">{{
                  $t("trans.login.forgot_password")
                }}</span></nuxt-link
              >
            </p>
          </div>
  
          <LoginSNS
            :redirectWithResponse="redirectWithResponse"
            :autoRedirectRouter="autoRedirectRouter"
          />
        </div>
  
        <div class="contentsBodyRight typeCenter typeHr">
          <h2 class="headingMid">{{ $t("trans.login.signup") }}</h2>
  
          <div
            @click="handleClickSignup"
            tabindex="0"
            class="buttonBgFill typeMid mTop touchBlockAfter"
          >
            {{ $t("trans.login.free_signup") }}
          </div>
  
          <p class="fsSmall mTopNarrow">
            <nuxt-link to="/signup/"
              ><span class="linkLine">{{
                $t("trans.login.no_account")
              }}</span></nuxt-link
            >
          </p>
        </div>
        <recaptcha />
      </div>
    </Fragment>
    <!-- contents body end -->
  </template>
  
  <script>
  import { getAuth, RecaptchaVerifier } from "firebase/auth";
  import { Fragment } from "vue-frag";
  import ErrorMessageInput from "~/components/common/errorMessage/ErrorMessageInput.vue";
  import generate from "~/mixins/generate";
  import { mapFields } from "vuex-map-fields";
  import { v4 as uuidv4 } from "uuid";
  import { emailSchema } from "~/mixins/validateShema";
  import { required, maxLength } from "vuelidate/lib/validators";
  import LoginSNS from "./LoginSNS.vue";
  
  import { mapActions } from "vuex";
  import {
    mustNotJapaneseChar,
    mustEmailFormat,
    mustSymbol,
    mustNotSpace,
  } from "~/mixins/ruleValidator";
  import { setSessionStorageByItem } from "~/utils/common.js";
  import { MS_ERR_API, MS_ERR_API_FIRE_BASE, MS_FIRE_BASE } from "./Constants";
  import SvgTypeLogin from "~/components/common/errorLayout/SvgTypeLogin.vue";
  
  export default {
    name: "LoginForm",
    components: {
      Fragment,
      ErrorMessageInput,
      LoginSNS,
      SvgTypeLogin,
    },
    mixins: [generate],
    computed: {
      ...mapFields({
        staySignIn: "login.staySignIn",
        initEmail: "login.initRuleForm.email",
        initRuleForm: "login.initRuleForm",
        email: "login.email",
        errorsEmail: "login.errorsEmail",
        sessionId: "authen.loginInfo.sessionId",
        vuelidateExternalResultsEmail: "login.vuelidateExternalResultsEmail",
        isReLoading: "isReLoading",
        isDestroyMobile: "login.isDestroyMobile",
        isChangeUrl: "login.isChangeUrl",
        isCallingApi: "isCallingApi",
        user: "user",
      }),
  
      isEnabledLogin() {
        return (
          this.email &&
          this.password &&
          !this.isEmailError &&
          !this.isPasswordError &&
          !this.errorMessagePassword.msg
        );
      },
      isEmailError() {
        return this.$v.email.$error;
      },
      isPasswordError() {
        return this.$v.password.$error || this.vuelidateExternalResultsEmail[0];
      },
    },
  
    data: () => ({
      errorMessagePassword: { msg: "" },
      password: "",
      errorsPassword: [],
      isShowPassword: false,
    }),
  
    validations: {
      email: {
        required,
        maxLength: maxLength(255),
        mustNotJapaneseChar,
        mustEmailFormat,
        mustSymbol,
        mustNotSpace,
      },
      password: {
        required,
      },
    },
    beforeMount() {
      const duplicateLogin = localStorage.getItem("duplicateLogin");
      if (duplicateLogin === "true") {
        this.initEmail = this.email;
        this.$router.push("/error-duplicate-login/");
        localStorage.removeItem("duplicateLogin");
      }
    },
    async mounted() {
      window.addEventListener(this.BEFORE_UNLOAD, this.handleReload);
      $(".elSlideUp").slideDown();
      $(".elSlideUp").addClass("is-view");
      this.handleCreateRecaptchaVerify();
      this.isChangeUrl = true;
      if (this.isReLoading) {
        if (this.email) {
          this.$v.email.$touch();
        }
      }
      if (
        String(this.email) &&
        String(this.email) !== String(this.initRuleForm?.email)
      ) {
        this.$v.email.$touch();
      }
      if (this.email) {
        this.email = this.trimMultipleSpace(this.email, "");
      }
    },
    watch: {
      isDestroyMobile() {
        // this.password = "";
        // this.$v.email.$reset();
        // this.$v.password.$reset();
        // this.errorMessagePassword.msg = "";
      },
    },
  
    methods: {
      ...mapActions("authen", ["login", "setDataOtpApp", "logout"]),
      ...mapActions("otp", ["sendOTP"]),
      ...mapActions(["setNotify", "setLoading"]),
      ...mapActions("verify-path", ["setDataVerify"]),
      handleReload() {
        if (!this.isChangeUrl) {
          this.isReLoading = true;
        }
      },
      onBlurEmail() {
        this.email = this.trimMultipleSpace(this.email, "");
        this.$v.email.$touch();
      },
      validationEmail() {
        return this.getFieldError(
          this.$v,
          "email",
          emailSchema,
          this.vuelidateExternalResultsEmail,
          this.ruleForm
        );
      },
      inputEmail() {
        this.$v.email.$reset();
        this.errorMessagePassword.msg = "";
      },
      inputPassword() {
        this.$v.password.$reset();
        this.errorsPassword = [];
        this.errorMessagePassword.msg = "";
      },
  
      getErrorsPassword(model) {
        this.password = this.trimMultipleSpace(this.password, "");
        this.$v.password.$touch();
        const errors = [];
        if (model.$dirty) {
          !model.required && errors.push("trans.validate.password_required");
          this.errorsPassword = errors;
        }
        return errors;
      },
      handleClickSignup() {
        this.$router.push("/signup/");
      },
  
      async onLocalLogin() {
        if (this.isCallingApi) return;
        try {
          this.$v.email.$touch();
          const token = await this.$recaptcha.getResponse();
          const uuid = uuidv4();
          setSessionStorageByItem("username", this.email);
          //------loading------//
          this.isCallingApi = true;
          this.setLoading(true);
          //-------------------//
          if (token) {
            const data = {
              email: this.email,
              recaptchaToken: token,
              password: this.password,
              sessionId: uuid,
              staySignIn: this.staySignIn,
            };
            const res = await this.login(data);
            const status = res.data.status;
  
            if (status === "success") {
              // this.resetStateLogin();
              this.redirectWithMethodLogin(res);
            }
          }
          //------loading------//
          setSessionStorageByItem("username", this.email);
          //-------------------//
        } catch (error) {
          await this.$recaptcha.reset();
          const errorMessage = error.response?.data?.message;
          if (errorMessage === MS_ERR_API.VERIFY_PHONE) {
            this.user = {
              email: this.email,
              password: this.password,
              country_flag: error.response?.data?.data?.country_flag,
              country_id: error.response?.data?.data?.country_id,
              first_name_romaji: error.response?.data?.data?.first_name_romaji,
              last_name_romaji: error.response?.data?.data?.last_name_romaji,
              staySignIn: this.staySignIn,
            };
            this.$router.push("/verify-phone/");
          }
          if (errorMessage === MS_ERR_API.OTP_SMS) {
            this.redirectToOtpSms(error.response?.data?.data);
          }
          if (errorMessage === MS_ERR_API.WRONG_EMAIL_PASS) {
            this.errorMessagePassword.msg = MS_ERR_API.WRONG_EMAIL_PASS;
          } else {
            this.redirectWithResponse(errorMessage, error);
          }
          //------loading------//
          //-------------------//
        } finally {
          //------loading------//
          this.isCallingApi = false;
          this.setLoading(false);
          //-------------------//
        }
      },
  
      async redirectWithMethodLogin(res) {
        const methodLogin = res.data.data.methodLogin;
        const phoneNumber = res.data.data.phoneNumber;
        const languageEmail = res.data.data.languageEmail;
        this.initEmail = this.email;
        switch (methodLogin) {
          case 2:
            const payload = {
              phoneNumber,
              locale: languageEmail,
              forceLocale: languageEmail,
              redirect: true,
              path: "/login/input_2fa_sms/",
            };
  
            await this.sendOTP(payload);
            break;
          case 3:
            const data = {
              phoneNumber,
              languageEmail,
            };
  
            await this.setDataOtpApp(data);
            this.$router.push("/login/input_2fa_app/");
            break;
          default:
            await this.autoRedirectRouter(res);
            break;
        }
      },
  
      handleCreateRecaptchaVerify() {
        try {
          const auth = getAuth();
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
            },
            auth
          );
        } catch (error) {}
      },
  
      async autoRedirectRouter(res) {
        if (res.data.status === "success") {
          const accessTokenRes = res.data.data.accessToken;
          if (accessTokenRes) {
            const result = await this.$auth.setUserToken(accessTokenRes);
            if (result.data.status === "success") {
              this.sendCrossAuth(accessTokenRes);
              if (this.$route.query?.to) {
                // do nothing this logic write from callback page
                this.$router.push({
                  path: "/callback/",
                  query: {
                    to: this.$route.query?.to,
                  },
                });
              } else {
                if (
                  this.email === localStorage.getItem("email") &&
                  localStorage.getItem("keyChangeEmail")
                ) {
                  this.$router.push("/setting/security/");
                  localStorage.removeItem("email");
                  return;
                }
                this.resetStateLogin();
                this.$router.push("/setting/");
              }
              localStorage.setItem("isLogin", true);
            } else {
              await this.$auth.logout();
            }
          }
        }
      },
      getExpiresToken(token) {
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        let jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );
        const { exp } = JSON.parse(jsonPayload);
  
        return exp;
      },
  
      async redirectWithResponse(mess, error) {
        this.initEmail = this.email;
        switch (mess) {
          case MS_ERR_API.ACCOUNT_LOCK:
            this.$route.path !== "/message-locked/" &&
              this.$router.push("/message-locked/", { lang: this.$i18n.locale });
            break;
          case MS_ERR_API.MAIL_CONFIRM:
            this.$router.push("/error-fa/");
            break;
          case MS_ERR_API.DUPLICATE:
            this.$router.push("/error-duplicate-login/");
            break;
          case MS_ERR_API.ERROR:
            this.$router.push("/error_system/");
            break;
          case MS_ERR_API.NOT_EXIST:
            this.$router.push("/error-sns/");
            break;
          case MS_ERR_API.NOT_ACTIVE:
            const notify = {
              open: true,
              text: mess ? this.$t(mess) : this.customMessage(error),
              type: "error",
            };
            await this.setNotify(notify);
            break;
        }
      },
  
      customMessage(error) {
        switch (error.code) {
          case MS_ERR_API_FIRE_BASE.CLOSE_BY_USER: {
            return this.$t(MS_FIRE_BASE.CLOSE_BY_USER);
          }
          case MS_ERR_API_FIRE_BASE.ACCOUNT_EXIST: {
            return this.$t(MS_FIRE_BASE.ACCOUNT_EXIST);
          }
          case MS_ERR_API_FIRE_BASE.CANCELLED: {
            return this.$t(MS_FIRE_BASE.CANCELLED);
          }
          default:
            return error.message;
        }
      },
  
      async redirectToOtpSms(data) {
        try {
          const payload = {
            relatedAccessId: data.relatedAccessId,
            phoneNumber: data.phoneNumber,
            locale: data.languageEmail,
            forceLocale: data.languageEmail,
            email: this.email,
            redirect: true,
            path: "/login/input_sms/",
          };
  
          await this.setDataVerify(payload);
          await this.sendOTP(payload);
        } catch (error) {
          console.log(error);
        }
      },
    },
  
    beforeDestroy() {
      // this.email = "";
      this.isReLoading = false;
      window.removeEventListener(this.BEFORE_UNLOAD, this.handleReload);
    },
  };
  </script>
  
  <style></style>
  