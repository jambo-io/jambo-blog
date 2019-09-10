
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Image1 from '../../images/image1.jpg';

export default function Index(props) {

    const [loading, setLoading] = useState({
        isLoading: true,
    });
    const [page, setPage] = useState({
        current_page: 1,
        limit: 10,
        has_more: true,
    });
    const [articles, setArticles] = useState([]);
    const [once, setOnce] = useState({
        once: false,
    });


    useEffect(() => {
        if (page.has_more) {
            axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/articles?current_page=${page.current_page}&limit=${page.limit || 5}`)
                .then(res => {

                    const more_articles = res.data.articles;
                    const total_pages = res.data.total_pages;
                    if (once.once === true) {
                        setArticles([...articles, more_articles]);
                        setLoading({ isLoading: false });
                    }
                    if (res.data.has_more === false) {
                        setPage({ ...page, has_more: false });
                    }
                    /* Avoid infinit Loop */
                    if (once.once === false) {
                        setOnce({ once: true });
                        setPage({ ...page, current_page: total_pages });
                    }
                    console.log("response");
                    console.log(articles);
                });
        }
    }, [page]);

    function handleLoadMore() {
        console.log("carregar mais");
        if (page.has_more) {
            const next_page = page.current_page - 1;
            setPage({ ...page, current_page: next_page });
        }
    }

    return (
        <>
            <div className="index-card-deck">
                {loading.isLoading && (
                    <div className="Loading" />
                )}

                {loading.isLoading === false && articles && articles.map((article, i) =>
                    article && article.map((article, i) =>
                        <>
                            <Link to={`/show/${article.id}`}>
                                <div className="index-card">
                                    <div className="index-card-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_HOST}/${article.wall_thumb_url})` }}>
                                        <div className="index-card-title">
                                            <Link to={`/show/${article.id}`}>{article.title}</Link>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )
                )}


            </div>

            {page.has_more && (
                <div className="wrap-button">
                    <button className="bt_seemore" onClick={handleLoadMore}>Ver Mais</button>
                </div>
            )}



        </>
    );
}