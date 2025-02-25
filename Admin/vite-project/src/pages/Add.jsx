import React, { useState } from 'react';
import assets from "../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/mangoes/add`, formData);
      if (response.data.success) {
        setData({ name: "", description: "", price: "" });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error("Failed to add mango");
    }
  };

  return (
    <form className="flex flex-col items-center sm:items-start gap-5 w-full px-6 sm:px-12 py-6 sm:py-12 mb-12" onSubmit={handleSubmit}>
      
      <div className="flex flex-col items-center sm:items-start gap-2 w-full">
        <p className="text-sm sm:text-base">Upload image</p>
        <label htmlFor="image">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload}
            alt=""
            className="size-16 sm:size-20 border-2 border-slate-300 rounded-md"
          />
        </label>
        <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2 w-full max-w-[320px]">
        <p className="text-sm sm:text-base">Mango name</p>
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={data.name}
          placeholder="Type here"
          className="border-gray-300 border w-full px-4 py-2 text-sm sm:text-base rounded-md"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2 w-full max-w-[320px]">
        <p className="text-sm sm:text-base">Description</p>
        <textarea
          name="description"
          rows="4"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="Write content here"
          className="border-gray-300 border w-full px-4 py-2 text-sm sm:text-base rounded-md resize-none"
          required
        ></textarea>
      </div>

      {/* Price */}
      <div className="flex flex-col gap-2 w-full max-w-[320px]">
        <p className="text-sm sm:text-base">Price</p>
        <input
          type="number"
          name="price"
          onChange={onChangeHandler}
          value={data.price}
          placeholder="$20"
          className="border-gray-300 border w-full px-4 py-2 text-sm sm:text-base rounded-md"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-6 py-2 text-sm sm:text-base rounded-md w-full max-w-[320px] hover:bg-orange-600 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
