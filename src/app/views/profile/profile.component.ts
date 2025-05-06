import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="max-w-2xl mx-auto space-y-6">
      <h1 class="text-3xl font-bold">Profile</h1>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <div class="flex items-center space-x-4 mb-6">
          <div class="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span class="text-2xl font-bold text-gray-600">U</span>
          </div>
          <div>
            <h2 class="text-xl font-semibold">User Name</h2>
            <p class="text-gray-600">user&#64;example.com</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Role</label>
            <p class="mt-1">Service Administrator</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Department</label>
            <p class="mt-1">IT Services</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Login</label>
            <p class="mt-1">2024-03-20 14:30</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {} 