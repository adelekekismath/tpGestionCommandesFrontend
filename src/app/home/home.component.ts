import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class=" min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div class="w-full text-center bg-white p-8 rounded-xl shadow-2xl border border-indigo-100">
        <h1 class="text-5xl font-extrabold text-indigo-700 mb-4">
          Bienvenue dans l'Application de Gestion des commandes
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          Votre plateforme centralisée pour la gestion des commandes, des clients et des stocks.
        </p>

        <p class="text-sm text-gray-500 mb-6">
          Veuillez vous connecter pour accéder au tableau de bord et à toutes les fonctionnalités de gestion.
        </p>

        <a routerLink="/auth" class="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg
                                      shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
          Se Connecter Maintenant
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  // Ce composant est simple et ne nécessite pas de logique complexe
}
