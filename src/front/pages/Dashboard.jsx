import React, { useState, useEffect } from "react";
import { createDiaryEntry, getDiaryEntries } from "../services/fetchApi";
import { CloseSession } from "../components/CloseSession";
import { DiaryList } from "../components/DiaryList";

export const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await getDiaryEntries();
        setEntries(data.entries || []);
      } catch (err) {
        console.error("Failed to load entries");
      }
    };

    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage("Both title and content are required");
      setMessageType("error");
      return;
    }

    try {
      const newEntry = await createDiaryEntry(title, content, mood);
      setEntries([newEntry, ...entries]); 
      setMessage("Diary entry created successfully");
      setMessageType("success");
      setTitle("");
      setContent("");
      setMood("");
    } catch (error) {
      setMessage("Error creating diary entry");
      setMessageType("error");
    }
  };

  return (
    <div className="container d-flex flex-column" style={{ width: "100%" }}>
      <div className="row">
        <div><CloseSession /></div>
        <div className="col-12">
          <h1 className="d-flex justify-content-center">Welcome to your diary</h1>
        </div>

        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <div className="col-12 d-flex justify-content-center">
            <h2>Title:</h2>
            <input
              style={{ width: "50%" }}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-center my-5">
            <h2>Content:</h2>
            <textarea
              style={{ width: "50%" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="col-12 d-flex justify-content-center">
            <h2>Mood:</h2>
            <input
              style={{ width: "30%" }}
              type="text"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            />
          </div>

          {message && (
            <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`} role="alert">
              {message}
            </div>
          )}
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-success mt-5" type="submit">Post Diary Entry</button>
          </div>
        </form>

        <DiaryList entries={entries} />
      </div>
    </div>
  );
};