async function submitData() {
    const data = {
        name: name.value,
        subject1: Number(s1.value),
        subject2: Number(s2.value),
        subject3: Number(s3.value)
    };

    const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    document.getElementById("result").style.display = "block";
    document.getElementById("result").innerHTML = `
  <h3>Result</h3>
  <p>Average: ${result.average.toFixed(2)}</p>
  <p>Grade: ${result.grade}</p>
  <p>Personality: ${result.personality}</p>
`;

}
