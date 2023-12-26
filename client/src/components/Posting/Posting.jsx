import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePhotograph } from "react-icons/hi";
import { DateRangePicker } from "react-date-range";
import { MdOutlineCancel } from "react-icons/md";
import { format } from "date-fns";
import { AddressAutofill, AddressMinimap } from "@mapbox/search-js-react";
import jwtInterceptor from "../../interceptors/axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Posting() {
  const navigate = useNavigate();
  const animatedComponents = makeAnimated();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openInputImage, setOpenInputImage] = useState(false);
  const [openInputTitle, setOpenInputTitle] = useState(false);
  const [openInputAddress, setOpenInputAddress] = useState(false);
  const [openInputIntro, setOpenInputIntro] = useState(false);
  const [openInputPerks, setOpenInputPerks] = useState(false);
  const [openInputNotice, setOpenInputNotice] = useState(false);
  const [openInputAge, setOpenInputAge] = useState(false);
  const [openInputCancel, setOpenInputCancel] = useState(false);
  const [openInputTime, setOpenInputTime] = useState(false);
  const [openInputPrice, setOpenInputPrice] = useState(false);
  const [openInputLanguage, setOpenInputLanguage] = useState(false);
  const [openInputTags, setOpenInputTags] = useState(false);

  const optionsLanguage = [
    { value: "English", label: "English" },
    { value: "Korean", label: "Korean" },
    { value: "Spanish", label: "Spanish" },
    { value: "Franch", label: "Franch" },
    { value: "Chinese", label: "Chinese" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? "1px solid #b91c1c" : provided.border,
      boxShadow: state.isFocused ? "0 0 0 1px #b91c1c" : provided.boxShadow,
      "&:hover": {
        border: state.isFocused ? "1px solid #b91c1c" : provided.border,
      },
    }),
  };

  const [feature, setFeature] = useState();
  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFeature(feature);
      // console.log(feature);
    },
    [setFeature]
  );

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState({
    food: "",
    transportation: "",
    beverage: "",
    alcohol: "",
    equipment: "",
    others: "",
  });

  const [minimumAge, setMinimumAge] = useState("");
  const [kidsAllowed, setKidsAllowed] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(false);
  const [maxGuest, setMaxGuest] = useState("");
  const [language, setLanguage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("$");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [notice, setNotice] = useState("");
  const [cancellation1, setCancellation1] = useState(false);
  const [cancellation2, setCancellation2] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const urls = [];

    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }

    setSelectedFiles(files);
    setPreviewUrls(urls);
  };

  const handlePerksChange = (event) => {
    const { name, value } = event.target;
    setPerks({ ...perks, [name]: value });
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSaveTags = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSaveTags(event);
    }
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("title", title);
    formData.append("description", description);
    formData.append("perks.food", perks.food);
    formData.append("perks.beverage", perks.beverage);
    formData.append("perks.alcohol", perks.alcohol);
    formData.append("perks.transportation", perks.transportation);
    formData.append("perks.equipment", perks.equipment);
    formData.append("perks.others", perks.others);
    formData.append("minimumAge", Number(minimumAge));
    formData.append("kidsAllowed", kidsAllowed);
    formData.append("petsAllowed", petsAllowed);
    formData.append("maxGuest", Number(maxGuest));
    formData.append("language", JSON.stringify(language));
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("tags", JSON.stringify(tags));
    formData.append("price", Number(price));
    formData.append("currency", currency);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("latitude", feature?.geometry?.coordinates[1]);
    formData.append("longitude", feature?.geometry?.coordinates[0]);
    formData.append("coordinates", feature?.geometry?.coordinates);
    formData.append("fullAddress", feature?.properties?.full_address);
    formData.append("notice", notice);
    formData.append("cancellation1", cancellation1);
    formData.append("cancellation2", cancellation2);

    try {
      await jwtInterceptor.post("/experiences/createExperience", formData, {
        headers: {
          "content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // console.log(response?.data);
      setSuccess("You have successfully posted an experience!");
      setTimeout(() => {
        navigate("/");
      }, 2000); // wait for 2 seconds before navigating to home page
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden bg-white py-5 sm:rounded-lg">
      <div className="px-4 py-6">
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          <Link to="/">Home</Link> &#60; Be a host
        </p>
        <h3 className="mt-10 mb-5 text-3xl font-semibold leading-6 text-gray-900">
          Be a host
        </h3>
      </div>

      {/* image */}
      <div className="w-2/3">
        <dl>
          <div className="border-b py-5 sm:grid-cols-3 sm:gap-4 sm:px-6">
            {success && <div className="mb-5 text-red-600">{success}</div>}
            {error && <div className="mb-5 text-red-600">{error}</div>}
            <dt className="text-sm font-medium text-gray-500">
              Experience image
            </dt>
            <div className="flex mt-2 justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {previewUrls.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="h-50 w-50 object-cover rounded-md"
                      />
                      <button
                        onClick={() => {
                          const newFiles = [...selectedFiles];
                          newFiles.splice(index, 1);
                          setSelectedFiles(newFiles);

                          const newUrls = [...previewUrls];
                          newUrls.splice(index, 1);
                          setPreviewUrls(newUrls);
                        }}
                        className="m-2 absolute top-0 right-0 rounded-full bg-white p-1"
                      >
                        <MdOutlineCancel className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <HiOutlinePhotograph
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600"
                    >
                      <span onClick={() => setOpenInputImage(!openInputImage)}>
                        Upload files
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    {/* <p className='pl-1'>or drag and drop</p> */}
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 5 files
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {title}
            </dd>
            <div
              onClick={() => setOpenInputTitle(!openInputTitle)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputTitle && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="text-gray-500">
                  please input the catched title of your activity
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="off"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
          </div>

          {/* What you'll do */}
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              What you'll do
            </dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {description}
            </dd>

            <div
              onClick={() => setOpenInputIntro(!openInputIntro)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputIntro && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="text-gray-500">
                  Please add detailed information about your activity
                </div>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
          </div>

          {/* What's includes */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              What's includes
            </dt>
            {perks && (
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {perks.food && `Food: ${perks.food}`}
                <br />
                {perks.transportation &&
                  `Transportation: ${perks.transportation}`}
                <br />
                {perks.beverage && `Beverage: ${perks.beverage}`}
                <br />
                {perks.alcohol && `Alcohol: ${perks.alcohol}`}
                <br />
                {perks.equipment && `Equipment: ${perks.equipment}`}
                <br />
                {perks.others && `Others: ${perks.others}`}
              </dd>
            )}
            <div
              onClick={() => setOpenInputPerks(!openInputPerks)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputPerks && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="perks"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type of perks
                </label>
                <div className="text-gray-500">
                  please add what you will offer to your guests
                </div>
                <label
                  htmlFor="food"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Food
                </label>
                <div>
                  <textarea
                    type="text"
                    id="food"
                    name="food"
                    value={perks.food}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="transportation"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Transportation
                </label>
                <div>
                  <textarea
                    type="text"
                    id="transportation"
                    name="transportation"
                    value={perks.transportation}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="beverage"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Beverage
                </label>
                <div>
                  <textarea
                    type="text"
                    id="beverage"
                    name="beverage"
                    value={perks.beverage}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="alcohol"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Alcohol
                </label>
                <div>
                  <textarea
                    type="text"
                    id="alcohol"
                    name="alcohol"
                    value={perks.alcohol}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="equipment"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Equipment
                </label>
                <div>
                  <textarea
                    type="text"
                    id="equipment"
                    name="equipment"
                    value={perks.equipment}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label
                  htmlFor="others"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  Others
                </label>
                <div>
                  <textarea
                    type="text"
                    id="others"
                    name="others"
                    value={perks.others}
                    onChange={handlePerksChange}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
          </div>

          {/* requirement of the guest */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Guest requirements
            </dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {minimumAge && `Minimum age: ${minimumAge} years-old`}
              <br />
              {kidsAllowed && "Guest can bring kids under 4 years"}
              <br />
              {petsAllowed && "Guest can bring their pets"}
              <br />
              {maxGuest && `Maximun group size: ${maxGuest} persons`}
            </dd>

            <div
              onClick={() => setOpenInputAge(!openInputAge)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputAge && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Minimum age of the guest
                </label>
                <div className="text-gray-500">
                  please set age limits for guests. Minors can only attend with
                  their legal guardian.
                </div>
                <select
                  id="minimumAge"
                  name="minimumAge"
                  autoComplete="off"
                  value={minimumAge}
                  onChange={(e) => setMinimumAge(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  <option>Select minimum age</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="15">15</option>
                  <option value="18">18</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                  <option value="60">60</option>
                </select>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="kids"
                      name="kids"
                      type="radio"
                      checked={kidsAllowed}
                      onChange={() => setKidsAllowed(true)}
                      onClick={() => setKidsAllowed(!kidsAllowed)}
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <label
                      htmlFor="kids"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Guest can bring kids under 4 years
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="pets"
                      name="pets"
                      type="radio"
                      checked={petsAllowed}
                      onChange={() => setPetsAllowed(true)}
                      onClick={() => setPetsAllowed(!petsAllowed)}
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <label
                      htmlFor="pets"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Guest can bring their pets
                    </label>
                  </div>
                </div>
                <label
                  htmlFor="age"
                  className="block mt-6 text-sm font-medium leading-6 text-gray-900"
                >
                  Maximum group size
                </label>
                <div className="text-gray-500">
                  please set age limits for size of group. Remember: If only one
                  person books, you'll still be expected to host. legal
                  guardian.
                </div>
                <select
                  id="size"
                  name="size"
                  autoComplete="off"
                  onChange={(e) => setMaxGuest(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  <option>Select maximum size of group</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
            )}
          </div>

          {/* Language */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Language</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {language &&
                language.map((option) => (
                  <span key={option.value} className="mr-2">
                    {option.label}
                  </span>
                ))}
            </dd>
            <div
              onClick={() => setOpenInputLanguage(!openInputLanguage)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputLanguage && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Language
                </label>
                <div className="text-gray-500">
                  please set languages that you can speak for guests.
                </div>
                <Select
                  styles={customStyles}
                  isMulti
                  options={optionsLanguage}
                  components={animatedComponents}
                  id="language"
                  name="language"
                  onChange={setLanguage}
                  className="mt-2 block w-1/2 rounded-md text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                ></Select>
              </div>
            )}
          </div>

          {/* General availiability */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              General availability
            </dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {(startDate || endDate) &&
                `Date: ${format(startDate, "MM/dd/yyyy")} to 
                    ${format(endDate, "MM/dd/yyyy")}`}
              <br />
              {(startTime || endTime) && `Time: ${startTime} to ${endTime}`}
            </dd>

            <div
              onClick={() => setOpenInputTime(!openInputTime)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputTime && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start time
                </label>
                <div className="text-gray-500">
                  please set time experience start time for guests.
                </div>
                <select
                  id="time"
                  name="time"
                  autoComplete="off"
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  <option>Select start time</option>
                  <option value="12:00 AM">12:00 AM</option>
                  <option value="12:30 AM">12:30 AM</option>
                  <option value="1:00 AM">1:00 AM</option>
                  <option value="1:30 AM">1:30 AM</option>
                  <option value="2:00 AM">2:00 AM</option>
                  <option value="2:30 AM">2:30 AM</option>
                  <option value="3:00 AM">3:00 AM</option>
                  <option value="3:30 AM">3:30 AM</option>
                  <option value="4:00 AM">4:00 AM</option>
                  <option value="4:30 AM">4:30 AM</option>
                  <option value="5:00 AM">5:00 AM</option>
                  <option value="5:30 AM">5:30 AM</option>
                  <option value="6:00 AM">6:00 AM</option>
                  <option value="6:30 AM">6:30 AM</option>
                  <option value="7:00 AM">7:00 AM</option>
                  <option value="7:30 AM">7:30 AM</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="8:30 AM">8:30 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:00 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:00 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:00 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:00 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:00 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                </select>
                <label
                  htmlFor="age"
                  className="mt-6 block text-sm font-medium leading-6 text-gray-900"
                >
                  End time
                </label>
                <div className="text-gray-500">
                  please set time experience end time for guests.
                </div>
                <select
                  id="time"
                  name="time"
                  autoComplete="off"
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                >
                  <option>Select end time</option>
                  <option value="12:00 AM">12:00 AM</option>
                  <option value="12:30 AM">12:30 AM</option>
                  <option value="1:00 AM">1:00 AM</option>
                  <option value="1:30 AM">1:30 AM</option>
                  <option value="2:00 AM">2:00 AM</option>
                  <option value="2:30 AM">2:30 AM</option>
                  <option value="3:00 AM">3:00 AM</option>
                  <option value="3:30 AM">3:30 AM</option>
                  <option value="4:00 AM">4:00 AM</option>
                  <option value="4:30 AM">4:30 AM</option>
                  <option value="5:00 AM">5:00 AM</option>
                  <option value="5:30 AM">5:30 AM</option>
                  <option value="6:00 AM">6:00 AM</option>
                  <option value="6:30 AM">6:30 AM</option>
                  <option value="7:00 AM">7:00 AM</option>
                  <option value="7:30 AM">7:30 AM</option>
                  <option value="8:00 AM">8:00 AM</option>
                  <option value="8:30 AM">8:30 AM</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="9:30 AM">9:30 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="10:00 AM">10:30 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="11:00 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:00 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:00 PM">1:30 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="2:00 PM">2:30 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="3:30 PM">3:30 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="4:30 PM">4:30 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                  <option value="5:30 PM">5:30 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="6:30 PM">6:30 PM</option>
                  <option value="7:00 PM">7:00 PM</option>
                  <option value="7:30 PM">7:30 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                  <option value="8:30 PM">8:30 PM</option>
                  <option value="9:00 PM">9:00 PM</option>
                  <option value="9:30 PM">9:30 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                  <option value="10:30 PM">10:30 PM</option>
                  <option value="11:00 PM">11:00 PM</option>
                  <option value="11:30 PM">11:30 PM</option>
                </select>
                <label
                  htmlFor="date"
                  className="mt-6 block text-sm font-medium leading-6 text-gray-900"
                >
                  Date range
                </label>
                <div className="text-gray-500">
                  please set date range for posting of your experience.
                </div>
                <div className="mt-6">
                  <DateRangePicker
                    ranges={[selectionRange]}
                    minDate={new Date()}
                    rangeColors={["#b91c1c"]}
                    onChange={handleSelect}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Tag */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center justify-center py-1 px-2 bg-gray border rounded-full mr-2"
                >
                  <span className="mr-2">{tag}</span>
                  <span
                    onClick={() => handleDeleteTag(index)}
                    className="inline-flex items-center justify-center w-5 h-5 pb-1 border rounded-full bg-red-600 text-white text-lg cursor-pointer"
                  >
                    &times;
                  </span>
                </div>
              ))}
            </dd>
            <div
              onClick={() => setOpenInputTags(!openInputTags)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputTags && (
              <form
                onSubmit={handleSaveTags}
                className="col-span-6 sm:col-span-3"
              >
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Tags
                </label>
                <div className="text-gray-500">
                  Please input relevant tags about your experience up to six
                </div>
                <div className="relative mt-2">
                  <div className="absolute top-0 justify-center left-0 flex flex-wrap items-center p-1"></div>
                  <input
                    type="text"
                    id="tags"
                    onKeyDown={handleKeyDown}
                    placeholder="please enter to add tags"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    autoComplete="off"
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Price */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Price</dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {price && `${currency} ${price}`}
            </dd>

            <div
              onClick={() => setOpenInputPrice(!openInputPrice)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputPrice && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="text-gray-500">please set the price</div>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {currency === "$" && (
                      <span className="text-gray-500 sm:text-sm">$</span>
                    )}
                    {currency === "€" && (
                      <span className="text-gray-500 sm:text-sm">€</span>
                    )}
                    {currency === "₩" && (
                      <span className="text-gray-500 sm:text-sm">₩</span>
                    )}
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <label htmlFor="currency" className="sr-only">
                      Currency
                    </label>
                    <select
                      id="currency"
                      name="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm"
                    >
                      <option>Currency</option>
                      <option value="$">USD</option>
                      <option value="€">EUR</option>
                      <option value="₩">KRW</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Address */}
          <form className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Where you'll be
            </dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {country && `${country},`} {city && `${city},`}{" "}
              {state && `${state},`} {address && address}
            </dd>

            <div
              onClick={() => setOpenInputAddress(!openInputAddress)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputAddress && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street
                </label>
                <AddressAutofill
                  accessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                  onRetrieve={handleRetrieve}
                >
                  <input
                    type="text"
                    name="address"
                    id="address"
                    autoComplete="address-line1"
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  />
                </AddressAutofill>
              </div>
            )}
            {openInputAddress && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  onChange={(e) => setCountry(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            )}
            {openInputAddress && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  onChange={(e) => setState(e.target.value)}
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
            {openInputAddress && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={(e) => setCity(e.target.value)}
                  autoComplete="address-level2"
                  className="mt-2 block w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
            {feature && openInputAddress && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="map"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Map
                </label>
                <div
                  id="minimap-container"
                  className="overflow-hidden"
                  style={{
                    height: "70vh",
                    width: "100%",
                  }}
                >
                  <AddressMinimap
                    accessToken={process.env.REACT_APP_MAPBOXAPIKEY}
                    feature={feature}
                    show={true}
                    satelliteToggle={true}
                    canAdjustMarker={true}
                    onSaveMarkerLocation={(coord) => {
                      console.log(coord);
                    }}
                  />
                </div>
              </div>
            )}
          </form>

          {/* Notice */}
          <div className="border-b px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Notice</dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {notice && notice}
            </dd>

            <div
              onClick={() => setOpenInputNotice(!openInputNotice)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputNotice && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Notice
                </label>
                <div className="text-gray-500">
                  please add detailed notice that your guest should be informed
                </div>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="off"
                  onChange={(e) => setNotice(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            )}
          </div>
          {/* Cancellation policy */}
          <div className="px-4 py-10 border-b sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Cancellation policy
            </dt>

            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {cancellation1 &&
                "Guests can cancel until 7 days before the Experience start time for a full refund, or within 24 hours of booking as long as the booking is made more than 48 hours before the start time."}{" "}
              {cancellation2 &&
                "Guests can cancel until 24 hours before the Experience start time for a full refund."}
            </dd>

            <div
              onClick={() => setOpenInputCancel(!openInputCancel)}
              className="font-medium text-red-600 cursor-pointer"
            >
              Edit
            </div>
            {openInputCancel && (
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cancellation policy
                </label>
                <div className="text-gray-500">
                  please choose a cancellation policy
                </div>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="cancel1"
                      name="cancel1"
                      type="radio"
                      checked={cancellation1}
                      onChange={() => {
                        setCancellation1(true);
                        setCancellation2(false); // Uncheck the other option
                      }}
                      // onClick={() => setCancellation1(!cancellation1)}
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <label
                      htmlFor="cancel1"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Guests can cancel until 7 days before the Experience start
                      time for a full refund, or within 24 hours of booking as
                      long as the booking is made more than 48 hours before the
                      start time.
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="cancel2"
                      name="cancel2"
                      type="radio"
                      checked={cancellation2}
                      onChange={() => {
                        setCancellation2(true);
                        setCancellation1(false); // Uncheck the other option
                      }}
                      // onClick={() => setCancellation2(!cancellation2)}
                      className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-600"
                    />
                    <label
                      htmlFor="cancel2"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Guests can cancel until 24 hours before the Experience
                      start time for a full refund.
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </dl>
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md border border-transparent bg-red-700 px-6 py-2 text-md font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Submit
        </button>
        {success && <div className="text-red-600">{success}</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
}
