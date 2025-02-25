import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Delete } from "lucide-react";

const List = ({url}) => {
  const [list, setList] = useState([]);
 

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/mangoes/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else { 
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeMango = async(mangoId)=>{
   const response = await axios.post(`${url}/api/mangoes/remove`,{id:mangoId});
  //  after removing  a mango , remaining should be display
  await fetchList();
 

  if(response.data.success){
    toast.success(response.data.message);
  }else{
    toast.error("error")
  }




  }

  return (
    <div className="flex flex-col items-center p-4 mb-9">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-2 border-1 border-gray-300 ">Image</th>
              <th className="p-2 border border-gray-300">Name</th>
              <th className="p-2 border border-gray-300">Price</th>
              <th className="p-2 border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, id) => (
              <tr key={id} className="border hover:bg-gray-100">
                <td className="p-2 border-1 border-gray-300">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover"
                  />
                </td>
                <td className="p-2 border border-gray-300">{item.name}</td>
                <td className="p-2 border border-gray-300">{item.price}/-</td>
                <td className="p-2 border text-red-400 cursor-pointer border-gray-300">
                  <button onClick={()=>removeMango(item._id)}> <Delete  /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
