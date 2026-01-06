<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    public function index()
    {
        $vehicules = Vehicule::orderBy('created_at', 'desc')->get();
        return view('vehicules.index', compact('vehicules'));
    }

    public function create()
    {
        return view('vehicules.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'immatriculation' => 'required|unique:vehicules|max:255',
            'marque' => 'required|max:255',
            'modele' => 'required|max:255',
            'couleur' => 'nullable|max:255',
            'annee' => 'nullable|integer|min:1900|max:' . date('Y'),
            'kilometrage' => 'nullable|integer|min:0',
            'carosserie' => 'nullable|max:255',
            'energie' => 'nullable|max:255',
            'boite' => 'nullable|max:255',
        ]);

        Vehicule::create($validated);
        return redirect()->route('vehicules.index')
            ->with('success', 'Véhicule créé avec succès.');
    }

    public function show(Vehicule $vehicule)
    {
        return view('vehicules.show', compact('vehicule'));
    }

    public function edit(Vehicule $vehicule)
    {
        return view('vehicules.edit', compact('vehicule'));
    }

    public function update(Request $request, Vehicule $vehicule)
    {
        $validated = $request->validate([
            'immatriculation' => 'required|unique:vehicules,immatriculation,' . $vehicule->id . '|max:255',
            'marque' => 'required|max:255',
            'modele' => 'required|max:255',
            'couleur' => 'nullable|max:255',
            'annee' => 'nullable|integer|min:1900|max:' . date('Y'),
            'kilometrage' => 'nullable|integer|min:0',
            'carosserie' => 'nullable|max:255',
            'energie' => 'nullable|max:255',
            'boite' => 'nullable|max:255',
        ]);

        $vehicule->update($validated);
        return redirect()->route('vehicules.index')
            ->with('success', 'Véhicule mis à jour avec succès.');
    }

    public function destroy(Vehicule $vehicule)
    {
        $vehicule->delete();
        return redirect()->route('vehicules.index')
            ->with('success', 'Véhicule supprimé avec succès.');
    }
}
