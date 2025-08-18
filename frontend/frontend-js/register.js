document.addEventListener('DOMContentLoaded', () => {
    const registerTab = document.getElementById('registerTab');
    const loginTab = document.getElementById('loginTab');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerMsg = document.getElementById('registerMsg');
    const loginMsg = document.getElementById('loginMsg');

    // --- Tab Switching Logic ---
    registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        registerMsg.textContent = '';
        loginMsg.textContent = '';
    });

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        registerMsg.textContent = '';
        loginMsg.textContent = '';
    });

    // --- Handle Registration Form Submission ---
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerMsg.textContent = '';
        const index_number = document.getElementById('regIndex').value.trim();
        const full_name = document.getElementById('regName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;

        if (!index_number || !full_name || !email || !password) {
            registerMsg.textContent = 'All fields are required.';
            registerMsg.className = 'message error';
            return;
        }

        try {
            const res = await fetch('http://localhost:8020/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index_number, full_name, email, password })
            });

            const data = await res.json();
            if (!res.ok) {
                registerMsg.textContent = data.message || 'Registration failed.';
                registerMsg.className = 'message error';

                if (data.message && data.message.includes('Duplicate')) {
                    registerMsg.textContent = 'Index number already exists. Please login.';
                }
            } else {
                registerMsg.textContent = 'Registration successful! Please log in.';
                registerMsg.className = 'message success';
                registerForm.reset();
                // Automatically switch to the login tab after successful registration
                loginTab.click();
            }
        } catch (error) {
            registerMsg.textContent = 'Could not connect to the server.';
            registerMsg.className = 'message error';
        }
    });

    // --- Handle Login Form Submission ---
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginMsg.textContent = '';

        const index_number = document.getElementById('loginIndex').value.trim();
        const password = document.getElementById('loginPassword').value;

        if (!index_number || !password) {
            loginMsg.textContent = 'Index number and password are required.';
            loginMsg.className = 'message error';
            return;
        }

        try {
            const res = await fetch('http://localhost:8020/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index_number, password })
            });

            const data = await res.json();

            if (!res.ok) {
                loginMsg.textContent = data.message || 'Login failed. Check credentials.';
                loginMsg.className = 'message error';
            } else {
                loginMsg.textContent = 'Login successful! Redirecting...';
                loginMsg.className = 'message success';
                
                localStorage.setItem('user', JSON.stringify(data.user));

                // Redirect to the dashboard after a short delay
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }
        } catch (error) {
            loginMsg.textContent = 'Could not connect to the server.';
            loginMsg.className = 'message error';
        }
    });
});