export const analyzeEmotion = async (imageBlob) => {

  const formData = new FormData()

  formData.append(
    "image",
    imageBlob,
    "photo.jpg"
  )

  const response = await fetch(

    "https://vanity-demanding-liver.ngrok-free.dev/analyze",

    {
      method: "POST",
      body: formData
    }

  )

  return await response.json()

}