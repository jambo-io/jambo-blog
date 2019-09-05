
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image1 from '../../images/image1.jpg';

export default function Index(props) {
    const [page, setPage] = useState({
        current_page: 1,
        limit: 6,
        has_more: true,
    });
    const [articles, setArticles] = useState(
        []
    );

    useEffect(() => {
        if (page.has_more) {
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/articles?current_page=${page.current_page}&limit=${page.limit || 5}`)
                .then(res => {
                    const more_articles = res.data.articles;
                    setArticles([...articles, more_articles]);

                    if (res.data.has_more === false) {
                        setPage({ ...page, has_more: false });
                    }
                    console.log("response");
                    console.log(articles);
                });
        }
    }, [page]);

    function handleLoadMore() {
        console.log("carregar mais");
        if (page.has_more) {
            const next_page = page.current_page + 1;
            setPage({ ...page, current_page: next_page });
        }
    }

    return (
        <>

            <div className="index-card-deck">

                {articles && articles.map((article, i) =>
                    article && article.map((article, i) =>
                        <>
                            <div className="index-card">
                                <div className="index-card-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_HOST}/${article.wall_thumb_url})` }}>
                                    <div className="index-card-title">
                                        {article.title}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )}


            </div>

            <button onClick={handleLoadMore}>Ver Mais</button> {page.current_page} {page.has_more.toString()}

        </>
    );
}