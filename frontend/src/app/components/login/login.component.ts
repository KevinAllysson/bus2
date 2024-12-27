import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, CommonModule]
})
export class LoginComponent {
    @Output() loginSuccess = new EventEmitter<void>();

    username = '';
    password = '';
    errorMessage = '';

    onSubmit(): void {
        const validUser = 'admin';
        const validPassword = '12345';

        if (this.username === validUser && this.password === validPassword) {
            console.log('Login realizado no LoginComponent');

            this.loginSuccess.emit(); // Emite o evento para informar o AppComponent
            console.log('Evento loginSuccess emitido!');
        } else {
            this.errorMessage = 'Usuário ou senha inválidos.';
        }
    }
}
