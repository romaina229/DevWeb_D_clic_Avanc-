@extends('layouts.app')

@section('title', 'Ajouter une Réparation')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Nouvelle réparation</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('reparations.store') }}" method="POST">
                    @csrf

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
                                            {{ old('vehicule_id', request('vehicule_id')) == $vehicule->id ? 'selected' : '' }}>
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
                                   value="{{ old('date', date('Y-m-d')) }}"
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
                                <option value="1h" {{ old('duree_main_oeuvre') == '1h' ? 'selected' : '' }}>1 heure</option>
                                <option value="2h" {{ old('duree_main_oeuvre') == '2h' ? 'selected' : '' }}>2 heures</option>
                                <option value="3h" {{ old('duree_main_oeuvre') == '3h' ? 'selected' : '' }}>3 heures</option>
                                <option value="4h" {{ old('duree_main_oeuvre') == '4h' ? 'selected' : '' }}>4 heures</option>
                                <option value="5h" {{ old('duree_main_oeuvre') == '5h' ? 'selected' : '' }}>5 heures</option>
                                <option value="6h" {{ old('duree_main_oeuvre') == '6h' ? 'selected' : '' }}>6 heures</option>
                                <option value="7h" {{ old('duree_main_oeuvre') == '7h' ? 'selected' : '' }}>7 heures</option>
                                <option value="8h" {{ old('duree_main_oeuvre') == '8h' ? 'selected' : '' }}>8 heures</option>
                                <option value="Plus de 8h" {{ old('duree_main_oeuvre') == 'Plus de 8h' ? 'selected' : '' }}>Plus de 8 heures</option>
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
                                            {{ in_array($technicien->id, old('techniciens', [])) ? 'selected' : '' }}>
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
                                      rows="4"
                                      required>{{ old('objet_reparation') }}</textarea>
                            @error('objet_reparation')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Enregistrer
                        </button>
                        <a href="{{ route('reparations.index') }}" class="btn btn-secondary">
                            <i class="bi bi-x-circle"></i> Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
