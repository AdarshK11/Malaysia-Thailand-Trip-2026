function formatAmount(value) {
  if (!Number.isFinite(value)) return "";
  return String(Math.round(value * 100) / 100);
}

document.querySelectorAll("[data-converter]").forEach((converter) => {
  const localInput = converter.querySelector("[data-local-amount]");
  const inrInput = converter.querySelector("[data-inr-amount]");
  const rateInput = converter.querySelector("[data-rate-input]");

  function rate() {
    return Number(rateInput.value || converter.dataset.rate || 0);
  }

  function updateFromLocal() {
    inrInput.value = formatAmount(Number(localInput.value || 0) * rate());
  }

  function updateFromInr() {
    const currentRate = rate();
    inrInput.value = formatAmount(Number(inrInput.value || 0));
    localInput.value = currentRate ? formatAmount(Number(inrInput.value || 0) / currentRate) : "";
  }

  localInput.addEventListener("input", updateFromLocal);
  inrInput.addEventListener("input", updateFromInr);
  rateInput.addEventListener("input", updateFromLocal);
  updateFromLocal();
});
