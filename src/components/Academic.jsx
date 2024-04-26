import React, { useState, useRef } from "react";
import html2canvas from "@nidi/html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import axios from "axios";

const Academic = ({ user }) => {
	const postedBy = user._id;
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState("Fee notice");
  const [refValue, setRefValue] = useState("Ref. No.: SVGOI/Admin/2024/38");
  const [dateValue, setDateValue] = useState("Dated:29.02.2024");
  const [descValue, setDescValue] = useState(
    "This is for the information of all the students studying in Swami Vivekanand Group of Institutes (Except students admitted in 2023 batch) that the last date for deposit of their fee for odd semester (5th & 7th semester) is 10.04.2024. They are, therefore, directed to deposit their odd semester fee on or before 10.04.2024 positively. After due date, penalty will be applicable."
  );

  const noticeRef = useRef(null);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleRefChange = (e) => {
    setRefValue(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateValue(e.target.value);
  };

  const handleDescChange = (e) => {
    setDescValue(e.target.value);
  };

  const handleDownloadPDF = async () => {
    const input = noticeRef.current;
    try {
		await axios.post("http://localhost:9000/notice/academic", {
      title,
		  refValue,
		  dateValue,
		  descValue,
		  postedBy,
		});
		toast.success("Successfully downloaded");
	  } catch (err) {
		console.log(err)
		if (err.response && err.response.data && err.response.data.message) {
		  toast.error(err.response.data.message);
		} else {
		  toast.error("An error occurred while downloading the PDF.");
		}
		return; // Exit function early to prevent further execution
	  }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight);
      pdf.save("notice.pdf");
    });
  };

  return (
    <div className="">
      <div className="flex justify-center mb-4 mt-8">
        <button
          onClick={handleEditToggle}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
        >
          {isEditable ? "Save" : "Edit"}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
        >
          Download and publish
        </button>
      </div>
      <div className="my-4 py-2 text-center">
        Enter title for the notification :{" "}
        <input
          name="title"
          value={title}
          className="border border-black p-2"
          onChange={handleTitle}
          required
          type="text"
        />
      </div>
      <div>
        <div
          ref={noticeRef}
          className="p-9"
          style={{
            width: "210mm",
            margin: "auto",
            backgroundColor: "white",
          }}
        >
          <div>
            <h2 className="font-bold text-3xl">
              Swami Vivekanand Group of Institutes,
            </h2>
            <p className="font-medium">
              Chandigarh Patiala National Highway, Ram Nagar, Banur
            </p>
            <div className="w-full h-[1.5px] bg-slate-400" />
            <div className="flex justify-between">
              <div>
                <input
                  name="Ref"
                  type="text"
                  className={`outline-none border-none text-base tracking-eide text-txtDark w-[250px] ${
                    isEditable ? "bg-gray-200" : "bg-white"
                  }`}
                  value={refValue}
                  onChange={handleRefChange}
                  readOnly={!isEditable}
                />
              </div>
              <div>
                <input
                  name="Date"
                  type="text"
                  className={`outline-none border-none text-base tracking-eide text-txtDark w-full ${
                    isEditable ? "bg-gray-200" : "bg-white"
                  }`}
                  value={dateValue}
                  onChange={handleDateChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <h2 className="text-lg font-bold underline">Notice</h2>
          </div>
          <div className="text-center mt-10 break-normal">
            <textarea
              className={`text-xs mt-4 text-txtPrimary resize-none h-[100px] tracking-wider w-full outline-none break-normal border-none ${
                isEditable ? "bg-gray-200" : "bg-white"
              }`}
              name="Content"
              rows="3"
              value={descValue}
              onChange={handleDescChange}
              readOnly={!isEditable}
              style={{ wordBreak: "break-word" }}
              wrap="hard"
            ></textarea>
          </div>

          <div>
            <p className="text-sm font-bold mt-[100px]">Principal</p>
            <p className="text-sm font-bold ">SVIET</p>
          </div>
          <div className="mt-8">
            <p className="text-sm underline font-bold">CC to:-</p>
            <p className="text-sm">
              Hon'ble Chairman/President for their kind information;
            </p>
            <p className="text-sm">All Directors/Principals;</p>
            <p className="text-sm">All concerned Officials;</p>
            <p className="text-sm">Notice Board;</p>
            <p className="text-sm">Head of the Accounts.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academic;
