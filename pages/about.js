import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
// import { ReactComponent as SvgDotPatternIcon } from "../../static/images/dot-pattern.svg";
import { SectionHeading as HeadingTitle } from "../components/misc/Headings.js";
import Head from 'next/head';
import bgStyles from "../styles/bgStyles.module.css";

const Container = tw.div`relative bg-transparent`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const HeadingDescription = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;


const HeadingInfoContainer = tw.div`flex flex-col items-center`;

const Content = tw.div`mt-16`;

const Card = styled.div(props => [
    tw`mt-24 md:flex justify-center items-center`,
    props.reversed ? tw`flex-row-reverse` : "flex-row"
]);

const Image1 = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover md:bg-center sm:bg-top mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Image2 = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-center bg-cover  mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);
const Image3 = styled.div(props => [
    `background-image: url("${props.imageSrc}");`,
    tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover sm:bg-top mx-4 sm:mx-8 md:mx-4 lg:mx-8`
]);

const Details = tw.div`mt-4 md:mt-0 md:max-w-md mx-4 sm:mx-8 md:mx-4 lg:mx-8`;
const Subtitle = tw.div`font-bold tracking-wide text-secondary-100`;
const Title = tw.h4`text-3xl font-bold text-white`;
const Description = tw.p`mt-2 text-sm text-white leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

export default function About() {

    return (

        <>
            <Head>
                <title>About Conveners | Technovanza VJTI 2021-22</title>
                <link rel="icon" href="/favicon.ico" />

                {/* Meta tags */}
                <meta charset="UTF-8" />
                <meta name="description" content="Meet our conveners. Technovanza VJTI is the technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta name="keywords" content="Conveners, contact us, team, Technovanza, Techno, Technovanza VJTI, VJTI, Veermata Jijabai Technological Institute, 
        Guest Lecture Series, GLS, Technology, Technosavy, extravaganze, fun events" />
                <meta name="author" content="Abhay Ubhale" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* OG Tags */}
                <meta property="og:title" content="About Conveners | Technovanza VJTI 2021-22" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://technovanza.org" />
                <meta property="og:description" content="Meet our conveners. Technovanza VJTI is the technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="og:determiner" content="the" />
                <meta property="og:locale" content="en_IN" />
                <meta property="og:image" content="https://technovanza.org/logo.png" />
                <meta property="og:video" content="https://technovanza.org/technovanza.webm" />

                {/* Twitter SEO Tags */}
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content="https://technovanza.org"></meta>
                <meta property="twitter:title" content="About Conveners | Technovanza VJTI 2021-22" />
                <meta property="twitter:description" content="Meet our conveners. Technovanza VJTI is the technical fest for extravaganza of fun and astonishing events, Guest Lectures, amazing prizes, and much more." />
                <meta property="twitter:image" content="https://technovanza.org/logo.png" />
            </Head>
            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <Container>
                    <SingleColumn>
                        <HeadingInfoContainer>
                            <HeadingTitle>Meet Our Conveners</HeadingTitle>
                            <HeadingDescription>
                                Unity is strength... When there is teamwork and collaboration, wonderful things can be achieved.
                            </HeadingDescription>
                        </HeadingInfoContainer>

                        <Content>

                            <Card reversed={false}>
                                <Image1 imageSrc="images/conveners/Sai.webp" />
                                <Details>
                                    <Title>Sai Karyekar</Title>
                                    <Subtitle>B.Tech ExTC Engineering, Third Year</Subtitle>
                                    <Description>Convener @ VJTI Technovanza</Description>
                                    <Link href="mailto:sai.karyekar@technovanza.org">sai.karyekar@technovanza.org</Link>
                                </Details>
                            </Card>

                            <Card reversed={true}>
                                <Image3 imageSrc="images/conveners/Shubham.jpg" />
                                <Details>
                                    <Title>Shubham Panchmukh</Title>
                                    <Subtitle>B.Tech Electrical Engineering, Third Year </Subtitle>
                                    <Description>Convener @ VJTI Technovanza</Description>
                                    <Link href="mailto:shubham.panchmukh@technovanza.org">shubham.panchmukh@technovanza.org</Link>
                                </Details>
                            </Card>

                            <Card reversed={false}>
                                <Image3 imageSrc="images/conveners/Rudhir.jpg" />
                                <Details>
                                    <Title>Rudhir Pidadi</Title>
                                    <Subtitle>B.Tech ExTC Engineering, Third Year</Subtitle>
                                    <Description>Convener @ VJTI Technovanza</Description>
                                    <Link href="mailto:rudhir.pidadi@technovanza.org">rudhir.pidadi@technovanza.org</Link>
                                </Details>
                            </Card>

                            <Card reversed={true}>
                                <Image3 imageSrc="images/conveners/mahita.jpg" />
                                <Details>
                                    <Title>Mahita Samant</Title>
                                    <Subtitle>B.Tech Electrical Engineering, Third Year </Subtitle>
                                    <Description>Convener @ VJTI Technovanza</Description>
                                    <Link href="mailto:mahita.samant@technovanza.org">mahita.samant@technovanza.org</Link>
                                </Details>
                            </Card>

                        </Content>
                    </SingleColumn>
                </Container>
            </div>
        </>
    );
};