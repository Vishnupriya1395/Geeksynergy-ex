document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userList = document.getElementById('userList');
    const notification = document.getElementById('notification');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            const profession = document.getElementById('profession').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password, phone, profession })
                });

                const data = await response.json();

                if (response.ok) {
                    notification.textContent = data.message;
                    notification.className = 'alert alert-success';
                    registerForm.reset();
                } else {
                    notification.textContent = data.message;
                    notification.className = 'alert alert-danger';
                }
            } catch (error) {
                notification.textContent = 'Error registering user';
                notification.className = 'alert alert-danger';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'home.html';
                } else {
                    notification.textContent = data.message;
                    notification.className = 'alert alert-danger';
                }
            } catch (error) {
                notification.textContent = 'Error logging in';
                notification.className = 'alert alert-danger';
            }
        });
    }

    if (userList) {
        const loadUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const users = await response.json();
                let html = '<ul class="list-group">';
                users.forEach(user => {
                    html += `<li class="list-group-item">${user.name} - ${user.email} - ${user.phone}</li>`;
                });
                html += '</ul>';
                userList.innerHTML = html;
            } catch (error) {
                userList.innerHTML = '<div class="alert alert-danger">Error loading users</div>';
            }
        };

        loadUsers();
    }
});
