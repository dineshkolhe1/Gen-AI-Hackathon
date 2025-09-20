import { useState } from "react";
import axios from "axios";

function App() {
  const [photo, setPhoto] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
      alert("Please select a photo.");
      return;
    }

    setLoading(true);
    setOutput(null);

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("text", text);

    try {
      const res = await axios.post("http://localhost:8080/api/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOutput(res.data.output);
    } catch (err) {
      console.error(err);
      alert("Error generating listing. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>KalaMitra – AI Marketplace Assistant</h1>
      <p>Upload a craft photo + short description to generate a product listing.</p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>Craft Photo: </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>Description:</label>
          <br />
          <textarea
            rows="3"
            cols="50"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="E.g., This saree is made by my family in Kanchipuram..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {output && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "1rem",
          }}
        >
          <h3>Generated Output</h3>
          <p>
            <b>Title:</b> {output.title}
          </p>
          <p>
            <b>Description:</b> {output.description}
          </p>
          <p>
            <b>Story:</b> {output.story}
          </p>
          <p>
            <b>Price Suggestion:</b> {output.priceSuggestion || output.price}
          </p>

          {output.socialPost && (
            <>
              <h4>Social Media Post</h4>
              <p>{output.socialPost.caption}</p>
              <p>{output.socialPost.hashtags?.join(" ")}</p>
            </>
          )}

          {output.imageVariants && (
            <>
              <h4>Image Variants</h4>
              {output.imageVariants.map((v, i) => (
                <div key={i} style={{ marginTop: "0.5rem" }}>
                  <strong>{v.type}</strong>
                  <br />
                  <img
                    src={v.url}
                    alt={v.type}
                    style={{ maxWidth: "300px", border: "1px solid #bbb" }}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
