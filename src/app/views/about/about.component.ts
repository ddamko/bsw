import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="max-w-3xl mx-auto space-y-6">
      <h1 class="text-3xl font-bold">About BSW</h1>
      
      <div class="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 class="text-xl font-semibold">Business Service Workbench</h2>
        <p class="text-gray-600">
          The Business Service Workbench (BSW) is a comprehensive platform designed to streamline and manage business services efficiently. 
          It provides tools and features to help organizations optimize their service delivery and improve operational efficiency.
        </p>

        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-3">Key Features</h3>
          <ul class="list-disc list-inside space-y-2 text-gray-600">
            <li>Service Management Dashboard</li>
            <li>User Profile Management</li>
            <li>Service Request Tracking</li>
            <li>Performance Analytics</li>
            <li>Resource Allocation</li>
          </ul>
        </div>

        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-3">Version Information</h3>
          <p class="text-gray-600">Version 1.0.0</p>
          <p class="text-gray-600">© 2024 Business Service Workbench</p>
        </div>
      </div>
    </div>
  `
})
export class AboutComponent {} 