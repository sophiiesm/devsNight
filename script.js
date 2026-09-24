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
    fail($("nome"), "Seu nome parece curto demais para ser levado a sério.");
    return false;
  }

  if (!email.includes("@") || email.includes(" ")) {
    fail($("email"), "O e-mail precisa ter @.");
    return false;
  }

  if (senha.length < 6 || senha.length > 12) {
    fail($("senha"), "Senha inválida. Ela precisa ter entre 6 e 12 caracteres.");
    return false;
  }

  if (!termos) {
    fail($("termos"), "Você precisa concordar.");
    return false;
  }

  return true;
}

// ==================== PASSO 1 ====================

// O botão "Avançar" (next1) CANCELA / REINICIA
$("next1").addEventListener("click", () => {
  notify("Você tentou avançar, então limpamos tudo.");
  location.reload();
});

// O botão "Cancelar" (cancel1) VALIDA E AVANÇA
$("cancel1").addEventListener("click", () => {
  if (!validStep1()) return;

  $("status").textContent = "piorando";
  step1.classList.add("hidden");
  step2.classList.remove("hidden");
  document.querySelector(".progress span:nth-child(1)").classList.remove("active");
  document.querySelector(".progress span:nth-child(2)").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  notify("Você cancelou com sucesso para avançar.");
});

// ==================== PASSO 2 ====================

let chosen = null;

document.querySelectorAll(".choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".choice").forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");
    chosen = btn;
    $("message2").textContent = "Ótimo. Sua escolha foi registrada.";
  });
});

// O botão "Voltar" (back2) VALIDA E AVANÇA
$("back2").addEventListener("click", () => {
  if (!chosen) {
    fail($("back2"), "Você não escolheu nada.");
    return;
  }

  if (chosen.dataset.correct !== "true") {
    fail(
      chosen,
      "Escolha incorreta."
    );
    return;
  }

  if ($("motivo").value.trim().length < 5) {
    fail($("motivo"), "Precisamos de uma justificativa.");
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
  window.scrollTo({ top: 0, behavior: "smooth" });
  notify("Você voltou... direto para a última etapa.");
});

// O botão "Próximo" (next2) VOLTA PARA O PASSO 1
$("next2").addEventListener("click", () => {
  step2.classList.add("hidden");
  step1.classList.remove("hidden");
  document.querySelector(".progress span:nth-child(2)").classList.remove("active");
  document.querySelector(".progress span:nth-child(1)").classList.add("active");
  $("status").textContent = "voltando para frente";
  notify("Você tentou avançar, então voltou pro início.");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ==================== PASSO 3 ====================

// O botão "Não Finalizar / Cancelar" (finalNo) VALIDA E CONCLUI O FLUXO
$("finalNo").addEventListener("click", () => {
  if (!$("opinioes").value) {
    fail(
      $("opinioes"),
      "Selecione alguma coisa. Qualquer coisa. O sistema precisa de uma decisão."
    );
    return;
  }

  step3.classList.add("hidden");
  success.classList.remove("hidden");
  $("status").textContent = "milagrosamente concluído";
  window.scrollTo({ top: 0, behavior: "smooth" });
  notify("Você recusou finalizar. Processo concluído!");
});

// O botão "Sim / Concluir" (finalYes) INVERTE POSIÇÕES E RECUSA FINALIZAR
$("finalYes").addEventListener("click", () => {
  notify("Você escolheu FINALIZAR. O sistema não concorda.");
  $("finalNo").style.order = "2";
  $("finalYes").style.order = "1";
});

// ==================== TELA FINAL ====================

$("restart").addEventListener("click", () => {
  location.reload();
});