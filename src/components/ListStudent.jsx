
import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { List, ListItem, ListItemPrefix, Card, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';

export function ListStudents() {
  const [bolen, setBolen] = useState(false)
  const [gen, setGen] = useState()
  const [students, setStudents] = useState([]);
  const lec_id =102; // Ensure this is up-to-date
  useEffect(() => {
    localStorage.removeItem("lec_id")

  }, [])
  const verify = async ()=>{
    setBolen(true)
    try {
      
      const response = await axios.post("https://stu-backend.vercel.app/present",{students,lec_id} );
      // const response = await axios.post("http://localhost:2000/present",{students,lec_id} );
      console.log(response);
        setBolen(false)
      
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.post("https://stu-backend.vercel.app/students/get", { lec_id });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    let interval;
    if (gen) {
      // Fetch students initially
      fetchStudent();

      // Set interval to fetch students every 5 seconds
      interval = setInterval(fetchStudent, 3000);
    }

    // Cleanup interval on component unmount or when lecId changes
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gen]);
 

  return (
    <div className=' h-screen flex justify-center items-center flex-col'>
 <div className="flex justify-center  items-center ">

<Button className="bg-blue-400   border border-black  text-base rounded-full w-32" onClick={()=>{setGen(!gen)}}>Get List</Button>
</div>
      <Card className="w-96">
        <div className=' bg-gray-300 shadow-none' style={{
          maxHeight: '575px',
          overflowY: 'auto',
          transition: 'max-height 0.3s ease-in-out',
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
        }}>
         

          <List>
            {students.length > 0 ? students.map((stu, index) => (
              <ListItem key={`${stu.student_id}-${index}`} className='text-gray-50 mt-0 bg-white hover:text-gray-800'>
                <ListItemPrefix>
                  <div className="bg-blue-400 p-1 rounded-full">
                    <FaUser className='h-8 w-8 hover:text-gray-800 rounded-full' />
                  </div>
                </ListItemPrefix>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    {stu.first_name + ' ' + stu.last_name}
                  </Typography>
                  <Typography variant="small" color="gray" className="font-normal">
                    ID: {stu.student_id}
                  </Typography>
                </div>
              </ListItem>
            )) : (<></>
            )}
          </List>
        </div>
      </Card>

            <Button className="bg-blue-400 sticky bottom-0 p-2  m-auto border border-black text-base rounded-full w-32" onClick={verify} loading={bolen} >Verify</Button>
    </div>
  );
}
