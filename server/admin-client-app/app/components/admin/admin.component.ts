import { Component } from '@angular/core';
import { Auth } from '../../services/auth/auth.service';

@Component({
  selector: 'admin',
  templateUrl: 'app/components/admin/admin.template.html'
})

export class AdminComponent {
  constructor(private auth: Auth) { }
};
