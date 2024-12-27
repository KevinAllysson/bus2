import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';


@Component({
    selector: 'app-formulario',
    standalone: true,
    templateUrl: './formulario.component.html',
    styleUrls: ['./formulario.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ApiService]
})
export class FormularioComponent implements OnInit {
    @Output() resetMapa = new EventEmitter<void>();
    @Output() viagemSelecionada = new EventEmitter<any>(); // Evento para enviar a viagem selecionada
    linhas: any[] = [];
    viagensFiltradas: any[] = [];
    selectedLinha: number | null = null;
    selectedViagem: number | null = null;
    rotaBuscada = false;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.loadLinhas();
    }

    loadLinhas(): void {
        this.apiService.getLinhas().subscribe({
            next: (data: any[]) => {
                this.linhas = data;
            },
            error: (error) => {
                console.error('Erro ao carregar linhas:', error);
            },
        });
    }

    onLinhaChange(): void {
        if (this.selectedLinha) {
            this.apiService.getViagensByLinha(this.selectedLinha).subscribe({
                next: (data: any) => {
                    this.viagensFiltradas = data.viagens.map((viagem: any) => ({
                        ...viagem,
                        descricao: `Viagem ${viagem.id} `,
                    }));
                },
                error: (error) => {
                    console.error('Erro ao buscar viagens:', error);
                },
            });
        } else {
            this.viagensFiltradas = [];
        }
    }

    buscarViagem(): void {
        const viagem = this.viagensFiltradas.find((v) => v.id === Number(this.selectedViagem));
        if (viagem) {
            this.rotaBuscada = true; 
            this.viagemSelecionada.emit(viagem); // Envia a viagem selecionada
        } else {
            console.error('Viagem não encontrada!');
        }
    }
    limparFormulario(): void {
        this.rotaBuscada = false; 
        this.selectedLinha = null;
        this.selectedViagem = null; 
        this.viagensFiltradas = [];

        this.resetMapa.emit(); 
    }
}
