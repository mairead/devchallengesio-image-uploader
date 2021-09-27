// do we need jest-fetch-mock?

// POST has to be fetch and not useSWR
export const onUploadFile = async (fileObj) => {
  const body = new FormData();
  body.append('file', fileObj);

  try {
    const response = await fetch("/api/image", {
      method: "POST",
      body
    });

    const data = await response.json();

    return data.file;
  } catch(e) {
    return null;
    // whats best error handling pattern?
    // how can I fake an error happening to test?
  }
}

// I think try/catch is better here because you could render something
// else to tell the user it failed, so you can handle it in a
// meaningful way

// const res = await fetch('/api/comments', {
//   method: 'POST',
//   body: JSON.stringify({ authorId, comment }),
// });
// if (!res.ok) throw new Error(res.statusText);
// // this captures the status number as error message
// return await res.json();
