const $ = (id) => document.getElementById(id);

const step1 = $("step1");
const step2 = $("step2");
const step3 = $("step3");
const success = $("success");
const toast = $("toast");

function notify(text) {
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function fail(element, message) {
  element.classList.remove("shake");
  void element.offsetWidth;
  element.classList.add("shake");
  notify(message);
}

function validStep1() {
  const nome = $("nome").value.trim();
  const email = $("email").value.trim();
  const senha = $("senha").value;
  const termos = $("termos").checked;

  if (nome.length < 3) {
    fail($("nome"), "Seu nome parece curto demais para ser levado a sério. Tente novamente.");
    return false;
  }

  if (!email.includes("@") || email.includes(" ")) {
    fail($("email"), "O e-mail precisa ter @ e, por algum motivo, não pode respirar.");
    return false;
  }

  if (senha.length < 6 || senha.length > 12) {
    fail($("senha"), "Senha inválida. Ela precisa ter entre 6 e 12 caracteres. Descobrimos isso agora.");
    return false;
  }

  if (!termos) {
    fail($("termos"), "Você precisa concordar em não saber exatamente com o que está concordando.");
    return false;
  }

  return true;
}

$("next1").addEventListener("click", () => {
  if (!validStep1()) return;

  $("status").textContent = "piorando";
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
  document.querySelector(".progress span:nth-child(1)").classList.remove("active");
  document.querySelector(".progress span:nth-child(2)").classList.add("active");
  window.scrollTo({top: 0, behavior: "smooth"});
  notify("Parabéns. Você avançou sem saber por quê.");
});

$("cancel1").addEventListener("click", () => {
  notify("Você clicou em CANCELAR e, portanto, avançou. Consistência é importante.");
  if (validStep1()) $("next1").click();
});

let chosen = null;

document.querySelectorAll(".choice").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    chosen = btn;
    $("message2").textContent = "Ótimo. Sua escolha foi registrada e imediatamente questionada.";
  });
});

$("back2").addEventListener("click", () => {
  step2.classList.add("hidden");
  step1.classList.remove("hidden");
  $("status").textContent = "voltando para frente";
  notify("Você voltou. Para frente.");
  window.scrollTo({top: 0, behavior: "smooth"});
});

$("next2").addEventListener("click", () => {
  if (!chosen) {
    fail($("next2"), "Você não escolheu nada. Mas o botão também não explica o que deveria fazer.");
    return;
  }

  if (chosen.dataset.correct !== "true") {
    fail(chosen, "Escolha incorreta. A resposta correta era a que dizia que você NÃO queria continuar. Fácil.");
    return;
  }

  if ($("motivo").value.trim().length < 5) {
    fail($("motivo"), "Precisamos de uma justificativa. Pode ser absurda, mas precisa existir.");
    return;
  }

  $("showNome").textContent = $("nome").value;
  $("showEmail").textContent = $("email").value;
  $("showChoice").textContent = chosen.textContent;

  step2.classList.add("hidden");
  step3.classList.remove("hidden");
  document.querySelector(".progress span:nth-child(2)").classList.remove("active");
  document.querySelector(".progress span:nth-child(3)").classList.add("active");
  $("status").textContent = "perigosamente perto do fim";
  window.scrollTo({top: 0, behavior: "smooth"});
  notify("Última etapa. Provavelmente.");
});

$("finalNo").addEventListener("click", () => {
  notify("Você escolheu NÃO FINALIZAR. Excelente decisão. O sistema não concorda.");
  $("finalNo").style.order = "2";
  $("finalYes").style.order = "1";
});

$("finalYes").addEventListener("click", () => {
  if (!$("opinioes").value) {
    fail($("opinioes"), "Selecione alguma coisa. Qualquer coisa. O sistema precisa de uma decisão.");
    return;
  }

  step3.classList.add("hidden");
  success.classList.remove("hidden");
  $("status").textContent = "milagrosamente concluído";
  window.scrollTo({top: 0, behavior: "smooth"});
});

$("restart").addEventListener("click", () => {
  location.reload();
});
