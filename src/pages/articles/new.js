import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useArticleForm from './CustomHooks';
import { withRouter, Redirect } from "react-router-dom";

function New(props) {

    const [article, setArticle] = useState(
        {}
    );

    const submit = () => {
        const title = inputs.title;
        const text = article.article;
        console.log("debugin");
        console.log(text);

        axios.post(`http://localhost:3000/api/v1/articles`, {
            article: {
                title: title,
                article: text,
            }
        }).then(res => {
            console.log("Responded");
            const id = res.data.id;
            //props.history.push(`/show/${id}`);
        })
    }

    const inputEl = useRef(null);
    const { inputs, handleInputChange, handleSubmit } = useArticleForm(submit);



    return (
        <>
            <h1>Novo Artigo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input type="text" name="title" onChange={handleInputChange} required />
                </div>
                <CKEditor
                    name="article"
                    ref={inputEl}
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setArticle({ article: data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <button type="submit">Publicar</button>
            </form>
        </>
    );
}

export default withRouter(New);