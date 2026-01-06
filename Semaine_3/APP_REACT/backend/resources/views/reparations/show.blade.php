@extends('layouts.app')

@section('title', 'Détails de la Réparation')

@section('actions')
    <a href="{{ route('reparations.index') }}" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Retour
    </a>
    <a href="{{ route('reparations.edit', $reparation) }}" class="btn btn-warning">
        <i class="bi bi-pencil"></i> Modifier
    </a>
@endsection

@section('content')
<div class="row">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Détails de la réparation #{{ $reparation->id }}</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <h6>Informations générales</h6>
                        <table class="table table-sm">
                            <tr>
                                <th width="40%">Date:</th>
                                <td>
                                    <span class="badge bg-primary">
                                        {{ \Carbon\Carbon::parse($reparation->date)->format('d/m/Y') }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Durée:</th>
                                <td>
                                    <span class="badge bg-info">{{ $reparation->duree_main_oeuvre }}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>Véhicule:</th>
                                <td>
                                    <a href="{{ route('vehicules.show', $reparation->vehicule) }}">
                                        {{ $reparation->vehicule->marque }} {{ $reparation->vehicule->modele }}
                                        <br><small class="text-muted">{{ $reparation->vehicule->immatriculation }}</small>
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="col-md-6">
                        <h6>Techniciens assignés</h6>
                        @if($reparation->techniciens->count() > 0)
                            <div class="list-group">
                                @foreach($reparation->techniciens as $technicien)
                                    <a href="{{ route('techniciens.show', $technicien) }}"
                                       class="list-group-item list-group-item-action">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">{{ $technicien->prenom }} {{ $technicien->nom }}</h6>
                                            <small class="text-muted">{{ $technicien->specialite }}</small>
                                        </div>
                                    </a>
                                @endforeach
                            </div>
                        @else
                            <p class="text-muted">Aucun technicien assigné.</p>
                        @endif
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12">
                        <h6>Objet de la réparation</h6>
                        <div class="card">
                            <div class="card-body">
                                {!! nl2br(e($reparation->objet_reparation)) !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-muted">
                <small>Créé le : {{ $reparation->created_at->format('d/m/Y H:i') }}</small>
                @if($reparation->created_at != $reparation->updated_at)
                    <br><small>Modifié le : {{ $reparation->updated_at->format('d/m/Y H:i') }}</small>
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
                <a href="{{ route('reparations.edit', $reparation) }}"
                   class="btn btn-warning w-100 mb-2">
                    <i class="bi bi-pencil"></i> Modifier cette réparation
                </a>

                <form action="{{ route('reparations.destroy', $reparation) }}"
                      method="POST"
                      onsubmit="return confirm('Supprimer définitivement cette réparation ?')">
                    @csrf
                    @method('DELETE')
                    <button type="submit" class="btn btn-danger w-100">
                        <i class="bi bi-trash"></i> Supprimer cette réparation
                    </button>
                </form>
            </div>
        </div>

        <div class="card mt-3">
            <div class="card-header">
                <h6 class="mb-0">Informations du véhicule</h6>
            </div>
            <div class="card-body">
                <div class="text-center">
                    <h5>{{ $reparation->vehicule->marque }} {{ $reparation->vehicule->modele }}</h5>
                    <p class="text-muted">{{ $reparation->vehicule->immatriculation }}</p>
                    <p>
                        <small>
                            Année : {{ $reparation->vehicule->annee ?? 'Non précisée' }}<br>
                            Kilométrage : {{ $reparation->vehicule->kilometrage ? number_format($reparation->vehicule->kilometrage, 0, ',', ' ') . ' km' : 'Non précisé' }}
                        </small>
                    </p>
                    <a href="{{ route('vehicules.show', $reparation->vehicule) }}" class="btn btn-sm btn-outline-primary">
                        Voir le véhicule
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
