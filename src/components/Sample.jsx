import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import bg from "../assets/bgtu.jpg";

const Sample = () => {
  const divRef = useRef(null);
  const [data, setData] = useState({
    reff: "",
    date: "",
    notification: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const printDocument = () => {
    const input = divRef.current;

    html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };

  return (
    <div>
      <div className="mb5 my-3 text-center">
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => printDocument()}
        >
          Download
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => printDocument()}
        >
          Share
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded"
          onClick={() => printDocument()}
        >
          Publish
        </button>
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
            className="p-2 bg-transparent inline-block leading-[29px]  border-0 ring-0 focus:ring-0 focus:border-0 focus:ring-transparent focus:border-transparent align-middle"
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
            value={data.date}
            onChange={changeHandler}
            type="date"
          />
        </p>
        <p
          className="absolute font-semibold text-4xl top-[280px] left-[300px]"
          style={{ color: "white" }}
        >
          NOTIFICATION
        </p>
        <textarea
          name="notification"
          value={data.notification}
          className="absolute top-[400px] left-[200px] w-[500px] bg-transparent h-[400px]"
          placeholder="Enter your notification here"
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default Sample;
