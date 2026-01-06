<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reparation;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    public function index()
    {
        return Reparation::with('vehicule', 'techniciens')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required',
            'objet_reparation' => 'required',
            'techniciens' => 'nullable|array',
            'techniciens.*' => 'exists:techniciens,id',
        ]);

        $reparation = Reparation::create($validated);

        if ($request->has('techniciens')) {
            $reparation->techniciens()->attach($request->techniciens);
        }

        return response()->json($reparation->load('vehicule', 'techniciens'), 201);
    }

    public function show($id)
    {
        $reparation = Reparation::with('vehicule', 'techniciens')->find($id);

        if (!$reparation) {
            return response()->json(['error' => 'Réparation non trouvée'], 404);
        }

        return response()->json($reparation);
    }

    public function update(Request $request, $id)
    {
        $reparation = Reparation::find($id);

        if (!$reparation) {
            return response()->json(['error' => 'Réparation non trouvée'], 404);
        }

        $validated = $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required',
            'objet_reparation' => 'required',
            'techniciens' => 'nullable|array',
            'techniciens.*' => 'exists:techniciens,id',
        ]);

        $reparation->update($validated);

        if ($request->has('techniciens')) {
            $reparation->techniciens()->sync($request->techniciens);
        } else {
            $reparation->techniciens()->detach();
        }

        return response()->json($reparation->load('vehicule', 'techniciens'));
    }

    public function destroy($id)
    {
        $reparation = Reparation::find($id);

        if (!$reparation) {
            return response()->json(['error' => 'Réparation non trouvée'], 404);
        }

        $reparation->techniciens()->detach();
        $reparation->delete();

        return response()->json(['message' => 'Réparation supprimée avec succès'], 204);
    }
}
