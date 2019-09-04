import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import useArticleForm from './CustomHooks';
import { withRouter, Redirect } from "react-router-dom";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function New(props) {

    const [article, setArticle] = useState(
        {}
    );




    const submit = () => {
        const title = inputs.title;
        const text = article.article;

        console.log("debugin");
        console.log(text);

        const wall = article.wall;
        const formData = new FormData()

        formData.append('article[wall]', wall, 'image.jpg');

        formData.append('article[title]', title);
        formData.append('article[article]', text);

        console.log("Title: ");
        console.log(title);
        console.log("Text:");
        console.log(text);
        console.log("Wall");
        console.log(wall);
        console.log("Form");
        console.log(formData);



        axios({
            url: `http://localhost:3000/api/v1/articles`,
            method: "POST",
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        }).then(res => {
            console.log("Responded");
            const id = res.data.id;
            props.history.push(`/show/${id}`);
        })
    }

    const onChange = (e) => {
        const file = e.target.files[0];
        setArticle({ ...article, wall: file });
        console.log("Files");
        console.log(file);

    }

    const inputEl = useRef(null);
    const { inputs, handleInputChange, handleSubmit } = useArticleForm(submit);

    const editorConfiguration = {

        plugins: ['Essentials', 'Alignment', 'Paragraph', 'Bold', 'Italic', 'Image', 'CKFinder', 'BlockQuote', 'ImageUpload'],
        alignment: {
            options: ['left', 'center', 'right']
        },
        toolbar: ['bold', 'italic', '|', 'undo', 'redo', 'imageUpload', 'blockquote', 'alignment'

        ],

        ckfinder: {
            options: {

            },
            // The URL that the images are uploaded to.
            uploadUrl: 'http://localhost:3000/api/v1/ckeditor'
        }
    };



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
                    data=""
                    config={editorConfiguration}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                        console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName));
                        console.log(Array.from(editor.ui.componentFactory.names()));
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setArticle({ ...article, article: data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <div>
                    <input type='file' id='wall' name='wall' onChange={onChange} />
                </div>

                <button type="submit">Publicar</button>
            </form>
        </>
    );
}

export default withRouter(New);