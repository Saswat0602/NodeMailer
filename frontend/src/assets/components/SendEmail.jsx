import React, { useState } from "react";

const SendEmail=()=> {

  const handleSend = {
    
  }


  return (
    <>
      <div className="bg-white flex justify-center items-center min-h-screen">
        <div className="bg-white  max-w-3xl w-full sm:w-11/12 md:w-9/12 lg:w-8/12">
          <h2 className="text-3xl text-blue-700 font-bold text-center">
            Send Email .............
          </h2>

          <div className="flex flex-col md:flex-row">
           
            <div className="w-full pl-5  mt-5">
              <form className="flex flex-col gap-1">
                <label htmlFor="name" className="ml-2">
                  Name
                </label>
                <input
                  type="text"
                  className="p-2 border rounded-lg"
                  name="name"
                  placeholder="Enter your name"
                   
                />
                <label htmlFor="email" className="ml-2">
                  Email
                </label>
                <input
                  type="email"
                  className="p-2 border rounded-lg"
                  name="email"
                  placeholder="Enter your email"
                   
                />

               
            
              

              

                <button
                  onClick={handleSend}
                  className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
                >
                  Send Email
                </button>
              </form>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SendEmail;
