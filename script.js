document.addEventListener('DOMContentLoaded', () => {
  const gstRateButtons = document.querySelectorAll('.gst-button');
  const baseInput = document.getElementById('baseAmount');
  const gstInput = document.getElementById('gstAmount');
  const totalInput = document.getElementById('totalAmount');

  const cgstEl = document.getElementById('cgst');
  const sgstEl = document.getElementById('sgst');
  const igstEl = document.getElementById('igst');
  const totalEl = document.getElementById('total');

  function showCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'block';
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 2500);
  }

  gstRateButtons.forEach(button => {
    button.addEventListener('click', () => {
      gstRateButtons.forEach(btn => btn.classList.remove('selected'));
      button.classList.add('selected');
      const rate = parseFloat(button.getAttribute('data-rate'));

      document.getElementById('cgstRate').textContent = (rate / 2).toFixed(2) + '%';
      document.getElementById('sgstRate').textContent = (rate / 2).toFixed(2) + '%';
      document.getElementById('igstRate').textContent = rate.toFixed(2) + '%';

      if (baseInput.value) {
        calculateFromBase(rate);
      } else if (gstInput.value) {
        calculateFromGST(rate);
      } else if (totalInput.value) {
        calculateFromTotal(rate);
      }
    });
  });

  function calculateFromBase(rate) {
    const base = parseFloat(baseInput.value);
    if (!isNaN(base)) {
      const gst = (base * rate) / 100;
      const total = base + gst;
      gstInput.value = gst.toFixed(2);
      totalInput.value = total.toFixed(2);
      updateResults(gst, total, rate);
    }
  }

  function calculateFromGST(rate) {
    const gst = parseFloat(gstInput.value);
    if (!isNaN(gst)) {
      const base = gst * 100 / rate;
      const total = base + gst;
      baseInput.value = base.toFixed(2);
      totalInput.value = total.toFixed(2);
      updateResults(gst, total, rate);
    }
  }

  function calculateFromTotal(rate) {
    const total = parseFloat(totalInput.value);
    if (!isNaN(total)) {
      const base = total * 100 / (100 + rate);
      const gst = total - base;
      baseInput.value = base.toFixed(2);
      gstInput.value = gst.toFixed(2);
      updateResults(gst, total, rate);
    }
  }

  function updateResults(gst, total, rate) {
    const cgst = gst / 2;
    const sgst = gst / 2;
    cgstEl.textContent = cgst.toFixed(2);
    sgstEl.textContent = sgst.toFixed(2);
    igstEl.textContent = gst.toFixed(2);
    document.getElementById('cgstRate').textContent = (rate / 2).toFixed(2) + '%';
    document.getElementById('sgstRate').textContent = (rate / 2).toFixed(2) + '%';
    document.getElementById('igstRate').textContent = rate.toFixed(2) + '%';
    totalEl.textContent = total.toFixed(2);
  }

  function clearFields() {
    baseInput.value = '';
    gstInput.value = '';
    totalInput.value = '';
    cgstEl.textContent = '0.00';
    sgstEl.textContent = '0.00';
    igstEl.textContent = '0.00';
    totalEl.textContent = '0.00';
    document.getElementById('cgstRate').textContent = '0.00%';
    document.getElementById('sgstRate').textContent = '0.00%';
    document.getElementById('igstRate').textContent = '0.00%';
  }

  window.clearFields = clearFields;

  baseInput.addEventListener('input', () => {
    gstInput.value = '';
    totalInput.value = '';
    const selectedButton = document.querySelector('.gst-button.selected');
    if (selectedButton) {
      const selectedRate = parseFloat(selectedButton.getAttribute('data-rate'));
      calculateFromBase(selectedRate);
    } else {
      showCustomAlert();
      baseInput.value = '';
    }
  });

  gstInput.addEventListener('input', () => {
    baseInput.value = '';
    totalInput.value = '';
    const selectedButton = document.querySelector('.gst-button.selected');
    if (selectedButton) {
      const selectedRate = parseFloat(selectedButton.getAttribute('data-rate'));
      calculateFromGST(selectedRate);
    } else {
      showCustomAlert();
      gstInput.value = '';
    }
  });

  totalInput.addEventListener('input', () => {
    baseInput.value = '';
    gstInput.value = '';
    const selectedButton = document.querySelector('.gst-button.selected');
    if (selectedButton) {
      const selectedRate = parseFloat(selectedButton.getAttribute('data-rate'));
      calculateFromTotal(selectedRate);
    } else {
      showCustomAlert();
      totalInput.value = '';
    }
  });
});
