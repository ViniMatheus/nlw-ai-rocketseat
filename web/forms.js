import { server } from "./server";

const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");
const button = document.querySelector("#submit");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  content.classList.add("placeholder");
  input.setAttribute("disabled", "");
  button.setAttribute("disabled", "");

  const videoUrl = input.value;

  if (!videoUrl.includes("shorts")) {
    return (content.innerHTML = "URL inválida");
  }

  const [_, params] = videoUrl.split("/shorts/");
  const [videoId] = params.split("?si");

  content.textContent = `Obtendo o texto do Audio...`;

  const transcription = await server.get("/summary/" + videoId);

  content.textContent = "Realizando o resumo...";

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  });

  content.textContent = summary.data.result;
  content.classList.remove("placeholder");
  input.removeAttribute("disabled");
  button.removeAttribute("disabled");
});
