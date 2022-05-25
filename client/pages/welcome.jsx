
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { content, useLanguageContext } from "../context/LanguageContext";
import Image from 'next/image'
import searchIcon from '../public/image0.jpeg';

export default function welcome(props) {
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState('admin');
  const { language, setLanguage } = useLanguageContext()
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    localStorage.setItem("language", language)
    const slug = router.query.redirect

    if (role == 'admin') {
      router.push(`/`);
    } else {
      if (slug) {
        router.push(`/${slug}/`);
      } else {
        router.push(`/`);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="font-AngkatanBersenjata body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 bg-[url('../public/image1.jpeg')] bg-cover" >

        <main className="bg-white/60 max-w-lg mx-auto p-2 my-10 rounded-lg shadow-2xl backdrop-blur-xl ">

          <section className="">
            <form onSubmit={handleSubmit}>

              <div className="rounded grid justify-items-center">
                <Image className="mx-auto" src="/logo.png" alt="me" width={100} height={125} />

                <label className="block text-xl font-bold mt-2  text-center" htmlFor="email">{content[language]['welcome']}</label>

                <label className="block text-sm mt-6 mb-1" htmlFor="email">{content[language]['userrole']}</label>

                < div className="">
                  <RadioGroup className="flex " value={role} onChange={(e) => setRole(e)}>
                    <RadioGroup.Option className="px-4 flex justify-items-center" value="admin" >
                      <label >
                        <input
                          className='mx-auto w-full'
                          type="radio"
                          name="role"
                          value="admin"
                        />
                        <div className="">Admin</div>
                      </label>
                    </RadioGroup.Option>
                    <RadioGroup.Option className=" px-4" value="respondent">
                      <label>
                        <input
                          className='mx-auto w-full'
                          type="radio"
                          name="role"
                          value="respondent"
                        />
                        <div className="">Respondent</div>
                      </label>
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>


                <br />
                <label className="block text-sm font-bold mt-6 mb-2 ml-3">{content[language]['choose_language']}</label>

                <div className="flex mx-auto w-full justify-center">
                  <RadioGroup className=" flex " value={language} onChange={(e) => setLanguage(e)}>
                    <RadioGroup.Option className="px-4 " value="bm" >
                      <label className="">
                        <input
                          className='mx-auto w-full'
                          type="radio"
                          name="language"
                          value="bm"
                        />
                        <div className="">Bahasa</div>
                      </label>
                    </RadioGroup.Option>
                    <RadioGroup.Option className="px-4 " value="en" >
                      <label>
                        <input
                          type="radio"
                          name="language"
                          value="en"
                        />
                        <div className="">English</div>
                      </label>
                    </RadioGroup.Option>
                  </RadioGroup>
                </div>

              </div>

              <button className="m-2 mx-auto w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Start</button>
            </form>
          </section>
        </main>

        <p style={{ color: 'red' }}>{errorMessage}</p>

      </div>

    </React.Fragment >
  );
}