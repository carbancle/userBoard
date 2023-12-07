import React from 'react'
import StartingPage from '../components/StartingPage/StartingPage'
import { ArticleContextProvider } from '../store/article-context'

function HomePage() {
    return (
        <ArticleContextProvider>
            <StartingPage />
        </ArticleContextProvider>
    )
}

export default HomePage