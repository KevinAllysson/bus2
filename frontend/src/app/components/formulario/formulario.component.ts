import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { LinhasService } from '../../services/linhas.service'; 

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
    providers: [ApiService, LinhasService] 
})
export class FormularioComponent implements OnInit {
    @Output() viagemChange = new EventEmitter<number>();
    @Output() resetMapa = new EventEmitter<void>();
    @Output() viagemSelecionada = new EventEmitter<any>();
    @Output() paradasCarregadas = new EventEmitter<any[]>();

    linhas: any[] = [];
    viagensFiltradas: any[] = [];
    selectedLinha: number | null = null;
    selectedViagem: string | null = null;
    rotaBuscada = false;

    constructor(private apiService: ApiService, private linhasService: LinhasService) { }

    ngOnInit(): void {
        this.loadLinhas();
    }

    loadLinhas(): void {
        this.linhasService.getLinhas().subscribe({
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
            this.linhasService.getViagensByLinhaId(this.selectedLinha).subscribe({
                next: (data: any[]) => {
                    if (Array.isArray(data) && data.length > 0) {
                        this.viagensFiltradas = data.map((viagem) => ({
                            ...viagem,
                            descricao: `Viagem ${viagem.id} - ${viagem.nome}`,
                        }));
                    } else {
                        console.warn('Nenhuma viagem encontrada para a linha:', this.selectedLinha);
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

            this.linhasService.getParadasByViagemId(viagem.id).subscribe({
                next: (paradas) => {
                    this.paradasCarregadas.emit(paradas);
                },
                error: (error) => {
                    console.error('Erro ao carregar paradas:', error);
                },
            });
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
