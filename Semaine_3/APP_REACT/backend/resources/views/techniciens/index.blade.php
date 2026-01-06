@extends('layouts.app')

@section('title', 'Liste des Techniciens')

@section('actions')
    <a href="{{ route('techniciens.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Nouveau technicien
    </a>
@endsection

@section('content')
<div class="card">
    <div class="card-body">
        @if($techniciens->count() > 0)
            <div class="row">
                @foreach($techniciens as $technicien)
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-shrink-0">
                                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                         style="width: 60px; height: 60px;">
                                        <i class="bi bi-person fs-4"></i>
                                    </div>
                                </div>
                                <div class="flex-grow-1 ms-3">
                                    <h5 class="mb-0">{{ $technicien->prenom }} {{ $technicien->nom }}</h5>
                                    <p class="text-muted mb-0">
                                        <span class="badge bg-info">{{ $technicien->specialite }}</span>
                                    </p>
                                </div>
                            </div>

                            <div class="mb-3">
                                <small class="text-muted">Réparations effectuées :</small>
                                <h4>{{ $technicien->reparations->count() }}</h4>
                            </div>

                            <div class="btn-group w-100" role="group">
                                <a href="{{ route('techniciens.show', $technicien) }}"
                                   class="btn btn-outline-info btn-sm">
                                    <i class="bi bi-eye"></i> Voir
                                </a>
                                <a href="{{ route('techniciens.edit', $technicien) }}"
                                   class="btn btn-outline-warning btn-sm">
                                    <i class="bi bi-pencil"></i> Modifier
                                </a>
                                <form action="{{ route('techniciens.destroy', $technicien) }}"
                                      method="POST"
                                      class="d-inline"
                                      onsubmit="return confirm('Supprimer ce technicien ?')">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-outline-danger btn-sm">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        @else
            <div class="text-center py-5">
                <i class="bi bi-person-badge fs-1 text-muted"></i>
                <h4 class="text-muted mt-3">Aucun technicien enregistré</h4>
                <p class="text-muted">Commencez par ajouter un technicien.</p>
                <a href="{{ route('techniciens.create') }}" class="btn btn-primary">
                    <i class="bi bi-plus-circle"></i> Ajouter un technicien
                </a>
            </div>
        @endif
    </div>
</div>
@endsection
