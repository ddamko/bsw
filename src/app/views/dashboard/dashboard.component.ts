import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Sample Dashboard Cards -->
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Active Services</h2>
          <p class="text-3xl font-bold text-blue-600">12</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Pending Requests</h2>
          <p class="text-3xl font-bold text-yellow-600">5</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Completed Tasks</h2>
          <p class="text-3xl font-bold text-green-600">28</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {} 