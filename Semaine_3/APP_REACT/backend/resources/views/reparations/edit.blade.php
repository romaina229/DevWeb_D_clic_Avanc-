@extends('layouts.app')

@section('title', 'Modifier la Réparation')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Modifier la réparation #{{ $reparation->id }}</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('reparations.update', $reparation) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="vehicule_id" class="form-label">Véhicule *</label>
                            <select class="form-select @error('vehicule_id') is-invalid @enderror"
                                    id="vehicule_id"
                                    name="vehicule_id"
                                    required>
                                <option value="">Sélectionnez un véhicule...</option>
                                @foreach($vehicules as $vehicule)
                                    <option value="{{ $vehicule->id }}"
                                            {{ old('vehicule_id', $reparation->vehicule_id) == $vehicule->id ? 'selected' : '' }}>
                                        {{ $vehicule->immatriculation }} - {{ $vehicule->marque }} {{ $vehicule->modele }}
                                    </option>
                                @endforeach
                            </select>
                            @error('vehicule_id')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="date" class="form-label">Date *</label>
                            <input type="date"
                                   class="form-control @error('date') is-invalid @enderror"
                                   id="date"
                                   name="date"
                                   value="{{ old('date', $reparation->date) }}"
                                   required>
                            @error('date')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="duree_main_oeuvre" class="form-label">Durée main d'œuvre *</label>
                            <select class="form-select @error('duree_main_oeuvre') is-invalid @enderror"
                                    id="duree_main_oeuvre"
                                    name="duree_main_oeuvre"
                                    required>
                                <option value="">Sélectionnez...</option>
                                @php
                                    $durees = ['1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', 'Plus de 8h'];
                                @endphp
                                @foreach($durees as $duree)
                                    <option value="{{ $duree }}"
                                            {{ old('duree_main_oeuvre', $reparation->duree_main_oeuvre) == $duree ? 'selected' : '' }}>
                                        {{ $duree }}
                                    </option>
                                @endforeach
                            </select>
                            @error('duree_main_oeuvre')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="techniciens" class="form-label">Techniciens</label>
                            <select class="form-select"
                                    id="techniciens"
                                    name="techniciens[]"
                                    multiple
                                    size="5">
                                @foreach($techniciens as $technicien)
                                    <option value="{{ $technicien->id }}"
                                            {{ in_array($technicien->id, old('techniciens', $reparation->techniciens->pluck('id')->toArray())) ? 'selected' : '' }}>
                                        {{ $technicien->prenom }} {{ $technicien->nom }}
                                        ({{ $technicien->specialite }})
                                    </option>
                                @endforeach
                            </select>
                            <small class="text-muted">Maintenez Ctrl (ou Cmd) pour sélectionner plusieurs techniciens</small>
                        </div>

                        <div class="col-12 mb-3">
                            <label for="objet_reparation" class="form-label">Objet de la réparation *</label>
                            <textarea class="form-control @error('objet_reparation') is-invalid @enderror"
                                      id="objet_reparation"
                                      name="objet_reparation"
                                      rows="6"
                                      required>{{ old('objet_reparation', $reparation->objet_reparation) }}</textarea>
                            @error('objet_reparation')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Mettre à jour
                        </button>
                        <a href="{{ route('reparations.show', $reparation) }}" class="btn btn-secondary">
                            <i class="bi bi-x-circle"></i> Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
