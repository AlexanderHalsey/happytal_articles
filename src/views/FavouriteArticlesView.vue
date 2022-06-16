<script lang="ts">
  import { defineComponent } from 'vue'
  import type { ArticleDto } from '../type_articles';

  import { useLikeStore } from '../stores/likes';
  import { 
    mapStores,
    mapActions,
    mapState 
  } from 'pinia';

  import { 
    ReadOutlined,
    HeartOutlined,
    HeartFilled,
    LoadingOutlined,
    SearchOutlined
  } from '@ant-design/icons-vue';


  export default defineComponent({
    data() : {
      filter_value: string,
      filtered_articles: Array<ArticleDto>,
    } {
      return {
        filter_value: "",
        filtered_articles: [],
      }
    },
    created() {
      this.filtered_articles = this.likes;
    },
    components: {
      ReadOutlined,
      HeartOutlined,
      HeartFilled,
      LoadingOutlined,
      SearchOutlined,
    },
    computed: {
      ...mapStores(useLikeStore),
      ...mapState(useLikeStore, ['likes']),
    },
    methods: {
      onChange (val: string) {
        this.filter_value = val;
        this.filtered_articles = this.likes.filter((article: ArticleDto): boolean => {
          return article.title.toLowerCase().includes(this.filter_value.toLowerCase());
        })
      },
      ...mapActions(useLikeStore, ['changeLikeList'])
    },
  });
</script>

<template>
  <main>
    <div class="scroll_container">
      <div class="filter_container">
        <div class="filter">
          <a-input
            :bordered="false"
            :value="filter_value"
            placeholder="Rechercher un article ..."
            size="large"
            @input="(event: any) => onChange(event.target?.value)"

          />
          <search-outlined />
        </div>
      </div>
      <a-row justify="center" :gutter="[16,16]" class="scroll_view">
        <a-col v-for="article in filtered_articles" :key="article.id" :xs="24"  :md="12" :lg="8" :xl="6">
          <a-card hoverable bordered class="card_format">
            <template #cover>
              <img
                alt="example"
                v-bind:src="article.image.url"
              />
            </template>
            <div class="article-title"><p>{{article.title}}</p></div>
            <template #actions>
              <router-link v-bind:to="`/article/${article.id}`"><read-outlined /></router-link>
              <div v-if="likes.find(a => a.id === article.id)" @click="changeLikeList(article)">
                <heart-filled style="color: #d43c5c" />
              </div>
              <div v-else @click="changeLikeList(article)">
                <heart-outlined />
              </div>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </main>
</template>

<style scoped>
  main {
    height: 90vh;
    padding: 8px 50px;
    background-color: rgba(244,164,68,.2);
  }
  .filter_container {
    padding-top: 20px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
  }
  .filter {
    width: 100%;
    display: flex;
    border-radius: 20px;
    align-items: center;
    border: 1px solid lightgray;
    background-color: white;
    overflow: hidden;
  }
  @media screen and (min-width: 600px ) {
    .filter {
      width: 80%;
    }
  }
  @media screen and (min-width: 1000px) {
    .filter {
      width: 60%;
    }
  }
  .filter > * {
    height: 150%;
    display: flex;
    align-items: center;
  }
  .filter> *:nth-child(2) {
    padding: 0px 10px;
  }
  .scroll_view {
    height: 76vh;
    overflow-y: scroll;
  }
  .card_format {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: initial;
  }
  .card_format > :nth-child(2) {
    padding: 0;
    display: flex;
    flex-direction: column;
    vertical-align: middle;
  }
  .article-title {
    padding: 8px;
    text-align: center;
    font-size: 16px;
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  }
</style>