// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function index() {

//   return (
//     <>
//    <div className="p-10 bg-slate-200">
//    <Link to="/login">
//                     {/* <img src={logo_light} alt="" /> */}
//     <h3>Hello </h3>

//                   </Link>
//    </div>
//     </>
//   );
// }

import React, { useState } from "react";
import axios from "axios";

export default function Index() {
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState("");
  const [assistantContent, setAssistantContent] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAskQuestion = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("user_input", userInput);
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5001/api/chat",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // In đối tượng response.data ra console để kiểm tra cấu trúc
      console.log("Response from Flask:", response.data);
      // console.log("Response from Flask:", response.response_data);

      // Kiểm tra xem có trường "json_response_data" trong đối tượng response.data hay không
      if (response.data && response.data.json_response_data) {
        setLoading(false)
        const assistantResponse = response.data.json_response_data.assistant_response;
        setAssistantContent(assistantResponse);
        // console.log("answer:", assistantResponse);
      } else {
        console.error("Invalid response format from Flask: Missing 'json_response_data'");
      }
    } catch (error) {
      console.error("Error asking question:", error);
    }
  };

  return (
    <div className="p-10 bg-gray-200">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">ChatifyUIT</h1>
      <div className="flex flex-col md:flex-row items-center md:space-x-2">
        <input
          type="text"
          id="userInput"
          name="userInput"
          placeholder="Ask a question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="md:mt-0"
        />

        <button
          onClick={handleAskQuestion}
          className="md:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>

      {/* Hiển thị nội dung từ Flask */}
      {assistantContent && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-2">Assistant Content:</h4>
          <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{assistantContent}</pre>
        </div>
      )}
    </div>
  );
}
