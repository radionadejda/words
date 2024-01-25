import { action, observable, makeObservable, computed, runInAction } from 'mobx';

import { getWords } from '../services/getWords';

class WordsStore {
    words = [];
    loading = false;
    language = '';

    constructor() {
        makeObservable(this, {
            words: observable,
            filteredWords: computed,
            loading: observable,
            language: observable,
            getWordsFromApi: action
        });
        this.initLanguage();
    }

    initLanguage() {
        const storedLanguage = localStorage.getItem('language');
        this.language = storedLanguage || 'english';
    }

    get filteredWords() {
        return this.words.filter(word => word[this.language]);
    }

    getWordsFromApi = action(async () => {
        this.loading = true;
        try {
            const newWords = await getWords();
            runInAction(() => {
                this.words = newWords;
            });
        } catch (error) {
            console.error('Error fetching words:', error);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    });
}

export default new WordsStore();
