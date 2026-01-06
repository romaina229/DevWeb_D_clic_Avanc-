@extends('layouts.app')

@section('title', 'Liste des Véhicules')

@section('actions')
    <a href="{{ route('vehicules.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Nouveau véhicule
    </a>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($vehicules->count() > 0)
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Immatriculation</th>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Année</th>
                            <th>Kilométrage</th>
                            <th>Énergie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($vehicules as $vehicule)
                        <tr>
                            <td>{{ $vehicule->id }}</td>
                            <td>
                                <strong>{{ $vehicule->immatriculation }}</strong>
                            </td>
                            <td>{{ $vehicule->marque }}</td>
                            <td>{{ $vehicule->modele }}</td>
                            <td>{{ $vehicule->annee ?? '-' }}</td>
                            <td>{{ $vehicule->kilometrage ? number_format($vehicule->kilometrage, 0, ',', ' ') . ' km' : '-' }}</td>
                            <td>
                                <span class="badge bg-info">{{ $vehicule->energie ?? 'Non précisé' }}</span>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('vehicules.show', $vehicule) }}"
                                       class="btn btn-sm btn-info"
                                       title="Voir">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('vehicules.edit', $vehicule) }}"
                                       class="btn btn-sm btn-warning"
                                       title="Modifier">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('vehicules.destroy', $vehicule) }}"
                                          method="POST"
                                          class="d-inline"
                                          onsubmit="return confirm('Supprimer ce véhicule ?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-sm btn-danger" title="Supprimer">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @else
            <div class="text-center py-5">
                <i class="bi bi-car-front fs-1 text-muted"></i>
                <h4 class="text-muted mt-3">Aucun véhicule enregistré</h4>
                <p class="text-muted">Commencez par ajouter un véhicule.</p>
                <a href="{{ route('vehicules.create') }}" class="btn btn-primary">
                    <i class="bi bi-plus-circle"></i> Ajouter un véhicule
                </a>
            </div>
        @endif
    </div>
</div>
@endsection
