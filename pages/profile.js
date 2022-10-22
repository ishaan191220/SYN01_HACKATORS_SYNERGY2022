import React, { useState, useEffect } from 'react';
import LoadingAnimation from "../components/misc/Loading.js";
import loadingstyles from "./index.module.css";
import styled from "styled-components";
import { useUserContext } from "../services/userContext";
import { useRouter } from "next/router";
import tw from "twin.macro";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from '../services/firebase.js';

import Head from 'next/head';
import styles from './profile.module.css';
import bgStyles from "../styles/bgStyles.module.css";
import { data } from 'autoprefixer';

const HighlightedText = tw.div`text-primary-500`;
const SubmitButton = styled.button`
  ${tw`max-w-xs self-center mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;


export default function Profile() {

    const { user } = useUserContext();
    const router = useRouter();
    const [localData, setLocalData] = useState();
    const [loadingPayment, setLoadingPayment] = useState(false);

    useEffect(async () => {

        const redirectToLogin = () => {
            window.localStorage.setItem("redirectAfterLogin", "/profile");
            router.push('/login');
            return <LoadingAnimation style={loadingstyles} />
        }

        user ? null : redirectToLogin();


        if (user) {
            const docRef = doc(firestore, "Users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data();

                window.localStorage.setItem("userData", JSON.stringify(userData));
                setLocalData(userData);

            }
        }
    }, [user]);


    const getTechnoId = (user) => {
        let date = new Date(user.metadata.creationTime);

        let day = date.getDay().toString();
        if (day.length === 1) day = "0" + day;

        let month = date.getMonth().toString();
        if (month.length === 1) month = "0" + month;

        let hour = date.getHours().toString();
        if (hour.length === 1) hour = "0" + hour;

        let minute = date.getMinutes().toString();
        if (minute.length === 1) minute = "0" + minute;

        let second = date.getSeconds().toString();
        if (second.length === 1) second = "0" + second;

        let millisec = user.metadata.createdAt.toString().slice(-2);
        return day + month + " " + hour + minute + " " + second + millisec
    }



    const editProfile = () => {
        window.localStorage.setItem("profileEditing", true);
        router.push('/setprofile');
    }

    const proceedToPayment = async () => {
        setLoadingPayment(true)
        const docRef = doc(firestore, 'Users', user.email);
        localData['isPaid'] = true

        await updateDoc(docRef, { ...localData, lastUpdated: serverTimestamp() })

        window.localStorage.setItem("userData", JSON.stringify(localData));

        setLoadingPayment(false)
    }


    return (
        <>
            <Head>
                <title>Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                {
                    user ?
                        <>
                            <div className={styles.container}>
                                <main className={styles.main}>
                                    <h1 className={styles.title}>
                                        Welcome <HighlightedText> {user.displayName} ! </HighlightedText>
                                    </h1>

                                    <p className={styles.description}>
                                        User Id <br />
                                        <code className={styles.code}>{getTechnoId(user)}</code>
                                    </p>


                                    {localData ?
                                        <>
                                            {/* <pre className='w-full overflow-hidden'>
                                                {JSON.stringify(localData, null, 2)}
                                            </pre> */}
                                            <div className="rounded-lg bg-white m-5 p-3 shadow-sm">
                                                <div className="text-gray-700">
                                                    <div className="grid md:grid-cols-2 text-sm">
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                                            <div className="py-2 break-words">{localData.fname}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                                            <div className="py-2 break-words">{localData.lname}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Phone Number</div>
                                                            <div className="py-2 break-words">{localData.phone}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Gender</div>
                                                            <div className="py-2 break-words">{localData.gender}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Degree/Course</div>
                                                            <div className="py-2 break-words">{localData.course}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold">Class/Year</div>
                                                            <div className="py-2 break-words">{localData.year}</div>
                                                        </div>
                                                        <div className="grid grid-cols-2">
                                                            <div className="px-4 py-2 font-semibold ">Email</div>
                                                            <div className="py-2">
                                                                <a className="text-blue-800 break-words" href={"mailto:" + user.email}>{user.email}</a>
                                                            </div>
                                                        </div>
                                                        <div className='grid justify-center col-span-2 my-6'>
                                                            <div className='grid grid-cols-3 text-center items-center col-span-2 max-w-sm'>
                                                                <div className='py-2 break-words'>{localData.isTPO ? <span className='text-green-600'>Approved By TPO</span> : <span className='text-red-600'>TPO Approval Pending</span>}</div>
                                                                <div className='py-2 break-words'>{localData.isPaid ? <button className='text-green-600' onClick={proceedToPayment}>Payment Completed</button> : loadingPayment ? <button onClick={proceedToPayment} className='text-white bg-gray-600 px-2 py-3 rounded-md'>Payment Pending</button> : <button onClick={proceedToPayment} className='text-white bg-red-600 px-2 py-3 rounded-lg hover:bg-red-800 transition-all duration-200'>Payment Pending</button>}</div>
                                                                <div className='py-2 break-words'>{localData.isECell ? <span className='text-green-600'>Approved By ECell</span> : <span className='text-red-600'>ECell Approval Pending</span>}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {!localData.hasOwnProperty('isTPO') && <div className="flex flex-col justify-center items-center">
                                                    <SubmitButton onClick={() => editProfile()}>
                                                        <span className="text">Apply Transcript</span>
                                                    </SubmitButton>
                                                </div>}
                                            </div>
                                        </>
                                        :
                                        null
                                    }

                                </main>
                            </div>

                        </>
                        :
                        <LoadingAnimation styles={loadingstyles} />
                }
            </div>
        </>

    )
}