<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reparation extends Model
{
    use HasFactory;

    protected $fillable = [
        'vehicule_id',
        'date',
        'duree_main_oeuvre',
        'objet_reparation',
    ];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);
    }

    public function techniciens()
    {
        return $this->belongsToMany(Technicien::class);
    }
}
