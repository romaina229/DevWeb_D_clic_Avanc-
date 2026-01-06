<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shalom-Garage - @yield('title', 'Accueil')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <style>
        .sidebar {
            min-height: calc(100vh - 56px);
            background-color: #f8f9fa;
            border-right: 1px solid #dee2e6;
        }
        .nav-link {
            color: #495057;
            padding: 0.75rem 1rem;
        }
        .nav-link:hover, .nav-link.active {
            background-color: #e9ecef;
            color: #0d6efd;
        }
        .main-content {
            padding: 20px;
            min-height: calc(100vh - 156px); /* Pour pousser le footer vers le bas */
        }
        footer {
            background-color: #f8f9fa;
            border-top: 1px solid #dee2e6;
            padding: 20px 0;
            margin-top: auto;
        }
        .footer-content {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
        }
        .footer-section {
            text-align: center;
        }
        .footer-section h3 {
            color: #0d6efd;
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        .footer-bottom {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
        }
    </style>
</head>
<body class="d-flex flex-column min-vh-100">
    <!-- Navigation principale -->
    <nav class="navbar navbar-dark bg-primary navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="{{ route('dashboard') }}">
                <i class="bi bi-wrench me-2"></i> Shalom-Garage
            </a>

            <!-- Bouton menu mobile -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu pour mobile -->
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a href="{{ route('dashboard') }}"
                           class="nav-link {{ request()->is('/') ? 'active' : '' }}">
                            Tableau de bord
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('vehicules.index') }}"
                           class="nav-link {{ request()->is('vehicules*') ? 'active' : '' }}">
                            Véhicules
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('reparations.index') }}"
                           class="nav-link {{ request()->is('reparations*') ? 'active' : '' }}">
                            Réparations
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('techniciens.index') }}"
                           class="nav-link {{ request()->is('techniciens*') ? 'active' : '' }}">
                            Techniciens
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid flex-grow-1">
        <div class="row">
            <!-- Sidebar (visible uniquement sur desktop) -->
            <div class="col-md-2 sidebar d-none d-md-block">
                <div class="pt-3">
                    <div class="list-group list-group-flush">
                        <a href="{{ route('dashboard') }}"
                           class="list-group-item list-group-item-action {{ request()->is('/') ? 'active' : '' }}">
                            <i class="bi bi-speedometer2 me-2"></i> Tableau de bord
                        </a>
                        <a href="{{ route('vehicules.index') }}"
                           class="list-group-item list-group-item-action {{ request()->is('vehicules*') ? 'active' : '' }}">
                            <i class="bi bi-car-front me-2"></i> Véhicules
                        </a>
                        <a href="{{ route('reparations.index') }}"
                           class="list-group-item list-group-item-action {{ request()->is('reparations*') ? 'active' : '' }}">
                            <i class="bi bi-tools me-2"></i> Réparations
                        </a>
                        <a href="{{ route('techniciens.index') }}"
                           class="list-group-item list-group-item-action {{ request()->is('techniciens*') ? 'active' : '' }}">
                            <i class="bi bi-person-badge me-2"></i> Techniciens
                        </a>
                    </div>
                </div>
            </div>

            <!-- Contenu principal -->
            <div class="col-md-10 main-content">
                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                @if(session('error'))
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        {{ session('error') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2>@yield('title')</h2>
                    @yield('actions')
                </div>

                @yield('content')
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="mt-auto">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3><i class="bi bi-geo-alt me-2"></i>Adresse</h3>
                    <p class="mb-1">Rue Temple du Son</p>
                    <p class="mb-1">Abomey-Calavi, Bénin</p>
                </div>
                <div class="footer-section">
                    <h3><i class="bi bi-telephone me-2"></i>Contact</h3>
                    <p class="mb-1">Email: romainakpo86@gmail.com</p>
                    <p class="mb-1">Téléphone: (+229) 01 9765 3335</p>
                    <p class="mb-1">Mobile: (+229) 01 9459 2567</p>
                </div>
                <div class="footer-section">
                    <h3><i class="bi bi-clock me-2"></i>Horaires</h3>
                    <p class="mb-1">Lundi - Vendredi: 8h - 18h</p>
                    <p class="mb-1">Samedi: 8h - 13h</p>
                    <p class="mb-1">Dimanche: Fermé</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p class="mb-0">&copy; 2025 Shalom-Garage. Tous droits réservés.</p>
                <p class="text-muted small mt-2">
                    <i class="bi bi-wrench"></i> Votre partenaire de confiance pour l'entretien automobile
                </p>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Auto-dismiss alerts after 5 seconds
        setTimeout(() => {
            const alerts = document.querySelectorAll('.alert');
            alerts.forEach(alert => {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            });
        }, 5000);
    </script>
    @stack('scripts')
</body>
</html>
