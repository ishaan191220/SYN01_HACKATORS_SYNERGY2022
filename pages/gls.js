import React, { useEffect } from 'react';
import TabCardGrid from "../components/cards/TabCardGrid.js"

import Head from 'next/head'
import GLSCards from "../components/cards/PortfolioTwoCardsWithImage.js";
import bgStyles from "../styles/bgStyles.module.css";

export default function GLS() {

    return (
        <>
            <Head>
                <title>Guest Lecture Series - GLS | Technovanza VJTI 2021-22</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
                <meta name="description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - The technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta name="keywords" content="Guest lecture series, GLS, guests, lectures, dignitaries, public relations, PR, Technovanza, Techno, Technovanza VJTI, VJTI, Veermata Jijabai Technological Institute, 
        Guest Lecture Series, GLS, Technology, Technosavy, extravaganze, fun events" />
                <meta name="author" content="Abhay Ubhale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* OG Tags */}
                <meta property="og:title" content="Guest Lecture Series - GLS | Technovanza VJTI 2021-22" />
                <meta property="og:description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - The technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="og:image" content="https://technovanza.org/logo.png" />
                <meta property="og:video" content="https://technovanza.org/technovanza.webm" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://technovanza.org" />
                <meta property="og:determiner" content="the" />
                <meta property="og:locale" content="en_IN" />

                {/* Twitter SEO Tags */}
                <meta property="twitter:title" content="Guest Lecture Series - GLS | Technovanza VJTI 2021-22" />
                <meta property="twitter:description" content="Guest Lecture Series featuring the world's greatest dignitiaries. Technovanza VJTI - the technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="twitter:image" content="https://technovanza.org/logo.png" />
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://technovanza.org"></meta>
            </Head>
            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <GLSCards />
                <TabCardGrid />
            </div>
        </>
    );
}
