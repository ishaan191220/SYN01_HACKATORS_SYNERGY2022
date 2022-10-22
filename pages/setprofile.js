import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../components/misc/Headings.js";
import bgStyles from "../styles/bgStyles.module.css";
import { useUserContext } from "../services/userContext";

// import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";

import { firestore } from '../services/firebase.js';
import { useRouter } from "next/router";

const Container = tw.div`relative bg-transparent`;

const SingleColumn = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xl`;
// const Input = tw.input`px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-300 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mx-3 mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default function SetProfile() {

    const { user, changeDisplayName } = useUserContext();
    const router = useRouter();

    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [phone, setPhone] = useState();

    const [course, setCourse] = useState();
    const [house, setHouse] = useState("Select");
    const [year, setYear] = useState("Select");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("Select");

    // Error handlers
    const [yearError, setYearError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [collegeError, setCollegeError] = useState(false);
    const [houseError, setHouseError] = useState(false);

    let yearErrorLocal = false;
    let genderErrorLocal = false;
    let ageErrorLocal = false;
    let collegeErrorLocal = false;
    let houseErrorLocal = false;

    useEffect(async () => {
        user ? null : router.push("/login");

        if (user) {
            const docRef = doc(firestore, "Users", user.email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                let userData = docSnap.data();

                // console.log(userData.age);

                let isEditing = window.localStorage.getItem("profileEditing");

                // Redirect to profile if the user's profile is complete and he/she don't want to edit
                if (userData.fname !== null && isEditing === false) { router.push("/profile"); }

                setFname(userData.fname ?? null);
                setLname(userData.lname ?? null);
                setPhone(userData.phone ?? null);
                setCourse(userData.course ?? null);
                setYear(userData.year ?? "Select");
                setAge(userData.age ?? 0);
                setGender(userData.gender ?? "Select");
                setHouse(userData.house ?? "Select");

            } else {
                // doc.data() will be undefined in this case
                // console.log("No such document!");
            }
        }
    }, [user])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = { fname, lname, phone,  course, year, age, gender, house, };

        if (gender == "Select") {
            setGenderError(true);
            genderErrorLocal = true;
        }
        else {
            setGenderError(false);
            genderErrorLocal = false;
        }


        if (year == "Select") {
            setYearError(true);
            yearErrorLocal = true;
        }
        else {
            setYearError(false);
            yearErrorLocal = false;
        }

        if (age > 110 || age <= 0) {
            setAgeError(true);
            ageErrorLocal = true;
        }
        else {
            setAgeError(false);
            ageErrorLocal = false;
        }

        if (collegeErrorLocal == false && yearErrorLocal == false && genderErrorLocal == false && houseErrorLocal == false && ageErrorLocal == false) {
            try {

                await changeDisplayName(fname + " " + lname);
                // Add the user data to the database
                const docRef = doc(firestore, 'Users', user.email);

                data["isTPO"] = false
                data["isECell"] = false
                data["isPaid"] = false
                await updateDoc(docRef, { ...data , lastUpdated: serverTimestamp() });

                window.localStorage.setItem("userData", JSON.stringify(data));
                window.localStorage.setItem("profileEditing", false);
                router.push("/profile");

            } catch (e) {
                // console.error("Error saving the data: ", e);
            }

        }
    }


    return (
        <>
            <Head>

                <title>Set Profile</title>
                <link rel="icon" href="/favicon.ico" />
                </Head>

            <div className={bgStyles.parent}>
                <div className={bgStyles.stars}></div>
                <Container>
                    <SingleColumn>
                        <HeadingTitle> Transcript Profile </HeadingTitle>
                        <FormContainer>

                            <Form validate={true} onSubmit={handleSubmit}>
                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-first-name">
                                            First Name
                                        </label>
                                        <input
                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white"
                                            id="grid-first-name"
                                            type="text"
                                            placeholder="Jane"
                                            required
                                            value={fname}
                                            onChange={(e) => setFname(e.target.value)}
                                        />

                                    </div>
                                    <div className="w-full md:w-1/2 px-3">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-last-name">
                                            Last Name
                                        </label>
                                        <input
                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-last-name"
                                            type="text"
                                            placeholder="Doe"
                                            required
                                            value={lname}
                                            onChange={(e) => setLname(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                            Phone Number
                                        </label>
                                        <input
                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-phone"
                                            type="tel"
                                            placeholder="Eg. +91 9988776655"
                                            pattern="+*[0-9]{2}* [0-9]{12}"
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-wrap mb-6">
                                    <div className="w-full px-3">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-password">
                                            Course
                                        </label>
                                        <input
                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-password"
                                            type="text"
                                            placeholder="Eg. B.Tech in Computer Engineering"
                                            required
                                            value={course}
                                            onChange={(e) => setCourse(e.target.value)}
                                        />
                                        <p className="text-gray-600 text-xs italic">Enter your degree and course name.</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap mb-2">


                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                            Class/Year
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state"
                                                onChange={(e) => setYear(e.target.value)}
                                                value={year}
                                                required
                                            >
                                                <option value="Select">Select</option>
                                                <option value="1st to 5th std.">1st to 5th std.</option>
                                                <option value="6th to 10th std.">6th to 10th std.</option>
                                                <option value="FYJC">FYJC</option>
                                                <option value="SYJC">SYJC</option>
                                                <option value="Diploma FY">Diploma FY</option>
                                                <option value="Diploma SY">Diploma SY</option>
                                                <option value="Diploma TY">Diploma TY</option>
                                                <option value="Degree FY">Degree FY</option>
                                                <option value="Degree SY">Degree SY</option>
                                                <option value="Degree TY">Degree TY</option>
                                                <option value="Degree Final Year">Degree Final Year</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                            {yearError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-city">
                                            Age
                                        </label>
                                        <input
                                            className="placeholder-gray-600 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="grid-city"
                                            type="number"
                                            placeholder="Eg. 18"
                                            required
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                        />
                                        {ageError ? <p className="text-red-500 text-xs italic">Enter a valid age.</p> : null}
                                    </div>

                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <label className="block uppercase tracking-wide text-gray-500 text-md font-bold mb-2" htmlFor="grid-state">
                                            Gender
                                        </label>
                                        <div className="relative">
                                            <select
                                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                id="grid-state"
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                                value={gender}
                                            >
                                                <option value="Select">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="Rather not say">Rather not say</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                            </div>
                                            {genderError ? <p className="text-red-500 text-xs italic">Please fill out this field.</p> : null}

                                        </div>
                                    </div>

                                    <div className='w-full'>
                                    </div>

                                    <SubmitButton type="submit">
                                        <span className="text">Submit</span>
                                    </SubmitButton>

                                </div>
                            </Form>
                        </FormContainer>
                    </SingleColumn>
                </Container>
            </div>
        </>

    );
}