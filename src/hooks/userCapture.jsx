import { post_surveyer_id } from "../utils/api";


export const handleCaptureID = async ({
  surveyUserId,
  user,
  videoRef,
  canvasRef,
  frameRef,
  fileName,
  imageName,
  setLoading,
  setIsCaptured,
  setCanProceed,
}) => {
  if (!surveyUserId || !user) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const frame = frameRef.current;
  if (!video || !canvas || !frame) return;

  const videoRect = video.getBoundingClientRect();
  const frameRect = frame.getBoundingClientRect();

  const sx =
    ((frameRect.left - videoRect.left) / videoRect.width) * video.videoWidth;
  const sy =
    ((frameRect.top - videoRect.top) / videoRect.height) * video.videoHeight;
  const sw = (frameRect.width / videoRect.width) * video.videoWidth;
  const sh = (frameRect.height / videoRect.height) * video.videoHeight;

  canvas.width = sw;
  canvas.height = sh;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, sw, sh);

  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const imageAlias = `${surveyUserId}_${imageName}.png`;
    const imageFile = new File([blob], imageAlias, { type: "image/png" });

    const formData = new FormData();
    formData.append("user", user.id);
    formData.append("survey", user.survey || "");
    formData.append(fileName, imageFile);

    setLoading(true);
    try {
      await post_surveyer_id(formData);
      alert("Survey updated successfully!");
      setIsCaptured(true);
      setCanProceed(true);

      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    } catch (error) {
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.error("Error posting survey:", error);
      alert(
        `Error updating survey: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, "image/png");
};


export const initializeCamera = (videoRef, setIsVideoLoaded, step) => {
  if ((step === 1 || step === 2) && videoRef.current) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsVideoLoaded(true);
        }
      })
      .catch((err) => console.error("Camera error:", err));
  }
};
