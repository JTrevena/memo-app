const PATH = "http://example.path";

function handleBadResponseStatus(response) {
  console.log(response);
  throw new Error("Error! Response status: " + response.status);
}

export async function getMemoByID(memoID) {
  try {
    const response = await fetch(`${PATH}/idea/${memoID}`);

    if (!response.ok) handleBadResponseStatus(response);

    const memoObj = (await response.json())[0]; // [0] assumes that single objects are still returned wrapped in an array.
    return memoObj;
  } catch (err) {
    console.log(err);
  }
}

export async function postNewMemo() {
  try {
    const response = await fetch(`${PATH}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) handleBadResponseStatus(response);

    const memoInfo = await response.json();
    return memoInfo;
  } catch (err) {
    console.log(err);
  }
}

export async function updateMemo(memoInfo) {
  const { id, title, body } = memoInfo;
  const requestBody = {};
  if (title) requestBody.title = title;
  if (body) requestBody.body = body;

  try {
    const response = await fetch(`${PATH}/idea/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) handleBadResponseStatus(response);

    return response.ok;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteMemo(memoID) {
  try {
    const response = await fetch(`${PATH}/idea/${memoID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) handleBadResponseStatus(response);

    return response.ok;
  } catch (err) {
    console.log(err);
  }
}
