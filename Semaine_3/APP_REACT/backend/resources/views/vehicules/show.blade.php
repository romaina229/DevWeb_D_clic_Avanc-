@extends('layouts.app')

@section('title', 'Détails du Véhicule')

@section('actions')
    <a href="{{ route('vehicules.index') }}" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Retour
    </a>
    <a href="{{ route('vehicules.edit', $vehicule) }}" class="btn btn-warning">
        <i class="bi bi-pencil"></i> Modifier
    </a>
@endsection

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Informations du véhicule</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>Identification</h6>
                        <table class="table table-sm">
                            <tr>
                                <th width="40%">Immatriculation:</th>
                                <td>
                                    <span class="badge bg-primary fs-6">{{ $vehicule->immatriculation }}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Marque:</th>
                                <td>{{ $vehicule->marque }}</td>
                            </tr>
                            <tr>
                                <th>Modèle:</th>
                                <td>{{ $vehicule->modele }}</td>
                            </tr>
                            <tr>
                                <th>Couleur:</th>
                                <td>
                                    @if($vehicule->couleur)
                                        <span class="badge" style="background-color: {{ strtolower($vehicule->couleur) }}">{{ $vehicule->couleur }}</span>
                                    @else
                                        -
                                    @endif
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="col-md-6">
                        <h6>Caractéristiques techniques</h6>
                        <table class="table table-sm">
                            <tr>
                                <th width="40%">Année:</th>
                                <td>{{ $vehicule->annee ?? '-' }}</td>
                            </tr>
                            <tr>
                                <th>Kilométrage:</th>
                                <td>
                                    @if($vehicule->kilometrage)
                                        {{ number_format($vehicule->kilometrage, 0, ',', ' ') }} km
                                    @else
                                        -
                                    @endif
                                </td>
                            </tr>
                            <tr>
                                <th>Carrosserie:</th>
                                <td>{{ $vehicule->carosserie ?? '-' }}</td>
                            </tr>
                            <tr>
                                <th>Énergie:</th>
                                <td>
                                    @if($vehicule->energie)
                                        <span class="badge bg-info">{{ $vehicule->energie }}</span>
                                    @else
                                        -
                                    @endif
                                </td>
                            </tr>
                            <tr>
                                <th>Boîte:</th>
                                <td>{{ $vehicule->boite ?? '-' }}</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <h6>Réparations associées</h6>
                        @if($vehicule->reparations->count() > 0)
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Durée</th>
                                            <th>Objet</th>
                                            <th>Techniciens</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($vehicule->reparations as $reparation)
                                        <tr>
                                            <td>{{ \Carbon\Carbon::parse($reparation->date)->format('d/m/Y') }}</td>
                                            <td>{{ $reparation->duree_main_oeuvre }}</td>
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
                            <p class="text-muted">Aucune réparation pour ce véhicule.</p>
                        @endif
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <small>Créé le : {{ $vehicule->created_at->format('d/m/Y H:i') }}</small>
                @if($vehicule->created_at != $vehicule->updated_at)
                    <br><small>Modifié le : {{ $vehicule->updated_at->format('d/m/Y H:i') }}</small>
                @endif
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Actions rapides</h6>
            </div>
            <div class="card-body">
                <a href="{{ route('reparations.create', ['vehicule_id' => $vehicule->id]) }}"
                   class="btn btn-success w-100 mb-2">
                    <i class="bi bi-tools"></i> Nouvelle réparation
                </a>

                <form action="{{ route('vehicules.destroy', $vehicule) }}"
                      method="POST"
                      onsubmit="return confirm('Supprimer définitivement ce véhicule ?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger w-100">
                        <i class="bi bi-trash"></i> Supprimer ce véhicule
                    </button>
                </form>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h6 class="mb-0">Statistiques</h6>
            </div>
            <div class="card-body">
                <div class="text-center">
                    <h1 class="display-4">{{ $vehicule->reparations->count() }}</h1>
                    <p class="text-muted">réparations effectuées</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
