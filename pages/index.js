import React, { useEffect } from 'react';
import tw from "twin.macro";
import styles from "./index.module.css";
import Section1 from "../components/sections/section1.js";
import Section2 from "../components/sections/section2.js";
import Section3 from "../components/sections/section3.js";
import Section4 from "../components/sections/section4.js";
import Section5 from "../components/sections/section5.js";
import Events from "../components/sections/events.js";
import Partners from "../components/sections/partners.js";

import bgStyles from "../styles/bgStyles.module.css";

import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useUserContext } from '../services/userContext';

export default function index() {
  const Heading = tw.span`uppercase text-2xl text-blue-600`;
  const Subheading = tw.span`uppercase text-4xl tracking-widest font-bold text-white`;
  const HighlightedText = tw.span`text-blue-500`;

  const { user } = useUserContext();

  const router = useRouter()

  useEffect(() => {
    user ? router.push("/profile") : router.push("/login")
  }, [user])

  return (
    <>

      <Head>
        <title>Transcript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="bg-transparent"></div>

    </>
  );
}
