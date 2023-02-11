import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {UserEditDialogComponent} from "./user-edit-dialog/user-edit-dialog.component";
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {
  ConfirmationDialogComponent,
  ConfirmationDialogModel
} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {User} from "../../../models/user.model";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: any[] = [
    {label: 'Imię', value: 'firstName'},
    {label: 'Nazwisko', value: 'lastName'},
    {label: 'Adres e-mail', value: 'email'},
    {label: 'Pesel', value: 'pesel'}
  ];
  displayedColumnsKeys = this.displayedColumns.map(col => col.value);
  selectedRow: any
  selection = new SelectionModel<any>(false, null);

  constructor(private userService: UserService, private dialog: MatDialog,
              private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.dataSource = new MatTableDataSource(users);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.selectedRow = undefined;
  }

  selectRow(row: any) {
    if (this.selectedRow === row) {
      this.selectedRow = undefined;
      row = undefined;
    } else {
      this.selectedRow = row;
    }
  }

  editUser() {
    let dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: Object.assign({}, this.selectedRow)
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage) {
          this.snackBarService.openSnackBar(closingMessage.message, closingMessage.type);
          this.getUsers();
        }
      }
    });
  }

  deleteUserConfirmation(user: User) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: this.prepareConfirmationDialogData(user)
    });
    dialogRef.afterClosed().subscribe({
      next: (closingMessage) => {
        if (closingMessage.accept) {
          this.deleteUser(user.id);
        }
      }
    });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Użytkownik pomyślnie usunięty', SnackBarType.SUCCESS);
        this.getUsers();
      },
      error: () => {
        this.snackBarService.openSnackBar('Próba usunięcia użytkownika nie powiodła się', SnackBarType.ERROR);
      }
    });
  }

  prepareConfirmationDialogData(user: User): ConfirmationDialogModel {
    return {
      header: 'Potwierdź usunięcie użytkownika',
      text: `Czy na pewno chcesz usunąć użytkownika ${user.firstName} ${user.lastName} z systemu ?`,
      acceptButtonLabel: 'TAK',
      declineButtonLabel: 'NIE'
    };
  }

}
