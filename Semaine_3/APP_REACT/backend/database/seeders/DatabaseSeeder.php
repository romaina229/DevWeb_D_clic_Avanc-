<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\Vehicule::factory(15)->create();
        \App\Models\Technicien::factory(8)->create();
        \App\Models\Reparation::factory(25)->create()->each(function ($reparation) {
            $reparation->techniciens()->attach(
                \App\Models\Technicien::inRandomOrder()->limit(rand(1,3))->pluck('id')->toArray()
            );
        });
    }
}
