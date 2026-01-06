<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Technicien;
use Illuminate\Http\Request;

class TechnicienController extends Controller
{
    public function index()
    {
        return Technicien::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'specialite' => 'required',
        ]);

        $technicien = Technicien::create($validated);
        return response()->json($technicien, 201);
    }

    public function show($id)
    {
        $technicien = Technicien::with('reparations.vehicule')->find($id);

        if (!$technicien) {
            return response()->json(['error' => 'Technicien non trouvé'], 404);
        }

        return response()->json($technicien);
    }

    public function update(Request $request, $id)
    {
        $technicien = Technicien::find($id);

        if (!$technicien) {
            return response()->json(['error' => 'Technicien non trouvé'], 404);
        }

        $validated = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'specialite' => 'required',
        ]);

        $technicien->update($validated);
        return response()->json($technicien);
    }

    public function destroy($id)
    {
        $technicien = Technicien::find($id);

        if (!$technicien) {
            return response()->json(['error' => 'Technicien non trouvé'], 404);
        }

        $technicien->reparations()->detach();
        $technicien->delete();

        return response()->json(['message' => 'Technicien supprimé avec succès'], 204);
    }
}
