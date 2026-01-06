@extends('layouts.app')

@section('title', 'Modifier le Véhicule')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-8">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Modifier le véhicule : {{ $vehicule->immatriculation }}</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('vehicules.update', $vehicule) }}" method="POST">
                    @csrf
                    @method('PUT')

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="immatriculation" class="form-label">Immatriculation *</label>
                            <input type="text"
                                   class="form-control @error('immatriculation') is-invalid @enderror"
                                   id="immatriculation"
                                   name="immatriculation"
                                   value="{{ old('immatriculation', $vehicule->immatriculation) }}"
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
                                   value="{{ old('marque', $vehicule->marque) }}"
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
                                   value="{{ old('modele', $vehicule->modele) }}"
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
                                   value="{{ old('couleur', $vehicule->couleur) }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="annee" class="form-label">Année</label>
                            <input type="number"
                                   class="form-control"
                                   id="annee"
                                   name="annee"
                                   value="{{ old('annee', $vehicule->annee) }}"
                                   min="1900"
                                   max="{{ date('Y') }}">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="kilometrage" class="form-label">Kilométrage (km)</label>
                            <input type="number"
                                   class="form-control"
                                   id="kilometrage"
                                   name="kilometrage"
                                   value="{{ old('kilometrage', $vehicule->kilometrage) }}"
                                   min="0">
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="carosserie" class="form-label">Carrosserie</label>
                            <select class="form-select" id="carosserie" name="carosserie">
                                <option value="">Sélectionnez...</option>
                                <option value="Berline" {{ old('carosserie', $vehicule->carosserie) == 'Berline' ? 'selected' : '' }}>Berline</option>
                                <option value="Break" {{ old('carosserie', $vehicule->carosserie) == 'Break' ? 'selected' : '' }}>Break</option>
                                <option value="SUV" {{ old('carosserie', $vehicule->carosserie) == 'SUV' ? 'selected' : '' }}>SUV</option>
                                <option value="Coupé" {{ old('carosserie', $vehicule->carosserie) == 'Coupé' ? 'selected' : '' }}>Coupé</option>
                                <option value="Cabriolet" {{ old('carosserie', $vehicule->carosserie) == 'Cabriolet' ? 'selected' : '' }}>Cabriolet</option>
                                <option value="Monospace" {{ old('carosserie', $vehicule->carosserie) == 'Monospace' ? 'selected' : '' }}>Monospace</option>
                                <option value="Utilitaire" {{ old('carosserie', $vehicule->carosserie) == 'Utilitaire' ? 'selected' : '' }}>Utilitaire</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="energie" class="form-label">Énergie</label>
                            <select class="form-select" id="energie" name="energie">
                                <option value="">Sélectionnez...</option>
                                <option value="Essence" {{ old('energie', $vehicule->energie) == 'Essence' ? 'selected' : '' }}>Essence</option>
                                <option value="Diesel" {{ old('energie', $vehicule->energie) == 'Diesel' ? 'selected' : '' }}>Diesel</option>
                                <option value="Électrique" {{ old('energie', $vehicule->energie) == 'Électrique' ? 'selected' : '' }}>Électrique</option>
                                <option value="Hybride" {{ old('energie', $vehicule->energie) == 'Hybride' ? 'selected' : '' }}>Hybride</option>
                                <option value="GPL" {{ old('energie', $vehicule->energie) == 'GPL' ? 'selected' : '' }}>GPL</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="boite" class="form-label">Boîte de vitesse</label>
                            <select class="form-select" id="boite" name="boite">
                                <option value="">Sélectionnez...</option>
                                <option value="Manuelle" {{ old('boite', $vehicule->boite) == 'Manuelle' ? 'selected' : '' }}>Manuelle</option>
                                <option value="Automatique" {{ old('boite', $vehicule->boite) == 'Automatique' ? 'selected' : '' }}>Automatique</option>
                                <option value="Séquentielle" {{ old('boite', $vehicule->boite) == 'Séquentielle' ? 'selected' : '' }}>Séquentielle</option>
                            </select>
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Mettre à jour
                        </button>
                        <a href="{{ route('vehicules.show', $vehicule) }}" class="btn btn-secondary">
                            <i class="bi bi-x-circle"></i> Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
