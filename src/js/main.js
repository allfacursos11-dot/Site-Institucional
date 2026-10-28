// ==========================================================================
// MAIN: WhatsApp (botão flutuante e formulário de contato)
// ==========================================================================

// Só dígitos, com 55 + DDD
const WHATSAPP_NUMBER = "556139654339";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const floatButton = document.querySelector("#whatsapp-float");
const form = document.querySelector("#contact-form");
const errorBox = document.querySelector("#form-error");

// botão flutuante abre a conversa com uma mensagem pronta
floatButton.href = `${WHATSAPP_URL}?text=${encodeURIComponent(
  "Olá! Vim pelo site da ALFFA CURSOS e quero mais informações."
)}`;

function showError(message, field) {
  errorBox.textContent = message;
  field.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.nome;
  const phone = form.elements.tel;
  const interest = form.elements.interesse.value;
  const message = form.elements.msg.value.trim();

  if (!name.value.trim() || name.value.trim().length < 2 || /\d/.test(name.value)) {
  return showError("O nome não pode conter números e deve ter pelo menos 2 letras.", name);}
  if (phone.value.replace(/\D/g, "").length < 10) return showError("Digite um telefone com DDD.", phone);

  errorBox.textContent = "";

  const text =
    `Olá! Meu nome é ${name.value.trim()}.\n` +
    `Tenho interesse em: ${interest}.\n` +
    `Meu telefone: ${phone.value.trim()}.` +
    (message ? `\nMensagem: ${message}` : "");

  window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// ==========================================================================
// MENU HAMBÚRGUER
// ==========================================================================
const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

function setMenu(open) {
  menu.classList.toggle("navbar--open", open);
  menuButton.classList.toggle("header__toggle--open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
}

menuButton.addEventListener("click", () => {
  setMenu(!menu.classList.contains("navbar--open"));
});

// fecha ao clicar em um link do menu
menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

// fecha com a tecla Esc
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

// ==========================================================================
// ANIMAÇÃO AO ROLAR (elementos com data-reveal)
// ==========================================================================
const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // anima só uma vez
      });
    },
    { threshold: 0.15 } // 15% do elemento precisa aparecer
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  // navegador antigo: mostra tudo sem animação
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
