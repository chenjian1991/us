<template>
    <div class="aboutBox">
        </br>
        <div class="row terms">
            <div class="bs-component">
                <div>
                   
                    <div class="box-container">
                            <div class="right-part">
                        <div class="title">Articles in this section</div>
                        <ul>
                            <li>
                                <router-link to='/terms'> · User Agreement</router-link>
                            </li>
                             <li >
                                <router-link to='/privice'> · Privacy Policy</router-link>
                            </li>
                             <li>
                                <router-link class="active" to='/disclaimer'> · Disclaimer</router-link>
                            </li>
                             <li>
                                <router-link to='/fee'> · Fee Schedule</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-body paddong_30_left left-part">
                         <div class="panel-heading no-padding">
                        <h3 class="panel-title">Legal Statement</h3>
                    </div>
                        <p class="font-weight">
	                        Article 1
                        </p>
                        <p class="margintop">
                            This website is intended to provide to its best efforts financial products and trading platform of professional and international standards for the majority of global digital assets enthusiasts and investors, on the precondition that it does not violate any of the relevant laws and regulations of the United States. It is prohibited to use this Website for the purpose of engaging in such illegal trading activities as money laundering, smuggling and commercial bribery; where any account is found to involve any of the aforementioned illegal activities, this Website will freeze the account and immediately report such account to the competent authority.
                        </p>
                        <p class="font-weight">
                            Article 2
                        </p>
                        <p class="margintop">
                            Where a competent authority, on the strength of applicable investigation certificate, requests this Website to cooperate with the investigation relating to any designated user, or if the account of the user is subject to such measures as closure, freezing, or transfer, this Website will, as is required by the competent authority, assist such authority by providing corresponding data relating to the account user, or carrying out the corresponding operation as is required by the competent authority; for any disclosure of the user’s privacy, failure in the operation of the account and any such losses arising therefrom, this Website will not be held liable in any manner whatsoever.
                        </p>
                        <p class="font-weight">
                            Article 3
                        </p>
                        <p class="margintop">
                            Where a user of this Website violates any provision in this statement and consequently violates any clause of relevant laws of the United States, this Website, as a service provider, is obliged to improve the rules and services of this platform. However, this Website does not have either the motivation for violating any law of the United States, nor has this Websites commits any actual breach of any of the relevant laws of the laws of the United States, and will not assume any joint or several liability for the acts of the user.
                        </p>
                        <p class="font-weight">
                            Article 4
                        </p>
                        <p class="margintop">
                            Any person that logs into this Website or uses this Website directly or indirectly shall be deemed as having accepted the restriction of this Website voluntarily.
                        </p>
                        <p class="font-weight">
                            Article 5
                        </p>
                        <p class="margintop">
                            Any matter not covered in this statement shall be handled in accordance with relevant laws and regulations of the United States. Where this statement is in conflict with relevant laws and regulations of the United States, the latter shall prevail.
                        </p>
                    </div>
                
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              
            }
        },
        methods: {
        },
        computed:{
             languageChange(){
                return  this.$store.state.app.countryLanguage;//  返回全局state的状态值
            },
        },
        watch:{
              languageChange(val,oldVal){//监听全局语言的状态
            },
        },
        mounted(){
        }
    }
</script>

<style scoped lang="less">

</style>