import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../service/quizz.service';

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css',
})
export class QuizzComponent implements OnInit {
  title: string = '';
  questions: any[] = [];
  currentQuestion: number = 0;
  selectedOptions: string[] = [];
  finished: boolean = false;
  result: string = '';
  resultText: any = {}; 


  constructor(private quizService: QuizzService) {}

  ngOnInit() {
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getQuiz().subscribe({
      next: (quizzes) => {
        if (quizzes.length > 0) {
          this.title = quizzes[0].title;
          this.questions = quizzes[0].questions;
          this.resultText = quizzes[0].results;
        }
      },
      error: (err) => console.error('Error loading quiz:', err)
    });
  }

 selectOption(alias: string) {
  this.selectedOptions.push(alias);
  console.log('Selecionado:', this.selectedOptions);

  if (this.currentQuestion < this.questions.length - 1) {
    this.currentQuestion++;
  } else {
    this.finishQuiz(); // <-- se for a última pergunta, finaliza
  }
}


finishQuiz() {
  const counts = this.selectedOptions.reduce((acc, alias) => {
    acc[alias] = (acc[alias] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Encontra o alias com maior contagem
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  this.result = sorted[0][0]; // pega o alias com maior pontuação
  this.finished = true;

  console.log('Alias mais escolhido:', this.result);
  console.log('Resultado:', this.resultText[this.result]);
}




getResultText(): string {
  return this.resultText[this.result];
}


resetQuiz() {
  this.currentQuestion = 0;
  this.selectedOptions = [];
  this.finished = false;
  this.result = '';
  this.loadQuiz(); // recarrega o quiz da API
}

}