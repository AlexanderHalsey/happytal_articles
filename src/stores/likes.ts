import { defineStore } from 'pinia';
import type { ArticleDto } from '@/type_articles';

export type ArticleStore = {
    likedArticles: Array<ArticleDto>
};

export const useLikeStore = defineStore({
    id: 'likes',
    state: () => {
        return {
            likedArticles: []
        } as ArticleStore;
    },
    getters: {
        likes: state => state.likedArticles
    },
    actions: {
        changeLikeList(article: ArticleDto) {
            let pa = this.likedArticles.find((o: ArticleDto) => o.id === article.id);
            if (pa) {
                this.likedArticles.splice(this.likedArticles.indexOf(pa),1);
            } else {
                this.likedArticles.push(article);
                console.log(this.likedArticles);
            }
        }
    }
})