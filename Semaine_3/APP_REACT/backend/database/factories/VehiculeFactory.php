<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicule>
 */
class VehiculeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'immatriculation' => $this->faker->unique()->regexify('[A-Z]{2}-[0-9]{3}-[A-Z]{2}'),
            'marque' => $this->faker->randomElement(['Renault', 'Peugeot', 'Citroën', 'BMW', 'Mercedes', 'Audi']),
            'modele' => $this->faker->word,
            'couleur' => $this->faker->colorName,
            'annee' => $this->faker->numberBetween(2000, 2023),
            'kilometrage' => $this->faker->numberBetween(0, 300000),
            'carosserie' => $this->faker->randomElement(['Berline', 'Break', 'SUV', 'Coupé', 'Cabriolet']),
            'energie' => $this->faker->randomElement(['Essence', 'Diesel', 'Électrique', 'Hybride']),
            'boite' => $this->faker->randomElement(['Manuelle', 'Automatique']),
        ];
    }
}
