import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

const items = [

    {
        src: '../education.svg',
        altText: 'Educação',
        caption: 'Colaboração com a educação e aprendizado'
    },
    {
        src: '../Data.svg',
        altText: 'Trabalho',
        caption: 'Uma nova maneira de trabalhar com suas questões'
    },
    {
        src: '../quiz.svg',
        altText: 'Questionário',
        caption: 'Monte suas atividades mais facilmente'
    },
    {
        src: '../Questions.svg',
        altText: 'Questões',
        caption: 'Você pode compartilhar suas questões e colaboras com a comunidade'
    },
    {
        src: '../teacher.svg',
        altText: 'Professores',
        caption: 'Uma aplicativo feito para professores'
    },
    {
        src: '../Group.svg',
        altText: 'Grupo',
        caption: 'Uma rede social para conhecer novas pessoas'
    }
];

const Carocel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
                className="text-center"
            >
                <style>
                    {`
                .box{
                    height:85vh;
                    width:100vw;
                    align:center;
                    background: rgba(233, 109, 100, 0.7);
                }
                .imgCarousel{
                    margin-top: 40px;
                    height:60vh;
                    width:80vw;
                    align:center;
                }
              
              `}
                </style>
                <div className="box">
                    <img src={item.src} alt={item.altText} className="mt-4 mb-4 imgCarousel" />
                    <br />
                    <br />
                    <br />
                    <br />
                    <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
                </div>

            </CarouselItem>
        );
    });

    return (
        <Carousel
            activeIndex={activeIndex}
            next={next}
            previous={previous}
        >
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
}

export default Carocel;