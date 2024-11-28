"use client";

import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap';
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { Loader2Icon } from 'lucide-react';
import { Product } from '@/libs/products';
import ProductCard from '../ProductsArchive/ProductCard';

export default function DiscoveryForm({
    randomProducts
}: {
    randomProducts: Product[]
}) {
    const galleryRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean | null>(false);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useGSAP(() => {
        console.log(isMobile);
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            if (isMobile) {
                gsap.killTweensOf(galleryRef.current);
                gsap.killTweensOf(formRef.current);
                return;
            };

            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top 36px",
                end: "bottom bottom",
                pin: galleryRef.current,
                markers: true,
            })

        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 1024);

        const resizeHandler = () => {
            setIsMobile(window.innerWidth <= 1024);
        }

        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);
    }, []);

    useEffect(() => {
        if (formRef.current) {
            const questions = formRef.current.querySelectorAll('div.question');
            const images = galleryRef.current?.querySelectorAll('img');

            const currentQuestion = Array.from(questions).findIndex(question => !answers[question.id]);
            if (currentQuestion > -1) {
                if (images && images.length > 0) {
                    images.forEach(image => {
                        if (image.dataset.question === questions[currentQuestion].id) {
                            image.style.opacity = '1';
                        } else {
                            image.style.opacity = '0';
                        }
                    })
                }

                questions[currentQuestion].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [answers]);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        setSubmitted(true);

        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 100);

        setTimeout(() => {
            setLoading(false);
        }, 3200);
    }

    return (
        <>
            <div className={'flex gap-8 w-full max-w-7xl mx-auto relative mb-12' + (isMobile ? ' hidden' : '')} ref={wrapperRef}>
                <div className={'flex h-[calc(100vh-76px)] w-3/5 rounded-lg overflow-hidden relative bg-[url("data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoKAAYAAgA0JZwC/OEQ/F81dgAAzjLLkhj82SCDsJOVoFY4+GTcVJfiWK+tmhVSuVAAAA==")] bg-cover'} ref={galleryRef}>
                    <QuestionImage src="/home-banner.jpg" alt="" dataQuestion="type" fit="contain" />
                    <QuestionImage src="/discovery/frequency.jpg" alt="" dataQuestion="frequency" fit="cover" />
                    <QuestionImage src="/discovery/budget.jpg" alt="" dataQuestion="budget" fit="cover" />
                    <QuestionImage src="/discovery/goal.jpg" alt="" dataQuestion="goal" fit="cover" />
                </div>
                <div className={'w-2/5 flex flex-col items-center gap-32 pb-16 ' + (submitted ? ' opacity-50 pointer-events-none' : '')} ref={formRef}>
                    <Question id="type" first>
                        <h2 className='text-2xl font-bold'>Quel type de course pratiquez-vous ?</h2>
                        <p className='text-gray-500 mt-2'>Choisissez le type de course qui vous correspond le mieux</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'road' })}
                                selected={answers.type === 'road'}>Sur route</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'track' })}
                                selected={answers.type === 'track'}>Sur piste</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'trail' })}
                                selected={answers.type === 'trail'}>Trail</AnswerButton>
                        </div>
                    </Question>
                    <Question id="frequency" disabled={answers.type === undefined}>
                        <h2 className='text-2xl font-bold'>Quelle est votre fréquence de course ?</h2>
                        <p className='text-gray-500 mt-2'>Cette information nous aide à déterminer la durabilité nécessaire</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '1_2' })}
                                selected={answers.frequency === '1_2'}>1-2 fois par mois</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '3_4' })}
                                selected={answers.frequency === '3_4'}>3-4 fois par mois</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '1_2_week' })}
                                selected={answers.frequency === '1_2_week'}>1-2 fois par semaine</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '3_week' })}
                                selected={answers.frequency === '3_week'}>3+ fois par semaine</AnswerButton>
                        </div>
                    </Question>
                    <Question id="budget" disabled={answers.frequency === undefined}>
                        <h2 className='text-2xl font-bold'>Quel est votre budget ?</h2>
                        <p className='text-gray-500 mt-2'>Pour vous proposer les meilleures options dans votre gamme de prix</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: 'less_100' })}
                                selected={answers.budget === 'less_100'}>Moins de 100€</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: '100_200' })}
                                selected={answers.budget === '100_200'}>100€ - 200€</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: 'more_200' })}
                                selected={answers.budget === 'more_200'}>Plus de 200€</AnswerButton>
                        </div>
                    </Question>
                    <Question id="goal" disabled={answers.budget === undefined}>
                        <h2 className='text-2xl font-bold'>Préparez vous un objectif ?</h2>
                        <p className='text-gray-500 mt-2'>Pour vous proposer des chaussures adaptées à votre objectif</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'ultra' })}
                                selected={answers.goal === 'ultra'}>Ultra et +</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'marathon' })}
                                selected={answers.goal === 'marathon'}>Marathon</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'semi_marathon' })}
                                selected={answers.goal === 'semi_marathon'}>Semi-marathon</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: '10km' })}
                                selected={answers.goal === '10km'}>10km</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: '5km' })}
                                selected={answers.goal === '5km'}>5km</AnswerButton>
                        </div>
                    </Question>
                    <button
                        onClick={onSubmit}
                        disabled={answers.goal === undefined}
                        className='bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:pointer-events-none'>
                        Valider
                    </button>
                </div>
            </div>
            <div className={'max-w-7xl w-full mx-auto flex items-center justify-center flex-col gap-8' + (isMobile ? '' : ' hidden')}>
                <div className='flex flex-col items-center gap-8 w-full'>
                    <Image src="/home-banner.jpg" alt="" width={1920} height={1080} className='w-full max-h-[400px] object-cover' />
                    <Question id="type">
                        <h2 className='text-2xl font-bold'>Quel type de course pratiquez-vous ?</h2>
                        <p className='text-gray-500 mt-2'>Choisissez le type de course qui vous correspond le mieux</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'road' })}
                                selected={answers.type === 'road'}>Sur route</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'track' })}
                                selected={answers.type === 'track'}>Sur piste</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, type: 'trail' })}
                                selected={answers.type === 'trail'}>Trail</AnswerButton>
                        </div>
                    </Question>
                </div>
                <div className='flex flex-col items-center gap-8 w-full'>
                    <Image src="/discovery/frequency.jpg" alt="" width={1920} height={1080} className='w-full max-h-[400px] object-cover' />
                    <Question id="frequency">
                        <h2 className='text-2xl font-bold'>Quelle est votre fréquence de course ?</h2>
                        <p className='text-gray-500 mt-2'>Cette information nous aide à déterminer la durabilité nécessaire</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '1_2' })}
                                selected={answers.frequency === '1_2'}>1-2 fois par mois</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '3_4' })}
                                selected={answers.frequency === '3_4'}>3-4 fois par mois</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '1_2_week' })}
                                selected={answers.frequency === '1_2_week'}>1-2 fois par semaine</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, frequency: '3_week' })}
                                selected={answers.frequency === '3_week'}>3+ fois par semaine</AnswerButton>
                        </div>
                    </Question>
                </div>
                <div className='flex flex-col items-center gap-8 w-full'>
                    <Image src="/discovery/budget.jpg" alt="" width={1920} height={1080} className='w-full max-h-[400px] object-cover' />
                    <Question id="budget" disabled={answers.frequency === undefined}>
                        <h2 className='text-2xl font-bold'>Quel est votre budget ?</h2>
                        <p className='text-gray-500 mt-2'>Pour vous proposer les meilleures options dans votre gamme de prix</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: 'less_100' })}
                                selected={answers.budget === 'less_100'}>Moins de 100€</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: '100_200' })}
                                selected={answers.budget === '100_200'}>100€ - 200€</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, budget: 'more_200' })}
                                selected={answers.budget === 'more_200'}>Plus de 200€</AnswerButton>
                        </div>
                    </Question>
                </div>
                <div className='flex flex-col items-center gap-8 w-full'>
                    <Image src="/discovery/goal.jpg" alt="" width={1920} height={1080} className='w-full max-h-[400px] object-cover' />
                    <Question id="goal" disabled={answers.budget === undefined}>
                        <h2 className='text-2xl font-bold'>Préparez vous un objectif ?</h2>
                        <p className='text-gray-500 mt-2'>Choisissez l&apos;objectif qui correspond le mieux à vos attentes</p>
                        <div className='flex flex-col gap-2 mt-8'>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'ultra' })}
                                selected={answers.goal === 'ultra'}>Ultra et +</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'marathon' })}
                                selected={answers.goal === 'marathon'}>Marathon</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: 'semi_marathon' })}
                                selected={answers.goal === 'semi_marathon'}>Semi-marathon</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: '10km' })}
                                selected={answers.goal === '10km'}>10km</AnswerButton>
                            <AnswerButton
                                clickHandler={() => setAnswers({ ...answers, goal: '5km' })}
                                selected={answers.goal === '5km'}>5km</AnswerButton>
                        </div>
                    </Question>
                </div>
                <button
                    onClick={onSubmit}
                    disabled={answers.goal === undefined}
                    className='bg-black text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:pointer-events-none mb-8'>
                    Valider
                </button>
            </div>
            {submitted && <div className={'flex items-center justify-center' + (loading ? " h-[400px]" : "")}>
                {loading ?
                    <div className='flex flex-col items-center gap-4'>
                        <p className='text-gray-500'>Nous recherchons les meilleures chaussures pour vous...</p>
                        <Loader2Icon className='animate-spin text-gray-500' />
                    </div> : <div className='flex flex-col items-center gap-4 w-full mt-8 mb-16'>
                        <h2 className='text-2xl font-bold'>Nos suggestions</h2>
                        <div className='flex items-center gap-4 w-full flex-col sm:flex-row'>
                            {randomProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>}
            </div>}
        </>
    )
}

const Question = ({ children, id, disabled, first }: { children: React.ReactNode, id: string, disabled?: boolean, first?: boolean }) => {
    return <div id={id} className={'question w-full' + (disabled ? ' disabled opacity-50 pointer-events-none' : '') + (first ? ' mt-[calc(50vh-164px)]' : '')}>
        {children}
    </div>
}

const AnswerButton = ({ children, clickHandler, selected }: { children: React.ReactNode, clickHandler: () => void, selected?: boolean }) => {
    return <button className={'text-gray-700 font-semibold px-4 py-2 rounded-md w-full' + (selected ? ' bg-black text-white' : ' bg-gray-200 hover:bg-gray-300')} onClick={clickHandler}>{children}</button>
}

const QuestionImage = ({ src, alt, dataQuestion, fit }: { src: string, alt: string, dataQuestion: string, fit: 'contain' | 'cover' }) => {
    return <Image
        src={src}
        width={1920}
        height={1080}
        className={'absolute transition-all opacity-0 duration-500 h-full bg-[url("data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoKAAYAAgA0JZwC/OEQ/F81dgAAzjLLkhj82SCDsJOVoFY4+GTcVJfiWK+tmhVSuVAAAA==")] bg-cover' + (fit === 'contain' ? ' object-contain' : ' object-cover')}
        alt={alt}
        data-question={dataQuestion}
        sizes="75vw"
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADwAQCdASoKAAYAAgA0JZwC/OEQ/F81dgAAzjLLkhj82SCDsJOVoFY4+GTcVJfiWK+tmhVSuVAAAA==" />
}