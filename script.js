document.addEventListener('DOMContentLoaded', () => {

    const calculateBtn = document.getElementById('calculate-btn');
    const differenceDisplay = document.getElementById('difference-display');
    const finalResultDisplay = document.getElementById('final-result-display');

    calculateBtn.addEventListener('click', () => {

        const correctDateTimeStr = document.getElementById('correct-datetime').value;
        const incorrectDateTimeStr = document.getElementById('incorrect-datetime').value;
        const incidentDateTimeStr = document.getElementById('incident-datetime').value;

        if (!correctDateTimeStr || !incorrectDateTimeStr || !incidentDateTimeStr) {
            differenceDisplay.textContent = 'Please enter all date & time values.';
            finalResultDisplay.textContent = '';
            return;
        }

        const correctDate = new Date(correctDateTimeStr);
        const incorrectDate = new Date(incorrectDateTimeStr);
        const incidentDate = new Date(incidentDateTimeStr);

        // Difference between correct and incorrect CCTV time
        const timeDifference = incorrectDate.getTime() - correctDate.getTime();

        // Apply correction to incident time
        const finalCorrectedDate = new Date(incidentDate.getTime() + timeDifference);

        // Absolute difference breakdown
        let diffMillis = Math.abs(timeDifference);

        const days = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
        diffMillis %= (1000 * 60 * 60 * 24);

        const hours = Math.floor(diffMillis / (1000 * 60 * 60));
        diffMillis %= (1000 * 60 * 60);

        const minutes = Math.floor(diffMillis / (1000 * 60));
        diffMillis %= (1000 * 60);

        const seconds = Math.floor(diffMillis / 1000);

        const operation = timeDifference >= 0 ? '+' : '-';

        differenceDisplay.textContent =
            `${operation} ${days}d ${hours}h ${minutes}m ${seconds}s`;

        // Format final corrected datetime
        const year = finalCorrectedDate.getFullYear();
        const month = String(finalCorrectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(finalCorrectedDate.getDate()).padStart(2, '0');

        const hrs = String(finalCorrectedDate.getHours()).padStart(2, '0');
        const mins = String(finalCorrectedDate.getMinutes()).padStart(2, '0');
        const secs = String(finalCorrectedDate.getSeconds()).padStart(2, '0');

        finalResultDisplay.textContent =
            `${day}/${month}/${year} ${hrs}:${mins}:${secs}`;
    });

});
