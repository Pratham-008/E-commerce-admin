"use client";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../component/Layout";
import axios from "axios";
import Link from "next/link";
const Page = () => {
  const [edit, setedit] = useState(false);
  const [editcat, seteditcat] = useState({});
  const [name, setname] = useState("");
  const [categories, setcategories] = useState([]);
  const [parent, setparent] = useState("0");
  const [properties, setproperties] = useState([]);

  const savecategories = async () => {
    const updatedProperties = properties.map((p) => ({
      name: p.name,
      values: p.values.split(",").map((v) => v.trim()),
    }));
    if (edit) {
      axios.put("/api/categories", {
        name,
        parent,
        _id: editcat._id,
        properties: updatedProperties,
      });
      setedit(false);
      setparent("0");
      setname("");
      setproperties([]);
      getcategories();
    } else {
      const updatedProperties = properties.map((p) => ({
        name: p.name,
        values: p.values.split(",").map((v) => v.trim()),
      }));

      await axios.post("/api/categories", {
        name,
        parent,
        properties: updatedProperties,
      });
      setedit(false);
      setname("");
      setparent("0");
      getcategories();
      setproperties([]);
    }
  };
  const getcategories = async () => {
    await axios.get("/api/categories").then((response) => {
      setcategories(response.data);
    });
  };
  useEffect(() => {
    try {
      getcategories();
    } catch (error) {
      console.log("error in axios");
    }
  }, []);

  const editcategory = (category) => {
    setedit(true);
    seteditcat(category);
    setname(category.name);
    setparent(category.parent?._id || 0);
    setproperties(category.properties || []);
  };

  const deletecategory = async (category) => {
    console.log(category);
    const { _id, name, parent } = category;

    await axios.delete("/api/categories/" + _id);
    getcategories();
  };

  const addproperty = () => {
    setproperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlepropertyname = (index, propertyType, value) => {
    setproperties((prev) => {
      const updatedProperties = [...prev];
      updatedProperties[index][propertyType] = value;
      return updatedProperties;
    });
  };

  const removeproperty = (index) => {
    setproperties((prev) => {
      return [...prev].filter((p, pindex) => {
        return index != pindex;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      {edit && <h2>Editing.....</h2>}
      <label> New Categories Name</label>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          savecategories();
        }}
        className="space-y-2"
      >
        <div className="flex-col space-y-4  md:space-x-2 md:flex-row md:space-y-0">
          <input
            type="text"
            placeholder="Categories Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <select value={parent} onChange={(e) => setparent(e.target.value)}>
            <option value="0">There is not any category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <label>Properties</label>
          <br />
          <button
            type="button"
            onClick={() => addproperty()}
            className="btn-primary "
          >
            Add Properties
          </button>
        </div>
        {properties.length > 0 &&
          properties.map((property, index) => (
            <div className="flex gap-2" key={index}>
              <input
                type="text"
                value={property.name}
                onChange={(e) =>
                  handlepropertyname(index, "name", e.target.value)
                }
                placeholder="Enter a name"
              />

              <input
                type="text"
                value={property.values}
                onChange={(e) =>
                  handlepropertyname(index, "values", e.target.value)
                }
                placeholder="Enter a values with ,"
              />
              <button
                className="btn-primary"
                type="button"
                onClick={() => removeproperty(index)}
              >
                Remove
              </button>
            </div>
          ))}

        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>

      {categories.length == 0 ? (
        <div>There is no categories found</div>
      ) : (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Name</td>
              <td>Parent</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category.parent?.name || "No Parent category"}</td>
                <td>
                  <div className="flex space-y-4 flex-col md:flex-row md:space-x-4 md:space-y-0">
                    <button
                      className="btn-primary flex gap-1"
                      onClick={() => editcategory(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="btn-primary flex gap-1"
                      onClick={() => deletecategory(category)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default Page;
