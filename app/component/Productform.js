"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Productform = ({ productdata }) => {
  const {
    _id,
    name: existingname,
    description: existingdescription,
    price: existingprice,
    images: eximages,
    category: existcategory,
    properties: existingproperties,
  } = productdata;
  const [gotosave, setgotosave] = useState(false);
  const [name, setname] = useState(existingname || "");
  const [description, setdescription] = useState(existingdescription || "");
  const [price, setprice] = useState(existingprice || "");
  const router = useRouter();
  const [existingimages, setexistingimages] = useState(eximages || []);
  const [images, setimages] = useState([]);
  const [categories, setcategories] = useState(existcategory || "0");
  const [availcategories, setavailcategories] = useState([]);
  const [productproperties, setproductproperties] = useState(
    existingproperties || {}
  );
  useEffect(() => {
    if (gotosave) {
      router.push("/products");
    }
  }, [gotosave, router]);

  useEffect(() => {
    const getcategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setavailcategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getcategories();
  }, []);

  const submit = async (e) => {
    if (_id === null) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", categories);
      formData.append("properties", JSON.stringify(productproperties));

      images.forEach((image) => {
        formData.append("images", image);
      });
      try {
        await axios.post("/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setgotosave(true);
      } catch (error) {
        console.error("Error uploading product:", error);
      }
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("_id", _id);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", categories);
      formData.append("properties", JSON.stringify(productproperties));
      console.log(formData);
      images.forEach((image) => {
        formData.append("images", image);
      });
      existingimages.forEach((existingimage) => {
        formData.append("existingimages", existingimage);
      });
      await axios.post("/api/products/" + _id, formData);
      setgotosave(true);
    }
  };

  const saveproductproperties = (propname, propvalue) => {
    setproductproperties((prev) => ({ ...prev, [propname]: propvalue }));
    console.log("Product Properties", productproperties);
  };
  const handleimagechange = (e) => {
    const files = Array.from(e.target.files);
    setimages((prevImages) => [...prevImages, ...files]);
  };

  const getproperties = () => {
    const cat = availcategories.find((cat) => cat._id === categories);
    if (cat && cat.properties) {
      return (
        <div className="flex flex-col gap-3">
          {cat.properties.map((property, index) => (
            <div key={index}>
              <label>{property.name}</label>
              <select
                value={productproperties[property.name]}
                onChange={(e) => {
                  saveproductproperties(property.name, e.target.value);
                }}
              >
                {property.values.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data">
      <div className="space-y-3">
        <label>Product Name</label>
        <br />
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <br />
        <label>Add Category</label>
        <select
          value={categories}
          onChange={(e) => setcategories(e.target.value)}
        >
          <option value="0">Uncategorized</option>
          {availcategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        {categories !== "0" && getproperties()}
        <br />
        <label>Photos</label>
        <br />
        <div>
          <label className="w-24 h-24 cursor-pointer flex text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <p>Upload</p>{" "}
            <input
              type="file"
              className="hidden"
              name="listing[images]"
              placeholder="Product Name"
              multiple
              onChange={handleimagechange}
            />
          </label>
          <div className="flex gap-2 mt-2">
            {existingimages.length == 0 ? (
              <div>No Images Exist</div>
            ) : (
              existingimages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border border-black"
                />
              ))
            )}
            {images.length == 0 ? (
              <div>No Images Added</div>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded border border-black"
                />
              ))
            )}
          </div>
        </div>

        <label>Product Description</label>
        <br />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        ></textarea>
        <br />
        <label>Product Price (in USD)</label>
        <br />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setprice(Number(e.target.value))}
        />
        <br />
        <button className="btn-primary" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default Productform;
