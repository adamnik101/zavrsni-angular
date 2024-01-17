import { Component } from '@angular/core';
import {TableAdminComponent} from "../table-admin/table-admin.component";
import {AdminRolesService} from "./services/admin-roles.service";

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    TableAdminComponent
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {

  constructor(protected adminRoleService: AdminRolesService) { }
}
