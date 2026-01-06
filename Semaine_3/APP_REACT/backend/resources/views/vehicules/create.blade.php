@extends('layouts.app')

@section('title', 'Ajouter un Véhicule')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Nouveau véhicule</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('vehicules.store') }}" method="POST">
                    @csrf

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="immatriculation" class="form-label">Immatriculation *</label>
                            <input type="text"
                                   class="form-control @error('immatriculation') is-invalid @enderror"
                                   id="immatriculation"
                                   name="immatriculation"
                                   value="{{ old('immatriculation') }}"
                                   required>
                            @error('immatriculation')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="marque" class="form-label">Marque *</label>
                            <input type="text"
                                   class="form-control @error('marque') is-invalid @enderror"
                                   id="marque"
                                   name="marque"
                                   value="{{ old('marque') }}"
                                   required>
                            @error('marque')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="modele" class="form-label">Modèle *</label>
                            <input type="text"
                                   class="form-control @error('modele') is-invalid @enderror"
                                   id="modele"
                                   name="modele"
                                   value="{{ old('modele') }}"
                                   required>
                            @error('modele')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="couleur" class="form-label">Couleur</label>
                            <input type="text"
                                   class="form-control"
                                   id="couleur"
                                   name="couleur"
                                   value="{{ old('couleur') }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="annee" class="form-label">Année</label>
                            <input type="number"
                                   class="form-control"
                                   id="annee"
                                   name="annee"
                                   value="{{ old('annee') }}"
                                   min="1900"
                                   max="{{ date('Y') }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="kilometrage" class="form-label">Kilométrage (km)</label>
                            <input type="number"
                                   class="form-control"
                                   id="kilometrage"
                                   name="kilometrage"
                                   value="{{ old('kilometrage') }}"
                                   min="0">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="carosserie" class="form-label">Carrosserie</label>
                            <select class="form-select" id="carosserie" name="carosserie">
                                <option value="">Sélectionnez...</option>
                                <option value="Berline" {{ old('carosserie') == 'Berline' ? 'selected' : '' }}>Berline</option>
                                <option value="Break" {{ old('carosserie') == 'Break' ? 'selected' : '' }}>Break</option>
                                <option value="SUV" {{ old('carosserie') == 'SUV' ? 'selected' : '' }}>SUV</option>
                                <option value="Coupé" {{ old('carosserie') == 'Coupé' ? 'selected' : '' }}>Coupé</option>
                                <option value="Cabriolet" {{ old('carosserie') == 'Cabriolet' ? 'selected' : '' }}>Cabriolet</option>
                                <option value="Monospace" {{ old('carosserie') == 'Monospace' ? 'selected' : '' }}>Monospace</option>
                                <option value="Utilitaire" {{ old('carosserie') == 'Utilitaire' ? 'selected' : '' }}>Utilitaire</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="energie" class="form-label">Énergie</label>
                            <select class="form-select" id="energie" name="energie">
                                <option value="">Sélectionnez...</option>
                                <option value="Essence" {{ old('energie') == 'Essence' ? 'selected' : '' }}>Essence</option>
                                <option value="Diesel" {{ old('energie') == 'Diesel' ? 'selected' : '' }}>Diesel</option>
                                <option value="Électrique" {{ old('energie') == 'Électrique' ? 'selected' : '' }}>Électrique</option>
                                <option value="Hybride" {{ old('energie') == 'Hybride' ? 'selected' : '' }}>Hybride</option>
                                <option value="GPL" {{ old('energie') == 'GPL' ? 'selected' : '' }}>GPL</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="boite" class="form-label">Boîte de vitesse</label>
                            <select class="form-select" id="boite" name="boite">
                                <option value="">Sélectionnez...</option>
                                <option value="Manuelle" {{ old('boite') == 'Manuelle' ? 'selected' : '' }}>Manuelle</option>
                                <option value="Automatique" {{ old('boite') == 'Automatique' ? 'selected' : '' }}>Automatique</option>
                                <option value="Séquentielle" {{ old('boite') == 'Séquentielle' ? 'selected' : '' }}>Séquentielle</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Enregistrer
                        </button>
                        <a href="{{ route('vehicules.index') }}" class="btn btn-secondary">
                            <i class="bi bi-x-circle"></i> Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
