const form = document.getElementById("calculatorForm");
const clearBtn = document.getElementById("clearBtn");
const emptyState = document.getElementById("emptyState");
const summaryContent = document.getElementById("summaryContent");
const resultsSection = document.getElementById("resultsSection");
const statusDot = document.getElementById("statusDot");
const fields = {
  age: document.getElementById("age"), sex: document.getElementById("sex"),
  weight: document.getElementById("weight"), height: document.getElementById("height")
};

/* REGLAS ORIGINALES DEL EXCEL. Edad y sexo no intervienen en estas fórmulas. */
function calculateFromExcelRules(weight, height) {
  const bmi = weight / (height * height);
  let classification, frequency, pulseDuration, intensity, sessionDuration, sessions, recommendation;
  if (bmi < 18.5) {
    classification = "Bajo peso"; frequency = 10; pulseDuration = 150; intensity = 5; sessionDuration = 15; sessions = 2;
    recommendation = "Aumentar masa muscular y controlar la nutrición.";
  } else if (bmi < 24.9) {
    classification = "Normal"; frequency = 20; pulseDuration = 200; intensity = 7; sessionDuration = 20; sessions = 3;
    recommendation = "Mantener peso saludable con ejercicio y dieta equilibrada.";
  } else if (bmi < 29.9) {
    classification = "Sobrepeso"; frequency = 25; pulseDuration = 300; intensity = 10; sessionDuration = 25; sessions = 4;
    recommendation = "Controlar peso y realizar ejercicio regular.";
  } else {
    classification = "Obesidad"; frequency = 30; pulseDuration = 400; intensity = 12; sessionDuration = 30; sessions = 5;
    recommendation = "Reducir peso, consultar nutricionista y realizar ejercicio.";
  }
  return { bmi, classification, frequency, pulseDuration, intensity, sessionDuration, sessions, recommendation, m1: intensity };
}
function setError(name, message = "") { const el = document.getElementById(`${name}Error`); if (el) el.textContent = message; }
function validate() {
  let valid = true; Object.keys(fields).forEach(name => setError(name));
  const age = Number(fields.age.value), sex = fields.sex.value, weight = Number(fields.weight.value), height = Number(fields.height.value);
  if (fields.age.value === "" || !Number.isFinite(age) || age < 0 || age > 120) { setError("age", "Introduce una edad válida."); valid = false; }
  if (!sex) { setError("sex", "Selecciona una opción."); valid = false; }
  if (fields.weight.value === "" || !Number.isFinite(weight) || weight <= 0 || weight > 500) { setError("weight", "Introduce un peso válido."); valid = false; }
  if (fields.height.value === "" || !Number.isFinite(height) || height <= 0 || height > 2.5) { setError("height", "Introduce una estatura válida."); valid = false; }
  return valid;
}
function formatNumber(value, decimals = 1) { return value.toLocaleString("es-MX", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); }
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
  emptyState.classList.add("hidden"); summaryContent.classList.remove("hidden"); resultsSection.classList.remove("hidden"); statusDot.classList.add("active");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
form.addEventListener("submit", event => {
  event.preventDefault(); if (!validate()) return;
  renderResults(calculateFromExcelRules(Number(fields.weight.value), Number(fields.height.value)));
});

/* CATÁLOGO AMPLIABLE. Para agregar una afección, añade una entrada con zona, nombre y síntomas. */
const conditionCatalog = [
  { id: "epicondilitis", name: "Epicondilitis", zone: "codo", description: "Coincidencia orientativa de síntomas del codo.", symptoms: [
    { id: "dolor_codo", label: "Dolor en el codo" }, { id: "dolor_irradiado_codo", label: "El dolor se irradia" },
    { id: "debilidad_agarre", label: "Debilidad al agarrar objetos" }, { id: "molestia_actividad", label: "Molestias en movimientos cotidianos" },
    { id: "sensibilidad_tacto", label: "Sensibilidad al tocar la zona" }, { id: "rigidez_manana", label: "Rigidez por la mañana" },
    { id: "progresivo", label: "Los síntomas han empeorado progresivamente" }
  ]},
  { id: "esguince_cervical", name: "Esguince cervical", zone: "cuello", description: "Coincidencia orientativa de síntomas cervicales; requiere valoración profesional.", symptoms: [
    { id: "dolor_rigidez_cuello", label: "Dolor y rigidez en el cuello" }, { id: "limitacion_cuello", label: "Limitación del movimiento del cuello" },
    { id: "cefalea", label: "Dolor de cabeza" }, { id: "irradiacion_cuello", label: "Dolor que se irradia" },
    { id: "fatiga_debilidad", label: "Fatiga o debilidad general" }, { id: "mareos", label: "Mareos o vértigo" },
    { id: "alteracion_sensorial", label: "Hormigueo u otras alteraciones sensoriales" }, { id: "acufenos_vision", label: "Zumbidos en los oídos o visión borrosa" }
  ]},
  { id: "quervain", name: "Tenosinovitis de Quervain", zone: "pulgar", description: "Coincidencia orientativa de síntomas en la base del pulgar y muñeca.", symptoms: [
    { id: "dolor_base_pulgar", label: "Dolor en la base del pulgar" }, { id: "irradiacion_pulgar", label: "Dolor que se irradia" },
    { id: "hinchazon_pulgar", label: "Hinchazón o sensibilidad" }, { id: "agarre_pellizco", label: "Dificultad para agarrar o pellizcar" },
    { id: "bloqueo_chasquido", label: "Sensación de bloqueo o chasquido" }
  ]},
  { id: "lumbalgia", name: "Lumbalgia", zone: "espalda", description: "Coincidencia orientativa de síntomas en la espalda baja.", symptoms: [
    { id: "dolor_espalda_baja", label: "Dolor en la espalda baja" }, { id: "rigidez_bloqueo", label: "Rigidez o sensación de bloqueo" },
    { id: "limitacion_espalda", label: "Limitación del movimiento" }, { id: "ciatica", label: "Dolor que se irradia hacia una pierna" }
  ]}
];
const bodyZone = document.getElementById("bodyZone");
const guidedQuestions = document.getElementById("guidedQuestions");
const diagnosisResults = document.getElementById("diagnosisResults");
function renderQuestions() {
  const zone = bodyZone.value; diagnosisResults.classList.add("hidden"); diagnosisResults.replaceChildren();
  if (!zone) { guidedQuestions.classList.add("hidden"); guidedQuestions.replaceChildren(); return; }
  const relevant = conditionCatalog.filter(condition => condition.zone === zone);
  const uniqueSymptoms = [...new Map(relevant.flatMap(condition => condition.symptoms).map(symptom => [symptom.id, symptom])).values()];
  guidedQuestions.classList.remove("hidden");
  guidedQuestions.innerHTML = `<h3>Preguntas sobre los síntomas</h3><p>Marca todos los síntomas que correspondan. Puedes seleccionar más de uno.</p><div class="symptom-grid" id="symptomGrid"></div>`;
  const grid = guidedQuestions.querySelector("#symptomGrid");
  uniqueSymptoms.forEach(symptom => {
    const label = document.createElement("label"); label.className = "symptom-option";
    const input = document.createElement("input"); input.type = "checkbox"; input.name = "guidedSymptom"; input.value = symptom.id;
    const text = document.createElement("span"); text.textContent = symptom.label;
    label.append(input, text); grid.append(label);
  });
}
bodyZone.addEventListener("change", renderQuestions);
function compareSymptoms() {
  const zone = bodyZone.value;
  if (!zone) { diagnosisResults.classList.remove("hidden"); diagnosisResults.textContent = "Selecciona primero una zona corporal."; return; }
  const selected = new Set([...guidedQuestions.querySelectorAll('input[name="guidedSymptom"]:checked')].map(input => input.value));
  if (!selected.size) { diagnosisResults.classList.remove("hidden"); diagnosisResults.textContent = "Selecciona al menos un síntoma para realizar la comparación."; return; }
  const matches = conditionCatalog.filter(condition => condition.zone === zone).map(condition => {
    const matched = condition.symptoms.filter(symptom => selected.has(symptom.id));
    return { ...condition, matched, total: condition.symptoms.length, percent: Math.round(matched.length / condition.symptoms.length * 100) };
  }).filter(condition => condition.matched.length > 0).sort((a, b) => b.matched.length - a.matched.length);
  diagnosisResults.replaceChildren(); diagnosisResults.classList.remove("hidden");
  const heading = document.createElement("h3"); heading.textContent = "Coincidencias encontradas"; diagnosisResults.append(heading);
  const intro = document.createElement("p"); intro.className = "formula-explanation"; intro.textContent = "El orden solo refleja coincidencias con el catálogo, no la probabilidad de tener una enfermedad."; diagnosisResults.append(intro);
  if (!matches.length) { const p = document.createElement("p"); p.textContent = "No se encontraron coincidencias en el catálogo actual. Esto no descarta ninguna afección."; diagnosisResults.append(p); return; }
  matches.forEach(match => {
    const card = document.createElement("article"); card.className = "result-match";
    const head = document.createElement("div"); head.className = "result-match-head";
    const name = document.createElement("strong"); name.textContent = match.name;
    const score = document.createElement("span"); score.className = "match-score"; score.textContent = `${match.matched.length} de ${match.total} síntomas del catálogo`;
    head.append(name, score); card.append(head);
    const p = document.createElement("p"); p.textContent = `Coincidencias: ${match.matched.map(item => item.label).join(", ")}. ${match.description}`; card.append(p); diagnosisResults.append(card);
  });
}
document.getElementById("compareSymptomsBtn").addEventListener("click", compareSymptoms);
document.getElementById("clearDiagnosisBtn").addEventListener("click", () => { bodyZone.value = ""; renderQuestions(); });

/* Nuevo registro: limpiar datos y resultados de esta sesión, sin persistencia. */
clearBtn.addEventListener("click", () => {
  form.reset(); Object.keys(fields).forEach(name => setError(name));
  emptyState.classList.remove("hidden"); summaryContent.classList.add("hidden"); resultsSection.classList.add("hidden"); statusDot.classList.remove("active");
  bodyZone.value = ""; renderQuestions();
  if (typeof amfForm !== "undefined") { amfForm.reset(); document.getElementById("amfResultsSection").classList.add("hidden"); Object.keys(amfFields).forEach(name => { const errorId = name === "frequencyOne" || name === "frequencyTwo" ? `${name}Error` : `amf${name[0].toUpperCase()}${name.slice(1)}Error`; const error = document.getElementById(errorId); if (error) error.textContent = ""; }); }
  document.getElementById("patientSigns").value = ""; document.getElementById("patientSymptoms").value = ""; document.getElementById("patientNotes").value = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Formulario independiente: misma dosificación del Excel + cálculo AMF. */
const amfForm = document.getElementById("amfCalculatorForm");
const amfFields = {
  age: document.getElementById("amfAge"),
  sex: document.getElementById("amfSex"),
  weight: document.getElementById("amfWeight"),
  height: document.getElementById("amfHeight"),
  frequencyOne: document.getElementById("frequencyOne"),
  frequencyTwo: document.getElementById("frequencyTwo")
};
function validateAmfForm() {
  let valid = true;
  Object.keys(amfFields).forEach(name => {
    const error = document.getElementById(`${name === "frequencyOne" || name === "frequencyTwo" ? name : "amf" + name[0].toUpperCase() + name.slice(1)}Error`);
    if (error) error.textContent = "";
  });
  const rules = [
    ["age", amfFields.age.value !== "" && Number(amfFields.age.value) >= 0 && Number(amfFields.age.value) <= 120, "Introduce una edad válida."],
    ["sex", Boolean(amfFields.sex.value), "Selecciona una opción."],
    ["weight", amfFields.weight.value !== "" && Number(amfFields.weight.value) > 0 && Number(amfFields.weight.value) <= 500, "Introduce un peso válido."],
    ["height", amfFields.height.value !== "" && Number(amfFields.height.value) >= 0.5 && Number(amfFields.height.value) <= 2.5, "Introduce una estatura válida."],
    ["frequencyOne", amfFields.frequencyOne.value !== "" && Number.isFinite(Number(amfFields.frequencyOne.value)) && Number(amfFields.frequencyOne.value) >= 0, "Introduce una frecuencia válida (0 o mayor)."],
    ["frequencyTwo", amfFields.frequencyTwo.value !== "" && Number.isFinite(Number(amfFields.frequencyTwo.value)) && Number(amfFields.frequencyTwo.value) >= 0, "Introduce una frecuencia válida (0 o mayor)."]
  ];
  rules.forEach(([name, okay, message]) => {
    if (!okay) {
      valid = false;
      const errorId = name === "frequencyOne" || name === "frequencyTwo" ? `${name}Error` : `amf${name[0].toUpperCase()}${name.slice(1)}Error`;
      const error = document.getElementById(errorId);
      if (error) error.textContent = message;
    }
  });
  return valid;
}
amfForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!validateAmfForm()) return;
  const result = calculateFromExcelRules(Number(amfFields.weight.value), Number(amfFields.height.value));
  const f1 = Number(amfFields.frequencyOne.value);
  const f2 = Number(amfFields.frequencyTwo.value);
  const amf = Math.abs(f1 - f2);
  const values = {
    amfResultBmi: formatNumber(result.bmi, 2),
    amfResultClassification: result.classification,
    amfResultFrequency: result.frequency,
    amfResultPulse: result.pulseDuration,
    amfResultIntensity: result.intensity,
    amfResultDuration: result.sessionDuration,
    amfResultSessions: result.sessions,
    amfResultM1: result.m1,
    amfFrequencyOneResult: `${formatNumber(f1, 4)} Hz`,
    amfFrequencyTwoResult: `${formatNumber(f2, 4)} Hz`,
    amfValueResult: `${formatNumber(amf, 4)} Hz`,
    amfRecommendation: result.recommendation
  };
  Object.entries(values).forEach(([id, value]) => document.getElementById(id).textContent = value);
  const results = document.getElementById("amfResultsSection");
  results.classList.remove("hidden");
  results.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("clearAmfBtn").addEventListener("click", () => {
  amfForm.reset();
  Object.keys(amfFields).forEach(name => {
    const errorId = name === "frequencyOne" || name === "frequencyTwo" ? `${name}Error` : `amf${name[0].toUpperCase()}${name.slice(1)}Error`;
    const error = document.getElementById(errorId);
    if (error) error.textContent = "";
  });
  document.getElementById("amfResultsSection").classList.add("hidden");
});
