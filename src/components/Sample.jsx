import React, { useRef, useState } from "react";
import html2canvas from "@nidi/html2canvas";
import jsPDF from "jspdf";
import bg from "../assets/bgtu.jpg";
import axios from "axios";
import { toast } from "react-toastify";

const Sample = ({ user }) => {
  const divRef = useRef(null);
  const [data, setData] = useState({
    title: "",
    reff: "",
    date: "",
    description: "",
    postedBy: user._id,
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const publishHandle = async () => {
    try {
      const respone = await axios.post(
        "http://localhost:9000/notice/unique",
        data
      );
      toast.success("published successfully");
    } catch (err) {
      toast.error("error in publishing");
    }
  };
  const printDocument = async () => {
    const input = divRef.current;
    try {
      const respone = await axios.post(
        "http://localhost:9000/notice/unique",
        data
      );
      toast.success(respone.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

      pdf.save("download.pdf");
    });
  };
  const generatePDF = async () => {
    const input = divRef.current;
    const canvas = await html2canvas(input, { scrollY: -window.scrollY });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    return pdf.output("blob");
};

// Function to initiate email redirection with PDF attachment
const shareViaEmail = async () => {
    const pdfBlob = await generatePDF();
    const formData = new FormData();
    formData.append("attachment", pdfBlob, "document.pdf");

    // Construct the mailto URL with FormData
    const mailtoURL = `mailto:?subject=PDF Attachment&body=Please find the attached PDF`;

    // Create a URL object with the FormData
    const url = URL.createObjectURL(new Blob([formData], { type: 'multipart/form-data' }))
    console.log(url.replace("blob:", ""));
    // Open mail client with pre-filled email and attachment
    window.open(`${mailtoURL}&attachment=${url.replace("blob:", "")}`);
};
  return (
    <div>
      <div className="mb5 my-3 text-center">
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => printDocument()}
        >
          Download and publish
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => shareViaEmail()}
        >
          Share
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={publishHandle}
        >
          Publish
        </button>
      </div>
      <div className="my-4 py-2 text-center">
        Enter title for the notification :{" "}
        <input
          name="title"
          
          value={data.title}
          className="border border-black p-2"
          onChange={changeHandler}
          required
          type="text"
        />
      </div>
      <div
        ref={divRef}
        className="mt4 relative"
        style={{
          background: `url(${bg})`,
          backgroundSize: "cover",
          width: "210mm",
          minHeight: "297mm",
          margin: "auto",
        }}
      >
        <p className="absolute top-[180px] left-[100px] text-[15px]">
          Ref. No:{" "}
          <input
            className="relative top-[3px] left-1 pb-2 bg-transparent inline-block leading-[29px]  border-0 ring-0 focus:ring-0 focus:border-0 focus:ring-transparent focus:border-transparent align-middle"
            type="text"
            value={data.reff}
            onChange={changeHandler}
            name="reff"
            placeholder="Type the serial no."
          />
        </p>
        <p className="absolute top-[180px] left-[590px] text-[15px]">
          Date:{" "}
          <input
            name="date"
            className="h-[max-content] leading-relaxed relative top-[3px] left-1 align-middle bg-transparent border-0 ring-0 focus:ring-0 focus:border-0 focus:ring-transparent focus:border-transparent pb-2 inline-block "
            value={data.date}
            onChange={changeHandler}
            type="date"
          />
        </p>
        <p className="absolute font-semibold text-4xl top-[280px] left-[300px]">
          NOTIFICATION
        </p>
        <p className="">
          <textarea
            name="description"
            value={data.description}
            className="absolute top-[400px] left-[200px] w-[500px] bg-transparent h-[400px] "
            placeholder="Enter your notification here"
            onChange={changeHandler}
          />
        </p>
      </div>
    </div>
  );
};

export default Sample;
