const $ = (id) => document.getElementById(id);
const patientForm = $('patientForm');
const patientFields = { age: $('age'), sex: $('sex'), weight: $('weight'), height: $('height') };
let patientData = null;

const excelBands = [
  { max: 18.5, classification: 'Bajo peso', recommendation: 'Aumentar masa muscular y controlar la nutrición.', tens: { frequency: 10, pulse: 150, intensity: 5, duration: 15, sessions: 2 }, interferential: { frequency: 50, carrier: 1000, duration: 15, sessions: 4 } },
  { max: 24.9, classification: 'Normal', recommendation: 'Mantener peso saludable con ejercicio y dieta equilibrada.', tens: { frequency: 20, pulse: 200, intensity: 7, duration: 20, sessions: 3 }, interferential: { frequency: 100, carrier: 4000, duration: 20, sessions: 5 } },
  { max: 29.9, classification: 'Sobrepeso', recommendation: 'Controlar peso y realizar ejercicio regular.', tens: { frequency: 25, pulse: 300, intensity: 10, duration: 25, sessions: 4 }, interferential: { frequency: 150, carrier: 4500, duration: 25, sessions: 6 } },
  { max: Infinity, classification: 'Obesidad', recommendation: 'Reducir peso, consultar nutricionista y realizar ejercicio.', tens: { frequency: 30, pulse: 400, intensity: 12, duration: 30, sessions: 5 }, interferential: { frequency: null, carrier: 8000, duration: 30, sessions: 7 } }
];

function setError(id, message = '') { $(id).textContent = message; }
function format(value, decimals = 2) { return Number(value).toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); }
function validatePatient() {
  let valid = true;
  const age = Number(patientFields.age.value), weight = Number(patientFields.weight.value), height = Number(patientFields.height.value);
  ['ageError','sexError','weightError','heightError'].forEach(id => setError(id));
  if (patientFields.age.value === '' || !Number.isInteger(age) || age < 0 || age > 120) { setError('ageError', 'Introduce una edad válida.'); valid = false; }
  if (!patientFields.sex.value) { setError('sexError', 'Selecciona una opción.'); valid = false; }
  if (patientFields.weight.value === '' || !Number.isFinite(weight) || weight <= 0 || weight > 500) { setError('weightError', 'Introduce un peso válido.'); valid = false; }
  if (patientFields.height.value === '' || !Number.isFinite(height) || height < 0.5 || height > 2.5) { setError('heightError', 'Introduce una estatura válida.'); valid = false; }
  return valid;
}
function calculatePatient() {
  const age = Number(patientFields.age.value), weight = Number(patientFields.weight.value), height = Number(patientFields.height.value);
  const bmi = weight / (height * height);
  const band = excelBands.find(item => bmi < item.max);
  patientData = { age, sex: patientFields.sex.value, weight, height, bmi, ...band };
  $('emptyState').classList.add('hidden'); $('summaryContent').classList.remove('hidden'); $('statusDot').classList.add('active');
  $('bmiValue').textContent = format(bmi); $('classification').textContent = band.classification;
  $('summaryAge').textContent = `${age} años`; $('summarySex').textContent = patientData.sex === 'femenino' ? 'Femenino' : 'Masculino';
  $('summaryWeight').textContent = `${format(weight, 1)} kg`; $('summaryHeight').textContent = `${format(height, 2)} m`;
}
function ensurePatient() {
  if (!validatePatient()) { $('patientSection').scrollIntoView({ behavior: 'smooth', block: 'start' }); return false; }
  calculatePatient();
  return true;
}
function setText(id, value) { $(id).textContent = value; }
function calculateTens() {
  if (!ensurePatient()) return;
  const { bmi, classification, recommendation, tens } = patientData;
  setText('tensBmi', format(bmi)); setText('tensClass', classification); setText('tensFrequency', tens.frequency);
  setText('tensPulse', tens.pulse); setText('tensIntensity', tens.intensity); setText('tensDuration', tens.duration);
  setText('tensSessions', tens.sessions); setText('tensM1', tens.intensity); setText('tensRecommendation', recommendation);
  $('tensEmpty').classList.add('hidden'); $('tensResults').classList.remove('hidden');
}
function calculateInterferential(event) {
  if (event) event.preventDefault();
  setError('interferentialIntensityError');
  if (!ensurePatient()) return;
  const raw = $('interferentialIntensity').value, intensity = Number(raw);
  if (raw === '' || !Number.isFinite(intensity) || intensity <= 0 || intensity > 100) {
    setError('interferentialIntensityError', 'Introduce una intensidad válida mayor que 0 y hasta 100 mA.'); return;
  }
  const { bmi, classification, recommendation, interferential } = patientData;
  setText('ifBmi', format(bmi)); setText('ifClass', classification);
  setText('ifFrequency', interferential.frequency === null ? 'No especificada' : interferential.frequency);
  setText('ifCarrier', interferential.carrier); setText('ifIntensity', `${format(intensity, 1)}`);
  setText('ifDuration', interferential.duration); setText('ifSessions', interferential.sessions); setText('ifM1', format(intensity, 1));
  setText('ifRecommendation', recommendation);
  $('ifFrequencyNote').textContent = interferential.frequency === null
    ? 'La fórmula de corriente interferencial del Excel no especifica una frecuencia para la categoría de obesidad. No se asignó un valor alternativo.'
    : 'Frecuencia y frecuencia portadora reproducidas de la fórmula de corriente interferencial del Excel.';
  $('interferentialEmpty').classList.add('hidden'); $('interferentialResults').classList.remove('hidden');
}
patientForm.addEventListener('submit', event => { event.preventDefault(); if (!validatePatient()) return; calculatePatient(); calculateTens(); calculateInterferential(); $('tensSection').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
$('calculateTensBtn').addEventListener('click', calculateTens);
$('interferentialForm').addEventListener('submit', calculateInterferential);
$('clearInterferentialBtn').addEventListener('click', () => { $('interferentialIntensity').value = ''; setError('interferentialIntensityError'); $('interferentialResults').classList.add('hidden'); $('interferentialEmpty').classList.remove('hidden'); });
$('clearBtn').addEventListener('click', () => {
  patientForm.reset(); $('interferentialForm').reset(); patientData = null;
  ['ageError','sexError','weightError','heightError','interferentialIntensityError'].forEach(id => setError(id));
  $('emptyState').classList.remove('hidden'); $('summaryContent').classList.add('hidden'); $('statusDot').classList.remove('active');
  $('tensResults').classList.add('hidden'); $('tensEmpty').classList.remove('hidden');
  $('interferentialResults').classList.add('hidden'); $('interferentialEmpty').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Catálogo orientativo de síntomas conservado del proyecto anterior.
const conditionCatalog = [
  { name: 'Epicondilitis', zone: 'codo', description: 'Coincidencia orientativa de síntomas del codo.', symptoms: ['Dolor en el codo','El dolor se irradia','Debilidad al agarrar objetos','Molestias en movimientos cotidianos','Sensibilidad al tocar la zona','Rigidez por la mañana','Los síntomas han empeorado progresivamente'] },
  { name: 'Esguince cervical', zone: 'cuello', description: 'Coincidencia orientativa de síntomas cervicales; requiere valoración profesional.', symptoms: ['Dolor y rigidez en el cuello','Limitación del movimiento del cuello','Dolor de cabeza','Dolor que se irradia','Fatiga o debilidad general','Mareos o vértigo','Hormigueo u otras alteraciones sensoriales','Zumbidos en los oídos o visión borrosa'] },
  { name: 'Tenosinovitis de Quervain', zone: 'pulgar', description: 'Coincidencia orientativa de síntomas en la base del pulgar y muñeca.', symptoms: ['Dolor en la base del pulgar','Dolor que se irradia','Hinchazón o sensibilidad','Dificultad para agarrar o pellizcar','Sensación de bloqueo o chasquido'] },
  { name: 'Lumbalgia', zone: 'espalda', description: 'Coincidencia orientativa de síntomas en la espalda baja.', symptoms: ['Dolor en la espalda baja','Rigidez o sensación de bloqueo','Limitación del movimiento','Dolor que se irradia hacia una pierna'] }
];
const zone = $('bodyZone'), questions = $('guidedQuestions'), diagnosis = $('diagnosisResults');
zone.addEventListener('change', () => {
  diagnosis.classList.add('hidden'); diagnosis.replaceChildren(); questions.replaceChildren();
  const condition = conditionCatalog.find(item => item.zone === zone.value);
  if (!condition) { questions.classList.add('hidden'); return; }
  const title = document.createElement('h3'); title.textContent = 'Preguntas sobre los síntomas'; questions.append(title);
  const desc = document.createElement('p'); desc.textContent = 'Marca todos los síntomas que correspondan.'; questions.append(desc);
  const grid = document.createElement('div'); grid.className = 'symptom-grid';
  condition.symptoms.forEach((symptom, index) => { const label = document.createElement('label'); label.className = 'symptom-option'; const input = document.createElement('input'); input.type = 'checkbox'; input.value = String(index); const text = document.createElement('span'); text.textContent = symptom; label.append(input, text); grid.append(label); });
  questions.append(grid); questions.classList.remove('hidden');
});
$('compareSymptomsBtn').addEventListener('click', () => {
  diagnosis.replaceChildren(); diagnosis.classList.remove('hidden');
  const condition = conditionCatalog.find(item => item.zone === zone.value);
  if (!condition) { diagnosis.textContent = 'Selecciona primero una zona corporal.'; return; }
  const selected = [...questions.querySelectorAll('input:checked')].map(input => condition.symptoms[Number(input.value)]);
  if (!selected.length) { diagnosis.textContent = 'Selecciona al menos un síntoma.'; return; }
  const heading = document.createElement('h3'); heading.textContent = 'Coincidencia en el catálogo'; diagnosis.append(heading);
  const result = document.createElement('article'); result.className = 'result-match';
  const name = document.createElement('strong'); name.textContent = `${condition.name} · ${selected.length} de ${condition.symptoms.length} síntomas`; result.append(name);
  const p = document.createElement('p'); p.textContent = `Coincidencias: ${selected.join(', ')}. ${condition.description}`; result.append(p); diagnosis.append(result);
  const note = document.createElement('p'); note.className = 'formula-explanation'; note.textContent = 'Esta comparación no confirma un diagnóstico ni descarta otras causas.'; diagnosis.append(note);
});
$('clearDiagnosisBtn').addEventListener('click', () => { zone.value = ''; questions.replaceChildren(); questions.classList.add('hidden'); diagnosis.replaceChildren(); diagnosis.classList.add('hidden'); });
