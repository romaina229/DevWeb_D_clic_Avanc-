<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicule;
use Illuminate\Http\Request;

class VehiculeController extends Controller
{
    public function index()
    {
        return Vehicule::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'immatriculation' => 'required|unique:vehicules',
            'marque' => 'required',
            'modele' => 'required',
            'couleur' => 'nullable',
            'annee' => 'nullable|integer|min:1900',
            'kilometrage' => 'nullable|integer|min:0',
            'carosserie' => 'nullable',
            'energie' => 'nullable',
            'boite' => 'nullable',
        ]);

        $vehicule = Vehicule::create($validated);
        return response()->json($vehicule, 201);
    }

    public function show($id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['error' => 'Véhicule non trouvé'], 404);
        }

        return response()->json($vehicule);
    }

    public function update(Request $request, $id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['error' => 'Véhicule non trouvé'], 404);
        }

        $validated = $request->validate([
            'immatriculation' => 'required|unique:vehicules,immatriculation,' . $vehicule->id,
            'marque' => 'required',
            'modele' => 'required',
            'couleur' => 'nullable',
            'annee' => 'nullable|integer|min:1900',
            'kilometrage' => 'nullable|integer|min:0',
            'carosserie' => 'nullable',
            'energie' => 'nullable',
            'boite' => 'nullable',
        ]);

        $vehicule->update($validated);
        return response()->json($vehicule);
    }

    public function destroy($id)
    {
        $vehicule = Vehicule::find($id);

        if (!$vehicule) {
            return response()->json(['error' => 'Véhicule non trouvé'], 404);
        }

        $vehicule->delete();
        return response()->json(['message' => 'Véhicule supprimé avec succès'], 204);
    }
}
