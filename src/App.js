import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import './App.css';
import Image1 from './images/image1.jpg';

const long_text = `<p>O interesse em como o <b>potencial humano é libertado é pessoal</b> e não acadêmico, pois milhões em toda parte, anseiam vir-a-ser, como Bahá´u´lláh o expressa, totalmente dignos, ao invés de permanecerem presos e humilhados. Naturalmente, os ensinamentos de Bahá´u´lláh, acerca do processo de transformação, são estimulantes para a mente, mas o conhecimento deles tem também um propósito prático, como poderemos perceber, pois o conhecimento consciente do que acontece a si próprio durante esse processo auxiliar a consolidar as vantagens e capacita-o (a identificar e aceitar), (freqüentemente através de experiências dolorosas, que possam, em princípio, parecerem desnecessárias ou cruéis), as oportunidades para crescimento posterior.</p>
<p>Lorem ipsum dolor sit amet, te euripidis concludaturque mea, laoreet deleniti et vis, an nobis nostro eos. Ad nibh omittam quo, quo alienum eloquentiam ut. Cu eius libris definitiones mei. Ei vix accusam periculis. Dicam alterum disputationi an sed, summo movet dolores cu nec. An nominati efficiendi cum, ius ut suscipit incorrupte signiferumque.</p>
<blockquote>My dear friend! If thou didst know how dear thou art to ‘Abdu’l-Bahá, thou wouldst spread wings, and through excess of joy, soar and begin teaching all that country.</blockquote>
<p>Lorem ipsum dolor sit amet, te euripidis <img src="/image2.jpg"> concludaturque mea, laoreet deleniti et vis, an nobis nostro eos. Ad nibh omittam quo, quo alienum eloquentiam ut. Cu eius libris definitiones mei. Ei vix accusam periculis. Dicam alterum disputationi an sed, summo movet dolores cu nec. An nominati efficiendi cum, ius ut suscipit incorrupte signiferumque.</p>
<p>Lorem ipsum dolor sit amet, te euripidis concludaturque mea, laoreet deleniti et vis, an nobis nostro eos. Ad nibh omittam quo, quo alienum eloquentiam ut. Cu eius libris definitiones mei. Ei vix accusam periculis. Dicam alterum disputationi an sed, summo movet dolores cu nec. An nominati efficiendi cum, ius ut suscipit incorrupte signiferumque.</p>
<p>Lorem ipsum dolor sit amet, te euripidis concludaturque mea, laoreet deleniti et vis, an nobis nostro eos. Ad nibh omittam quo, quo alienum eloquentiam ut. Cu eius libris definitiones mei. Ei vix accusam periculis. Dicam alterum disputationi an sed, summo movet dolores cu nec. An nominati efficiendi cum, ius ut suscipit incorrupte signiferumque.</p>`;

export default function App() {
  const [article, setArticle] = useState(
    {
      text: long_text,
    }
  );



  useEffect(() => {

  }, []);

  return (
    <>

      <div className="wall-image" style={{ backgroundImage: `url(${Image1})` }}>

      </div>

      <div className="text-wrapper">
        <h1>Quais são as Origens da Fé Bahá'í?</h1>
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