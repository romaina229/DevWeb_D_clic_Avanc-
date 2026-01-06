<?php

namespace App\Http\Controllers;

use App\Models\Reparation;
use App\Models\Vehicule;
use App\Models\Technicien;
use Illuminate\Http\Request;

class ReparationController extends Controller
{
    public function index()
    {
        $reparations = Reparation::with('vehicule', 'techniciens')
            ->orderBy('date', 'desc')
            ->get();
        return view('reparations.index', compact('reparations'));
    }

    public function create()
    {
        $vehicules = Vehicule::all();
        $techniciens = Technicien::all();
        return view('reparations.create', compact('vehicules', 'techniciens'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|max:255',
            'objet_reparation' => 'required',
            'techniciens' => 'nullable|array',
            'techniciens.*' => 'exists:techniciens,id',
        ]);

        $reparation = Reparation::create($validated);

        if ($request->has('techniciens')) {
            $reparation->techniciens()->attach($request->techniciens);
        }

        return redirect()->route('reparations.index')
            ->with('success', 'Réparation créée avec succès.');
    }

    public function show(Reparation $reparation)
    {
        $reparation->load('vehicule', 'techniciens');
        return view('reparations.show', compact('reparation'));
    }

    public function edit(Reparation $reparation)
    {
        $vehicules = Vehicule::all();
        $techniciens = Technicien::all();
        $reparation->load('techniciens');
        return view('reparations.edit', compact('reparation', 'vehicules', 'techniciens'));
    }

    public function update(Request $request, Reparation $reparation)
    {
        $validated = $request->validate([
            'vehicule_id' => 'required|exists:vehicules,id',
            'date' => 'required|date',
            'duree_main_oeuvre' => 'required|max:255',
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

        return redirect()->route('reparations.index')
            ->with('success', 'Réparation mise à jour avec succès.');
    }

    public function destroy(Reparation $reparation)
    {
        $reparation->techniciens()->detach();
        $reparation->delete();
        return redirect()->route('reparations.index')
            ->with('success', 'Réparation supprimée avec succès.');
    }
}
