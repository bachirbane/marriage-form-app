window.onload = function () {
  const idField = document.getElementById("certificat_id");
  const date = new Date();
  const year = date.getFullYear();
  const unique = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  idField.value = `NUMERO-${year}-${unique}`;
};



  const canvas = document.getElementById('signature-pad');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  // Signature mobile et PC
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!drawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() {
    drawing = false;
    saveSignature();
  }

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseout', stopDraw);
  canvas.addEventListener('touchstart', startDraw);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDraw);

  function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("imam_signature_data").value = "";
  }

 // Fonction pour enregistrer la signature
function saveSignature() {
  const dataURL = canvas.toDataURL();
  document.getElementById("imam_signature_data").value = dataURL;

  // Optionnel : activer le bouton print si tu l'avais désactivé
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.disabled = false;
  }
}

// Empêche l’envoi sans signature
document.querySelector('.formulaire-mariage').addEventListener('submit', function(e) {
  const signatureValue = document.getElementById("imam_signature_data").value;
  if (!signatureValue) {
    alert("❗ Merci de signer le formulaire (Imam).");
    e.preventDefault();
  }
});

// Empêche l'impression sans signature
document.addEventListener('DOMContentLoaded', function () {
  const printButton = document.getElementById('btn-print');
  if (printButton) {
    printButton.addEventListener('click', function () {
      const signatureValue = document.getElementById("imam_signature_data").value;
      if (!signatureValue || signatureValue.trim() === "") {
        alert("❗ Please sign the form (Imam) before printing.");
        return;
      }

      // Lancer l'impression si la signature existe
      window.print();
    });
  }
});

  
