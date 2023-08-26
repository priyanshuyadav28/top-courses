import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import Spinner from "./components/Spinner";
import { apiUrl, filterData } from "./data";
import { useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try{
      let response = await fetch(apiUrl);
      let output = await response.json();
      // output -> 
      setCourses(output.data);  // copies all the fetched data into courses

    } 
    catch(error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }
  

  useEffect( () => {
    fetchData();
  }, [])
  console.log(courses,category)

  return(
    <div className="min-h-screen flex flex-col bg-bgDark2">

      <div className="" >
        <Navbar />
      </div>
      


      <div className=''>
        <div>
          <Filter filterData={filterData} 
            category={category}
            setCategory={setCategory}
          />
        </div>

          <div className="w-11/12 max-w-[1100px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {
           loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)
          }
        </div>

      </div>

    </div>
  );
};

export default App;
