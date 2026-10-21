const form = document.getElementById("calculatorForm");
const clearBtn = document.getElementById("clearBtn");

const emptyState = document.getElementById("emptyState");
const summaryContent = document.getElementById("summaryContent");
const resultsSection = document.getElementById("resultsSection");
const statusDot = document.getElementById("statusDot");

const fields = {
  age: document.getElementById("age"),
  sex: document.getElementById("sex"),
  weight: document.getElementById("weight"),
  height: document.getElementById("height")
};

/*
 * ============================================================
 *  REGLAS DEL EXCEL
 * ============================================================
 *
 * E8 = C8 / (D8 * D8)
 * F8 = IF(E8<18.5,"Bajo peso",
 *        IF(E8<24.9,"Normal",
 *        IF(E8<29.9,"Sobrepeso","Obesidad")))
 *
 * G8 = IF(E8<18.5,10,
 *        IF(E8<24.9,20,
 *        IF(E8<29.9,25,30)))
 *
 * H8 = IF(E8<18.5,150,
 *        IF(E8<24.9,200,
 *        IF(E8<29.9,300,400)))
 *
 * I8 = IF(E8<18.5,5,
 *        IF(E8<24.9,7,
 *        IF(E8<29.9,10,12)))
 *
 * J8 = IF(E8<18.5,15,
 *        IF(E8<24.9,20,
 *        IF(E8<29.9,25,30)))
 *
 * K8 = IF(E8<18.5,2,
 *        IF(E8<24.9,3,
 *        IF(E8<29.9,4,5)))
 *
 * L8 = IF(E8<18.5,
 *        "Aumentar masa muscular y controlar la nutrición.",
 *        IF(E8<24.9,
 *        "Mantener peso saludable con ejercicio y dieta equilibrada.",
 *        IF(E8<29.9,
 *        "Controlar peso y realizar ejercicio regular.",
 *        "Reducir peso, consultar nutricionista y realizar ejercicio.")))
 *
 * M8 = I8
 *
 * Nota: edad y sexo son campos del formulario original, pero no
 * participan en las fórmulas actuales del Excel.
 */

function calculateFromExcelRules(weight, height) {
  const bmi = weight / (height * height);

  let classification;
  let frequency;
  let pulseDuration;
  let intensity;
  let sessionDuration;
  let sessions;
  let recommendation;

  if (bmi < 18.5) {
    classification = "Bajo peso";
    frequency = 10;
    pulseDuration = 150;
    intensity = 5;
    sessionDuration = 15;
    sessions = 2;
    recommendation = "Aumentar masa muscular y controlar la nutrición.";
  } else if (bmi < 24.9) {
    classification = "Normal";
    frequency = 20;
    pulseDuration = 200;
    intensity = 7;
    sessionDuration = 20;
    sessions = 3;
    recommendation = "Mantener peso saludable con ejercicio y dieta equilibrada.";
  } else if (bmi < 29.9) {
    classification = "Sobrepeso";
    frequency = 25;
    pulseDuration = 300;
    intensity = 10;
    sessionDuration = 25;
    sessions = 4;
    recommendation = "Controlar peso y realizar ejercicio regular.";
  } else {
    classification = "Obesidad";
    frequency = 30;
    pulseDuration = 400;
    intensity = 12;
    sessionDuration = 30;
    sessions = 5;
    recommendation = "Reducir peso, consultar nutricionista y realizar ejercicio.";
  }

  return {
    bmi,
    classification,
    frequency,
    pulseDuration,
    intensity,
    sessionDuration,
    sessions,
    recommendation,
    m1: intensity
  };
}

function setError(name, message = "") {
  document.getElementById(`${name}Error`).textContent = message;
}

function validate() {
  let valid = true;

  Object.keys(fields).forEach(name => setError(name));

  const age = Number(fields.age.value);
  const sex = fields.sex.value;
  const weight = Number(fields.weight.value);
  const height = Number(fields.height.value);

  if (!Number.isFinite(age) || age < 0 || age > 120) {
    setError("age", "Introduce una edad válida.");
    valid = false;
  }

  if (!sex) {
    setError("sex", "Selecciona una opción.");
    valid = false;
  }

  if (!Number.isFinite(weight) || weight <= 0 || weight > 500) {
    setError("weight", "Introduce un peso válido.");
    valid = false;
  }

  if (!Number.isFinite(height) || height <= 0 || height > 2.5) {
    setError("height", "Introduce una estatura válida.");
    valid = false;
  }

  return valid;
}

function formatNumber(value, decimals = 1) {
  return value.toLocaleString("es-MX", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

function renderResults(result) {
  document.getElementById("bmiValue").textContent = formatNumber(result.bmi, 2);
  document.getElementById("classification").textContent = result.classification;
  document.getElementById("summaryFrequency").textContent = `${result.frequency} Hz`;
  document.getElementById("summaryIntensity").textContent = `${result.intensity} mA`;
  document.getElementById("summaryPulse").textContent = `${result.pulseDuration} µs`;
  document.getElementById("summaryDuration").textContent = `${result.sessionDuration} min`;
  document.getElementById("summarySessions").textContent = `${result.sessions}`;

  document.getElementById("resultBmi").textContent = formatNumber(result.bmi, 2);
  document.getElementById("resultClassification").textContent = result.classification;
  document.getElementById("resultFrequency").textContent = result.frequency;
  document.getElementById("resultPulse").textContent = result.pulseDuration;
  document.getElementById("resultIntensity").textContent = result.intensity;
  document.getElementById("resultDuration").textContent = result.sessionDuration;
  document.getElementById("resultSessions").textContent = result.sessions;
  document.getElementById("resultM1").textContent = result.m1;
  document.getElementById("recommendation").textContent = result.recommendation;

  emptyState.classList.add("hidden");
  summaryContent.classList.remove("hidden");
  resultsSection.classList.remove("hidden");
  statusDot.classList.add("active");

  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!validate()) return;

  const weight = Number(fields.weight.value);
  const height = Number(fields.height.value);

  const result = calculateFromExcelRules(weight, height);
  renderResults(result);
});

clearBtn.addEventListener("click", () => {
  form.reset();

  Object.keys(fields).forEach(name => setError(name));

  emptyState.classList.remove("hidden");
  summaryContent.classList.add("hidden");
  resultsSection.classList.add("hidden");
  statusDot.classList.remove("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
});
