@extends('layouts.app')

@section('title', 'Détails du Technicien')

@section('actions')
    <a href="{{ route('techniciens.index') }}" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Retour
    </a>
    <a href="{{ route('techniciens.edit', $technicien) }}" class="btn btn-warning">
        <i class="bi bi-pencil"></i> Modifier
    </a>
@endsection

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                             style="width: 80px; height: 80px;">
                            <i class="bi bi-person-fill fs-2"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h4 class="mb-0">{{ $technicien->prenom }} {{ $technicien->nom }}</h4>
                        <p class="text-muted mb-0">
                            <span class="badge bg-info fs-6">{{ $technicien->specialite }}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>Informations personnelles</h6>
                        <table class="table table-sm">
                            <tr>
                                <th width="40%">Nom complet:</th>
                                <td>{{ $technicien->prenom }} {{ $technicien->nom }}</td>
                            </tr>
                            <tr>
                                <th>Spécialité:</th>
                                <td>
                                    <span class="badge bg-info">{{ $technicien->specialite }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="col-md-6">
                        <h6>Statistiques</h6>
                        <table class="table table-sm">
                            <tr>
                                <th width="60%">Nombre de réparations:</th>
                                <td>
                                    <span class="badge bg-primary fs-6">{{ $technicien->reparations->count() }}</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <h6>Réparations effectuées</h6>
                        @if($technicien->reparations->count() > 0)
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Véhicule</th>
                                            <th>Durée</th>
                                            <th>Objet</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($technicien->reparations as $reparation)
                                        <tr>
                                            <td>{{ \Carbon\Carbon::parse($reparation->date)->format('d/m/Y') }}</td>
                                            <td>
                                                <a href="{{ route('vehicules.show', $reparation->vehicule) }}">
                                                    {{ $reparation->vehicule->immatriculation }}
                                                </a>
                                            </td>
                                            <td>{{ $reparation->duree_main_oeuvre }}</td>
                                            <td>{{ Str::limit($reparation->objet_reparation, 40) }}</td>
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
                            <p class="text-muted">Ce technicien n'a effectué aucune réparation.</p>
                        @endif
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <small>Créé le : {{ $technicien->created_at->format('d/m/Y H:i') }}</small>
                @if($technicien->created_at != $technicien->updated_at)
                    <br><small>Modifié le : {{ $technicien->updated_at->format('d/m/Y H:i') }}</small>
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
                <a href="{{ route('techniciens.edit', $technicien) }}"
                   class="btn btn-warning w-100 mb-2">
                    <i class="bi bi-pencil"></i> Modifier ce technicien
                </a>

                <form action="{{ route('techniciens.destroy', $technicien) }}"
                      method="POST"
                      onsubmit="return confirm('Supprimer définitivement ce technicien ?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger w-100">
                        <i class="bi bi-trash"></i> Supprimer ce technicien
                    </button>
                </form>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h6 class="mb-0">Réparations par véhicule</h6>
            </div>
            <div class="card-body">
                @php
                    $vehiculesRepares = [];
                    foreach($technicien->reparations as $reparation) {
                        $vehiculeId = $reparation->vehicule_id;
                        if(!isset($vehiculesRepares[$vehiculeId])) {
                            $vehiculesRepares[$vehiculeId] = [
                                'vehicule' => $reparation->vehicule,
                                'count' => 0
                            ];
                        }
                        $vehiculesRepares[$vehiculeId]['count']++;
                    }
                @endphp

                @if(count($vehiculesRepares) > 0)
                    <ul class="list-group list-group-flush">
                        @foreach($vehiculesRepares as $data)
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <a href="{{ route('vehicules.show', $data['vehicule']) }}" class="text-decoration-none">
                                {{ $data['vehicule']->immatriculation }}
                            </a>
                            <span class="badge bg-primary rounded-pill">{{ $data['count'] }}</span>
                        </li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-muted">Aucune réparation effectuée.</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
