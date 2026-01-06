@extends('layouts.app')

@section('title', 'Ajouter un Technicien')

@section('content')
<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0">Nouveau technicien</h5>
            </div>
            <div class="card-body">
                <form action="{{ route('techniciens.store') }}" method="POST">
                    @csrf

                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label for="nom" class="form-label">Nom *</label>
                            <input type="text"
                                   class="form-control @error('nom') is-invalid @enderror"
                                   id="nom"
                                   name="nom"
                                   value="{{ old('nom') }}"
                                   required>
                            @error('nom')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-md-6 mb-3">
                            <label for="prenom" class="form-label">Prénom *</label>
                            <input type="text"
                                   class="form-control @error('prenom') is-invalid @enderror"
                                   id="prenom"
                                   name="prenom"
                                   value="{{ old('prenom') }}"
                                   required>
                            @error('prenom')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="col-12 mb-3">
                            <label for="specialite" class="form-label">Spécialité *</label>
                            <select class="form-select @error('specialite') is-invalid @enderror"
                                    id="specialite"
                                    name="specialite"
                                    required>
                                <option value="">Sélectionnez une spécialité...</option>
                                <option value="Mécanique générale" {{ old('specialite') == 'Mécanique générale' ? 'selected' : '' }}>Mécanique générale</option>
                                <option value="Carrosserie" {{ old('specialite') == 'Carrosserie' ? 'selected' : '' }}>Carrosserie</option>
                                <option value="Peinture" {{ old('specialite') == 'Peinture' ? 'selected' : '' }}>Peinture</option>
                                <option value="Électricité auto" {{ old('specialite') == 'Électricité auto' ? 'selected' : '' }}>Électricité auto</option>
                                <option value="Climatisation" {{ old('specialite') == 'Climatisation' ? 'selected' : '' }}>Climatisation</option>
                                <option value="Freinage" {{ old('specialite') == 'Freinage' ? 'selected' : '' }}>Freinage</option>
                                <option value="Direction/Suspension" {{ old('specialite') == 'Direction/Suspension' ? 'selected' : '' }}>Direction/Suspension</option>
                                <option value="Moteur" {{ old('specialite') == 'Moteur' ? 'selected' : '' }}>Moteur</option>
                                <option value="Transmission" {{ old('specialite') == 'Transmission' ? 'selected' : '' }}>Transmission</option>
                            </select>
                            @error('specialite')
                                <div class="invalid-feedback">{{ $message }}</div>
                            @enderror
                        </div>
                    </div>

                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-check-circle"></i> Enregistrer
                        </button>
                        <a href="{{ route('techniciens.index') }}" class="btn btn-secondary">
                            <i class="bi bi-x-circle"></i> Annuler
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
