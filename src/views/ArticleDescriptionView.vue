<script lang="ts">
  import { defineComponent } from 'vue';
  import type { 
    ArticleDto,
    PartnerDto,
  } from '../type_articles';
  import { 
    LoadingOutlined,
    ArrowLeftOutlined
  } from '@ant-design/icons-vue';
  import { marked } from 'marked';

  marked.use({ gfm: true });

  export default defineComponent({
    data() : {
      loading: boolean,
      article: ArticleDto | null,
      error: string | null,
      markdown: string,
      partners: [string, string][]
    } {
      return {
        loading: false,
        article: null,
        error: null,
        markdown: "#bob",
        partners: []
      }
    },
    created() {
      this.fetchData();
    },
    watch: {
      '$route': 'fetchData'
    },
    components: {
      LoadingOutlined,
      ArrowLeftOutlined
    },
    methods: {
      async fetchData () {
        this.error = null
        this.loading = true
        const rawData = await fetch(`https://cms-beta.happytal.com/articles/${this.$route.params.id}`);
        this.loading = false;
        if (rawData.ok) {
          const data = await rawData.json();
          console.log(data);
          this.article = data;
          this.markdown = marked.parse(data.content);
          this.partners = data.partners.map((partner: PartnerDto) => {
            return [
              ["Name : ", partner.name],
              ["Description : ", marked.parse(partner.description)],
              ["Email : ", partner.email],
              ["Website : ", partner.website],
              ["Phone : ", partner.phone],
              ["Logo", partner.logo.url]
            ].filter(p => p[1]);
          });
        }
      },
    },
  });
</script>

<template>
  <div class="article_page">
    <div v-if="loading" class="loading">
      <loading-outlined />
    </div>
    <div v-if="error">
      {{ error }}
    </div>

    <div v-if="article" class="article_container">
      <a-row justify="center" class="row">
        <a-col :sm="23" :md="22" :lg="19" :xl="15" class="article">
          <router-link v-bind:to="'/'">
            <div class="go-back">
              <arrow-left-outlined class="left-arrow" />
              <h3>Retour</h3>
            </div>
          </router-link>
          <p class="article_title"><strong>{{article.title}}</strong></p>
          <img v-bind:src="article.banner.url" class="banner_img" />
          <div class="content">
            <div v-html="markdown"></div>
            <a-row justify="center" :gutter="[16,16]">
              <a-col v-for="(partner, index) in partners" :key="index" :xs="24" :sm="12" :lg="8">
                <div class="partner">
                  <div class="bottom-circle">
                  <div class="logo_container">
                    <img v-bind:src="partner[partner.length-1][1]" class="logo"/>
                  </div>
                  </div>
                  <div class="logo_content">
                    <div v-for="(p,i) in partner" :key="i">
                      <div v-if="p[0] === 'Name : '"><p><strong>{{p[1]}}</strong></p></div>
                      <div v-else-if="p[0] === 'Description : '"><div v-html="p[1]" class="partner_description"></div></div>
                      <div v-else-if="p[0] === 'Logo'"></div>
                      <div v-else-if="p[0] === 'Website : '"><strong>{{p[0]}}</strong><a v-bind:href="p[1]"><div class="break_word">{{p[1]}}</div></a></div>
                      <div v-else>
                        <p><strong>{{p[0]}}</strong>{{p[1]}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style scoped>
  .article_page {
    background-color: rgba(244,164,68,.2);
    height: 90vh;
    overflow-y: scroll;
    width: 100%;
  }

  .article_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .row {
    width: 100%;
  }
  .article {
    min-height: 91vh;
    width: 100%;
    background-color: white;
    border-left: 2px solid darkgrey;
    border-right: 2px solid darkgrey;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .go-back {
    display: flex;
    margin-left: 10px;
    margin-top: 10px;
  }
  .left-arrow {
    padding-top: 5px;
  }
  .go-back > * {
    margin: 5px;
    color: #d43c5c;
  }
  .article_title {
    margin-top: 15px;
    font-size: 28px;
    text-align: center;
  }
  .content {
    padding: 20px;
  }
  .loading {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .banner_img {
    max-height: 150px;
    width: 100%;
    object-fit: cover;
    border-top: 2px solid darkgray;
    border-bottom: 2px solid darkgray;
  }
  .partner {
    border-radius: 25px;
    border: 2px solid darkgrey;
    background-color: rgba(122,84,216,.1);
    padding: 10px 20px;
    position: "relative";
    margin-top: 50px;
    font-size: 13px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  .bottom-circle {
    position: absolute;
    top: 31px;
    left: 40%;
    width: 56px;
    height: 112px;
    line-height: 112px;
    text-align: center;
    color: white;
    margin: 0 1px;
    background: white;
    border-radius: 80px 0 0 80px;
    border-bottom: 2px solid darkgrey;
    border-left: 2px solid darkgrey;
    border-top: 2px solid darkgrey;
    transform: rotate(270deg);
  }
  .logo_container {
    margin-top: 4px;
    margin-left: 4px;
    background-color: white;
    width: 100px;
    height: 100px;
    border: 2px solid #d43c5c;
    border-radius: 100%;
    padding: 10px;
    transform: rotate(90deg); 
    box-shadow: 0 4px 8px 0 rgba(212, 60, 92, 0.2), 0 6px 20px 0 rgba(212, 60, 92, 0.19);
    word-break: break-word;
  }
  .logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(0, -25%);
    border-radius: 100%;
  }
  .logo_content {
    margin-top: 50px;
  }
  .break_word {
    word-break: break-all;
  }
  .partner_description {
    font-size: 10px;
  }
</style>
