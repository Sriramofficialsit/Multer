const handleUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("certificateFile", selectedFile);
  formData.append("certificateTitle", title);
  formData.append("issuedTo", issuedTo);
  formData.append("issuedBy", issuedBy);
  formData.append("issueDate", issueDate);
  formData.append("proof", proof);
  formData.append("typeOfCertificate", certificateType);

  try {
    const res = await fetch("http://localhost:5000/upload-certificate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Upload successful:", data);
    } else {
      console.error("Error:", data.error);
    }
  } catch (err) {
    console.error("Upload failed:", err);
  }
};
