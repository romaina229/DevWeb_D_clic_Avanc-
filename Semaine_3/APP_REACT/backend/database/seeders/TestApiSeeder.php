// database/seeders/TestApiSeeder.php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicule;
use App\Models\Technicien;
use App\Models\Reparation;

class TestApiSeeder extends Seeder
{
    public function run()
    {
        // Créer 3 véhicules
        $vehicules = Vehicule::factory()->count(3)->create();

        // Créer 2 techniciens
        $techniciens = Technicien::factory()->count(2)->create();

        // Créer 5 réparations avec relations
        Reparation::factory()->count(5)->create()->each(function ($reparation) use ($techniciens) {
            $reparation->techniciens()->attach(
                $techniciens->random(rand(1, 2))->pluck('id')->toArray()
            );
        });
    }
}
