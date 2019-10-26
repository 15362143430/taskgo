import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import Layout from './components/Layout.vue'
<<<<<<< HEAD
=======

// 标签
>>>>>>> 第二次
import allTagList from './components/allTagList.vue'
// import Sign from './components/Sign.vue'
import newsList from './components/newsList.vue'
import videosList from './components/videosList.vue'
import audiosList from './components/audiosList.vue'
import booksList from './components/booksList.vue'
import teamList  from './components/teamList.vue'
import guessList from './components/guessList.vue'

<<<<<<< HEAD
=======
// 新闻
import allNews from './components/allNews.vue'

// 竞猜
import allGuess from './components/allGuess.vue'
import allTeams from './components/allTeams.vue'

// 书籍
import allBooks from './components/allBooks.vue'

// 音频
import allAudios from './components/allAudios.vue'

// 视频
import allVideos from './components/allVideos.vue'

// 任务
import allTasks from './components/allTasks.vue'

>>>>>>> 第二次
let router = new Router({
    routes:[
        { path: '/layout', component: Layout,children:[
            { path: 'alltaglist', component: allTagList },
            { path: 'newslist', component: newsList },
            { path: 'videoslist', component: videosList },
            { path: 'audioslist', component: audiosList },
            { path: 'bookslist', component: booksList },
            { path: 'teamlist', component: teamList },
<<<<<<< HEAD
            { path: 'guesslist', component: guessList }
=======
            { path: 'guesslist', component: guessList },
            { path: 'allnews', component: allNews },
            { path: 'allguess', component: allGuess },
            { path: 'allteams', component: allTeams },
            { path: 'allbooks', component: allBooks },
            { path: 'allaudios', component:allAudios },
            { path: 'allvideos', component: allVideos },
            { path: 'alltasks', component: allTasks }
>>>>>>> 第二次
        ] },
    ]
})

export default router;