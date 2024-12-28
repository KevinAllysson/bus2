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
    @Output() viagemChange = new EventEmitter<number>();
    @Output() resetMapa = new EventEmitter<void>();
    @Output() viagemSelecionada = new EventEmitter<any>(); // Evento para enviar a viagem selecionada
    linhas: any[] = [];
    viagensFiltradas: any[] = [];
    selectedLinha: number | null = null;
    selectedViagem: string | null = null;
    rotaBuscada = false;
    viagens: any[] = [];
    constructor(private apiService: ApiService) { }

    onViagemChange(): void {
        if (this.selectedViagem) {
            const numericViagemId = typeof this.selectedViagem === 'string' ? parseInt(this.selectedViagem, 10) : this.selectedViagem;
            this.viagemChange.emit(numericViagemId);
        }
    }   

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
                    if (Array.isArray(data)) { 

                        this.viagensFiltradas = data.map((viagem: any) => ({
                            ...viagem,
                            descricao: `Viagem ${viagem.id} `,
                        }));
                    } else {
                        console.warn('Resposta da API não é um array:', data);
                        this.viagensFiltradas = []; 
                    }
                },
                error: (error) => {
                    console.error('Erro ao buscar viagens:', error);
                    this.viagensFiltradas = []; 
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
            this.viagemSelecionada.emit(viagem); 
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
