<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reparation>
 */
class ReparationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicule_id' => \App\Models\Vehicule::factory(),
            'date' => $this->faker->date(),
            'duree_main_oeuvre' => $this->faker->randomElement(['1h', '2h', '3h', '4h', '5h', '6h']),
            'objet_reparation' => $this->faker->sentence,
        ];
    }
}
