<?php

namespace App\Http\Controllers;

use App\Models\Technicien;
use Illuminate\Http\Request;

class TechnicienController extends Controller
{
    public function index()
    {
        $techniciens = Technicien::orderBy('nom')->orderBy('prenom')->get();
        return view('techniciens.index', compact('techniciens'));
    }

    public function create()
    {
        return view('techniciens.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'specialite' => 'required|max:255',
        ]);

        Technicien::create($validated);
        return redirect()->route('techniciens.index')
            ->with('success', 'Technicien créé avec succès.');
    }

    public function show(Technicien $technicien)
    {
        $technicien->load('reparations.vehicule');
        return view('techniciens.show', compact('technicien'));
    }

    public function edit(Technicien $technicien)
    {
        return view('techniciens.edit', compact('technicien'));
    }

    public function update(Request $request, Technicien $technicien)
    {
        $validated = $request->validate([
            'nom' => 'required|max:255',
            'prenom' => 'required|max:255',
            'specialite' => 'required|max:255',
        ]);

        $technicien->update($validated);
        return redirect()->route('techniciens.index')
            ->with('success', 'Technicien mis à jour avec succès.');
    }

    public function destroy(Technicien $technicien)
    {
        $technicien->reparations()->detach();
        $technicien->delete();
        return redirect()->route('techniciens.index')
            ->with('success', 'Technicien supprimé avec succès.');
    }
}
