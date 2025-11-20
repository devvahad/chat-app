const uploadFile = async (file) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "chat-app-file";

  if (!cloudName) {
    console.error("Missing REACT_APP_CLOUDINARY_CLOUD_NAME in .env");
    return null;
  }

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("Cloudinary upload response:", data);

    if (!res.ok) {
      console.error("Upload failed:", data);
      return null;
    }

    return data.secure_url;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
};

export default uploadFile;
