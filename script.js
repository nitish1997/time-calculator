document.addEventListener('DOMContentLoaded', () => {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const durationCalculator = document.getElementById('duration-calculator');
    const differenceCalculator = document.getElementById('difference-calculator');

    const calculateDurationBtn = document.getElementById('calculate-duration');
    const durationResultDisplay = document.getElementById('duration-result-display');

    const calculateDifferenceBtn = document.getElementById('calculate-difference');
    const differenceResultDisplay = document.getElementById('difference-result-display');

    // Mode switching
    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'duration') {
                durationCalculator.style.display = 'block';
                differenceCalculator.style.display = 'none';
            } else {
                durationCalculator.style.display = 'none';
                differenceCalculator.style.display = 'block';
            }
        });
    });

    // Duration Calculator Logic
    calculateDurationBtn.addEventListener('click', () => {
        const baseDateTime = document.getElementById('base-datetime').value;
        const days = parseInt(document.getElementById('days').value) || 0;
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const operation = document.querySelector('input[name="operation"]:checked').value;

        if (!baseDateTime) {
            durationResultDisplay.textContent = 'Please enter a valid base date and time.';
            return;
        }

        const baseDate = new Date(baseDateTime);
        let durationInMinutes = (days * 24 * 60) + (hours * 60) + minutes;

        if (operation === 'subtract') {
            durationInMinutes *= -1;
        }

        const newDate = new Date(baseDate.getTime() + durationInMinutes * 60000);

        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const newHours = String(newDate.getHours()).padStart(2, '0');
        const newMinutes = String(newDate.getMinutes()).padStart(2, '0');
        const newSeconds = String(newDate.getSeconds()).padStart(2, '0');

        durationResultDisplay.textContent = `${day}/${month}/${year} ${newHours}:${newMinutes}:${newSeconds}`;
    });

    // Difference Calculator Logic
    calculateDifferenceBtn.addEventListener('click', () => {
        const startDateTimeStr = document.getElementById('start-datetime').value;
        const endDateTimeStr = document.getElementById('end-datetime').value;

        if (!startDateTimeStr || !endDateTimeStr) {
            differenceResultDisplay.textContent = 'Please enter both start and end date-times.';
            return;
        }

        const startDate = new Date(startDateTimeStr);
        const endDate = new Date(endDateTimeStr);

        let diffInMillis = endDate.getTime() - startDate.getTime();
        const sign = diffInMillis < 0 ? '-' : '';
        diffInMillis = Math.abs(diffInMillis);

        const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24));
        diffInMillis %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(diffInMillis / (1000 * 60 * 60));
        diffInMillis %= (1000 * 60 * 60);
        const minutes = Math.floor(diffInMillis / (1000 * 60));
        diffInMillis %= (1000 * 60);
        const seconds = Math.floor(diffInMillis / 1000);

        differenceResultDisplay.textContent = `${sign}${days}d ${hours}h ${minutes}m ${seconds}s`;
    });
});