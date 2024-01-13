import { Fragment,useState} from "react";
import { set,ref, push} from "firebase/database";
import {database} from "../config"
// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Dialog, Transition } from "@headlessui/react";

export default function WriteText( { isOpen, setIsOpen } ) {

  const user = JSON.parse(localStorage.getItem('user'));
  function closeModal() {
    setIsOpen(false);
  }

  function handleTextChange(event) {
    // Limit the input to 300 characters
    const inputText = event.target.value;
    if (inputText.length <= 300) {
      setText(inputText);
    }
  }
  
  const[text,setText]=useState("")
  async function addPostToDatabase() {
    try {
      const postsRef = ref(database, `posts/${user.uid}`);
      const newPostRef = push(postsRef);
  
      await set(newPostRef, {
        text: text,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        authorName: user.displayName,
        authorImg: user.photoURL,
      });
  
      setText('');
      closeModal();
    } catch (error) {
      console.error('Error adding post to the database:', error);
      alert('Error adding post to the database: ' + error.message);
    }
  }
  
  return (
    <>
      {/* Modals: With Form */}
      <div>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-90" onClose={closeModal}>
            {/* Modal Backdrop */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm" />
            </Transition.Child>
            {/* END Modal Backdrop */}

            {/* Modal Dialog */}
            <div className="fixed inset-0 overflow-y-auto p-4 lg:p-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-125"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-125"
              >
                <Dialog.Panel className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-sm ">
                  <div className="flex items-center justify-between bg-gray-50 px-5 py-4 ">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center space-x-2 font-medium"
                    >
                      <span>Write Text ({text.length}/300)</span>
                    </Dialog.Title>

                    <div className="-my-4">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="inline-flex items-center justify-center space-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none"
                      >
                        <svg
                          className="hi-solid hi-x -mx-1 inline-block size-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="grow p-5">
                    <textarea
                      id="tweet"
                      name="tweet"
                      value={text}
                      rows={8}
                      onChange={handleTextChange}
                      placeholder="write something maximum upto 300 words"
                      className="block w-full rounded-lg border border-gray-200  px-3 py-2 text-sm leading-5 placeholder-gray-500 "
                    />
                  </div>
                  <div className="space-x-2 bg-gray-50 px-5 py-4 text-right ">
                    <button
                      onClick={closeModal}
                      type="button"
                      className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none "
                    >
                      Cancel
                    </button>
                    <button
                     disabled={text.length === 0}
                      onClick={addPostToDatabase}
                      type="button"
                      className="inline-flex items-center justify-center space-x-2 rounded-lg border border-rose-400 bg-rose-400 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-rose-500 hover:bg-rose-500 hover:text-white focus:ring focus:ring-teal-400 focus:ring-opacity-50 active:border-rose-400 active:bg-rose-400"
                    >
                      Post
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            {/* END Modal Dialog */}
          </Dialog>
        </Transition>
        {/* END Modal Container */}
      </div>
      {/* END Modals: With Form */}
    </>
  );
}
