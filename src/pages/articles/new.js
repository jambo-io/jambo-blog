import React, { useRef } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import useArticleForm from './CustomHooks';

export default function New() {


    const submit = () => {
        console.log(inputEl.current.props.data);
    }
    const inputEl = useRef(null);
    const { inputs, handleInputChange, handleSubmit } = useArticleForm(submit);


    return (
        <>
            <h1>Using CKEditor 5 build in React</h1>
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
                        console.log({ event, editor, data });
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