document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const modal = document.getElementById('result-modal');
    const closeBtn = document.querySelector('.close-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    const diffDisplay = document.getElementById('modal-difference');
    const finalDisplay = document.getElementById('modal-final-result');

    calculateBtn.addEventListener('click', () => {
        const correctDateTimeStr = document.getElementById('correct-datetime').value;
        const incorrectDateTimeStr = document.getElementById('incorrect-datetime').value;
        const incidentDateTimeStr = document.getElementById('incident-datetime').value;

        if (!correctDateTimeStr || !incorrectDateTimeStr || !incidentDateTimeStr) {
            alert('Please fill in all fields.');
            return;
        }

        const correctDate = new Date(correctDateTimeStr);
        const incorrectDate = new Date(incorrectDateTimeStr);
        const incidentDate = new Date(incidentDateTimeStr);

        // Your original logic preserved
        const timeDifference = incorrectDate.getTime() - correctDate.getTime();
        const finalCorrectedDate = new Date(incidentDate.getTime() + timeDifference);

        let diffMillis = Math.abs(timeDifference);
        const days = Math.floor(diffMillis / (1000 * 60 * 60 * 24));
        diffMillis %= (1000 * 60 * 60 * 24);
        const hours = Math.floor(diffMillis / (1000 * 60 * 60));
        diffMillis %= (1000 * 60 * 60);
        const minutes = Math.floor(diffMillis / (1000 * 60));
        diffMillis %= (1000 * 60);
        const seconds = Math.floor(diffMillis / 1000);

        const operation = timeDifference >= 0 ? '+' : '-';

        // Update Modal content
        diffDisplay.textContent = `${operation} ${days}d ${hours}h ${minutes}m ${seconds}s`;

        const year = finalCorrectedDate.getFullYear();
        const month = String(finalCorrectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(finalCorrectedDate.getDate()).padStart(2, '0');
        const hrs = String(finalCorrectedDate.getHours()).padStart(2, '0');
        const mins = String(finalCorrectedDate.getMinutes()).padStart(2, '0');
        const secs = String(finalCorrectedDate.getSeconds()).padStart(2, '0');

        finalDisplay.textContent = `${day}/${month}/${year} ${hrs}:${mins}:${secs}`;

        // Show modal
        modal.classList.add('active');
    });

    const hideModal = () => modal.classList.remove('active');
    closeBtn.onclick = hideModal;
    closeModalBtn.onclick = hideModal;
    window.onclick = (e) => { if (e.target == modal) hideModal(); };
});
