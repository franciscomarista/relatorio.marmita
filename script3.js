const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzyqxBR7sWSoE2HejaGocZCKNiBXlNZIqxFO60ybrUeyVAT3OedeoKi0Xqx_MBTTSxGvg/exec"; // exemplo: .../exec

document.getElementById("mealForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);

  // transforma em URLSearchParams (application/x-www-form-urlencoded)
  const params = new URLSearchParams();
  for (const [k, v] of fd.entries()) {
    params.append(k, v || "0");
  }

  const status = document.getElementById("status");
  status.textContent = "Enviando...";
  status.style.color = "black";

  try {
    const resp = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString()
    });

    const result = await resp.json();
    if (result.status === "sucesso") {
      status.textContent = "✅ Dados enviados com sucesso!";
      status.style.color = "green";
      form.reset();
    } else {
      status.textContent = "❌ Erro: " + (result.message || "resposta inesperada");
      status.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Erro ao enviar dados: " + err;
    status.style.color = "red";
  }
});
