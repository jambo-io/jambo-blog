
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import Image1 from '../../images/image1.jpg';
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from 'axios';

export default function Show(props) {
    const [article, setArticle] = useState(
        {
            title: "Nenhum Título",
            text: "",
            wall: "",
        }
    );

    useEffect(() => {
        const id = props.match.params.id;

        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/api/v1/articles/${id}`)
            .then(res => {
                console.log("response");
                console.log(res);
                setArticle({ title: res.data.title, text: res.data.article, wall: res.data.wall_url })
            });

    }, []);

    return (
        <>

            <div className="wall-image" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_HOST}${article.wall})` }}>
                <Link to={"/"} title="Voltar">
                    <IoIosArrowRoundBack className="icon" size={"3em"} color={"white"} />
                </Link>
                <div className="article-menu">

                </div>

            </div>

            <div className="text-wrapper">
                <h1 className="title">{article.title}</h1>
                <article>
                    {parse(article.text)}
                </article>
                <div className="circles-container">
                    <div className="circle"></div><div className="circle"></div><div className="circle"></div>
                </div>
            </div>

        </>
    );
}