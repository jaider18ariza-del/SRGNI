document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const clearNotifications = document.getElementById('clearNotifications');
    const badge = document.getElementById('notificationBadge');

    const openMenu = () => {
        sidebar?.classList.add('open');
        overlay?.classList.add('show');
    };
    const closeMenu = () => {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('show');
    };

    menuToggle?.addEventListener('click', openMenu);
    sidebarClose?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    const showSection = (sectionName) => {
        const section = document.getElementById(`${sectionName}-section`);
        const navItem = document.querySelector(`.nav-item[data-section="${sectionName}"]`);
        if (!section) return;

        document.querySelectorAll('.content-section').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        section.classList.add('active');
        navItem?.classList.add('active');
        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.querySelectorAll('[data-section]').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault();
            showSection(item.dataset.section);
        });
    });

    notificationBtn?.addEventListener('click', event => {
        event.stopPropagation();
        notificationDropdown?.classList.toggle('show');
    });

    document.addEventListener('click', event => {
        if (!event.target.closest('.notification-container')) {
            notificationDropdown?.classList.remove('show');
        }
    });

    clearNotifications?.addEventListener('click', () => {
        document.querySelectorAll('.notification-item.unread').forEach(item => item.classList.remove('unread'));
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
        notificationDropdown?.classList.remove('show');
    });

    const quickActions = {
        addStudentBtn: 'estudiantes',
        addGradeBtn: 'calificaciones',
        viewReportsBtn: 'informes',
        addNewStudent: 'estudiantes',
        addNewTeacher: 'docentes',
        addNewSubject: 'asignaturas',
        addNewGrade: 'calificaciones',
        generateReportBtn: 'informes',
        generateNewReport: 'informes'
    };

    Object.entries(quickActions).forEach(([buttonId, section]) => {
        document.getElementById(buttonId)?.addEventListener('click', () => {
            showSection(section);
            alert(`La sección de ${section} está lista para registrar información.`);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            if (row && confirm('¿Deseas eliminar este registro?')) row.remove();
        });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => alert('La edición de este registro estará disponible al conectar el sistema con la base de datos.'));
    });

    document.querySelectorAll('.report-action-btn').forEach(button => {
        button.addEventListener('click', () => alert('El informe se generará cuando se conecte el módulo de reportes.'));
    });

    document.getElementById('editProfileBtn')?.addEventListener('click', () => {
        alert('El formulario de edición de perfil estará disponible próximamente.');
    });

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        if (confirm('¿Seguro que deseas cerrar sesión?')) {
            window.location.href = 'login.html';
        }
    });

    // Datos iniciales que pueden reemplazarse por una respuesta de API.
    const dashboardData = {
        students: 24,
        teachers: 8,
        subjects: 12,
        grades: 156
    };

    const updateDashboardData = data => {
        const values = {
            studentCount: data.students,
            teacherCount: data.teachers,
            subjectCount: data.subjects,
            gradeCount: data.grades
        };
        Object.entries(values).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element && Number.isFinite(Number(value))) element.textContent = value;
        });
    };

    updateDashboardData(dashboardData);
    window.updateDashboardData = updateDashboardData;
});
