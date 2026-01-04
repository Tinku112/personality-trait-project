async function submitData() {
  const name = document.getElementById("name").value;
  const subject1 = Number(document.getElementById("s1").value);
  const subject2 = Number(document.getElementById("s2").value);
  const subject3 = Number(document.getElementById("s3").value);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "⏳ Processing...";

  try {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        subject1,
        subject2,
        subject3
      })
    });

    const text = await response.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server did not return JSON");
    }

    if (!response.ok) {
      resultDiv.innerHTML = `❌ ${data.message || "Request failed"}`;
      return;
    }

    resultDiv.innerHTML = `
      <h3>Result</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Average:</strong> ${data.average.toFixed(2)}</p>
      <p><strong>Grade:</strong> ${data.grade}</p>
      <p><strong>Personality:</strong> ${data.personality}</p>
    `;

  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = "❌ Unable to connect to server";
  }
}
