@extends('layouts.app')

@section('title', 'Tableau de bord')

@section('content')
<div class="row">
    <div class="col-md-12">
        <div class="row">
            <!-- Statistiques DIRECTES depuis les modèles -->
            <div class="col-md-4 mb-4">
                <div class="card border-primary">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title text-primary">Véhicules</h5>
                                <h2 class="mb-0">{{ \App\Models\Vehicule::count() }}</h2>
                            </div>
                            <i class="bi bi-car-front fs-1 text-primary"></i>
                        </div>
                        <a href="{{ route('vehicules.index') }}" class="btn btn-outline-primary btn-sm mt-3">
                            Voir tous les véhicules
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card border-success">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title text-success">Réparations</h5>
                                <h2 class="mb-0">{{ \App\Models\Reparation::count() }}</h2>
                            </div>
                            <i class="bi bi-tools fs-1 text-success"></i>
                        </div>
                        <a href="{{ route('reparations.index') }}" class="btn btn-outline-success btn-sm mt-3">
                            Voir toutes les réparations
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card border-warning">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="card-title text-warning">Techniciens</h5>
                                <h2 class="mb-0">{{ \App\Models\Technicien::count() }}</h2>
                            </div>
                            <i class="bi bi-person-badge fs-1 text-warning"></i>
                        </div>
                        <a href="{{ route('techniciens.index') }}" class="btn btn-outline-warning btn-sm mt-3">
                            Voir tous les techniciens
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Dernières réparations DIRECTES -->
        <div class="card">
            <div class="card-header bg-light">
                <h5 class="mb-0">Dernières réparations</h5>
            </div>
            <div class="card-body">
                @php
                    $recent_reparations = \App\Models\Reparation::with(['vehicule', 'techniciens'])
                        ->orderBy('created_at', 'desc')
                        ->take(5)
                        ->get();
                @endphp

                @if($recent_reparations->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Véhicule</th>
                                    <th>Durée</th>
                                    <th>Objet</th>
                                    <th>Techniciens</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($recent_reparations as $reparation)
                                <tr>
                                    <td>{{ $reparation->id }}</td>
                                    <td>{{ \Carbon\Carbon::parse($reparation->date)->format('d/m/Y') }}</td>
                                    <td>
                                        @if($reparation->vehicule)
                                            <a href="{{ route('vehicules.show', $reparation->vehicule) }}">
                                                {{ $reparation->vehicule->marque }} {{ $reparation->vehicule->modele }}
                                            </a>
                                            <br><small>{{ $reparation->vehicule->immatriculation }}</small>
                                        @else
                                            Véhicule inconnu
                                        @endif
                                    </td>
                                    <td><span class="badge bg-info">{{ $reparation->duree_main_oeuvre }}</span></td>
                                    <td>{{ Str::limit($reparation->objet_reparation, 50) }}</td>
                                    <td>
                                        @foreach($reparation->techniciens as $technicien)
                                            <span class="badge bg-secondary">{{ $technicien->prenom }} {{ $technicien->nom }}</span>
                                        @endforeach
                                    </td>
                                    <td>
                                        <a href="{{ route('reparations.show', $reparation) }}" class="btn btn-sm btn-info">
                                            <i class="bi bi-eye"></i>
                                        </a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <p class="text-muted">Aucune réparation récente.</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
