@extends('layouts.app')

@section('title', 'Liste des Réparations')

@section('actions')
    <a href="{{ route('reparations.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Nouvelle réparation
    </a>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($reparations->count() > 0)
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
                        @foreach($reparations as $reparation)
                        <tr>
                            <td>{{ $reparation->id }}</td>
                            <td>{{ \Carbon\Carbon::parse($reparation->date)->format('d/m/Y') }}</td>
                            <td>
                                <a href="{{ route('vehicules.show', $reparation->vehicule_id) }}">
                                    {{ $reparation->vehicule->marque }} {{ $reparation->vehicule->modele }}
                                    <br><small class="text-muted">{{ $reparation->vehicule->immatriculation }}</small>
                                </a>
                            </td>
                            <td>
                                <span class="badge bg-info">{{ $reparation->duree_main_oeuvre }}</span>
                            </td>
                            <td>{{ Str::limit($reparation->objet_reparation, 50) }}</td>
                            <td>
                                @foreach($reparation->techniciens as $technicien)
                                    <span class="badge bg-secondary mb-1 d-block">
                                        {{ $technicien->prenom }} {{ $technicien->nom }}
                                    </span>
                                @endforeach
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="{{ route('reparations.show', $reparation) }}"
                                       class="btn btn-sm btn-info"
                                       title="Voir">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('reparations.edit', $reparation) }}"
                                       class="btn btn-sm btn-warning"
                                       title="Modifier">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('reparations.destroy', $reparation) }}"
                                          method="POST"
                                          class="d-inline"
                                          onsubmit="return confirm('Supprimer cette réparation ?')">
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
                <i class="bi bi-tools fs-1 text-muted"></i>
                <h4 class="text-muted mt-3">Aucune réparation enregistrée</h4>
                <p class="text-muted">Commencez par ajouter une réparation.</p>
                <a href="{{ route('reparations.create') }}" class="btn btn-primary">
                    <i class="bi bi-plus-circle"></i> Ajouter une réparation
                </a>
            </div>
        @endif
    </div>
</div>
@endsection
